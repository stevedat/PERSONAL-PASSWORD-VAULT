#!/bin/bash

# ==========================================
# Consolidated Agent Scripts
# ==========================================

show_help() {
    echo "Usage: ./agent_tools.sh [command]"
    echo ""
    echo "Commands:"
    echo "  fix-syntax    Run sed commands to fix syntax (legacy)"
    echo "  fix-types     Run Node.js script to fix types (legacy)"
    echo "  test-native   Run native test menu (iOS/Android)"
    echo "  help          Show this help message"
}

case "$1" in
    "fix-syntax")
        echo "Running fix-syntax..."
        sed -i '' -e '/console\.log(/,/}/d' src/lib/auto-backup.ts
        sed -i '' -e '/console\.log(/,/}/d' src/lib/backup.ts
        sed -i '' -e '/console\.log(/,/}/d' src/lib/restore.ts
        sed -i '' -e '/console\.log(/,/}/d' src/routes/+page.svelte
        ;;
    "fix-types")
        echo "Running fix-types..."
        node -e "
const fs = require('fs');

function patch(filePath, matchStr, replaceStr) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(matchStr, replaceStr);
    fs.writeFileSync(filePath, content);
    console.log('Patched ' + filePath);
  } catch (e) {
    console.log('Skipped ' + filePath + ' (not found)');
  }
}

// src/lib/auto-backup.ts
patch('src/lib/auto-backup.ts', 'let exportFile: any;', 'let exportFile: VaultExportFile;');

// src/lib/biometric.js
patch('src/lib/biometric.js', 'async isSupported()', '/**\n   * @returns {Promise<boolean>}\n   */\n  async isSupported()');
patch('src/lib/biometric.js', 'async authenticate(reason)', '/**\n   * @param {string} reason\n   * @returns {Promise<boolean>}\n   */\n  async authenticate(reason)');

// src/lib/components/UpdateNotification.svelte
patch('src/lib/components/UpdateNotification.svelte', 'function dismiss() {', '/**\n   * @returns {void}\n   */\n  function dismiss() {');

// src/lib/restore.ts
patch('src/lib/restore.ts', 'let exportFile: any;', 'let exportFile: VaultExportFile;');

// src/routes/+page.svelte
patch('src/routes/+page.svelte', 'async function downloadVaultFile(blob, filename)', '/**\n   * @param {Blob} blob\n   * @param {string} filename\n   */\n  async function downloadVaultFile(blob, filename)');
patch('src/routes/+page.svelte', 'function loadBmc(node)', '/**\n   * @param {HTMLElement} node\n   */\n  function loadBmc(node)');
"
        ;;
    "test-native")
        # PocketVault Native App Test Script
        # Quick testing for iOS and Android
        set -e

        echo "🚀 PocketVault Native App Test Script"
        echo "======================================"
        echo ""

        # Colors
        GREEN='\033[0;32m'
        BLUE='\033[0;34m'
        YELLOW='\033[1;33m'
        NC='\033[0m' # No Color

        print_step() {
            echo -e "${BLUE}▶ $1${NC}"
        }

        print_success() {
            echo -e "${GREEN}✓ $1${NC}"
        }

        print_warning() {
            echo -e "${YELLOW}⚠ $1${NC}"
        }

        if [[ "$OSTYPE" == "darwin"* ]]; then
            HAS_MACOS=true
        else
            HAS_MACOS=false
        fi

        echo "Select platform to test:"
        echo "1) iOS (requires macOS)"
        echo "2) Android"
        echo "3) Both"
        echo "4) Check setup (cap doctor)"
        echo "5) Exit"
        echo ""
        read -p "Enter choice [1-5]: " choice

        case $choice in
            1)
                if [ "$HAS_MACOS" = false ]; then
                    print_warning "iOS development requires macOS"
                    exit 1
                fi
                
                print_step "Building web assets..."
                npm run build
                print_success "Build complete"
                
                print_step "Syncing to iOS..."
                npx cap sync ios
                print_success "Sync complete"
                
                print_step "Opening Xcode..."
                npx cap open ios
                print_success "Xcode opened. Press Play to run!"
                ;;
                
            2)
                print_step "Building web assets..."
                npm run build
                print_success "Build complete"
                
                print_step "Syncing to Android..."
                npx cap sync android
                print_success "Sync complete"
                
                print_step "Opening Android Studio..."
                npx cap open android
                print_success "Android Studio opened. Press Run to test!"
                ;;
                
            3)
                if [ "$HAS_MACOS" = false ]; then
                    print_warning "iOS development requires macOS. Will only test Android."
                fi
                
                print_step "Building web assets..."
                npm run build
                print_success "Build complete"
                
                print_step "Syncing to all platforms..."
                npx cap sync
                print_success "Sync complete"
                
                if [ "$HAS_MACOS" = true ]; then
                    print_step "Opening Xcode..."
                    npx cap open ios &
                    sleep 2
                fi
                
                print_step "Opening Android Studio..."
                npx cap open android
                print_success "Both IDEs opened!"
                ;;
                
            4)
                print_step "Running Capacitor Doctor..."
                npx cap doctor
                ;;
                
            5)
                echo "Goodbye!"
                exit 0
                ;;
                
            *)
                print_warning "Invalid choice"
                exit 1
                ;;
        esac

        echo ""
        print_success "Done! 🎉"
        ;;
    *)
        show_help
        ;;
esac
