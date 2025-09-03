// Haptic feedback utilities for mobile devices
export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' = 'light') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30],
      success: [10, 50, 10]
    };
    navigator.vibrate(patterns[type]);
  }

  // For iOS devices with haptic feedback
  if ('hapticFeedback' in window) {
    try {
      const feedback = (window as any).hapticFeedback;
      switch (type) {
        case 'light':
          feedback.impact('light');
          break;
        case 'medium':
          feedback.impact('medium');
          break;
        case 'heavy':
          feedback.impact('heavy');
          break;
        case 'success':
          feedback.notification('success');
          break;
      }
    } catch (error) {
      console.log('Haptic feedback not available');
    }
  }
};

// Animation utility functions
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3 }
  }
};

export default {
  triggerHaptic,
  animations
};