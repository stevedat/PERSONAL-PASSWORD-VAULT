<script>
  import '../app.css';
  import { darkMode } from '$lib/stores';
  import { onMount } from 'svelte';
  
  onMount(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      darkMode.set(true);
    }
  });
  
  $: if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', $darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', $darkMode ? 'dark' : 'light');
  }
</script>

<main>
  <slot />
</main>

<style>
  main {
    min-height: 100vh;
    background: var(--bg-primary);
  }
</style>