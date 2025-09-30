export type DogVibe = 'cute' | 'adorable' | 'fat' | 'extra-fat' | 'normal' | 'sleeping' | 'playing' | 'swimming' | 'sunglasses' | 'show' | 'water' | 'curious' | 'relaxing' | 'snow' | 'unique' | 'adventurous' | 'happy' | 'peaceful' | 'playful' | 'waiting' | 'running' | 'reflective' | 'cool';

export type DogPhoto = {
  src: string;
  alt: string;
  vibe: DogVibe;
};

export const dogPhotos: DogPhoto[] = [
  { src: '/dog-profiles/dog01.jpg', alt: 'Happy Golden Retriever playing in the park', vibe: 'playful' },
  { src: '/dog-profiles/dog02.jpg', alt: 'Cute Beagle exploring outdoors', vibe: 'adventurous' },
  { src: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Close‑up of golden retriever puppy', vibe: 'show' },
  { src: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Wet black labrador in a kayak', vibe: 'water' },
  { src: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Brown puppy looking into camera', vibe: 'normal' },
  { src: 'https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Playful beagle running in a field', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Sleeping dog on a cozy carpet', vibe: 'sleeping' },
  { src: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Energetic dog jumping to catch a toy', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Fluffy dog wearing a bandana', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/422220/pexels-photo-422220.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog swimming in a river', vibe: 'swimming' },
  { src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Curious puppy sniffing flowers', vibe: 'curious' },
  { src: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog relaxing on a sofa', vibe: 'relaxing' },
  { src: 'https://images.pexels.com/photos/800406/pexels-photo-800406.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog standing in a snowy landscape', vibe: 'snow' },
  { src: 'https://images.pexels.com/photos/1661546/pexels-photo-1661546.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Golden dog playing with a stick', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/1322182/pexels-photo-1322182.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Close‑up of dog ears in a meadow', vibe: 'curious' },
  { src: 'https://images.pexels.com/photos/19846653/pexels-photo-19846653.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog running on the beach', vibe: 'adventurous' },
  { src: 'https://images.pexels.com/photos/16539152/pexels-photo-16539152.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Puppy sticking its tongue out', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/21821337/pexels-photo-21821337.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog with heterochromia eyes', vibe: 'unique' },
  { src: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog enjoying a car ride', vibe: 'adventurous' },
  { src: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Playful pup with tennis ball', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog resting under a tree', vibe: 'relaxing' },
  { src: 'https://images.pexels.com/photos/1458925/pexels-photo-1458925.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Puppy and flower garden backdrop', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog silhouette at sunset', vibe: 'peaceful' },
  { src: 'https://images.pexels.com/photos/1390361/pexels-photo-1390361.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog exploring a hiking trail', vibe: 'adventurous' },
  { src: 'https://images.pexels.com/photos/422220/pexels-photo-422220.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog rolling in the grass', vibe: 'playful' },
  { src: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Puppy playing with a ball', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog waiting by the door', vibe: 'waiting' },
  { src: 'https://images.pexels.com/photos/800406/pexels-photo-800406.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog running through leaves', vibe: 'running' },
  { src: 'https://images.pexels.com/photos/1661546/pexels-photo-1661546.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog with a red collar', vibe: 'normal' },
  { src: 'https://images.pexels.com/photos/1322182/pexels-photo-1322182.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Puppy standing in a puddle', vibe: 'curious' },
  { src: 'https://images.pexels.com/photos/19846653/pexels-photo-19846653.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog looking up at the sky', vibe: 'reflective' },
  { src: 'https://images.pexels.com/photos/16539152/pexels-photo-16539152.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Fluffy puppy yawning', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/21821337/pexels-photo-21821337.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog posing with sunglasses', vibe: 'cool' },
  { src: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog happily retrieving a frisbee', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Close‑up of puppy paws', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Dog enjoying a sunny day', vibe: 'happy' },
  { src: 'https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Puppy sitting in a basket', vibe: 'cute' }
];