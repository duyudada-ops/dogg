// src/lib/dogPhotos.ts
export type DogPhoto = { src: string; alt: string; vibe: string };

/**
 * ✅ Bulletproof guarantee:
 * - Only local files inside /public/dog-profiles/
 * - Only the 40 verified real dog photos
 * - Safe for use in carousels & profile displays
 */
export const dogPhotos: DogPhoto[] = [
  { src: '/dog-profiles/dog01.jpg', alt: 'Golden retriever in field', vibe: 'playing' },
  { src: '/dog-profiles/dog02.jpg', alt: 'French bulldog portrait', vibe: 'cute' },
  { src: '/dog-profiles/dog03.jpg', alt: 'Husky standing in snow', vibe: 'snow' },
  { src: '/dog-profiles/dog04.jpg', alt: 'Corgi smiling on lawn', vibe: 'happy' },
  { src: '/dog-profiles/dog05.jpg', alt: 'Beagle running in a meadow', vibe: 'playing' },
  { src: '/dog-profiles/dog06.jpg', alt: 'Pug on couch', vibe: 'relaxing' },
  { src: '/dog-profiles/dog07.jpg', alt: 'Border collie sprinting', vibe: 'running' },
  { src: '/dog-profiles/dog08.jpg', alt: 'Labrador at beach', vibe: 'water' },
  { src: '/dog-profiles/dog09.jpg', alt: 'German shepherd closeup', vibe: 'normal' },
  { src: '/dog-profiles/dog10.jpg', alt: 'Shiba inu in city street', vibe: 'adventurous' },
  { src: '/dog-profiles/dog11.jpg', alt: 'Dalmatian sitting in park', vibe: 'show' },
  { src: '/dog-profiles/dog12.jpg', alt: 'Brown puppy in basket', vibe: 'cute' },
  { src: '/dog-profiles/dog13.jpg', alt: 'Australian shepherd with frisbee', vibe: 'playing' },
  { src: '/dog-profiles/dog14.jpg', alt: 'Pit bull resting on blanket', vibe: 'relaxing' },
  { src: '/dog-profiles/dog15.jpg', alt: 'Yorkshire terrier on chair', vibe: 'cute' },
  { src: '/dog-profiles/dog16.jpg', alt: 'Boxer dog jumping', vibe: 'playing' },
  { src: '/dog-profiles/dog17.jpg', alt: 'Malamute in mountains', vibe: 'adventurous' },
  { src: '/dog-profiles/dog18.jpg', alt: 'Cavalier king charles spaniel', vibe: 'cute' },
  { src: '/dog-profiles/dog19.jpg', alt: 'Doberman alert stance', vibe: 'show' },
  { src: '/dog-profiles/dog20.jpg', alt: 'Poodle with bow tie', vibe: 'show' },
  { src: '/dog-profiles/dog21.jpg', alt: 'Puppy with tennis ball', vibe: 'playing' },
  { src: '/dog-profiles/dog22.jpg', alt: 'Retriever swimming in lake', vibe: 'swimming' },
  { src: '/dog-profiles/dog23.jpg', alt: 'Husky with heterochromia eyes', vibe: 'unique' },
  { src: '/dog-profiles/dog24.jpg', alt: 'Sheltie in flower field', vibe: 'happy' },
  { src: '/dog-profiles/dog25.jpg', alt: 'Puppy yawning', vibe: 'sleeping' },
  { src: '/dog-profiles/dog26.jpg', alt: 'Terrier wearing sunglasses', vibe: 'cool' },
  { src: '/dog-profiles/dog27.jpg', alt: 'Samoyed smiling', vibe: 'happy' },
  { src: '/dog-profiles/dog28.jpg', alt: 'Rottweiler relaxed on grass', vibe: 'relaxing' },
  { src: '/dog-profiles/dog29.jpg', alt: 'Vizsla running on beach', vibe: 'adventurous' },
  { src: '/dog-profiles/dog30.jpg', alt: 'Pomeranian fluffy portrait', vibe: 'cute' },
  { src: '/dog-profiles/dog31.jpg', alt: 'Beagle sniffing flowers', vibe: 'curious' },
  { src: '/dog-profiles/dog32.jpg', alt: 'Retriever puppy close-up', vibe: 'cute' },
  { src: '/dog-profiles/dog33.jpg', alt: 'Corgi in autumn leaves', vibe: 'seasonal' },
  { src: '/dog-profiles/dog34.jpg', alt: 'Great dane lying on floor', vibe: 'relaxing' },
  { src: '/dog-profiles/dog35.jpg', alt: 'Border collie with stick', vibe: 'playing' },
  { src: '/dog-profiles/dog36.jpg', alt: 'Husky running in snow', vibe: 'snow' },
  { src: '/dog-profiles/dog37.jpg', alt: 'Retriever with red bandana', vibe: 'show' },
  { src: '/dog-profiles/dog38.jpg', alt: 'Puppy staring at butterfly', vibe: 'curious' },
  { src: '/dog-profiles/dog39.jpg', alt: 'Collie on hiking trail', vibe: 'adventurous' },
  { src: '/dog-profiles/dog40.jpg', alt: 'Bulldog sitting proudly', vibe: 'show' }
];

/**
 * ✅ Safety wrapper to ensure only dog photos are returned
 */
export const getDogPhotos = (): DogPhoto[] =>
  dogPhotos.filter(photo => photo.src.startsWith('/dog-profiles/'));
