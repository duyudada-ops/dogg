export type DogVibe = 'cute' | 'adorable' | 'fat' | 'extra-fat' | 'normal' | 'sleeping' | 'playing' | 'swimming' | 'sunglasses' | 'show';

export type DogPhoto = {
  src: string;
  alt: string;
  vibe: DogVibe;
};

export const dogPhotos: DogPhoto[] = [
  { src: '/src/assets/dog-clean-1.jpg', alt: 'realistic golden retriever sitting in park', vibe: 'cute' },
  { src: '/src/assets/dog-clean-2.jpg', alt: 'realistic beagle sleeping peacefully', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-3.jpg', alt: 'realistic corgi dog with happy expression', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-4.jpg', alt: 'realistic chubby French bulldog', vibe: 'fat' },
  { src: '/src/assets/dog-clean-5.jpg', alt: 'realistic mixed breed dog outdoors', vibe: 'normal' },
  { src: '/src/assets/dog-clean-6.jpg', alt: 'realistic husky dog resting', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-7.jpg', alt: 'realistic beagle with curious look', vibe: 'cute' },
  { src: '/src/assets/dog-clean-8.jpg', alt: 'realistic Shiba Inu dog smiling', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-9.jpg', alt: 'realistic overweight dachshund', vibe: 'fat' },
  { src: '/src/assets/dog-clean-10.jpg', alt: 'realistic Labrador at beach', vibe: 'normal' },
  { src: '/src/assets/dog-clean-11.jpg', alt: 'realistic pug sleeping on pillow', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-12.jpg', alt: 'realistic border collie playing with ball', vibe: 'playing' },
  { src: '/src/assets/dog-clean-13.jpg', alt: 'realistic dog swimming in water', vibe: 'swimming' },
  { src: '/src/assets/dog-clean-14.jpg', alt: 'realistic dog wearing sunglasses', vibe: 'sunglasses' },
  { src: '/src/assets/dog-clean-15.jpg', alt: 'realistic extra overweight bulldog', vibe: 'extra-fat' },
  { src: '/src/assets/dog-clean-16.jpg', alt: 'realistic German Shepherd show dog', vibe: 'show' },
  { src: '/src/assets/dog-clean-17.jpg', alt: 'realistic French bulldog with big ears', vibe: 'cute' },
  { src: '/src/assets/dog-clean-18.jpg', alt: 'realistic fluffy white Samoyed', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-19.jpg', alt: 'realistic chubby Chow Chow', vibe: 'fat' },
  { src: '/src/assets/dog-clean-20.jpg', alt: 'realistic border collie in field', vibe: 'normal' },
  { src: '/src/assets/dog-clean-21.jpg', alt: 'realistic Dalmatian puppy sleeping', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-22.jpg', alt: 'realistic small dog with bandana', vibe: 'cute' },
  { src: '/src/assets/dog-clean-23.jpg', alt: 'realistic pit bull with gentle eyes', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-24.jpg', alt: 'realistic overweight pug', vibe: 'fat' },
  { src: '/src/assets/dog-clean-25.jpg', alt: 'realistic Australian Shepherd alert', vibe: 'normal' },
  { src: '/src/assets/dog-clean-26.jpg', alt: 'realistic Yorkshire Terrier sleeping', vibe: 'sleeping' },
  { src: '/src/assets/dog-clean-27.jpg', alt: 'realistic fluffy Pomeranian', vibe: 'cute' },
  { src: '/src/assets/dog-clean-28.jpg', alt: 'realistic Boxer in playful stance', vibe: 'adorable' },
  { src: '/src/assets/dog-clean-29.jpg', alt: 'realistic Pointer dog standing', vibe: 'normal' },
  { src: '/src/assets/dog-clean-30.jpg', alt: 'realistic Great Dane sleeping', vibe: 'sleeping' },
  { src: '/src/assets/dog-replacement-1.jpg', alt: 'realistic golden retriever playing outdoors', vibe: 'playing' },
  { src: '/src/assets/dog-replacement-2.jpg', alt: 'realistic corgi swimming happily', vibe: 'swimming' },
  { src: '/src/assets/dog-replacement-4.jpg', alt: 'realistic border collie with frisbee', vibe: 'playing' },
  { src: '/src/assets/dog-replacement-5.jpg', alt: 'realistic beagle wearing sunglasses', vibe: 'sunglasses' },
  { src: '/src/assets/dog-replacement-6.jpg', alt: 'realistic extra overweight bulldog sitting', vibe: 'extra-fat' },
  { src: '/src/assets/dog-replacement-7.jpg', alt: 'realistic German Shepherd at dog show', vibe: 'show' },
  { src: '/src/assets/dog-replacement-8.jpg', alt: 'realistic mixed breed with sunglasses', vibe: 'sunglasses' },
];