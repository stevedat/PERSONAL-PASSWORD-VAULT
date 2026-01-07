# Design Document: Enhanced Backup & Restore

## Overview

This design implements a comprehensive backup and restore system for PocketVault that maintains zero-trust security while providing enterprise-grade data protection. The system enables users to safely backup their encrypted vaults to any storage location (personal cloud, USB, email) without compromising security.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PocketVault App                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Backup     │  │   Restore    │  │   Reminder   │      │
│  │   Manager    │  │   Manager    │  │   System     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │  Storage Engine │                        │
│                   │  (existing)     │                        │
│                   └────────┬────────┘                        │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐             │
│         │                  │                  │             │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐     │
│  │   Export     │  │   Import     │  │ Auto-Backup  │     │
│  │   Service    │  │   Service    │  │   Service    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │             │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          │                  │                  │
    ┌─────▼─────┐      ┌────▼────┐      ┌─────▼─────┐
    │  Browser  │      │  File   │      │ IndexedDB │
    │  File API │      │  Reader │      │  (local)  │
    └───────────┘      └─────────┘      └───────────┘
          │                  │                  
          │                  │                  
    ┌─────▼──────────────────▼─────┐           
    │  User's Storage Choice       │           
    │  (iCloud, Drive, USB, etc.)  │           
    └──────────────────────────────┘           
```

### Component Breakdown

#### 1. Backup Manager
**Responsibility**: Orchestrate export operations

**Key Methods**:
- `exportVault(options)`: Main export function
- `generateFileName()`: Create timestamped filename
- `triggerDownload(blob, filename)`: Trigger browser download
- `showExportSuccess(location)`: Display success feedback

#### 2. Restore Manager
**Responsibility**: Orchestrate import operations

**Key Methods**:
- `importVault(file)`: Main import function
- `validateVaultFile(file)`: Check file format
- `mergeVaults(existing, imported)`: Smart merge logic
- `showMergePreview(stats)`: Display merge statistics

#### 3. Reminder System
**Responsibility**: Track backup status and show reminders

**Key Methods**:
- `checkReminderConditions()`: Evaluate if reminder needed
- `showReminder(type)`: Display appropriate reminder
- `dismissReminder(option)`: Handle user dismissal
- `resetCounters()`: Reset after successful backup

#### 4. Export Service
**Responsibility**: Handle all export formats

**Key Methods**:
- `exportStandard(vault, password)`: Standard .vault export
- `exportQR(vault, password)`: QR code split export
- `exportJSON(vault, password)`: JSON format export
- `addMetadata(data)`: Add version/timestamp metadata

#### 5. Import Service
**Responsibility**: Handle all import formats

**Key Methods**:
- `importStandard(file, password)`: Import .vault file
- `importQR(qrParts, password)`: Reconstruct from QR codes
- `importJSON(file, password)`: Import JSON format
- `validateFormat(file)`: Check file format validity

#### 6. Auto-Backup Service
**Responsibility**: Manage automatic local backups

**Key Methods**:
- `createAutoBackup(vault)`: Create backup in IndexedDB
- `rotateBackups()`: Keep only last 3 backups
- `listAutoBackups()`: Get available backups
- `restoreFromAutoBackup(id)`: Restore specific backup

## Components and Interfaces

### BackupManager Interface

```typescript
interface BackupManager {
  // Export operations
  exportVault(options: ExportOptions): Promise<ExportResult>;
  quickExport(): Promise<void>;
  
  // Verification
  verifyBackup(file: File): Promise<VerificationResult>;
  
  // Settings
  getExportSettings(): ExportSettings;
  updateExportSettings(settings: Partial<ExportSettings>): void;
}

interface ExportOptions {
  format: 'standard' | 'qr' | 'json';
  includeMetadata: boolean;
  testAfterExport: boolean;
}

interface ExportResult {
  success: boolean;
  filename: string;
  size: number;
  timestamp: Date;
  location?: string;
}

interface VerificationResult {
  valid: boolean;
  error?: string;
  itemCount?: number;
  version?: number;
}

interface ExportSettings {
  defaultFormat: 'standard' | 'qr' | 'json';
  autoVerify: boolean;
  showSecurityTips: boolean;
  advancedMode: boolean;
}
```

### RestoreManager Interface

```typescript
interface RestoreManager {
  // Import operations
  importVault(file: File, password: string): Promise<ImportResult>;
  
  // Merge operations
  previewMerge(imported: VaultItem[], existing: VaultItem[]): MergePreview;
  applyMerge(preview: MergePreview): Promise<void>;
  cancelMerge(): void;
  
