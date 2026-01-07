export type CategoryType = 'email' | 'banking' | 'app' | 'website' | 'work' | 'games' | 'other';

export interface VaultItem {
  id: string;
  title: string;
  username: string;
  password: string;
  note?: string;
  category?: CategoryType;
}

export interface EncryptedVault {
  data: ArrayBuffer;
  iv: ArrayBuffer;
  salt: ArrayBuffer;
}

const PBKDF2_ITERATIONS = 600000;
const KEY_LENGTH = 256;

export class CryptoEngine {
  private static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const importedKey = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: PBKDF2_ITERATIONS,
        hash: 'SHA-256'
      },
      importedKey,
      {
        name: 'AES-GCM',
        length: KEY_LENGTH
      },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  static async encrypt(data: VaultItem[], masterPassword: string): Promise<EncryptedVault> {
    const salt = crypto.getRandomValues(new Uint8Array(32));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    const key = await this.deriveKey(masterPassword, salt);
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(JSON.stringify(data));
    
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      dataBuffer
    );
    
    return {
      data: encryptedData,
      iv: iv.buffer,
      salt: salt.buffer
    };
  }
  
  static async decrypt(encryptedVault: EncryptedVault, masterPassword: string): Promise<VaultItem[]> {
    const salt = new Uint8Array(encryptedVault.salt);
    const iv = new Uint8Array(encryptedVault.iv);
    
    const key = await this.deriveKey(masterPassword, salt);
    
    try {
      const decryptedData = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv
        },
        key,
        encryptedVault.data
      );
      
      const decoder = new TextDecoder();
      const jsonString = decoder.decode(decryptedData);
      return JSON.parse(jsonString);
    } catch (error) {
      if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error('Dữ liệu vault bị hỏng hoặc không hợp lệ');
      }
      throw new Error('Mật khẩu chính không đúng hoặc dữ liệu bị hỏng');
    }
  }
  
  static generateId(): string {
    return crypto.randomUUID();
  }
}