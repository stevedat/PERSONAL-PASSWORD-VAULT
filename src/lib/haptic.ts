import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

/**
 * Haptic Feedback System for Android/iOS (Native) and Web PWA
 * Provides native tactile feedback
 */
export class HapticFeedback {
  static isSupported() {
    if (typeof window === 'undefined') return false;
    if (Capacitor.isNativePlatform()) return true;
    return 'vibrate' in navigator;
  }

  static async light() {
    if (!this.isSupported()) return;
    
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Light });
    } else if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }

  static async medium() {
    if (!this.isSupported()) return;
    
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } else if (navigator.vibrate) {
      navigator.vibrate(25);
    }
  }

  static async heavy() {
    if (!this.isSupported()) return;
    
    if (Capacitor.isNativePlatform()) {
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } else if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  static async success() {
    if (!this.isSupported()) return;
    
    if (Capacitor.isNativePlatform()) {
      await Haptics.notification({ type: NotificationType.Success });
    } else if (navigator.vibrate) {
      navigator.vibrate([10, 50, 10]);
    }
  }

  static async error() {
    if (!this.isSupported()) return;
    
    if (Capacitor.isNativePlatform()) {
      await Haptics.notification({ type: NotificationType.Error });
    } else if (navigator.vibrate) {
      navigator.vibrate([50, 100, 50, 100, 50]);
    }
  }

  static async selection() {
    if (!this.isSupported()) return;
    
    if (Capacitor.isNativePlatform()) {
      await Haptics.selectionStart();
    } else if (navigator.vibrate) {
      navigator.vibrate(5);
    }
  }

  // Utility function to add haptic feedback to elements
  static addToElement(element, type = 'light') {
    if (!element || typeof window === 'undefined') return;
    
    const hapticTypes = {
      light: () => this.light(),
      medium: () => this.medium(),
      heavy: () => this.heavy(),
      success: () => this.success(),
      error: () => this.error(),
      selection: () => this.selection()
    };

    const hapticFunction = hapticTypes[type] || hapticTypes.light;

    element.addEventListener('touchstart', () => {
      hapticFunction();
    }, { passive: true });

    element.addEventListener('click', () => {
      hapticFunction();
    }, { passive: true });
  }
}

// Auto-add haptic feedback to common interactive elements
export function initializeHapticFeedback() {
  if (typeof document === 'undefined') return;

  // Add haptic feedback to buttons
  document.addEventListener('DOMContentLoaded', () => {
    // Light haptic for regular buttons
    document.querySelectorAll('button:not(.haptic-medium):not(.haptic-heavy)').forEach(btn => {
      HapticFeedback.addToElement(btn, 'light');
    });

    // Medium haptic for important buttons
    document.querySelectorAll('.haptic-medium').forEach(btn => {
      HapticFeedback.addToElement(btn, 'medium');
    });

    // Heavy haptic for critical actions
    document.querySelectorAll('.haptic-heavy').forEach(btn => {
      HapticFeedback.addToElement(btn, 'heavy');
    });
  });

  // Add selection haptic for interactive elements
  document.addEventListener('click', (e) => {
    if (e.target && e.target.matches('input, select, textarea')) {
      HapticFeedback.selection();
    }
  }, { passive: true });
}