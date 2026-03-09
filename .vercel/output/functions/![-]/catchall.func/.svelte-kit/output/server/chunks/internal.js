import { r as root } from "./root.js";
import "./environment.js";
let public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
let read_implementation = null;
function set_read_implementation(fn) {
  read_implementation = fn;
}
function set_manifest(_) {
}
const options = {
  app_template_contains_nonce: false,
  async: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  csrf_trusted_origins: [],
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hash_routing: false,
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  service_worker_options: void 0,
  templates: {
    app: ({ head, body, assets, nonce, env }) => '<!doctype html>\n<html lang="en">\n\n<head>\n	<meta charset="utf-8" />\n	<link rel="icon" href="' + assets + '/favicon.svg" />\n	<link rel="apple-touch-icon" href="' + assets + `/icon.svg" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

	<!-- Security Headers (Note: Some headers like X-Frame-Options should be set via server config) -->
	<meta http-equiv="Content-Security-Policy" content="default-src 'self' http://localhost:* http://127.0.0.1:*; 
		               script-src 'self' 'unsafe-inline' http://localhost:* http://127.0.0.1:*; 
		               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
		               font-src 'self' https://fonts.gstatic.com;
		               img-src 'self' data: blob:; 
		               connect-src 'self' http://localhost:* http://127.0.0.1:*; 
		               base-uri 'self'; 
		               form-action 'self'">
	<meta http-equiv="X-Content-Type-Options" content="nosniff">
	<meta http-equiv="X-XSS-Protection" content="1; mode=block">
	<meta name="referrer" content="no-referrer">

	<meta name="theme-color" content="#1a1f2e" media="(prefers-color-scheme: dark)" />
	<meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="description" content="Secure offline password manager" />
	<link rel="manifest" href="/manifest.json" />
	<title>PocketVault</title>
	` + head + '\n</head>\n\n<body data-sveltekit-preload-data="hover">\n	<div style="display: contents">' + body + "</div>\n	<script>\n		// Global error handler\n		window.addEventListener('error', (event) => {\n			console.error('[Global Error]', {\n				message: event.message,\n				filename: event.filename,\n				lineno: event.lineno,\n				colno: event.colno,\n				error: event.error\n			});\n		});\n\n		// Unhandled promise rejections\n		window.addEventListener('unhandledrejection', (event) => {\n			console.error('[Unhandled Rejection]', event.reason);\n			event.preventDefault(); // Prevent default error handling\n		});\n\n		// Service Worker registration with error handling\n		// Skip service worker in Electron (not supported with custom protocols)\n		const isElectron = navigator.userAgent.toLowerCase().includes('electron');\n		if ('serviceWorker' in navigator && !isElectron) {\n			navigator.serviceWorker.register('/sw.js')\n				.then((registration) => {\n					console.log('[SW] Registered successfully');\n				})\n				.catch((error) => {\n					console.error('[SW] Registration failed:', error);\n				});\n		} else if (isElectron) {\n			console.log('[SW] Skipped in Electron environment');\n		}\n\n		// Performance monitoring - detect freezes\n		let lastCheck = Date.now();\n		let freezeCount = 0;\n\n		setInterval(() => {\n			const now = Date.now();\n			const delta = now - lastCheck;\n\n			// Only report if tab is visible and delta is significant\n			// This prevents false positives during browser background throttling\n			if (delta > 2000 && !document.hidden) {\n				freezeCount++;\n				console.warn('[FREEZE DETECTED]', {\n					duration: delta + 'ms',\n					count: freezeCount,\n					timestamp: new Date().toISOString()\n				});\n			}\n\n			lastCheck = now;\n		}, 500);\n	<\/script>\n</body>\n\n</html>",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "du1vxv"
};
async function get_hooks() {
  let handle;
  let handleFetch;
  let handleError;
  let handleValidationError;
  let init;
  let reroute;
  let transport;
  return {
    handle,
    handleFetch,
    handleError,
    handleValidationError,
    init,
    reroute,
    transport
  };
}
export {
  set_public_env as a,
  set_read_implementation as b,
  set_manifest as c,
  get_hooks as g,
  options as o,
  public_env as p,
  read_implementation as r,
  set_private_env as s
};
