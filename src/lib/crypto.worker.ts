
// src/lib/crypto.worker.ts
// This worker handles heavy cryptographic operations to keep the UI responsive.

const PBKDF2_ITERATIONS = 600000;
const KEY_LENGTH = 256; // bits

/**
 * Derives an AES-GCM key from a master password and salt using PBKDF2.
 */
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt as any,
            iterations: PBKDF2_ITERATIONS,
            hash: 'SHA-256'
        },
        passwordKey,
        { name: 'AES-GCM', length: KEY_LENGTH },
        false,
        ['encrypt', 'decrypt']
    );
}

// Handle messages from the main thread
self.onmessage = async (event: MessageEvent) => {
    const { type, payload } = event.data;

    try {
        if (type === 'encrypt') {
            const { data, masterPassword } = payload;
            const encoder = new TextEncoder();

            // Generate random salt and IV
            const salt = crypto.getRandomValues(new Uint8Array(32));
            const iv = crypto.getRandomValues(new Uint8Array(12));

            // Derive key and encrypt
            const key = await deriveKey(masterPassword, salt);
            const encryptedData = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                encoder.encode(JSON.stringify(data))
            );

            // Send result back
            // Using .buffer to ensure we send ArrayBuffers across the boundary
            self.postMessage({
                type: 'encrypt_success',
                payload: {
                    data: encryptedData,
                    iv: iv.buffer,
                    salt: salt.buffer,
                    version: 1
                }
            });
        } else if (type === 'decrypt') {
            const { encryptedVault, masterPassword } = payload;
            const decoder = new TextDecoder();

            // Ensure we have Uint8Arrays for the crypto API
            const salt = new Uint8Array(encryptedVault.salt);
            const iv = new Uint8Array(encryptedVault.iv);

            // Derive key and decrypt
            const key = await deriveKey(masterPassword, salt);
            const decryptedData = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                encryptedVault.data
            );

            // Parse and send result back
            const items = JSON.parse(decoder.decode(decryptedData));
            self.postMessage({
                type: 'decrypt_success',
                payload: items
            });
        }
    } catch (error: any) {
        console.error('[CryptoWorker] Error:', error);
        self.postMessage({
            type: 'error',
            payload: {
                message: error.message || 'Cryptographic operation failed',
                stack: error.stack
            }
        });
    }
};

// Export something to make it a module if needed by certain build tools
export { };
