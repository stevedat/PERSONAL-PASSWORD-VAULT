import type { VaultItem, EncryptedVault } from './crypto';
import { CryptoEngine } from './crypto';
import type { VaultExportFile } from './backup';

export interface ImportResult {
  success: boolean;
  stats: MergeStats;
  items: VaultItem[];
}

export interface MergePreview {
  newItems: VaultItem[];
  updatedItems: VaultItem[];
  unchangedItems: VaultItem[];
  stats: MergeStats;
}

export interface MergeStats {
  newCount: number;
  updatedCount: number;
  unchangedCount: number;
  totalCount: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  format?: string;
  version?: number;
}

export class RestoreManager {
  private static readonly APP_NAME = 'PocketVault';
  private static readonly SUPPORTED_VERSIONS = [1];
  
  /**
   * Import vault from file
   */
  static async importVault(
    file: File,
    password: string,
    existingItems: VaultItem[] = []
  ): Promise<ImportResult> {
    if (import.meta.env.DEV) {
      console.log('[RestoreManager] Starting import...', {
        fileName: file.name,
        fileSize: file.size,
        existingItemCount: existingItems.length
      });
    }
    
    try {
      // Validate file
      if (import.meta.env.DEV) console.log('[RestoreManager] Validating file...');
      const validation = await this.validateVaultFile(file);
      if (!validation.valid) {
        console.error('[RestoreManager] Validation failed:', validation.error);
        throw new Error(validation.error || 'Invalid vault file');
      }
      if (import.meta.env.DEV) console.log('[RestoreManager] File validation passed');
      
      // Read and parse file
      const text = await file.text();
      if (!text || text.trim().length === 0) {
        throw new Error('File is empty');
      }
      
      let exportFile: VaultExportFile;
      try {
        exportFile = JSON.parse(text);
      } catch (parseError) {
        console.error('[RestoreManager] JSON parse error:', parseError);
        throw new Error('Invalid JSON format in vault file');
      }
      
      if (import.meta.env.DEV) {
        console.log('[RestoreManager] Parsed file:', {
          version: exportFile.version,
          platform: exportFile.platform,
          itemCount: exportFile.itemCount,
          created: exportFile.created
        });
      }
      
      // Validate parsed data
      if (!exportFile.data || !exportFile.iv || !exportFile.salt) {
        throw new Error('Missing encryption data in vault file');
      }
      
      // Decrypt vault
      if (import.meta.env.DEV) console.log('[RestoreManager] Decrypting vault...');
      let encryptedVault: EncryptedVault;
      try {
        encryptedVault = {
          data: this.base64ToArrayBuffer(exportFile.data),
          iv: this.base64ToArrayBuffer(exportFile.iv),
          salt: this.base64ToArrayBuffer(exportFile.salt)
        };
      } catch (decodeError) {
        console.error('[RestoreManager] Base64 decode error:', decodeError);
        throw new Error('Invalid encryption data format');
      }
      
      let importedItems: VaultItem[];
      try {
        importedItems = await CryptoEngine.decrypt(encryptedVault, password);
      } catch (decryptError) {
        console.error('[RestoreManager] Decryption error:', decryptError);
        throw new Error('Wrong password or corrupted vault file');
      }
      
      if (!Array.isArray(importedItems)) {
        throw new Error('Invalid vault data structure');
      }
      
      if (import.meta.env.DEV) console.log('[RestoreManager] Decryption complete, items:', importedItems.length);
      
      // Validate imported items
      for (const item of importedItems) {
        if (!item.id || !item.title) {
          throw new Error('Invalid item structure in vault');
        }
      }
      
      // Merge with existing items
      if (import.meta.env.DEV) console.log('[RestoreManager] Merging vaults...');
      const preview = this.previewMerge(importedItems, existingItems);
      if (import.meta.env.DEV) console.log('[RestoreManager] Merge preview:', preview.stats);
      
      const mergedItems = this.applyMerge(preview);
      if (import.meta.env.DEV) console.log('[RestoreManager] Merge complete, total items:', mergedItems.length);
      
      return {
        success: true,
        stats: preview.stats,
        items: mergedItems
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[RestoreManager] Import failed:', error);
      throw new Error(errorMessage);
    }
  }
  
  /**
   * Validate vault file format
   */
  static async validateVaultFile(file: File): Promise<ValidationResult> {
    if (import.meta.env.DEV) console.log('[RestoreManager] Validating file:', file.name);
    
    try {
      // Check file size
      if (file.size === 0) {
        return {
          valid: false,
          error: 'File is empty'
        };
      }
      
      if (file.size > 10 * 1024 * 1024) {
        return {
          valid: false,
          error: 'File too large (max 10MB)'
        };
      }
      
      // Check file extension
      if (!file.name.endsWith('.vault')) {
        if (import.meta.env.DEV) console.error('[RestoreManager] Invalid file extension:', file.name);
        return {
          valid: false,
          error: 'Invalid file extension. Expected .vault file'
        };
      }
      
      // Read and parse
      let text: string;
      try {
        text = await file.text();
      } catch (readError) {
        console.error('[RestoreManager] File read error:', readError);
        return {
          valid: false,
          error: 'Cannot read file'
        };
      }
      
      if (!text || text.trim().length === 0) {
        return {
          valid: false,
          error: 'File is empty'
        };
      }
      
      let exportFile: any;
      try {
        exportFile = JSON.parse(text);
      } catch (parseError) {
        console.error('[RestoreManager] JSON parse error:', parseError);
        return {
          valid: false,
          error: 'Invalid JSON format'
        };
      }
      
      if (import.meta.env.DEV) console.log('[RestoreManager] File parsed successfully');
      
      // Check required fields
      if (!exportFile.app || exportFile.app !== this.APP_NAME) {
        if (import.meta.env.DEV) console.error('[RestoreManager] Invalid app name:', exportFile.app);
        return {
          valid: false,
          error: 'Not a valid PocketVault file'
        };
      }
      
      if (!exportFile.version || !this.SUPPORTED_VERSIONS.includes(exportFile.version)) {
        if (import.meta.env.DEV) console.error('[RestoreManager] Unsupported version:', exportFile.version);
        return {
          valid: false,
          error: `Unsupported version: ${exportFile.version}. Supported: ${this.SUPPORTED_VERSIONS.join(', ')}`
        };
      }
      
      if (!exportFile.data || typeof exportFile.data !== 'string') {
        if (import.meta.env.DEV) console.error('[RestoreManager] Missing or invalid data field');
        return {
          valid: false,
          error: 'Missing or invalid encryption data'
        };
      }
      
      if (!exportFile.iv || typeof exportFile.iv !== 'string') {
        if (import.meta.env.DEV) console.error('[RestoreManager] Missing or invalid IV');
        return {
          valid: false,
          error: 'Missing or invalid encryption IV'
        };
      }
      
      if (!exportFile.salt || typeof exportFile.salt !== 'string') {
        if (import.meta.env.DEV) console.error('[RestoreManager] Missing or invalid salt');
        return {
          valid: false,
          error: 'Missing or invalid encryption salt'
        };
      }
      
      // Verify checksum if present
      if (exportFile.checksum) {
        if (import.meta.env.DEV) console.log('[RestoreManager] Verifying checksum...');
        try {
          const calculatedChecksum = await this.calculateChecksum(exportFile.data);
          if (calculatedChecksum !== exportFile.checksum) {
            if (import.meta.env.DEV) console.error('[RestoreManager] Checksum mismatch');
            return {
              valid: false,
              error: 'File integrity check failed. File may be corrupted'
            };
          }
          if (import.meta.env.DEV) console.log('[RestoreManager] Checksum verified');
        } catch (checksumError) {
          console.error('[RestoreManager] Checksum calculation error:', checksumError);
          return {
            valid: false,
            error: 'Cannot verify file integrity'
          };
        }
      }
      
      if (import.meta.env.DEV) console.log('[RestoreManager] Validation successful');
      return {
        valid: true,
        format: 'standard',
        version: exportFile.version
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[RestoreManager] Validation error:', error);
      return {
        valid: false,
        error: `File validation failed: ${errorMessage}`
      };
    }
  }
  
  /**
   * Preview merge before applying
   */
  static previewMerge(
    imported: VaultItem[],
    existing: VaultItem[]
  ): MergePreview {
    const newItems: VaultItem[] = [];
    const updatedItems: VaultItem[] = [];
    const unchangedItems: VaultItem[] = [];
    
    // Create ID map for existing items
    const existingMap = new Map<string, VaultItem>();
    existing.forEach(item => existingMap.set(item.id, item));
    
    // Process imported items
    for (const item of imported) {
      if (existingMap.has(item.id)) {
        // Item exists - will be updated
        updatedItems.push(item);
        existingMap.delete(item.id);
      } else {
        // New item
        newItems.push(item);
      }
    }
    
    // Remaining items in existingMap are unchanged
    existingMap.forEach(item => unchangedItems.push(item));
    
    const stats: MergeStats = {
      newCount: newItems.length,
      updatedCount: updatedItems.length,
      unchangedCount: unchangedItems.length,
      totalCount: newItems.length + updatedItems.length + unchangedItems.length
    };
    
    return {
      newItems,
      updatedItems,
      unchangedItems,
      stats
    };
  }
  
  /**
   * Apply merge and return combined items
   */
  static applyMerge(preview: MergePreview): VaultItem[] {
    return [
      ...preview.newItems,
      ...preview.updatedItems,
      ...preview.unchangedItems
    ];
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
