export type DogPhoto = {
  src: string;
  alt: string;
  vibe?: string;
};

export async function getRealDogPhotos(): Promise<DogPhoto[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
  
  // Check if local files exist by testing first few
  try {
    const testUrls = ['/dogs/dog01.jpg', '/dogs/dog02.jpg', '/dogs/dog03.jpg'];
    const results = await Promise.allSettled(
      testUrls.map(url => fetch(baseUrl + url, { method: 'HEAD' }))
    );
    
    const existingCount = results.filter(result => 
      result.status === 'fulfilled' && result.value.ok
    ).length;
    
    // If we have at least 3 local files, use local set
    if (existingCount >= 3) {
      const localPhotos: DogPhoto[] = [];
      const vibes = ['cute', 'adorable', 'normal', 'sleeping', 'playing', 'swimming', 'sunglasses', 'fat', 'extra-fat', 'show'];
      for (let i = 1; i <= 40; i++) {
        const num = i.toString().padStart(2, '0');
        localPhotos.push({
          src: `/dogs/dog${num}.jpg`,
          alt: `Adorable dog photo ${i}`,
          vibe: vibes[i % vibes.length]
        });
      }
      return localPhotos;
    }
  } catch (error) {
    console.log('Local files check failed, using Pexels fallback');
  }
  
  // Fallback to Pexels via proxy function
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      'https://dxjgsiseyrkjerecrpdn.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4amdzaXNleXJramVyZWNycGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTU1NTgsImV4cCI6MjA2OTkzMTU1OH0.bKfcX3VKFPUXR1iIWtStmMKJLYAkGOIWpakhT2vADZ0'
    );
    
    const { data, error } = await supabase.functions.invoke('pexels-proxy');
    
    if (!error && data?.photos) {
      const vibes = ['cute', 'adorable', 'normal', 'sleeping', 'playing', 'swimming', 'sunglasses', 'fat', 'extra-fat', 'show'];
      return data.photos
        .filter((photo: any) => photo.src.includes('images.pexels.com'))
        .slice(0, 40)
        .map((photo: any, index: number) => ({
          src: photo.src,
          alt: photo.alt || `Real dog photo ${index + 1}`,
          vibe: vibes[index % vibes.length]
        }));
    }
  } catch (error) {
    console.error('Failed to fetch from Pexels API:', error);
  }
  
  // Final fallback to dog.ceo API
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/40');
    const data = await response.json();
    
    if (data.status === 'success' && Array.isArray(data.message)) {
      const vibes = ['cute', 'adorable', 'normal', 'sleeping', 'playing', 'swimming', 'sunglasses', 'fat', 'extra-fat', 'show'];
      return data.message
        .filter((url: string) => url.includes('images.dog.ceo'))
        .slice(0, 40)
        .map((url: string, index: number) => ({
          src: url,
          alt: `Real dog photo ${index + 1}`,
          vibe: vibes[index % vibes.length]
        }));
    }
  } catch (error) {
    console.error('Failed to fetch from dog.ceo API:', error);
  }
  
  // Final fallback to local assets
  return [
    { src: '/src/assets/dog-1.jpg', alt: 'Fallback dog photo', vibe: 'normal' }
  ];
}