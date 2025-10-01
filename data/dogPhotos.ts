export type DogVibe = 'cute' | 'adorable' | 'fat' | 'extra-fat' | 'normal' | 'sleeping' | 'playing' | 'swimming' | 'sunglasses' | 'show' | 'water' | 'curious' | 'relaxing' | 'snow' | 'adventurous' | 'unique' | 'happy' | 'peaceful' | 'playful' | 'waiting' | 'running' | 'reflective' | 'cool';

export type DogPhoto = {
  src: string;
  alt: string;
  vibe: DogVibe;
};

export const dogPhotos: DogPhoto[] = [
  { src: '/dog-profiles/dog01.jpg', alt: 'Brown curly dog lying on grass', vibe: 'playing' },
  { src: '/dog-profiles/dog02.jpg', alt: 'White puppy with green collar on a deck', vibe: 'cute' },
  { src: '/dog-profiles/dog03.jpg', alt: 'Close‑up of golden retriever puppy', vibe: 'show' },
  { src: '/dog-profiles/dog04.jpg', alt: 'Wet black labrador in a kayak', vibe: 'water' },
  { src: '/dog-profiles/dog05.jpg', alt: 'Brown puppy looking into camera', vibe: 'normal' },
  { src: '/dog-profiles/dog06.jpg', alt: 'Playful beagle running in a field', vibe: 'playing' },
  { src: '/dog-profiles/dog07.jpg', alt: 'Sleeping dog on a cozy carpet', vibe: 'sleeping' },
  { src: '/dog-profiles/dog08.jpg', alt: 'Energetic dog jumping to catch a toy', vibe: 'playing' },
  { src: '/dog-profiles/dog09.jpg', alt: 'Fluffy dog wearing a bandana', vibe: 'cute' },
  { src: '/dog-profiles/dog10.jpg', alt: 'Dog swimming in a river', vibe: 'swimming' },
  { src: '/dog-profiles/dog11.jpg', alt: 'Curious puppy sniffing flowers', vibe: 'curious' },
  { src: '/dog-profiles/dog12.jpg', alt: 'Dog relaxing on a sofa', vibe: 'relaxing' },
  { src: '/dog-profiles/dog13.jpg', alt: 'Dog standing in a snowy landscape', vibe: 'snow' },
  { src: '/dog-profiles/dog14.jpg', alt: 'Golden dog playing with a stick', vibe: 'playing' },
  { src: '/dog-profiles/dog15.jpg', alt: 'Close‑up of dog ears in a meadow', vibe: 'curious' },
  { src: '/dog-profiles/dog16.jpg', alt: 'Dog running on the beach', vibe: 'adventurous' },
  { src: '/dog-profiles/dog17.jpg', alt: 'Puppy sticking its tongue out', vibe: 'cute' },
  { src: '/dog-profiles/dog18.jpg', alt: 'Dog with heterochromia eyes', vibe: 'unique' },
  { src: '/dog-profiles/dog19.jpg', alt: 'Dog enjoying a car ride', vibe: 'adventurous' },
  { src: '/dog-profiles/dog20.jpg', alt: 'Playful pup with tennis ball', vibe: 'playing' },
  { src: '/dog-profiles/dog21.jpg', alt: 'Dog wearing a bow tie', vibe: 'cute' },
  { src: '/dog-profiles/dog22.jpg', alt: 'Happy dog at the park', vibe: 'happy' },
  { src: '/dog-profiles/dog23.jpg', alt: 'Puppy staring at a butterfly', vibe: 'curious' },
  { src: '/dog-profiles/dog24.jpg', alt: 'Dog resting under a tree', vibe: 'relaxing' },
  { src: '/dog-profiles/dog25.jpg', alt: 'Puppy and flower garden backdrop', vibe: 'cute' },
  { src: '/dog-profiles/dog26.jpg', alt: 'Dog silhouette at sunset', vibe: 'peaceful' },
  { src: '/dog-profiles/dog27.jpg', alt: 'Dog exploring a hiking trail', vibe: 'adventurous' },
  { src: '/dog-profiles/dog28.jpg', alt: 'Dog rolling in the grass', vibe: 'playful' },
  { src: '/dog-profiles/dog29.jpg', alt: 'Puppy playing with a ball', vibe: 'playing' },
  { src: '/dog-profiles/dog30.jpg', alt: 'Dog waiting by the door', vibe: 'waiting' },
  { src: '/dog-profiles/dog31.jpg', alt: 'Dog running through leaves', vibe: 'running' },
  { src: '/dog-profiles/dog32.jpg', alt: 'Dog with a red collar', vibe: 'normal' },
  { src: '/dog-profiles/dog33.jpg', alt: 'Puppy standing in a puddle', vibe: 'curious' },
  { src: '/dog-profiles/dog34.jpg', alt: 'Dog looking up at the sky', vibe: 'reflective' },
  { src: '/dog-profiles/dog35.jpg', alt: 'Fluffy puppy yawning', vibe: 'cute' },
  { src: '/dog-profiles/dog36.jpg', alt: 'Dog posing with sunglasses', vibe: 'cool' },
  { src: '/dog-profiles/dog37.jpg', alt: 'Dog happily retrieving a frisbee', vibe: 'playing' },
  { src: '/dog-profiles/dog38.jpg', alt: 'Close‑up of puppy paws', vibe: 'cute' },
  { src: '/dog-profiles/dog39.jpg', alt: 'Dog enjoying a sunny day', vibe: 'happy' },
  { src: '/dog-profiles/dog40.jpg', alt: 'Puppy sitting in a basket', vibe: 'cute' }
];