// src/lib/crypto.ts

import { browser } from '$app/environment';
import { CryptoEngine as ClientEngine } from './crypto.client';
import { CryptoEngine as SSREngine } from './crypto.ssr';

// Conditionally export the correct engine based on the environment
export const CryptoEngine = browser ? ClientEngine : SSREngine;

// Export types from a central place
export type { VaultItem, EncryptedVault } from './types';
