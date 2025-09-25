export type TipDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type TipSection = {
  heading: string;
  points: string[]; // 15–20 concise, actionable items
};

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
  sections?: TipSection[]; // NEW – optional so old tips still render
};

export const tips: Tip[] = [
  {
    id: 'obedience',
    slug: 'step-by-step-obedience-programs',
    title: 'Step-by-Step Obedience Programs',
    summary: 'Structured video courses from basic commands to advanced training techniques',
    difficulty: 'beginner',
    durationLabel: '2–8 weeks',
    rating: 5,
    popular: true,
    sections: [
      {
        heading: 'Foundation Skills (Weeks 1–2)',
        points: [
          'Name response: reward eye contact within 1s of saying the name',
          'Marker word or clicker: one marker, one treat — always',
          'Lure into sit, down, stand; fade the lure within 3–5 reps',
          'Hand target (nose-to-palm) to build engagement and positioning',
          '3–5 minute micro-sessions, 3–5x per day to prevent fatigue',
          'End every session on a success to maintain motivation'
        ]
      },
      {
        heading: 'Leash Manners & Recall (Weeks 3–4)',
        points: [
          'Reinforce a default “check-in” every 5–10 steps on walks',
          'Teach loose-leash with “be a tree” when tension appears',
          'Recall games: “cookie toss” and “restrained recall”',
          'Use a long line outdoors until your recall is reliable',
          'Pay recalls with a jackpot 3–5 treats + praise + play'
        ]
      },
      {
        heading: 'Stay & Real-World Proofing (Weeks 5–8)',
        points: [
          'Build duration separately from distance and distraction',
          'Proof sits/downs in 3 locations per week (home, yard, quiet park)',
          'Add mild distractions after the dog succeeds 4/5 trials',
          'Generalize cues with 2–3 different handlers if possible',
          'Graduate to variable reinforcement to maintain behavior'
        ]
      }
    ]
  },
  {
    id: 'puppy-essentials',
    slug: 'puppy-training-essentials',
    title: 'Puppy Training Essentials',
    summary: 'Crate training, housebreaking, and crucial socialization techniques',
    difficulty: 'beginner',
    durationLabel: '4–12 weeks',
    rating: 5,
    popular: true,
    sections: [
      {
        heading: 'House Training',
        points: [
          'Out every 45–60 minutes when awake; after meals, play, naps',
          'Use a consistent door and spot; praise during the act',
          'Supervise or confine — no free roaming until 14 dry days',
          'Clean accidents with enzymatic cleaner only'
        ]
      },
      {
        heading: 'Crate Success',
        points: [
          'Feed meals in the crate with door open for positive association',
          'Start with 1–3 minute door-closed reps while you’re nearby',
          'Gradually add distance and short departures (30–120 seconds)',
          'Offer safe chew items to reduce frustration'
        ]
      },
      {
        heading: 'Socialization (Weeks 8–16)',
        points: [
          'Target 3–5 new experiences daily (surfaces, sounds, sights)',
          'Pair novel stimuli with high-value food; watch body language',
          'Gentle handling: paws, ears, collar, teeth — 30s daily',
          'Enroll in a well-run puppy class with vaccination checks'
        ]
      }
    ]
  },
  {
    id: 'behavior-problems',
    slug: 'behavior-problem-solver',
    title: 'Behavior Problem Solver',
    summary: 'Proven methods to curb barking, chewing, aggression, and other issues',
    difficulty: 'intermediate',
    durationLabel: '2–6 weeks',
    rating: 4,
    sections: [
      {
        heading: 'Barking Basics',
        points: [
          'Identify function: alert, demand, fear, boredom, or play',
          'Increase mental work: 2 enrichment activities daily',
          'Teach “quiet” by capturing 2–3s of silence → reward',
          'Block view triggers with film, curtains, or management'
        ]
      },
      {
        heading: 'Destructive Chewing',
        points: [
          'Meet daily chew needs (bully stick/Kong 15–20 min)',
          'Trade game: “take it” / “drop” / “get it” with two toys',
          'Confine when unsupervised; rotate chew textures',
          'Rule out teething or anxiety triggers'
        ]
      },
      {
        heading: 'Reactivity Foundations',
        points: [
          'Distance is your friend — start below threshold',
          'Classical counter-conditioning: trigger → treat rain',
          'LAT (“look at that”) for calm orientation',
          'Avoid rehearsal; choose quiet routes for 2–3 weeks'
        ]
      }
    ]
  },
  {
    id: 'breed-guides',
    slug: 'breed-specific-care-guides',
    title: 'Breed-Specific Care Guides',
    summary: 'Tailored advice and training tips for popular dog breeds',
    difficulty: 'beginner',
    durationLabel: '1–2 weeks',
    rating: 4,
    sections: [
      {
        heading: 'Working & Herding Breeds',
        points: [
          'Daily outlet for chase/herd instinct via structured games',
          'Teach impulse control early (mat, stationing, settle)',
          'Use food puzzles to slow frantic eaters'
        ]
      },
      {
        heading: 'Toy & Companion Breeds',
        points: [
          'Prioritize confidence around handling and strangers',
          'Short, fun sessions; prevent over-carrying to build independence',
          'Monitor dental care and trachea safety with harnesses'
        ]
      },
      {
        heading: 'Hounds & Scent Lovers',
        points: [
          'Recall on long line; practice nose-work games',
          'Use scent-based rewards and tracking walks',
          'Secure yards — these pros follow their noses!'
        ]
      }
    ]
  },
  {
    id: 'nutrition',
    slug: 'nutrition-and-feeding-plans',
    title: 'Nutrition & Feeding Plans',
    summary: 'Vet-approved diets, weight management, and feeding schedules',
    difficulty: 'beginner',
    durationLabel: '1 week',
    rating: 4,
    sections: [
      {
        heading: 'Vet-Approved Diets',
        points: [
          'Choose complete & balanced foods that meet AAFCO standards',
          'Prioritize named proteins (chicken, salmon) over generic “meat”',
          'Transition slowly over 5–7 days to avoid GI upset',
          'Ask your vet before home-cooked or raw plans'
        ]
      },
      {
        heading: 'Weight Management',
        points: [
          'Use a kitchen scale to feed by grams, not cups',
          'Target body condition score 4–5/9; waist should be visible',
          'Split meals into 2–3 feedings to manage hunger',
          'Swap part of kibble for green beans or pumpkin for volume'
        ]
      },
      {
        heading: 'Schedules & Supplements',
        points: [
          'Puppies: 3–4 meals/day; adults: 2 meals/day',
          'Add omega-3s (EPA/DHA) if approved by your vet',
          'Fresh water at all times; wash bowls daily',
          'Avoid xylitol, grapes/raisins, onions/garlic'
        ]
      }
    ]
  },
  {
    id: 'mental-enrichment',
    slug: 'mental-enrichment-games',
    title: 'Mental Enrichment Games',
    summary: 'Puzzle toys, scent work, and DIY enrichment activities',
    difficulty: 'beginner',
    durationLabel: 'Ongoing',
    rating: 5,
    popular: true,
    sections: [
      {
        heading: 'Daily Brain Work',
        points: [
          '1–2 puzzle feeders per day (snuffle mat, Kong, topple)',
          'Teach 1 new trick/week to build problem solving',
          'Rotate 5–7 toys to keep novelty high'
        ]
      },
      {
        heading: 'Scent Games',
        points: [
          'Scatter feed in grass to encourage foraging',
          '“Find it” with 3 treats, then increase difficulty',
          'Cardboard box searches with hidden kibble'
        ]
      },
      {
        heading: 'Calm Enrichment',
        points: [
          'Lick mats during grooming or nail care',
          'Frozen stuffed Kongs for crate relaxation',
          'Short chew sessions reduce arousal'
        ]
      }
    ]
  },
  {
    id: 'grooming',
    slug: 'grooming-tutorials',
    title: 'Grooming Tutorials',
    summary: 'Nail clipping, brushing techniques, and managing shedding',
    difficulty: 'beginner',
    durationLabel: '30–60 mins',
    rating: 3,
    sections: [
      {
        heading: 'Nails & Handling',
        points: [
          'Desensitize paws: touch → treat, 30–60s daily',
          'Clip 1–2 nails/day to build comfort slowly',
          'Use a Dremel for smooth edges where tolerated'
        ]
      },
      {
        heading: 'Coats & Skin',
        points: [
          'Brush to the skin with line-brushing (double coats)',
          'Slicker + undercoat rake for seasonal sheds',
          'Check armpits, behind ears, and tail for mats'
        ]
      },
      {
        heading: 'Bath Basics',
        points: [
          'Dog-safe shampoo; rinse until water runs clear',
          'Cotton in ears for splash protection',
          'Dry thoroughly to prevent hot spots'
        ]
      }
    ]
  },
  {
    id: 'health-basics',
    slug: 'first-aid-and-health-basics',
    title: 'First-Aid & Health Basics',
    summary: 'Recognizing illness signs, emergency tips, and basic care',
    difficulty: 'intermediate',
    durationLabel: '2–3 hours',
    rating: 4,
    sections: [
      {
        heading: 'Know the Signs',
        points: [
          'Lethargy beyond normal tiredness',
          'Loss of appetite for more than 24 hours',
          'Vomiting or diarrhea (especially bloody)',
          'Difficulty breathing or excessive panting',
          'Pale or blue gums',
          'Distended or painful abdomen'
        ]
      },
      {
        heading: 'Emergency First-Aid',
        points: [
          'Control bleeding with direct pressure',
          'Check airways and breathing',
          'Keep injured dog warm and calm',
          'Muzzle conditioning for safe handling in pain',
          'Vet, ER, and poison control numbers on your phone'
        ]
      },
      {
        heading: 'Preventives',
        points: [
          'Annual vet checkups and vaccinations',
          'Monthly heartworm and flea prevention',
          'Dental care and regular teeth cleaning',
          'Weight management and body condition scoring',
          'Safe household (toxic foods, plants, chemicals)'
        ]
      }
    ]
  },
  {
    id: 'senior-care',
    slug: 'caring-for-senior-dogs',
    title: 'Caring for Senior Dogs',
    summary: 'Age-appropriate care, comfort, and quality-of-life management',
    difficulty: 'intermediate',
    durationLabel: '30–45 min',
    rating: 5,
    sections: [
      {
        heading: 'Physical Comfort',
        points: [
          'Orthopedic bedding for joint support',
          'Ramps or steps to reduce jumping',
          'Non-slip rugs on smooth floors',
          'Gentle, shorter exercise sessions',
          'Warm, draft-free sleeping areas'
        ]
      },
      {
        heading: 'Health Monitoring',
        points: [
          'Twice-yearly vet visits for early detection',
          'Watch for vision or hearing changes',
          'Monitor appetite and bathroom habits',
          'Check for lumps or bumps during petting',
          'Note changes in mobility or behavior'
        ]
      }
    ]
  },
  {
    id: 'travel',
    slug: 'traveling-with-dogs',
    title: 'Traveling with Dogs',
    summary: 'Car trips, flying, hotels, and keeping dogs comfortable on the go',
    difficulty: 'intermediate',
    durationLabel: '1–2 hours',
    rating: 4,
    sections: [
      {
        heading: 'Car Travel',
        points: [
          'Secure restraint (harness, crate, or barrier)',
          'Never leave dogs unattended in vehicles',
          'Frequent stops for water and bathroom breaks',
          'Familiar blanket or toy for comfort',
          'Gradual conditioning to longer car rides'
        ]
      },
      {
        heading: 'Flying & Hotels',
        points: [
          'Research airline pet policies well in advance',
          'Health certificate from vet (usually within 10 days)',
          'Properly sized, airline-approved carrier',
          'Call hotels to confirm pet-friendly policies',
          'Pack familiar food, bowls, leash, and cleanup bags'
        ]
      }
    ]
  },
  {
    id: 'venues',
    slug: 'dog-friendly-venues-and-events',
    title: 'Dog-Friendly Venues & Events',
    summary: 'Restaurants, parks, markets, and public spaces with your dog',
    difficulty: 'beginner',
    durationLabel: '20–30 min',
    rating: 4,
    sections: [
      {
        heading: 'Preparation',
        points: [
          'Confirm venue allows dogs (call ahead)',
          'Ensure your dog is well-socialized and obedient',
          'Bring water, waste bags, and a comfortable mat',
          'Keep leash short and dog close to your table/space',
          'Have an exit strategy if your dog becomes overwhelmed'
        ]
      },
      {
        heading: 'Etiquette',
        points: [
          'Dogs should not approach other people/dogs uninvited',
          'Clean up any accidents immediately',
          'Keep noise level down (excessive barking)',
          'Respect "no dogs" areas within dog-friendly venues',
          'Tip well and thank staff for accommodating your pet'
        ]
      }
    ]
  },
  {
    id: 'seasonal-safety',
    slug: 'seasonal-safety-tips',
    title: 'Seasonal Safety Tips',
    summary: 'Hot weather, cold weather, holidays, and seasonal hazards',
    difficulty: 'beginner',
    durationLabel: '15–25 min',
    rating: 4,
    sections: [
      {
        heading: 'Summer Safety',
        points: [
          'Never leave dogs in hot cars (even with windows cracked)',
          'Walk on grass or shaded paths to protect paw pads',
          'Provide plenty of fresh water and shade',
          'Watch for signs of overheating (excessive panting, drooling)',
          'Consider cooling mats or vests for very hot days'
        ]
      },
      {
        heading: 'Winter & Holiday Safety',
        points: [
          'Protect paws from salt and ice with booties or balm',
          'Shorter walks in extreme cold weather',
          'Keep dogs away from holiday foods (chocolate, grapes, xylitol)',
          'Secure Christmas trees and decorations (choking hazards)',
          'Provide warm, dry shelter and check for frostbite'
        ]
      }
    ]
  },
  {
    id: 'myths-debunked',
    slug: 'common-training-myths-debunked',
    title: 'Common Training Myths Debunked',
    summary: 'Separating fact from fiction in popular dog training beliefs',
    difficulty: 'intermediate',
    durationLabel: '20–30 min',
    rating: 5,
    sections: [
      {
        heading: 'Dominance Myths',
        points: [
          'MYTH: You must be the "alpha" or "pack leader"',
          'FACT: Dogs don\'t see humans as pack members to dominate',
          'MYTH: Dogs who pull on leash are trying to dominate you',
          'FACT: Pulling is usually excitement or lack of leash training',
          'Focus on positive reinforcement, not dominance-based methods'
        ]
      },
      {
        heading: 'Training Myths',
        points: [
          'MYTH: Old dogs can\'t learn new tricks',
          'FACT: Dogs can learn throughout their lives with patience',
          'MYTH: Food rewards create "spoiled" or dependent dogs',
          'FACT: Treats are effective motivators when used correctly',
          'MYTH: Punishment is necessary for serious behavior problems',
          'FACT: Positive methods are more effective and humane'
        ]
      }
    ]
  },
  {
    id: 'product-reviews',
    slug: 'product-reviews-and-recommendations',
    title: 'Product Reviews & Recommendations',
    summary: 'Leashes, toys, food, beds, and gear for every dog\'s needs',
    difficulty: 'beginner',
    durationLabel: '30–45 min',
    rating: 4,
    sections: [
      {
        heading: 'Essential Gear',
        points: [
          'Collar: Adjustable, with ID tags and reflective material',
          'Leash: 6-foot standard for training, retractable for experienced dogs',
          'Harness: Front-clip for pullers, back-clip for trained walkers',
          'Crate: Size allows standing and turning, but not too spacious',
          'Bed: Orthopedic for seniors, chew-resistant for puppies'
        ]
      },
      {
        heading: 'Food & Treats',
        points: [
          'High-quality kibble with named meat as first ingredient',
          'Avoid foods with excessive fillers, by-products, or artificial colors',
          'Training treats: small, soft, and highly motivating',
          'Puzzle feeders and slow-feed bowls for fast eaters',
          'Always transition foods gradually over 7-10 days'
        ]
      }
    ]
  },
  {
    id: 'advanced-sports',
    slug: 'advanced-dog-sports-and-activities',
    title: 'Advanced Dog Sports & Activities',
    summary: 'Agility, tracking, therapy work, and competitive dog sports',
    difficulty: 'advanced',
    durationLabel: '1–3 hours',
    rating: 5,
    sections: [
      {
        heading: 'Agility Training',
        points: [
          'Start with basic obedience and impulse control',
          'Introduce obstacles gradually (tunnels, jumps, weave poles)',
          'Focus on handler-dog communication and teamwork',
          'Build confidence with positive reinforcement',
          'Join local clubs for proper equipment and instruction'
        ]
      },
      {
        heading: 'Specialized Work',
        points: [
          'Therapy dog certification through recognized organizations',
          'Search and rescue requires extensive training and commitment',
          'Tracking and scent work tap into natural abilities',
          'Competitive obedience demands precision and consistency',
          'Each sport has specific physical and mental requirements'
        ]
      }
    ]
  }
];

export function getTipBySlug(slug: string): Tip | undefined {
  return tips.find((t) => t.slug === slug);
}
