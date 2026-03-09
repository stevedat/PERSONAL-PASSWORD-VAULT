// @ts-nocheck
/**
 * Biometric Authentication Engine for iOS PWA
 * Supports FaceID, TouchID, and device PIN
 */

export class BiometricAuth {
  static isSupported() {
    if (typeof window === "undefined") return false;
    return "credentials" in navigator && "create" in navigator.credentials;
  }

  static async isAvailable() {
    if (typeof window === "undefined" || !this.isSupported()) return false;

    try {
      // Check if WebAuthn is available
      const available =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return available;
    } catch (error) {
      console.log("Biometric check failed:", error);
      return false;
    }
  }

  static async register(username = "pocketvault-user") {
    if (typeof window === "undefined" || !(await this.isAvailable())) {
      throw new Error("Biometric authentication not available");
    }

    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const userId = crypto.getRandomValues(new Uint8Array(32));

    const publicKeyCredentialCreationOptions = {
      challenge,
      rp: {
        name: "PocketVault",
        id: window.location.hostname,
      },
      user: {
        id: userId,
        name: username,
        displayName: "PocketVault User",
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
      },
      timeout: 60000,
      attestation: "direct",
    };

    try {
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      // Store credential ID for future authentication
      const credentialId = Array.from(new Uint8Array(credential.rawId))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      localStorage.setItem("pv_biometric_id", credentialId);
      localStorage.setItem("pv_biometric_enabled", "true");

      return {
        success: true,
        credentialId,
        credential,
      };
    } catch (error) {
      console.error("Biometric registration failed:", error);
      throw new Error("Failed to register biometric authentication");
    }
  }

  static async authenticate() {
    if (typeof window === "undefined") {
      throw new Error("Biometric authentication not available on server");
    }

    const credentialId = localStorage.getItem("pv_biometric_id");
    if (!credentialId || !(await this.isAvailable())) {
      throw new Error("Biometric authentication not set up");
    }

    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const credentialIdBuffer = new Uint8Array(
      credentialId.match(/.{2}/g).map((byte) => parseInt(byte, 16)),
    );

    const publicKeyCredentialRequestOptions = {
      challenge,
      allowCredentials: [
        {
          id: credentialIdBuffer,
          type: "public-key",
        },
      ],
      userVerification: "required",
      timeout: 60000,
    };

    try {
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });

      return {
        success: true,
        assertion,
      };
    } catch (error) {
      console.error("Biometric authentication failed:", error);
      throw new Error("Biometric authentication failed");
    }
  }

  static isEnabled() {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("pv_biometric_enabled") === "true";
  }

  static disable() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("pv_biometric_id");
    localStorage.removeItem("pv_biometric_enabled");
  }

  static getBiometricType() {
    if (typeof window === "undefined") return "Biometric";
    // Detect device type for UI display
    const userAgent = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(userAgent)) {
      // Check for FaceID vs TouchID based on device model
      if (/iPhone1[0-9]|iPad/.test(userAgent)) {
        return "FaceID";
      }
      return "TouchID";
    }
    return "Biometric";
  }
}