  // Validation
  validateVaultFile(file: File): Promise<ValidationResult>;
}

interface ImportResult {
  success: boolean;
  stats: MergeStats;
  items: VaultItem[];
}

interface MergePreview {
  newItems: VaultItem[];
  updatedItems: VaultItem[];
  unchangedItems: VaultItem[];
  stats: MergeStats;
}

interface MergeStats {
  newCount: number;
  updatedCount: number;
  unchangedCount: number;
  totalCount: number;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  format?: string;
  version?: number;
}
```

### ReminderSystem Interface

```typescript
interface ReminderSystem {
  // Check conditions
  shouldShowReminder(): ReminderType | null;
  
  // Display reminders
  showReminder(type: ReminderType): void;
  dismissReminder(option: DismissOption): void;
  
  // State management
  recordBackup(): void;
  recordPasswordAdd(): void;
  getStats(): ReminderStats;
}

type ReminderType = 'password-count' | 'time-based' | 'first-time';
type DismissOption = 'later' | 'never' | 'done';

interface ReminderStats {
  passwordsSinceBackup: number;
  daysSinceBackup: number;
  lastBackupDate: Date | null;
  remindersDismissed: number;
}

interface ReminderPreferences {
  enabled: boolean;
  passwordThreshold: number;
  dayThreshold: number;
  neverShow: boolean;
}
```

### AutoBackupService Interface

```typescript
interface AutoBackupService {
  // Backup operations
  createBackup(vault: VaultItem[]): Promise<void>;
  listBackups(): Promise<AutoBackup[]>;
  restoreBackup(id: string): Promise<VaultItem[]>;
  deleteBackup(id: string): Promise<void>;
  
  // Configuration
  getConfig(): AutoBackupConfig;
  updateConfig(config: Partial<AutoBackupConfig>): void;
}

interface AutoBackup {
  id: string;
  timestamp: Date;
  itemCount: number;
  size: number;
}

interface AutoBackupConfig {
  enabled: boolean;
  maxBackups: number;
  autoRotate: boolean;
}
```

## Data Models

### Export File Format

```typescript
interface VaultExportFile {
  // Metadata (encrypted)
  version: number;
  app: string;
  created: string; // ISO timestamp
  platform: string; // 'ios' | 'android' | 'desktop'
  itemCount: number;
  
  // Encrypted data
  data: string; // base64 encoded encrypted vault
  iv: string; // base64 encoded IV
  salt: string; // base64 encoded salt
  
  // Integrity
  checksum: string; // SHA-256 of encrypted data
}
```

### QR Code Format

```typescript
interface QRCodePart {
  // Part metadata
  partNumber: number;
  totalParts: number;
  
  // Data chunk
  chunk: string; // base64 encoded chunk
  
