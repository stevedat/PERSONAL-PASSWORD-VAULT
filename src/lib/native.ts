/**
 * Native App Integration Layer
 * Handles iOS and Android specific features
 */

import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { Capacitor } from "@capacitor/core";

export class NativeApp {
  private static initialized = false;

  /**
   * Check if running as native app
   */
  static isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  /**
   * Get platform (ios, android, web)
   */
  static getPlatform(): string {
    return Capacitor.getPlatform();
  }

  /**
   * Initialize native app features
   */
  static async initialize(): Promise<void> {
    if (this.initialized || !this.isNative()) {
      return;
    }

    try {
      // Configure status bar
      await this.setupStatusBar();

      // Hide splash screen after app is ready
      await SplashScreen.hide();

      // Setup app state listeners
      this.setupAppListeners();

      this.initialized = true;
      console.log("[Native] App initialized successfully");
    } catch (error) {
      console.error("[Native] Initialization error:", error);
    }
  }

  /**
   * Setup status bar styling
   */
  private static async setupStatusBar(): Promise<void> {
    if (!this.isNative()) return;

    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: "#1a1a2e" });
    } catch (error) {
      console.error("[Native] StatusBar setup error:", error);
    }
  }

  /**
   * Setup app lifecycle listeners
   */
  private static setupAppListeners(): void {
    // Listen for app state changes
    App.addListener("appStateChange", ({ isActive }) => {
      console.log(
        "[Native] App state changed:",
        isActive ? "active" : "background",
      );

      // Lock app when going to background (security feature)
      if (!isActive) {
        this.lockApp();
      }
    });

    // Listen for back button (Android)
    App.addListener("backButton", ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });
  }

  /**
   * Lock app (clear session)
   */
  private static lockApp(): void {
    // Clear cached master password for security
    sessionStorage.removeItem("pv_master_key");
    console.log("[Native] App locked");
  }

  /**
   * Export vault file to native filesystem
   */
  static async exportToFile(
    filename: string,
    data: Blob,
  ): Promise<{ success: boolean; path?: string; error?: string }> {
    if (!this.isNative()) {
      return { success: false, error: "Not running as native app" };
    }

    try {
      // Convert blob to base64
      const base64Data = await this.blobToBase64(data);

      // Save to Documents directory
      const result = await Filesystem.writeFile({
        path: filename,
        data: base64Data,
        directory: Directory.Documents,
        recursive: true,
      });

      console.log("[Native] File exported:", result.uri);

      return {
        success: true,
        path: result.uri,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("[Native] Export error:", error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Import vault file from native filesystem
   */
  static async importFromFile(
    path: string,
  ): Promise<{ success: boolean; data?: Blob; error?: string }> {
    if (!this.isNative()) {
      return { success: false, error: "Not running as native app" };
    }

    try {
      const result = await Filesystem.readFile({
        path,
        directory: Directory.Documents,
      });

      // Convert base64 to blob
      const blob = this.base64ToBlob(result.data as string, "application/json");

      return {
        success: true,
        data: blob,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("[Native] Import error:", error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Share vault file using native share dialog
   */
  static async shareFile(
    filename: string,
    data: Blob,
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.isNative()) {
      return { success: false, error: "Not running as native app" };
    }

    try {
      // First save to temp location
      const base64Data = await this.blobToBase64(data);

      const result = await Filesystem.writeFile({
        path: filename,
        data: base64Data,
        directory: Directory.Cache,
        recursive: true,
      });

      // Share the file
      await Share.share({
        title: "PocketVault Backup",
        text: "Share your encrypted vault backup",
        url: result.uri,
        dialogTitle: "Share Backup File",
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("[Native] Share error:", error);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Get app info
   */
  static async getAppInfo(): Promise<{
    name: string;
    id: string;
    version: string;
    build: string;
  }> {
    if (!this.isNative()) {
      return {
        name: "PocketVault",
        id: "com.pocketvault.app",
        version: "1.0.0",
        build: "1",
      };
    }

    const info = await App.getInfo();
    return {
      name: info.name,
      id: info.id,
      version: info.version,
      build: info.build,
    };
  }

  /**
   * Convert Blob to base64
   */
  private static blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Remove data URL prefix
        const base64Data = base64.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Convert base64 to Blob
   */
  private static base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  /**
   * Request permissions (if needed)
   */
  static async requestPermissions(): Promise<void> {
    if (!this.isNative()) return;

    // Capacitor handles most permissions automatically
    // Add specific permission requests here if needed
    console.log("[Native] Permissions checked");
  }
}
