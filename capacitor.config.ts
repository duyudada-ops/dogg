import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0f9231cbbc3a41d7b46341611b8f3af1',
  appName: 'TailCircle',
  webDir: 'dist',
  server: {
    url: 'https://0f9231cb-bc3a-41d7-b463-41611b8f3af1.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#F5A623',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;