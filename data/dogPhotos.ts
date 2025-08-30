export type DogVibe = 'cute' | 'adorable' | 'fat' | 'extra-fat' | 'normal' | 'sleeping' | 'playing' | 'swimming' | 'sunglasses' | 'show';

export type DogPhoto = {
  src: string;
  alt: string;
  vibe: DogVibe;
};

export const dogPhotos: DogPhoto[] = [
  { src: '/src/assets/dog-clean-1.jpg', alt: 'cute golden retriever puppy sitting in grass looking at camera', vibe: 'cute' },
  { src: '/src/assets/dog-clean-2.jpg', alt: 'sleeping beagle dog curled up on soft blanket', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-3.jpg', alt: 'adorable corgi dog with tongue out', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-4.jpg', alt: 'chubby French bulldog sitting proudly', vibe: 'fat' },
  { src: '/src/assets/dog-clean-5.jpg', alt: 'normal mixed breed dog standing in park', vibe: 'normal' },
  { src: '/src/assets/dog-clean-6.jpg', alt: 'sleeping husky dog curled up on cozy blanket', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-7.jpg', alt: 'cute beagle dog tilting head with curious expression', vibe: 'cute' },
  { src: '/src/assets/dog-clean-8.jpg', alt: 'adorable Shiba Inu dog with happy smile', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-9.jpg', alt: 'fat dachshund dog trotting happily', vibe: 'fat' },
  { src: '/src/assets/dog-clean-10.jpg', alt: 'normal Labrador retriever at the beach', vibe: 'normal' },
  { src: '/src/assets/dog-clean-11.jpg', alt: 'sleeping pug dog on soft pillow', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-17.jpg', alt: 'cute French bulldog with big ears', vibe: 'cute' },
  { src: '/src/assets/dog-clean-18.jpg', alt: 'adorable Samoyed dog with fluffy white coat', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-19.jpg', alt: 'fat Chow Chow dog sitting', vibe: 'fat' },
  { src: '/src/assets/dog-clean-20.jpg', alt: 'normal border collie dog in field', vibe: 'normal' },
  { src: '/src/assets/dog-clean-21.jpg', alt: 'sleeping Dalmatian puppy', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-22.jpg', alt: 'cute Maltipoo dog wearing colorful bandana', vibe: 'cute' },
  { src: '/src/assets/dog-clean-23.jpg', alt: 'adorable pit bull with gentle eyes', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-24.jpg', alt: 'fat pug dog waddling happily', vibe: 'fat' },
  { src: '/src/assets/dog-clean-25.jpg', alt: 'normal Australian Shepherd in alert pose', vibe: 'normal' },
  { src: '/src/assets/dog-clean-26.jpg', alt: 'sleeping Yorkshire Terrier under blanket', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-27.jpg', alt: 'cute Pomeranian with fluffy coat', vibe: 'cute' },
  { src: '/src/assets/dog-clean-28.jpg', alt: 'adorable Boxer dog in playful stance', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-29.jpg', alt: 'normal Pointer dog standing tall', vibe: 'normal' },
  { src: '/src/assets/dog-clean-30.jpg', alt: 'sleeping Great Dane on large rug', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-12.jpg', alt: 'border collie dog playing with tennis ball', vibe: 'playing' },
  { src: '/src/assets/dog-replacement-4.jpg', alt: 'border collie dog playing with frisbee in park', vibe: 'playing' },
  { src: '/src/assets/dog-clean-13.jpg', alt: 'dog swimming in lake', vibe: 'swimming' },
  { src: '/src/assets/dog-replacement-2.jpg', alt: 'chubby corgi dog swimming happily', vibe: 'swimming' },
  { src: '/src/assets/dog-clean-14.jpg', alt: 'cool dog wearing trendy sunglasses on beach', vibe: 'sunglasses' },
  { src: '/src/assets/dog-replacement-5.jpg', alt: 'adorable beagle dog wearing trendy sunglasses on beach', vibe: 'sunglasses' },
  { src: '/src/assets/dog-clean-15.jpg', alt: 'extra fat bulldog sitting on grass', vibe: 'extra-fat' },
  { src: '/src/assets/dog-replacement-6.jpg', alt: 'extra fat bulldog sitting on grass with happy expression', vibe: 'extra-fat' },
  { src: '/src/assets/dog-clean-16.jpg', alt: 'show dog German Shepherd in perfect stance', vibe: 'show' },
  { src: '/src/assets/dog-replacement-7.jpg', alt: 'show dog German Shepherd in perfect stance at dog show', vibe: 'show' },
  { src: '/src/assets/dog-replacement-1.jpg', alt: 'cute golden retriever puppy playing outdoors', vibe: 'playing' },
  { src: '/src/assets/dog-replacement-8.jpg', alt: 'normal mixed breed dog with cool sunglasses', vibe: 'sunglasses' },
];