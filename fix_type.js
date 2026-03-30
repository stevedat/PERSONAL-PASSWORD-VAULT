const fs = require('fs');

function patch(filePath, matchStr, replaceStr) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(matchStr, replaceStr);
  fs.writeFileSync(filePath, content);
}

// src/lib/auto-backup.ts
patch('src/lib/auto-backup.ts', 'let exportFile: any;', 'let exportFile: VaultExportFile;');

// src/lib/biometric.js
// Ignore this file or add JSDoc
patch('src/lib/biometric.js', 'async isSupported()', '/**\n   * @returns {Promise<boolean>}\n   */\n  async isSupported()');
patch('src/lib/biometric.js', 'async authenticate(reason)', '/**\n   * @param {string} reason\n   * @returns {Promise<boolean>}\n   */\n  async authenticate(reason)');

// src/lib/components/UpdateNotification.svelte
// Add missing JS docs
patch('src/lib/components/UpdateNotification.svelte', 'function dismiss() {', '/**\n   * @returns {void}\n   */\n  function dismiss() {');

// src/lib/restore.ts
patch('src/lib/restore.ts', 'let exportFile: any;', 'let exportFile: VaultExportFile;');

// src/routes/+page.svelte
patch('src/routes/+page.svelte', 'async function downloadVaultFile(blob, filename)', '/**\n   * @param {Blob} blob\n   * @param {string} filename\n   */\n  async function downloadVaultFile(blob, filename)');
patch('src/routes/+page.svelte', 'function loadBmc(node)', '/**\n   * @param {HTMLElement} node\n   */\n  function loadBmc(node)');

