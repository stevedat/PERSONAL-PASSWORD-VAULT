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
    console.log('[RestoreManager] Starting import...', {
      fileName: file.name,
      fileSize: file.size,
      existingItemCount: existingItems.length
    });
    
    try {
      // Validate file
      console.log('[RestoreManager] Validating file...');
      const validation = await this.validateVaultFile(file);
      if (!validation.valid) {
        console.error('[RestoreManager] Validation failed:', validation.error);
        throw new Error(validation.error || 'Invalid vault file');
      }
      console.log('[RestoreManager] File validation passed');
      
      // Read and parse file
      const text = await file.text();
      const exportFile: VaultExportFile = JSON.parse(text);
      
      console.log('[RestoreManager] Parsed file:', {
        version: exportFile.version,
        platform: exportFile.platform,
        itemCount: exportFile.itemCount,
        created: exportFile.created
      });
      
      // Decrypt vault
      console.log('[RestoreManager] Decrypting vault...');
      const encryptedVault: EncryptedVault = {
        data: this.base64ToArrayBuffer(exportFile.data),
        iv: this.base64ToArrayBuffer(exportFile.iv),
        salt: this.base64ToArrayBuffer(exportFile.salt)
      };
      
      const importedItems = await CryptoEngine.decrypt(encryptedVault, password);
      console.log('[RestoreManager] Decryption complete, items:', importedItems.length);
      
      // Merge with existing items
      console.log('[RestoreManager] Merging vaults...');
      const preview = this.previewMerge(importedItems, existingItems);
      console.log('[RestoreManager] Merge preview:', preview.stats);
      
      const mergedItems = this.applyMerge(preview);
      console.log('[RestoreManager] Merge complete, total items:', mergedItems.length);
      
      return {
        success: true,
        stats: preview.stats,
        items: mergedItems
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[RestoreManager] Import failed:', error);
      throw new Error(`Import failed: ${errorMessage}`);
    }
  }
  
  /**
   * Validate vault file format
   */
  static async validateVaultFile(file: File): Promise<ValidationResult> {
    console.log('[RestoreManager] Validating file:', file.name);
    
    try {
      // Check file extension
      if (!file.name.endsWith('.vault')) {
        console.error('[RestoreManager] Invalid file extension:', file.name);
        return {
          valid: false,
          error: 'Invalid file extension. Expected .vault file'
        };
      }
      
      // Read and parse
      const text = await file.text();
      const exportFile = JSON.parse(text);
      
      console.log('[RestoreManager] File parsed successfully');
      
      // Check required fields
      if (!exportFile.app || exportFile.app !== this.APP_NAME) {
        console.error('[RestoreManager] Invalid app name:', exportFile.app);
        return {
          valid: false,
          error: 'Not a valid PocketVault file'
        };
      }
      
      if (!exportFile.version || !this.SUPPORTED_VERSIONS.includes(exportFile.version)) {
        console.error('[RestoreManager] Unsupported version:', exportFile.version);
        return {
          valid: false,
          error: `Unsupported version: ${exportFile.version}. Supported: ${this.SUPPORTED_VERSIONS.join(', ')}`
        };
      }
      
      if (!exportFile.data || !exportFile.iv || !exportFile.salt) {
        console.error('[RestoreManager] Missing encryption data');
        return {
          valid: false,
          error: 'Missing required encryption data'
        };
      }
      
      // Verify checksum if present
      if (exportFile.checksum) {
        console.log('[RestoreManager] Verifying checksum...');
        const calculatedChecksum = await this.calculateChecksum(exportFile.data);
        if (calculatedChecksum !== exportFile.checksum) {
          console.error('[RestoreManager] Checksum mismatch');
          return {
            valid: false,
            error: 'File integrity check failed. File may be corrupted'
          };
        }
        console.log('[RestoreManager] Checksum verified');
      }
      
      console.log('[RestoreManager] Validation successful');
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
