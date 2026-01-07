# Requirements Document: Enhanced Backup & Restore

## Introduction

PocketVault follows a zero-trust, zero-cloud architecture where users maintain complete control over their encrypted vault data. This feature enhances the backup and restore experience to ensure users never lose their passwords while maintaining absolute security and privacy.

## Glossary

- **Vault_Capsule**: An encrypted .vault file containing all password data, encrypted with AES-256-GCM
- **Master_Password**: The user's password used to derive the encryption key via PBKDF2
- **Backup_Reminder**: A non-intrusive notification suggesting users create backups
- **QR_Split**: Advanced feature to split encrypted vault into multiple QR codes for paper backup
- **Cloud_Storage**: User's personal cloud storage (iCloud, Google Drive, Dropbox, etc.)
- **Files_API**: Native browser/OS file picker for saving/loading files

## Requirements

### Requirement 1: One-Tap Vault Export

**User Story:** As a user, I want to export my encrypted vault with one tap, so that I can quickly create backups without friction.

#### Acceptance Criteria

1. WHEN a user clicks the export button, THE System SHALL generate an encrypted .vault file with timestamp
2. WHEN the file is generated, THE System SHALL trigger the native file save dialog
3. WHEN on iOS PWA, THE System SHALL integrate with Files app and suggest iCloud Drive
4. WHEN on Android, THE System SHALL integrate with Downloads folder and suggest Google Drive
5. THE System SHALL name the file as `pocketvault-backup-YYYY-MM-DD.vault`
6. THE System SHALL include metadata: version, app name, creation timestamp (encrypted)
7. WHEN export completes, THE System SHALL show success message with file location hint

### Requirement 2: Smart Backup Reminders

**User Story:** As a user, I want to be reminded to backup my vault, so that I don't forget and lose my data.

#### Acceptance Criteria

1. WHEN a user adds 5 or more passwords without backup, THE System SHALL show a gentle reminder
2. WHEN 30 days pass since last backup, THE System SHALL show a reminder on unlock
3. THE System SHALL allow users to dismiss reminders with "Remind me later" or "Don't remind again"
4. THE System SHALL store reminder preferences in local storage
5. WHEN a user exports vault, THE System SHALL reset the reminder counter
6. THE System SHALL NOT show reminders more than once per session

### Requirement 3: Seamless Import from Cloud Storage

**User Story:** As a user, I want to import my vault from my cloud storage, so that I can restore my passwords on a new device.

#### Acceptance Criteria

1. WHEN a user clicks import, THE System SHALL open native file picker
2. THE System SHALL accept .vault files from any location (iCloud, Drive, Downloads, USB)
3. WHEN a file is selected, THE System SHALL validate it's a valid PocketVault file
4. WHEN file is invalid, THE System SHALL show clear error message
5. WHEN file is valid, THE System SHALL prompt for master password
6. WHEN password is correct, THE System SHALL decrypt and merge with existing vault
7. THE System SHALL show detailed merge results: X new, Y updated, Z unchanged
8. WHEN import completes, THE System SHALL show success message

### Requirement 4: Vault Merge Strategy

**User Story:** As a user, I want to safely merge imported vaults with my existing data, so that I don't lose any passwords.

#### Acceptance Criteria

1. WHEN importing vault, THE System SHALL compare items by ID
2. WHEN item exists in both vaults, THE System SHALL use the imported version (newer)
3. WHEN item only exists in import, THE System SHALL add it
4. WHEN item only exists locally, THE System SHALL keep it
5. THE System SHALL show merge preview before applying changes
6. THE System SHALL allow user to cancel merge before saving
7. WHEN merge completes, THE System SHALL save combined vault with current master password

### Requirement 5: Export Options & Formats

**User Story:** As a user, I want multiple export options, so that I can choose the best backup method for my needs.

#### Acceptance Criteria

1. THE System SHALL provide "Quick Export" button in main menu
2. THE System SHALL provide "Export Settings" for advanced options
3. WHERE advanced mode enabled, THE System SHALL offer QR code export option
4. WHERE advanced mode enabled, THE System SHALL offer JSON export (encrypted)
5. THE System SHALL always encrypt exports with current master password
6. THE System SHALL never export plaintext data
7. THE System SHALL include integrity checksum in export metadata

