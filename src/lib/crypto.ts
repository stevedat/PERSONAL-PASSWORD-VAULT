// src/lib/crypto.ts

import { browser } from '$app/environment';
import { CryptoEngine as ClientEngine } from './crypto.client';
import { CryptoEngine as ServerEngine } from './crypto.server';

// Conditionally export the correct engine based on the environment
export const CryptoEngine = browser ? ClientEngine : ServerEngine;

// Export types from a central place
export type { VaultItem, EncryptedVault } from './types';
