export type DogVibe = 'cute' | 'adorable' | 'fat' | 'extra-fat' | 'normal' | 'sleeping' | 'playing' | 'swimming' | 'sunglasses' | 'show';

export type DogPhoto = {
  src: string;
  alt: string;
  vibe: DogVibe;
};

export const dogPhotos: DogPhoto[] = [
  { src: '/src/assets/dog-1.jpg', alt: 'small cute puppy looking at camera', vibe: 'cute' },
  { src: '/src/assets/dog-2.jpg', alt: 'sleeping golden retriever on couch', vibe: 'sleeping' },
  { src: '/src/assets/dog-3.jpg', alt: 'adorable corgi with tongue out', vibe: 'adorable' },
  { src: '/src/assets/dog-4.jpg', alt: 'fat bulldog sitting proudly', vibe: 'fat' },
  { src: '/src/assets/dog-5.jpg', alt: 'normal mixed-breed standing in park', vibe: 'normal' },
  { src: '/src/assets/dog-6.jpg', alt: 'sleeping husky curled up', vibe: 'sleeping' },
  { src: '/src/assets/dog-7.jpg', alt: 'cute beagle tilting head', vibe: 'cute' },
  { src: '/src/assets/dog-8.jpg', alt: 'adorable shiba inu smiling', vibe: 'adorable' },
  { src: '/src/assets/dog-9.jpg', alt: 'fat dachshund trotting', vibe: 'fat' },
  { src: '/src/assets/dog-10.jpg', alt: 'normal labrador at the beach', vibe: 'normal' },
  { src: '/src/assets/dog-11.jpg', alt: 'sleeping pug on pillow', vibe: 'sleeping' },
  { src: '/src/assets/dog-12.jpg', alt: 'cute french bulldog with big ears', vibe: 'cute' },
  { src: '/src/assets/dog-13.jpg', alt: 'adorable samoyed fluffy smile', vibe: 'adorable' },
  { src: '/src/assets/dog-14.jpg', alt: 'fat chow chow sitting', vibe: 'fat' },
  { src: '/src/assets/dog-15.jpg', alt: 'normal border collie in field', vibe: 'normal' },
  { src: '/src/assets/dog-16.jpg', alt: 'sleeping dalmatian puppy', vibe: 'sleeping' },
  { src: '/src/assets/dog-17.jpg', alt: 'cute maltipoo wearing bandana', vibe: 'cute' },
  { src: '/src/assets/dog-18.jpg', alt: 'adorable pit bull gentle eyes', vibe: 'adorable' },
  { src: '/src/assets/dog-19.jpg', alt: 'fat pug waddling happily', vibe: 'fat' },
  { src: '/src/assets/dog-20.jpg', alt: 'normal australian shepherd alert pose', vibe: 'normal' },
  { src: '/src/assets/dog-21.jpg', alt: 'sleeping yorkie under blanket', vibe: 'sleeping' },
  { src: '/src/assets/dog-22.jpg', alt: 'cute pomeranian fluffy coat', vibe: 'cute' },
  { src: '/src/assets/dog-23.jpg', alt: 'adorable boxer playful stance', vibe: 'adorable' },
  { src: '/src/assets/dog-24.jpg', alt: 'normal pointer standing tall', vibe: 'normal' },
  { src: '/src/assets/dog-25.jpg', alt: 'sleeping great dane on rug', vibe: 'sleeping' },
  { src: '/src/assets/dog-26.jpg', alt: 'dog playing fetch in park', vibe: 'playing' },
  { src: '/src/assets/dog-27.jpg', alt: 'dog swimming in lake', vibe: 'swimming' },
  { src: '/src/assets/dog-28.jpg', alt: 'dog wearing cool sunglasses', vibe: 'sunglasses' },
  { src: '/src/assets/dog-29.jpg', alt: 'extra fat corgi lying down', vibe: 'extra-fat' },
  { src: '/src/assets/dog-30.jpg', alt: 'dog at professional dog show', vibe: 'show' },
  { src: '/src/assets/dog-31.jpg', alt: 'playing retriever with tennis ball', vibe: 'playing' },
  { src: '/src/assets/dog-32.jpg', alt: 'dog swimming with life vest', vibe: 'swimming' },
  { src: '/src/assets/dog-33.jpg', alt: 'fashionable dog with sunglasses', vibe: 'sunglasses' },
  { src: '/src/assets/dog-34.jpg', alt: 'extra chubby bulldog relaxing', vibe: 'extra-fat' },
  { src: '/src/assets/dog-35.jpg', alt: 'champion dog at show ring', vibe: 'show' },
  { src: '/src/assets/happy-dog-1.jpg', alt: 'happy dog playing outdoors', vibe: 'playing' },
  { src: '/src/assets/happy-dog-2.jpg', alt: 'joyful dog swimming happily', vibe: 'swimming' },
  { src: '/src/assets/happy-dog-3.jpg', alt: 'stylish dog with aviator sunglasses', vibe: 'sunglasses' },
  { src: '/src/assets/happy-dog-4.jpg', alt: 'extremely chubby happy dog', vibe: 'extra-fat' },
  { src: '/src/assets/happy-dog-5.jpg', alt: 'show dog in perfect stance', vibe: 'show' },
];