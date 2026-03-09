export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","icon.svg","manifest.json","sw.js"]),
	mimeTypes: {".svg":"image/svg+xml",".json":"application/json",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.qtkJOD4R.js",app:"_app/immutable/entry/app.R12N0H2n.js",imports:["_app/immutable/entry/start.qtkJOD4R.js","_app/immutable/chunks/BAwlKPIm.js","_app/immutable/chunks/D2ZqyTCt.js","_app/immutable/entry/app.R12N0H2n.js","_app/immutable/chunks/D9rXnPce.js","_app/immutable/chunks/D2ZqyTCt.js","_app/immutable/chunks/cXiGhmoZ.js","_app/immutable/chunks/77rr9voM.js","_app/immutable/chunks/CVN8ntQu.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
