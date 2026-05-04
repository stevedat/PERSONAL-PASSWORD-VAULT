<script>
  import '../app.css';
  import { darkMode } from '$lib/stores';
  import { onMount } from 'svelte';
  import { initializeHapticFeedback } from '$lib/haptic';
  import { Capacitor } from '@capacitor/core';
  import { App } from '@capacitor/app';
  import DialogManager from '$lib/components/DialogManager.svelte';

  // Suppress all console logs in production
  if (!import.meta.env.DEV && typeof window !== 'undefined') {
    const noop = () => {};
    console.log = noop;
    console.error = noop;
    console.warn = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
  }

  onMount(async () => {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      darkMode.set(true);
    }
    
    // Initialize haptic feedback
    initializeHapticFeedback();

    if (Capacitor.isNativePlatform()) {
      // Configure Native Environment
      try {
        const { StatusBar, Style } = await import('@capacitor/status-bar');
        
        // Match status bar to theme
        darkMode.subscribe(isDark => {
          StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light });
          if (Capacitor.getPlatform() === 'android') {
            StatusBar.setBackgroundColor({ color: isDark ? '#111827' : '#ffffff' });
          }
        });

        // Handle Back Button on Android
        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp();
          } else {
            window.history.back();
          }
        });
      } catch (e) {
        console.warn('Capacitor plugin failed to load', e);
      }
    }
  });
  
  $: if (typeof document !== 'undefined') {
    if ($darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', $darkMode ? 'dark' : 'light');
  }
</script>

<main class="min-h-screen transition-all duration-300 pb-safe-offset-4">
  <slot />
  <DialogManager />
</main>

<style>
  /* Safe Area support for iOS */
  :global(:root) {
    --safe-area-inset-top: env(safe-area-inset-top);
    --safe-area-inset-bottom: env(safe-area-inset-bottom);
  }

  .pb-safe-offset-4 {
    padding-bottom: calc(var(--safe-area-inset-bottom) + 1rem);
  }
</style>
