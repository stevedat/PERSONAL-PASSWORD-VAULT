import type { VaultItem, EncryptedVault } from './crypto';
import { CryptoEngine } from './crypto';

export interface ExportOptions {
  format: 'standard' | 'json';
  includeMetadata: boolean;
  testAfterExport: boolean;
}

export interface ExportResult {
  success: boolean;
  filename: string;
  size: number;
  timestamp: Date;
  location?: string;
}

export interface VerificationResult {
  valid: boolean;
  error?: string;
  itemCount?: number;
  version?: number;
}

export interface VaultExportFile {
  version: number;
  app: string;
  created: string;
  platform: string;
  itemCount: number;
  data: string;
  iv: string;
  salt: string;
  checksum: string;
}

export class BackupManager {
  private static readonly APP_NAME = 'PocketVault';
  private static readonly VERSION = 1;
  
  /**
   * Export vault with enhanced metadata and security
   */
  static async exportVault(
    items: VaultItem[],
    masterPassword: string,
    options: Partial<ExportOptions> = {}
  ): Promise<ExportResult> {
    console.log('[BackupManager] Starting export...', {
      itemCount: items.length,
      options
    });
    
    const opts: ExportOptions = {
      format: 'standard',
      includeMetadata: true,
      testAfterExport: false,
      ...options
    };
    
    try {
      // Encrypt vault
      console.log('[BackupManager] Encrypting vault...');
      const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);
      console.log('[BackupManager] Encryption complete');
      
      // Convert to base64
      const data = this.arrayBufferToBase64(encryptedVault.data);
      const iv = this.arrayBufferToBase64(encryptedVault.iv);
      const salt = this.arrayBufferToBase64(encryptedVault.salt);
      
      // Calculate checksum
      console.log('[BackupManager] Calculating checksum...');
      const checksum = await this.calculateChecksum(data);
      console.log('[BackupManager] Checksum:', checksum.substring(0, 16) + '...');
      
      // Create export file
      const exportFile: VaultExportFile = {
        version: this.VERSION,
        app: this.APP_NAME,
        created: new Date().toISOString(),
        platform: this.detectPlatform(),
        itemCount: items.length,
        data,
        iv,
        salt,
        checksum
      };
      
      console.log('[BackupManager] Export file created:', {
        version: exportFile.version,
        platform: exportFile.platform,
        itemCount: exportFile.itemCount,
        created: exportFile.created
      });
      
      // Create blob
      const blob = new Blob([JSON.stringify(exportFile, null, 2)], {
        type: 'application/json'
      });
      
      // Generate filename
      const filename = this.generateFileName();
      console.log('[BackupManager] Generated filename:', filename);
      
      // Test backup if requested
      if (opts.testAfterExport) {
        console.log('[BackupManager] Verifying backup...');
        const verification = await this.verifyBackup(blob, masterPassword);
        if (!verification.valid) {
          console.error('[BackupManager] Verification failed:', verification.error);
          throw new Error(verification.error || 'Backup verification failed');
        }
        console.log('[BackupManager] Verification successful');
      }
      
      console.log('[BackupManager] Export complete:', {
        filename,
        size: blob.size,
        sizeKB: (blob.size / 1024).toFixed(2) + 'KB'
      });
      
      return {
        success: true,
        filename,
        size: blob.size,
        timestamp: new Date()
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[BackupManager] Export failed:', error);
      throw new Error(`Export failed: ${errorMessage}`);
    }
  }
  
  /**
   * Quick export with default options
   */
  static async quickExport(
    items: VaultItem[],
    masterPassword: string
  ): Promise<Blob> {
    console.log('[BackupManager] Quick export started for', items.length, 'items');
    
    const encryptedVault = await CryptoEngine.encrypt(items, masterPassword);
    
    const data = this.arrayBufferToBase64(encryptedVault.data);
    const iv = this.arrayBufferToBase64(encryptedVault.iv);
    const salt = this.arrayBufferToBase64(encryptedVault.salt);
    const checksum = await this.calculateChecksum(data);
    
    const exportFile: VaultExportFile = {
      version: this.VERSION,
      app: this.APP_NAME,
      created: new Date().toISOString(),
      platform: this.detectPlatform(),
      itemCount: items.length,
      data,
      iv,
      salt,
      checksum
    };
    
    const blob = new Blob([JSON.stringify(exportFile, null, 2)], {
      type: 'application/json'
    });
    
    console.log('[BackupManager] Quick export complete:', blob.size, 'bytes');
    
    return blob;
  }
  
  /**
   * Verify backup file integrity
   */
  static async verifyBackup(
    file: Blob,
    masterPassword: string
  ): Promise<VerificationResult> {
    console.log('[BackupManager] Verifying backup file...');
    
    try {
      const text = await file.text();
      const exportFile: VaultExportFile = JSON.parse(text);
      
      console.log('[BackupManager] Parsed export file:', {
        app: exportFile.app,
        version: exportFile.version,
        itemCount: exportFile.itemCount,
        created: exportFile.created
      });
      
      // Validate format
      if (!exportFile.app || exportFile.app !== this.APP_NAME) {
        console.error('[BackupManager] Invalid app name:', exportFile.app);
        return {
          valid: false,
          error: 'Invalid vault file format'
        };
      }
      
      // Verify checksum
      console.log('[BackupManager] Verifying checksum...');
      const calculatedChecksum = await this.calculateChecksum(exportFile.data);
      if (calculatedChecksum !== exportFile.checksum) {
        console.error('[BackupManager] Checksum mismatch:', {
          expected: exportFile.checksum.substring(0, 16) + '...',
          calculated: calculatedChecksum.substring(0, 16) + '...'
        });
        return {
          valid: false,
          error: 'File integrity check failed (checksum mismatch)'
        };
      }
      console.log('[BackupManager] Checksum verified');
      
      // Try to decrypt
      console.log('[BackupManager] Attempting decryption...');
      const encryptedVault: EncryptedVault = {
        data: this.base64ToArrayBuffer(exportFile.data),
        iv: this.base64ToArrayBuffer(exportFile.iv),
        salt: this.base64ToArrayBuffer(exportFile.salt)
      };
      
      const items = await CryptoEngine.decrypt(encryptedVault, masterPassword);
      console.log('[BackupManager] Decryption successful, items:', items.length);
      
      return {
        valid: true,
        itemCount: items.length,
        version: exportFile.version
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[BackupManager] Verification error:', error);
      return {
        valid: false,
        error: errorMessage
      };
    }
  }
  
  /**
   * Generate timestamped filename
   */
  static generateFileName(): string {
    const date = new Date().toISOString().split('T')[0];
    return `pocketvault-backup-${date}.vault`;
  }
  
  /**
   * Trigger browser download
   */
  static triggerDownload(blob: Blob, filename: string): void {
    if (typeof window === 'undefined') return;
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
  
  /**
   * Calculate SHA-256 checksum
   */
  private static async calculateChecksum(data: string): Promise<string> {
    if (typeof window === 'undefined') return '';
    
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  /**
   * Detect platform
   */
  private static detectPlatform(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) return 'ios';
    if (/android/.test(ua)) return 'android';
    return 'desktop';
  }
  
  /**
   * Convert ArrayBuffer to base64
   */
  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  
  /**
   * Convert base64 to ArrayBuffer
   */
  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
