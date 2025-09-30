export type DogPhoto = {
  src: string;
  alt: string;
  vibe?: string;
};

export const REAL_DOG_FALLBACKS: DogPhoto[] = [
  { src: '/dog-profiles/dog01.jpg', alt: 'Happy Golden Retriever playing in the park', vibe: 'playful' },
  { src: '/dog-profiles/dog02.jpg', alt: 'Cute Beagle exploring outdoors', vibe: 'adventurous' },
];
