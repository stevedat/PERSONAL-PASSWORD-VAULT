

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Bt9hwH3-.js","_app/immutable/chunks/77rr9voM.js","_app/immutable/chunks/D2ZqyTCt.js","_app/immutable/chunks/CcXAMrm0.js","_app/immutable/chunks/BBU9XKCy.js","_app/immutable/chunks/CVN8ntQu.js"];
export const stylesheets = ["_app/immutable/assets/0.DxSkQVEP.css"];
export const fonts = [];