  // Integrity
  chunkHash: string; // SHA-256 of chunk
  fullHash: string; // SHA-256 of complete data (same across all parts)
}
```

### Auto-Backup Format

```typescript
interface AutoBackupEntry {
  id: string; // UUID
  timestamp: number; // Unix timestamp
  vault: EncryptedVault; // Same format as main vault
  itemCount: number;
  size: number;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Export filename format consistency
*For any* export operation, the generated filename should match the pattern `pocketvault-backup-YYYY-MM-DD.vault` where YYYY-MM-DD is a valid date.
**Validates: Requirements 1.5**

### Property 2: Export encryption integrity
*For any* exported vault file, decrypting with the correct master password should yield the exact same vault items that were exported.
**Validates: Requirements 1.1, 5.5**

### Property 3: No plaintext in exports
*For any* export file, reading the raw file content should not reveal any plaintext passwords, usernames, or titles.
**Validates: Requirements 5.6**

### Property 4: Metadata presence
*For any* exported vault file, the file should contain version, app name, and creation timestamp in the encrypted metadata.
**Validates: Requirements 1.6**

### Property 5: Reminder counter accuracy
*For any* sequence of password additions, if 5 or more passwords are added without backup, the reminder system should trigger.
**Validates: Requirements 2.1**

### Property 6: Reminder time-based trigger
*For any* vault state, if 30 days have passed since last backup, the reminder should trigger on next unlock.
**Validates: Requirements 2.2**

### Property 7: Reminder session deduplication
*For any* session, the reminder should not appear more than once regardless of how many times conditions are met.
**Validates: Requirements 2.6**

### Property 8: Reminder counter reset
*For any* successful export operation, the password counter and last backup timestamp should be reset.
**Validates: Requirements 2.5**

### Property 9: Import file validation
*For any* file, the validation function should correctly identify whether it's a valid PocketVault file format.
**Validates: Requirements 3.3**

### Property 10: Merge statistics accuracy
*For any* merge operation, the sum of new + updated + unchanged counts should equal the total number of unique items across both vaults.
**Validates: Requirements 3.7**

### Property 11: Merge ID-based comparison
*For any* two vaults being merged, items with the same ID should be considered the same item.
**Validates: Requirements 4.1**

### Property 12: Merge conflict resolution
*For any* item that exists in both vaults (same ID), the imported version should be used in the merged result.
**Validates: Requirements 4.2**

### Property 13: Merge preserves new items
*For any* item that only exists in the imported vault, it should be added to the merged result.
**Validates: Requirements 4.3**

### Property 14: Merge preserves local items
*For any* item that only exists in the local vault, it should be kept in the merged result.
**Validates: Requirements 4.4**

### Property 15: Merge re-encryption
*For any* completed merge, the resulting vault should be encrypted with the current master password, not the import file's password.
**Validates: Requirements 4.7**

### Property 16: Export always encrypted
*For any* export format (standard, QR, JSON), the output should be encrypted with the current master password.
**Validates: Requirements 5.5**

### Property 17: Checksum integrity
*For any* exported file, the included checksum should match the SHA-256 hash of the encrypted data.
**Validates: Requirements 5.7**

### Property 18: Verification non-destructive
*For any* backup verification operation, the vault state before and after verification should be identical.
**Validates: Requirements 6.5**

### Property 19: Verification performance
*For any* vault of reasonable size (<1000 items), verification should complete in under 1 second.
**Validates: Requirements 6.6**

### Property 20: QR code chunking
*For any* vault exported as QR codes, the number of QR codes generated should be between 2 and 4 based on vault size.
**Validates: Requirements 7.2**

### Property 21: QR reconstruction completeness
*For any* QR code export, all parts must be present to successfully reconstruct the vault.
**Validates: Requirements 7.3**

### Property 22: QR part numbering
*For any* QR code part, the metadata should include correct part number (X/N) where X is the part index and N is total parts.
**Validates: Requirements 7.4**

### Property 23: Auto-backup creation
*For any* vault modification, an auto-backup should be created in IndexedDB.
**Validates: Requirements 8.1**

### Property 24: Auto-backup rotation
*For any* auto-backup system state, only the last 3 backups should be kept, with older ones automatically removed.
**Validates: Requirements 8.2, 8.3**

### Property 25: Auto-backup encryption
*For any* auto-backup, it should be encrypted with the same master password as the main vault.
**Validates: Requirements 8.7**

### Property 26: Cross-platform compatibility
*For any* vault exported on one platform (iOS/Android/Desktop), it should be importable and decryptable on any other platform.
**Validates: Requirements 9.1, 9.2, 9.3, 9.4**

### Property 27: Platform metadata optional
*For any* import operation, the platform metadata should be informational only and not required for successful import.
**Validates: Requirements 9.5**

## Error Handling

### Export Errors

| Error Condition | Error Message | Recovery Action |
|----------------|---------------|-----------------|
| No master password in session | "Master password required" | Prompt for password |
| Encryption fails | "Failed to encrypt vault" | Retry with fresh crypto engine |
| File save cancelled | "Export cancelled" | No action needed |
| Insufficient storage | "Not enough storage space" | Suggest cleanup or different location |

### Import Errors

| Error Condition | Error Message | Recovery Action |
|----------------|---------------|-----------------|
| Invalid file format | "Not a valid PocketVault file" | Show file format requirements |
| Wrong password | "Incorrect master password" | Allow retry with different password |
| Corrupted file | "File is corrupted or incomplete" | Suggest using different backup |
| Version mismatch | "Backup from older/newer version" | Show compatibility warning |
| Merge conflict | "Unable to merge vaults" | Show detailed conflict information |

### Reminder Errors

| Error Condition | Error Message | Recovery Action |
|----------------|---------------|-----------------|
| Storage quota exceeded | "Cannot save preferences" | Clear old data |
| Invalid preference value | "Invalid setting" | Reset to defaults |

### Auto-Backup Errors

| Error Condition | Error Message | Recovery Action |
|----------------|---------------|-----------------|
| IndexedDB unavailable | "Auto-backup unavailable" | Disable auto-backup feature |
| Backup creation fails | "Failed to create backup" | Retry on next modification |
| Restore fails | "Cannot restore backup" | Try different backup |

## Testing Strategy

### Unit Tests

**Export Service Tests**:
- Test filename generation with various dates
- Test metadata inclusion
- Test encryption with different passwords
- Test file format structure
- Test checksum calculation

**Import Service Tests**:
- Test file validation with valid/invalid files
- Test decryption with correct/incorrect passwords
- Test format detection
- Test error handling for corrupted files

**Merge Logic Tests**:
- Test merge with no conflicts
- Test merge with ID conflicts
- Test merge with new items only
- Test merge with local items only
- Test merge statistics calculation

**Reminder System Tests**:
- Test counter increments
- Test time-based triggers
- Test session deduplication
- Test preference persistence
- Test counter reset on backup

**Auto-Backup Tests**:
- Test backup creation
- Test rotation logic
- Test restore functionality
- Test encryption consistency

### Property-Based Tests

All 27 correctness properties should be implemented as property-based tests with minimum 100 iterations each. Each test should:

1. Generate random vault data
2. Execute the operation
3. Verify the property holds
4. Tag with: `Feature: enhanced-backup-restore, Property X: [property text]`

### Integration Tests

**End-to-End Export Flow**:
1. Create vault with test data
2. Export vault
3. Verify file is created
4. Verify file can be decrypted
5. Verify data matches original

**End-to-End Import Flow**:
1. Create test vault file
2. Import file
3. Verify merge preview is shown
4. Apply merge
5. Verify vault contains expected items

**End-to-End Reminder Flow**:
1. Add passwords without backup
2. Verify reminder appears
3. Dismiss reminder
4. Verify preference is saved
5. Export vault
6. Verify counter is reset

**End-to-End Auto-Backup Flow**:
1. Modify vault
2. Verify auto-backup is created
3. Create multiple backups
4. Verify rotation occurs
5. Restore from backup
6. Verify data is correct

### Performance Tests

- Export 1000 items: < 2 seconds
- Import 1000 items: < 3 seconds
- Verification: < 1 second
- QR generation: < 5 seconds
- Auto-backup creation: < 500ms

## Security Considerations

### Encryption
- All exports use AES-256-GCM
- PBKDF2 with 600,000 iterations for key derivation
- Unique IV for each export
- Unique salt for each export

### Data Protection
- Master password never stored in export files
- No plaintext data in any export format
- Checksums prevent tampering
- Auto-backups encrypted with same security

### Privacy
- No telemetry or tracking
- No cloud sync (user chooses storage)
- Platform metadata is minimal and optional
- No external API calls

### Best Practices
- Encourage multiple backup locations
- Recommend testing restore process
- Warn about master password importance
- Educate about cloud storage safety

## Implementation Notes

### Browser API Usage

**File Save (Export)**:
```typescript
// Modern browsers
const blob = new Blob([data], { type: 'application/octet-stream' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = filename;
a.click();
URL.revokeObjectURL(url);
```

**File Open (Import)**:
```typescript
// Use input[type="file"]
const input = document.createElement('input');
input.type = 'file';
input.accept = '.vault';
input.onchange = (e) => {
  const file = e.target.files[0];
  // Process file
};
input.click();
```

### QR Code Generation

Use `qrcode` library:
```typescript
import QRCode from 'qrcode';

async function generateQR(data: string): Promise<string> {
  return await QRCode.toDataURL(data, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    width: 512
  });
}
```

### IndexedDB for Auto-Backup

```typescript
const AUTO_BACKUP_STORE = 'auto-backups';

async function saveAutoBackup(backup: AutoBackupEntry): Promise<void> {
  const db = await openDB();
  const tx = db.transaction([AUTO_BACKUP_STORE], 'readwrite');
  await tx.objectStore(AUTO_BACKUP_STORE).put(backup);
}
```

### LocalStorage for Preferences

```typescript
const REMINDER_PREFS_KEY = 'pv_reminder_prefs';

function saveReminderPrefs(prefs: ReminderPreferences): void {
  localStorage.setItem(REMINDER_PREFS_KEY, JSON.stringify(prefs));
}

function loadReminderPrefs(): ReminderPreferences {
  const stored = localStorage.getItem(REMINDER_PREFS_KEY);
  return stored ? JSON.parse(stored) : defaultPrefs;
}
```

## Future Enhancements

1. **Cloud Sync Integration** (optional, user-controlled)
   - Direct integration with iCloud/Drive APIs
   - Automatic sync when enabled
   - Still maintains zero-trust (encrypted)

2. **Backup Scheduling**
   - Weekly/monthly automatic exports
   - Email backup reminders
   - Calendar integration

3. **Advanced QR Features**
   - Animated QR codes for larger vaults
   - QR code scanning from camera
   - Multi-device QR transfer

4. **Backup Analytics**
   - Backup frequency statistics
   - Storage usage tracking
   - Restore success rate

5. **Team/Family Sharing**
   - Shared vault exports
   - Multi-user merge support
   - Access control per item
