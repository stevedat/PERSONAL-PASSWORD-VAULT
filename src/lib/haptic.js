// @ts-nocheck
/**
 * Haptic Feedback System for iOS PWA
 * Provides native-like tactile feedback
 */

export class HapticFeedback {
  static isSupported() {
    return "vibrate" in navigator || "hapticFeedback" in navigator;
  }

  static light() {
    if (!this.isSupported()) return;

    // iOS PWA haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10); // Very light vibration
    }

    // Web Haptic API (future)
    if (navigator.hapticFeedback) {
      navigator.hapticFeedback.light();
    }
  }

  static medium() {
    if (!this.isSupported()) return;

    if (navigator.vibrate) {
      navigator.vibrate(25); // Medium vibration
    }

    if (navigator.hapticFeedback) {
      navigator.hapticFeedback.medium();
    }
  }

  static heavy() {
    if (!this.isSupported()) return;

    if (navigator.vibrate) {
      navigator.vibrate(50); // Heavy vibration
    }

    if (navigator.hapticFeedback) {
      navigator.hapticFeedback.heavy();
    }
  }

  static success() {
    if (!this.isSupported()) return;

    if (navigator.vibrate) {
      navigator.vibrate([10, 50, 10]); // Success pattern
    }

    if (navigator.hapticFeedback) {
      navigator.hapticFeedback.success();
    }
  }

  static error() {
    if (!this.isSupported()) return;

    if (navigator.vibrate) {
      navigator.vibrate([50, 100, 50, 100, 50]); // Error pattern
    }

    if (navigator.hapticFeedback) {
      navigator.hapticFeedback.error();
    }
  }

  static selection() {
    if (!this.isSupported()) return;

    if (navigator.vibrate) {
      navigator.vibrate(5); // Very subtle selection feedback
    }

    if (navigator.hapticFeedback) {
      navigator.hapticFeedback.selection();
    }
  }

  // Utility function to add haptic feedback to elements
  static addToElement(element, type = "light") {
    if (!element || typeof window === "undefined") return;

    const hapticTypes = {
      light: this.light,
      medium: this.medium,
      heavy: this.heavy,
      success: this.success,
      error: this.error,
      selection: this.selection,
    };

    const hapticFunction = hapticTypes[type] || this.light;

    element.addEventListener(
      "touchstart",
      () => {
        hapticFunction.call(this);
      },
      { passive: true },
    );

    element.addEventListener(
      "click",
      () => {
        hapticFunction.call(this);
      },
      { passive: true },
    );
  }
}

// Auto-add haptic feedback to common interactive elements
export function initializeHapticFeedback() {
  if (typeof document === "undefined") return;

  // Add haptic feedback to buttons
  document.addEventListener("DOMContentLoaded", () => {
    // Light haptic for regular buttons
    document
      .querySelectorAll("button:not(.haptic-medium):not(.haptic-heavy)")
      .forEach((btn) => {
        HapticFeedback.addToElement(btn, "light");
      });

    // Medium haptic for important buttons
    document.querySelectorAll(".haptic-medium").forEach((btn) => {
      HapticFeedback.addToElement(btn, "medium");
    });

    // Heavy haptic for critical actions
    document.querySelectorAll(".haptic-heavy").forEach((btn) => {
      HapticFeedback.addToElement(btn, "heavy");
    });
  });

  // Add selection haptic for interactive elements
  document.addEventListener(
    "click",
    (e) => {
      if (e.target.matches("input, select, textarea")) {
        HapticFeedback.selection();
      }
    },
    { passive: true },
  );
}