### Requirement 6: Backup Verification

**User Story:** As a user, I want to verify my backup is valid, so that I know I can restore it later.

#### Acceptance Criteria

1. WHEN a user exports vault, THE System SHALL offer "Test Backup" option
2. WHEN testing backup, THE System SHALL attempt to decrypt the exported file
3. WHEN test succeeds, THE System SHALL show "✓ Backup verified successfully"
4. WHEN test fails, THE System SHALL show error and suggest re-export
5. THE System SHALL not modify any data during verification
6. THE System SHALL complete verification in under 1 second

### Requirement 7: QR Code Split (Advanced)

**User Story:** As a power user, I want to split my vault into QR codes, so that I can print paper backups.

#### Acceptance Criteria

1. WHERE QR split enabled, THE System SHALL split encrypted vault into chunks
2. THE System SHALL generate 2-4 QR codes depending on vault size
3. WHEN scanning QR codes, THE System SHALL require all parts to reconstruct
4. THE System SHALL include part numbers (1/3, 2/3, 3/3) in QR metadata
5. THE System SHALL validate all parts before attempting decrypt
6. THE System SHALL show printable page with all QR codes
7. THE System SHALL include instructions on the print page

### Requirement 8: Auto-Backup to Browser Storage

**User Story:** As a user, I want automatic local backups, so that I have a safety net if something goes wrong.

#### Acceptance Criteria

1. WHEN vault is modified, THE System SHALL create auto-backup in IndexedDB
2. THE System SHALL keep last 3 auto-backups
3. THE System SHALL rotate old backups automatically
4. WHEN vault becomes corrupted, THE System SHALL offer to restore from auto-backup
5. THE System SHALL show auto-backup timestamps in settings
6. THE System SHALL allow manual restore from any auto-backup
7. THE System SHALL encrypt auto-backups with same master password

### Requirement 9: Cross-Platform Compatibility

**User Story:** As a user, I want my backups to work across all platforms, so that I can switch devices freely.

#### Acceptance Criteria

1. THE System SHALL use platform-agnostic encryption format
2. WHEN exporting on iOS, THE System SHALL create files compatible with Android
3. WHEN exporting on Android, THE System SHALL create files compatible with iOS
4. WHEN exporting on Desktop, THE System SHALL create files compatible with mobile
5. THE System SHALL include platform metadata for debugging only
6. THE System SHALL validate compatibility on import
7. THE System SHALL show warning if importing from much older version

### Requirement 10: Backup Security Best Practices

**User Story:** As a security-conscious user, I want guidance on backup security, so that I store backups safely.

#### Acceptance Criteria

1. WHEN first export, THE System SHALL show security tips modal
2. THE System SHALL explain that cloud storage is safe (file is encrypted)
3. THE System SHALL warn against sharing master password
4. THE System SHALL suggest multiple backup locations
5. THE System SHALL recommend testing restore process
6. THE System SHALL provide "Security Guide" link in settings
7. THE System SHALL allow dismissing tips with "Don't show again"

## Non-Functional Requirements

### Performance
- Export operation SHALL complete in under 2 seconds for vaults up to 1000 items
- Import operation SHALL complete in under 3 seconds for vaults up to 1000 items
- QR code generation SHALL complete in under 5 seconds

### Security
- All exports SHALL use AES-256-GCM encryption
- All exports SHALL use PBKDF2 with 600,000 iterations
- No plaintext data SHALL ever be written to disk
- Master password SHALL never be stored in export files

### Usability
- Export flow SHALL require maximum 2 taps
- Import flow SHALL require maximum 3 taps
- Error messages SHALL be clear and actionable
- Success messages SHALL confirm file location

### Compatibility
- SHALL work on iOS 14+ Safari PWA
- SHALL work on Android 10+ Chrome PWA
- SHALL work on Desktop Chrome/Firefox/Safari
- SHALL support all major cloud storage providers via Files API
