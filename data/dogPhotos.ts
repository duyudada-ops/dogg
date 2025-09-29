export type DogVibe = 'cute' | 'adorable' | 'fat' | 'extra-fat' | 'normal' | 'sleeping' | 'playing' | 'swimming' | 'sunglasses' | 'show' | 'water' | 'curious' | 'relaxing' | 'snow' | 'unique' | 'adventurous' | 'happy' | 'peaceful' | 'playful' | 'waiting' | 'running' | 'reflective' | 'cool';

export type DogPhoto = {
  src: string;
  alt: string;
  vibe: DogVibe;
};

export const dogPhotos: DogPhoto[] = [
  { src: '/dog-profiles/dog-clean-1.jpg', alt: 'Beautiful Golden Retriever sitting outdoors', vibe: 'normal' },
  { src: '/dog-profiles/happy-dog-2.jpg', alt: 'Happy Labrador smiling at the camera', vibe: 'happy' },
  { src: '/dog-profiles/dog-clean-2.jpg', alt: 'Playful Beagle running in the grass', vibe: 'playing' },
  { src: '/dog-profiles/happy-dog-3.jpg', alt: 'Energetic Border Collie playing outdoors', vibe: 'playing' },
  { src: '/dog-profiles/dog-clean-3.jpg', alt: 'Curious German Shepherd looking alert', vibe: 'curious' },
  { src: '/dog-profiles/happy-dog-4.jpg', alt: 'Joyful Spaniel with tongue out', vibe: 'happy' },
  { src: '/dog-profiles/dog-clean-4.jpg', alt: 'Calm Husky resting peacefully', vibe: 'peaceful' },
  { src: '/dog-profiles/happy-dog-5.jpg', alt: 'Excited Retriever ready to play', vibe: 'playful' },
  { src: '/dog-profiles/dog-clean-5.jpg', alt: 'Adorable Corgi standing proudly', vibe: 'cute' },
  { src: '/dog-profiles/happy-dog-6.jpg', alt: 'Cheerful Mixed Breed enjoying the sun', vibe: 'happy' },
  { src: '/dog-profiles/dog-clean-6.jpg', alt: 'Noble Great Dane posing elegantly', vibe: 'show' },
  { src: '/dog-profiles/happy-dog-7.jpg', alt: 'Active Australian Shepherd running', vibe: 'running' },
  { src: '/dog-profiles/dog-clean-7.jpg', alt: 'Gentle Labrador looking thoughtful', vibe: 'reflective' },
  { src: '/dog-profiles/happy-dog-8.jpg', alt: 'Playful Poodle jumping with joy', vibe: 'playing' },
  { src: '/dog-profiles/dog-clean-8.jpg', alt: 'Relaxed Bulldog lounging comfortably', vibe: 'relaxing' },
  { src: '/dog-profiles/happy-dog-9.jpg', alt: 'Adventurous Terrier exploring outdoors', vibe: 'adventurous' },
  { src: '/dog-profiles/dog-clean-9.jpg', alt: 'Sweet Cavalier King Charles Spaniel', vibe: 'cute' },
  { src: '/dog-profiles/happy-dog-10.jpg', alt: 'Energetic Jack Russell ready for action', vibe: 'playful' },
  { src: '/dog-profiles/dog-clean-10.jpg', alt: 'Majestic Saint Bernard standing tall', vibe: 'show' },
  { src: '/dog-profiles/dog-clean-11.jpg', alt: 'Friendly Boxer with a big smile', vibe: 'happy' },
  { src: '/dog-profiles/dog-clean-12.jpg', alt: 'Intelligent Border Collie thinking', vibe: 'curious' },
  { src: '/dog-profiles/dog-clean-13.jpg', alt: 'Graceful Greyhound in motion', vibe: 'running' },
  { src: '/dog-profiles/dog-clean-14.jpg', alt: 'Loving Golden Retriever being affectionate', vibe: 'peaceful' },
  { src: '/dog-profiles/dog-clean-15.jpg', alt: 'Spirited Dalmatian showing spots', vibe: 'unique' },
  { src: '/dog-profiles/dog-clean-16.jpg', alt: 'Content Bernese Mountain Dog relaxing', vibe: 'relaxing' },
  { src: '/dog-profiles/dog01.jpg', alt: 'Happy Golden Retriever playing in the park', vibe: 'playful' },
  { src: '/dog-profiles/dog02.jpg', alt: 'Cute Beagle exploring outdoors', vibe: 'adventurous' }
];