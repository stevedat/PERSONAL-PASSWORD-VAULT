import { Capacitor } from '@capacitor/core';
import { NativeBiometric, BiometryType } from 'capacitor-native-biometric';

/**
 * Biometric Authentication Engine for Android/iOS (Native) and Web PWA
 * Supports FaceID, TouchID, and device PIN
 */
export class BiometricAuth {
  static isSupported() {
    if (typeof window === 'undefined') return false;
    if (Capacitor.isNativePlatform()) return true;
    return 'credentials' in navigator && 'create' in navigator.credentials;
  }

  static async isAvailable() {
    if (typeof window === 'undefined') return false;
    
    if (Capacitor.isNativePlatform()) {
      try {
        const result = await NativeBiometric.isAvailable();
        return result.isAvailable;
      } catch (error) {
        console.error('Native Biometric check failed:', error);
        return false;
      }
    }

    if (!this.isSupported()) return false;
    
    try {
      // Check if WebAuthn is available
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return available;
    } catch (error) {
      console.log('Web Biometric check failed:', error);
      return false;
    }
  }

  static async register(username = 'pocketvault-user') {
    if (typeof window === 'undefined' || !await this.isAvailable()) {
      throw new Error('Biometric authentication not available');
    }

    if (Capacitor.isNativePlatform()) {
      // For native, we just need to verify it works
      try {
        await NativeBiometric.verifyIdentity({
          reason: "Kích hoạt xác thực sinh trắc học cho PocketVault",
          title: "Xác thực sinh trắc học",
          subtitle: "Vui lòng xác thực bản thân",
          description: "Sử dụng vân tay hoặc khuôn mặt để bảo vệ dữ liệu của bạn"
        });
        
        localStorage.setItem('pv_biometric_enabled', 'true');
        return { success: true };
      } catch (error) {
        console.error('Native Biometric registration failed:', error);
        throw new Error('Xác thực thất bại');
      }
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
      pubKeyCredParams: [{alg: -7, type: "public-key"}],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required"
      },
      timeout: 60000,
      attestation: "direct" as AttestationConveyancePreference
    };

    try {
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
      }) as PublicKeyCredential;

      if (!credential) throw new Error('Biometric registration failed');

      // Store credential ID for future authentication
      const credentialId = Array.from(new Uint8Array(credential.rawId))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      localStorage.setItem('pv_biometric_id', credentialId);
      localStorage.setItem('pv_biometric_enabled', 'true');
      
      return {
        success: true,
        credentialId,
        credential
      };
    } catch (error) {
      console.error('Biometric registration failed:', error);
      throw new Error('Failed to register biometric authentication');
    }
  }

  static async authenticate() {
    if (typeof window === 'undefined') {
      throw new Error('Biometric authentication not available on server');
    }
    
    if (Capacitor.isNativePlatform()) {
      try {
        await NativeBiometric.verifyIdentity({
          reason: "Truy cập kho mật khẩu của bạn",
          title: "Xác thực",
          subtitle: "PocketVault",
          description: "Vui lòng quét để mở khóa"
        });
        return { success: true };
      } catch (error) {
        console.error('Native Biometric authentication failed:', error);
        throw new Error('Xác thực không thành công');
      }
    }

    const credentialId = localStorage.getItem('pv_biometric_id');
    if (!credentialId || !await this.isAvailable()) {
      throw new Error('Biometric authentication not set up');
    }

    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const credentialIdBuffer = new Uint8Array(
      credentialId.match(/.{2}/g).map(byte => parseInt(byte, 16))
    );

    const publicKeyCredentialRequestOptions = {
      challenge,
      allowCredentials: [{
        id: credentialIdBuffer,
        type: 'public-key' as const,
      }],
      userVerification: 'required' as UserVerificationRequirement,
      timeout: 60000,
    };

    try {
      const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
      });

      return {
        success: true,
        assertion
      };
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      throw new Error('Biometric authentication failed');
    }
  }

  static isEnabled() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('pv_biometric_enabled') === 'true';
  }

  static disable() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('pv_biometric_id');
    localStorage.removeItem('pv_biometric_enabled');
  }

  static async getBiometricType() {
    if (typeof window === 'undefined') return 'Biometric';

    if (Capacitor.isNativePlatform()) {
      try {
        const available = await NativeBiometric.isAvailable();
        if (available.biometryType === BiometryType.FACE_ID) return 'FaceID';
        if (available.biometryType === BiometryType.TOUCH_ID) return 'TouchID';
        if (available.biometryType === BiometryType.FINGERPRINT) return 'Fingerprint';
        if (available.biometryType === BiometryType.FACE_AUTHENTICATION) return 'FaceID';
        return 'Biometric';
      } catch (e) {
        return 'Biometric';
      }
    }

    // Detect device type for UI display in Web/PWA
    const userAgent = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(userAgent)) {
      if (/iPhone1[0-9]|iPad/.test(userAgent)) {
        return 'FaceID';
      }
      return 'TouchID';
    }
    return 'Biometric';
  }
}
