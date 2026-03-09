<script>
  import "../app.css";
  import { darkMode } from "$lib/stores";
  import { onMount } from "svelte";
  import { initializeHapticFeedback } from "$lib/haptic";

  // Án / silent toàn bộ console trong production
  if (typeof window !== "undefined" && !import.meta.env.DEV) {
    window.console.log = function () {};
    window.console.info = function () {};
    window.console.warn = function () {};
    window.console.error = function () {};
    window.console.debug = function () {};
  }

  /** @type {any} */
  export let data = undefined;
  /** @type {any} */
  export let params = undefined;
  $: (void data, params);

  onMount(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      darkMode.set(true);
    }

    // Initialize haptic feedback
    initializeHapticFeedback();
  });

  $: if (typeof document !== "undefined") {
    if ($darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", $darkMode ? "dark" : "light");
  }
</script>

<main class="min-h-screen transition-all duration-300">
  <slot />
</main>
