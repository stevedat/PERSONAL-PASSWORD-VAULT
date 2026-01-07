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
    try {
      // Validate file
      const validation = await this.validateVaultFile(file);
      if (!validation.valid) {
        throw new Error(validation.error || 'Invalid vault file');
      }
      
      // Read and parse file
      const text = await file.text();
      const exportFile: VaultExportFile = JSON.parse(text);
      
      // Decrypt vault
      const encryptedVault: EncryptedVault = {
        data: this.base64ToArrayBuffer(exportFile.data),
        iv: this.base64ToArrayBuffer(exportFile.iv),
        salt: this.base64ToArrayBuffer(exportFile.salt)
      };
      
      const importedItems = await CryptoEngine.decrypt(encryptedVault, password);
      
      // Merge with existing items
      const preview = this.previewMerge(importedItems, existingItems);
      const mergedItems = this.applyMerge(preview);
      
      return {
        success: true,
        stats: preview.stats,
        items: mergedItems
      };
    } catch (error) {
      throw new Error(`Import failed: ${error.message}`);
    }
  }
  
  /**
   * Validate vault file format
   */
  static async validateVaultFile(file: File): Promise<ValidationResult> {
    try {
      // Check file extension
      if (!file.name.endsWith('.vault')) {
        return {
          valid: false,
          error: 'Invalid file extension. Expected .vault file'
        };
      }
      
      // Read and parse
      const text = await file.text();
      const exportFile = JSON.parse(text);
      
      // Check required fields
      if (!exportFile.app || exportFile.app !== this.APP_NAME) {
        return {
          valid: false,
          error: 'Not a valid PocketVault file'
        };
      }
      
      if (!exportFile.version || !this.SUPPORTED_VERSIONS.includes(exportFile.version)) {
        return {
          valid: false,
          error: `Unsupported version: ${exportFile.version}. Supported: ${this.SUPPORTED_VERSIONS.join(', ')}`
        };
      }
      
      if (!exportFile.data || !exportFile.iv || !exportFile.salt) {
        return {
          valid: false,
          error: 'Missing required encryption data'
        };
      }
      
      // Verify checksum if present
      if (exportFile.checksum) {
        const calculatedChecksum = await this.calculateChecksum(exportFile.data);
        if (calculatedChecksum !== exportFile.checksum) {
          return {
            valid: false,
            error: 'File integrity check failed. File may be corrupted'
          };
        }
      }
      
      return {
        valid: true,
        format: 'standard',
        version: exportFile.version
      };
    } catch (error) {
      return {
        valid: false,
        error: `File validation failed: ${error.message}`
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
