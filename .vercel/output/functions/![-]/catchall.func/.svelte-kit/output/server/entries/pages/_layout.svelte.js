import { f as fallback, s as store_get, a as slot, u as unsubscribe_stores, b as bind_props } from "../../chunks/index2.js";
import { d as darkMode } from "../../chunks/stores.js";
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    if (typeof window !== "undefined" && true) {
      window.console.log = function() {
      };
      window.console.info = function() {
      };
      window.console.warn = function() {
      };
      window.console.error = function() {
      };
      window.console.debug = function() {
      };
      window.console.group = function() {
      };
      window.console.groupEnd = function() {
      };
    }
    let data = $$props["data"];
    let form = $$props["form"];
    let params = fallback($$props["params"], () => ({}), true);
    if (typeof document !== "undefined") {
      if (store_get($$store_subs ??= {}, "$darkMode", darkMode)) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", store_get($$store_subs ??= {}, "$darkMode", darkMode) ? "dark" : "light");
    }
    $$renderer2.push(`<main class="min-h-screen transition-all duration-300"><!--[-->`);
    slot($$renderer2, $$props, "default", {});
    $$renderer2.push(`<!--]--></main>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data, form, params });
  });
}
export {
  _layout as default
};
