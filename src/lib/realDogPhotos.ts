export type DogPhoto = {
  src: string;
  alt: string;
  vibe?: string;
};

export async function getRealDogPhotos(): Promise<DogPhoto[]> {
  // Import verified clean dog photos - NO external API calls
  const { dogPhotos } = await import('../../data/dogPhotos');
  
  console.log('Using verified clean dog photos only - no external APIs');
  
  // Return only verified clean dog photos with proper typing
  return dogPhotos.map(photo => ({
    src: photo.src,
    alt: photo.alt,
    vibe: photo.vibe
  }));
}