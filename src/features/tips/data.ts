export type TipDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type Tip = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  minutes?: number;
  durationLabel?: string;
  difficulty: TipDifficulty;
  rating: number;
  popular?: boolean;
};

export const tips: Tip[] = [
  {
    id: 'obedience',
    slug: 'step-by-step-obedience-programs',
    title: 'Step-by-Step Obedience Programs',
    summary: 'Structured video courses from basic commands to advanced training techniques',
    difficulty: 'beginner',
    durationLabel: '2-8 weeks',
    rating: 5,
    popular: true
  },
  {
    id: 'puppy-essentials',
    slug: 'puppy-training-essentials',
    title: 'Puppy Training Essentials',
    summary: 'Crate training, housebreaking, and crucial socialization techniques',
    difficulty: 'beginner',
    durationLabel: '4-12 weeks',
    rating: 5,
    popular: true
  },
  {
    id: 'behavior-problems',
    slug: 'behavior-problem-solver',
    title: 'Behavior Problem Solver',
    summary: 'Proven methods to curb barking, chewing, aggression, and other issues',
    difficulty: 'intermediate',
    durationLabel: '2-6 weeks',
    rating: 4
  },
  {
    id: 'breed-guides',
    slug: 'breed-specific-care-guides',
    title: 'Breed-Specific Care Guides',
    summary: 'Tailored advice and training tips for popular dog breeds',
    difficulty: 'beginner',
    durationLabel: '1-2 weeks',
    rating: 4
  },
  {
    id: 'nutrition',
    slug: 'nutrition-and-feeding-plans',
    title: 'Nutrition & Feeding Plans',
    summary: 'Vet-approved diets, weight management, and feeding schedules',
    difficulty: 'beginner',
    durationLabel: '1 week',
    rating: 4
  },
  {
    id: 'mental-enrichment',
    slug: 'mental-enrichment-games',
    title: 'Mental Enrichment Games',
    summary: 'Puzzle toys, scent work, and DIY enrichment activities',
    difficulty: 'beginner',
    durationLabel: 'Ongoing',
    rating: 5,
    popular: true
  },
  {
    id: 'grooming',
    slug: 'grooming-tutorials',
    title: 'Grooming Tutorials',
    summary: 'Nail clipping, brushing techniques, and managing shedding',
    difficulty: 'beginner',
    durationLabel: '30-60 mins',
    rating: 3
  },
  {
    id: 'health-basics',
    slug: 'first-aid-and-health-basics',
    title: 'First-Aid & Health Basics',
    summary: 'Recognizing illness signs, emergency tips, and basic care',
    difficulty: 'intermediate',
    durationLabel: '2-3 hours',
    rating: 4
  },
  {
    id: 'senior-care',
    slug: 'senior-dog-care',
    title: 'Senior Dog Care',
    summary: 'Mobility exercises, dietary adjustments for aging dogs',
    difficulty: 'intermediate',
    durationLabel: 'Ongoing',
    rating: 3
  },
  {
    id: 'travel',
    slug: 'traveling-with-your-dog',
    title: 'Traveling with Your Dog',
    summary: 'Packing checklists, hotel policies, airline requirements',
    difficulty: 'beginner',
    durationLabel: '1-2 hours prep',
    rating: 3
  },
  {
    id: 'venues',
    slug: 'dog-friendly-venues',
    title: 'Dog-Friendly Venues',
    summary: 'Restaurants, parks, trails with user reviews and ratings',
    difficulty: 'beginner',
    durationLabel: 'As needed',
    rating: 4
  },
  {
    id: 'seasonal-safety',
    slug: 'seasonal-safety-tips',
    title: 'Seasonal Safety Tips',
    summary: 'Heatstroke prevention, winter paw care, weather prep',
    difficulty: 'beginner',
    durationLabel: '30 mins',
    rating: 4
  },
  {
    id: 'myths-debunked',
    slug: 'training-myths-debunked',
    title: 'Training Myths Debunked',
    summary: 'Evidence-based answers to common training misconceptions',
    difficulty: 'intermediate',
    durationLabel: '1-2 hours',
    rating: 3
  },
  {
    id: 'product-reviews',
    slug: 'product-reviews-and-discounts',
    title: 'Product Reviews & Discounts',
    summary: 'Curated gear lists with honest reviews and affiliate offers',
    difficulty: 'beginner',
    durationLabel: '15-30 mins',
    rating: 4
  },
  {
    id: 'advanced-sports',
    slug: 'advanced-sports-and-activities',
    title: 'Advanced Sports & Activities',
    summary: 'Agility training, obedience competitions, nose work',
    difficulty: 'advanced',
    durationLabel: '3-6 months',
    rating: 2
  }
];