export type DogVibe = 'cute' | 'adorable' | 'fat' | 'extra-fat' | 'normal' | 'sleeping' | 'playing' | 'swimming' | 'sunglasses' | 'show';

export type DogPhoto = {
  src: string;
  alt: string;
  vibe: DogVibe;
};

export const dogPhotos: DogPhoto[] = [
  { src: '/src/assets/dog-replacement-1.jpg', alt: 'cute golden retriever puppy sitting in grass looking at camera', vibe: 'cute' },
  { src: '/src/assets/dog-2.jpg', alt: 'sleeping golden retriever on couch', vibe: 'sleeping' },
  { src: '/src/assets/dog-3.jpg', alt: 'adorable corgi with tongue out', vibe: 'adorable' },
  { src: '/src/assets/dog-replacement-2.jpg', alt: 'chubby corgi dog with thick fluffy coat sitting proudly', vibe: 'fat' },
  { src: '/src/assets/dog-replacement-8.jpg', alt: 'normal mixed breed dog standing in park with brown and white markings', vibe: 'normal' },
  { src: '/src/assets/dog-replacement-3.jpg', alt: 'sleeping husky dog curled up on cozy blanket', vibe: 'sleeping' },
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
  { src: '/src/assets/dog-replacement-4.jpg', alt: 'border collie dog playing with tennis ball in park', vibe: 'playing' },
  { src: '/src/assets/dog-27.jpg', alt: 'dog swimming in lake', vibe: 'swimming' },
  { src: '/src/assets/dog-replacement-5.jpg', alt: 'adorable beagle dog wearing trendy sunglasses on beach', vibe: 'sunglasses' },
  { src: '/src/assets/dog-replacement-6.jpg', alt: 'extra fat bulldog sitting on grass with happy expression', vibe: 'extra-fat' },
  { src: '/src/assets/dog-replacement-7.jpg', alt: 'show dog German Shepherd in perfect stance at dog show', vibe: 'show' },
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