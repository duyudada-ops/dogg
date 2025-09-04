export type DogVibe = 'cute' | 'adorable' | 'fat' | 'extra-fat' | 'normal' | 'sleeping' | 'playing' | 'swimming' | 'sunglasses' | 'show';

export type DogPhoto = {
  src: string;
  alt: string;
  vibe: DogVibe;
};

export const dogPhotos: DogPhoto[] = [
  // Previously uploaded Lovable images
  { src: '/lovable-uploads/e386bba4-1124-4b0e-99e9-83a118dbc02e.png', alt: 'Two dogs running together - corgi and small terrier', vibe: 'playing' },
  { src: '/lovable-uploads/69042629-f4db-411a-b922-b71acee42463.png', alt: 'Shiba Inu dog relaxing by window', vibe: 'normal' },
  { src: '/lovable-uploads/c6b9fa95-4762-480c-a514-f7239dae2051.png', alt: 'Happy Golden Retriever with joyful expression outdoors', vibe: 'cute' },
  { src: '/lovable-uploads/16328617-3ef4-406c-844d-7829a1c7967c.png', alt: 'Stylish pug wearing winter beanie hat', vibe: 'sunglasses' },
  { src: '/lovable-uploads/d0012c81-386d-466e-8288-8450962f6151.png', alt: 'Adorable pug in coral colored outfit', vibe: 'adorable' },
  { src: '/lovable-uploads/f3158a15-bb90-4ae0-b310-930428690cb8.png', alt: 'White dog wearing heart-shaped sunglasses', vibe: 'sunglasses' },
  { src: '/lovable-uploads/c218b5c2-39c9-4d46-8532-9c2bdc98e70f.png', alt: 'Cavalier King Charles Spaniel puppy with sweet expression', vibe: 'cute' },
  { src: '/lovable-uploads/fa3724f4-83d3-4ae9-ab2d-17fa9286c79c.png', alt: 'Dog in beautiful mountain landscape setting', vibe: 'normal' },
  
  // Real dog photos from Pexels
  { src: 'https://images.pexels.com/photos/19846653/pexels-photo-19846653.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Beautiful golden retriever sitting in natural outdoor setting', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/16539152/pexels-photo-16539152.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Playful dog running in grass field', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/21821337/pexels-photo-21821337.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Adorable small dog with happy expression', vibe: 'adorable' },
  { src: 'https://images.pexels.com/photos/8434725/pexels-photo-8434725.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Calm dog resting peacefully', vibe: 'sleeping' },
  { src: 'https://images.pexels.com/photos/8434676/pexels-photo-8434676.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Energetic dog in action pose', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/5482828/pexels-photo-5482828.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Beautiful breed dog portrait', vibe: 'show' },
  { src: 'https://images.pexels.com/photos/30695903/pexels-photo-30695903.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Dog enjoying swimming in water', vibe: 'swimming' },
  { src: 'https://images.pexels.com/photos/30560156/pexels-photo-30560156.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Cute puppy with innocent expression', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/32280382/pexels-photo-32280382.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Large breed dog in outdoor setting', vibe: 'normal' },
  { src: 'https://images.pexels.com/photos/30769356/pexels-photo-30769356.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Fluffy dog with adorable features', vibe: 'adorable' },
  { src: 'https://images.pexels.com/photos/18831269/pexels-photo-18831269.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Dog in natural playful environment', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/10313396/pexels-photo-10313396.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Peaceful sleeping dog', vibe: 'sleeping' },
  { src: 'https://images.pexels.com/photos/17753637/pexels-photo-17753637.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Beautiful dog breed with elegant appearance', vibe: 'show' },
  { src: 'https://images.pexels.com/photos/18250858/pexels-photo-18250858.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Active dog in motion', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/17655227/pexels-photo-17655227.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Charming dog with sweet face', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/9863501/pexels-photo-9863501.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Dog relaxing in comfortable position', vibe: 'normal' },
  { src: 'https://images.pexels.com/photos/30946078/pexels-photo-30946078.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Lovable dog with endearing expression', vibe: 'adorable' },
  { src: 'https://images.pexels.com/photos/32607287/pexels-photo-32607287.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Dog enjoying water activities', vibe: 'swimming' },
  { src: 'https://images.pexels.com/photos/14730847/pexels-photo-14730847.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Sleepy dog in restful state', vibe: 'sleeping' },
  { src: 'https://images.pexels.com/photos/30353250/pexels-photo-30353250.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Playful pup with toy', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/32579286/pexels-photo-32579286.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Cute small breed dog', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/32283017/pexels-photo-32283017.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Beautiful dog in natural setting', vibe: 'normal' },
  { src: 'https://images.pexels.com/photos/32133640/pexels-photo-32133640.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Adorable fluffy dog', vibe: 'adorable' },
  { src: 'https://images.pexels.com/photos/17746381/pexels-photo-17746381.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Dog in show quality pose', vibe: 'show' },
  { src: 'https://images.pexels.com/photos/25643343/pexels-photo-25643343.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Swimming dog enjoying water', vibe: 'swimming' },
  { src: 'https://images.pexels.com/photos/12474827/pexels-photo-12474827.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Peaceful resting dog', vibe: 'sleeping' },
  { src: 'https://images.pexels.com/photos/7210681/pexels-photo-7210681.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Energetic dog at play', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/30505171/pexels-photo-30505171.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Sweet dog with charming look', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/17550717/pexels-photo-17550717.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Dog in comfortable outdoor environment', vibe: 'normal' },
  { src: 'https://images.pexels.com/photos/17550641/pexels-photo-17550641.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Lovable dog with endearing features', vibe: 'adorable' },
  { src: 'https://images.pexels.com/photos/18371793/pexels-photo-18371793.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Elegant breed dog in show position', vibe: 'show' },
  { src: 'https://images.pexels.com/photos/5996824/pexels-photo-5996824.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Dog enjoying aquatic fun', vibe: 'swimming' },
  { src: 'https://images.pexels.com/photos/26587410/pexels-photo-26587410.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Sleepy dog in dreamy state', vibe: 'sleeping' },
  { src: 'https://images.pexels.com/photos/13446980/pexels-photo-13446980.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Active dog in playful mood', vibe: 'playing' },
  { src: 'https://images.pexels.com/photos/30678391/pexels-photo-30678391.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Cute dog with appealing expression', vibe: 'cute' },
  { src: 'https://images.pexels.com/photos/27990996/pexels-photo-27990996.jpeg?auto=compress&cs=tinysrgb&w=1600', alt: 'Dog in natural relaxed pose', vibe: 'normal' },
];