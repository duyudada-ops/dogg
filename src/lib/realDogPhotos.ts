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
      for (let i = 1; i <= 25; i++) {
        const num = i.toString().padStart(2, '0');
        localPhotos.push({
          src: `/dogs/dog${num}.jpg`,
          alt: `Adorable dog photo ${i}`,
          vibe: ['cute', 'adorable', 'normal', 'sleeping'][i % 4]
        });
      }
      return localPhotos;
    }
  } catch (error) {
    console.log('Local files check failed, using API fallback');
  }
  
  // Fallback to dog.ceo API
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/25');
    const data = await response.json();
    
    if (data.status === 'success' && Array.isArray(data.message)) {
      return data.message
        .filter((url: string) => url.includes('images.dog.ceo'))
        .map((url: string, index: number) => ({
          src: url,
          alt: `Real dog photo ${index + 1}`,
          vibe: 'normal'
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