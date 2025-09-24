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
          'Emergency: bloat, collapse, seizures, heatstroke',
          'Track appetite, water intake, urination/defecation changes',
          'Check gums weekly (color, moisture, capillary refill)'
        ]
      },
      {
        heading: 'Kit & Skills',
        points: [
          'First-aid kit: bandage, non-stick pads, saline, tweezers',
          'Muzzle conditioning for safe handling in pain',
          'Vet, ER, and poison control numbers on your phone'
        ]
      },
      {
        heading: 'Preventives',
        points: [
          'Core vaccines per vet schedule',
          'Flea/tick/heartworm preventives as advised',
          'Daily tooth brushing or VOHC-approved chews'
        ]
      }
  },
  {
    id: 'senior-care',
    slug: 'senior-dog-care',
    title: 'Senior Dog Care',
    summary: 'Mobility exercises, dietary adjustments for aging dogs',
    difficulty: 'intermediate',
    durationLabel: 'Ongoing',
    rating: 3,
    sections: [
      {
        heading: 'Comfort & Mobility',
        points: [
          'Add rugs/booties for traction on slick floors',
          'Low-impact walks; avoid repetitive jumping',
          'Gentle range-of-motion exercises as guided by your vet'
        ]
      },
      {
        heading: 'Food & Meds',
        points: [
          'Senior diets with joint support (omega-3s, glucosamine) as advised',
          'Feed smaller, more frequent meals if digestion changes',
          'Use a medication tracker (morning/evening log)'
        ]
      },
      {
        heading: 'Quality of Life',
        points: [
          'Use a QOL scale monthly to guide decisions',
          'Keep routines predictable; add calm enrichment',
          'Schedule semiannual wellness checks'
        ]
      }
    ]
  },
  {
    id: 'travel',
    slug: 'traveling-with-your-dog',
    title: 'Traveling with Your Dog',
    summary: 'Packing checklists, hotel policies, airline requirements',
    difficulty: 'beginner',
    durationLabel: '1–2 hours prep',
    rating: 3,
    sections: [
      {
        heading: 'Road Trip Basics',
        points: [
          'Crash-tested crate or seat-belt harness only',
          'Pack water, bowl, food, meds, vaccine records',
          'Plan leash-only potty stops; never leave in hot cars'
        ]
      },
      {
        heading: 'Lodging Etiquette',
        points: [
          'Confirm pet fee and size limits before booking',
          'Bring a mat/bed to reduce anxiety and fur on furniture',
          'Exercise before check-in to help settling'
        ]
      },
      {
        heading: 'Air Travel',
        points: [
          'Airline-approved carrier; confirm dimensions',
          'Acclimate to carrier 2–3 weeks before flight',
          'Direct flights minimize stress and risk'
        ]
      }
    ]
  },
  {
    id: 'venues',
    slug: 'dog-friendly-venues',
    title: 'Dog-Friendly Venues',
    summary: 'Restaurants, parks, trails with user reviews and ratings',
    difficulty: 'beginner',
    durationLabel: 'As needed',
    rating: 4,
    sections: [
      {
        heading: 'Before You Go',
        points: [
          'Verify leash laws, hours, and vaccination rules',
          'Pack poop bags and a portable water bowl',
          'Check heat index and trail difficulty'
        ]
      },
      {
        heading: 'On-Site Manners',
        points: [
          'Practice settle on a mat under the table',
          'Keep 6 ft from other dogs unless invited',
          'Reward quiet behavior; take short decompression walks'
        ]
      },
      {
        heading: 'Trail Safety',
        points: [
          'Long line in wildlife areas; recall games at trailheads',
          'Tick check after hikes; rinse paws if salted in winter',
          'Leave no trace — pack out waste'
        ]
      }
    ]
  },
  {
    id: 'seasonal-safety',
    slug: 'seasonal-safety-tips',
    title: 'Seasonal Safety Tips',
    summary: 'Heatstroke prevention, winter paw care, weather prep',
    difficulty: 'beginner',
    durationLabel: '30 mins',
    rating: 4,
    sections: [
      {
        heading: 'Summer',
        points: [
          'Walk at dawn/dusk; asphalt test with back of hand',
          'Carry water; use shade breaks every 10–15 minutes',
          'Never leave dogs in cars — it heats deadly fast'
        ]
      },
      {
        heading: 'Winter',
        points: [
          'Rinse de-icing salts; use paw balm/booties',
          'Shorter, more frequent walks in extreme cold',
          'Add a drying station near the door'
        ]
      },
      {
        heading: 'Storms & Wildfire',
        points: [
          'ID tag + microchip up to date',
          'Create a go-bag: food, meds, copies of records',
          'Desensitize to thunder with low-volume sound sessions'
        ]
      }
    ]
  },
  {
    id: 'myths-debunked',
    slug: 'training-myths-debunked',
    title: 'Training Myths Debunked',
    summary: 'Evidence-based answers to common training misconceptions',
    difficulty: 'intermediate',
    durationLabel: '1–2 hours',
    rating: 3,
    sections: [
      {
        heading: 'Common Myths',
        points: [
          '“Guilty look” ≠ guilt — it’s appeasement behavior',
          'Dominance is not a training plan; teach skills instead',
          'Punishment often suppresses signals, not the emotion'
        ]
      },
      {
        heading: 'What Works',
        points: [
          'Reinforce what you like; manage what you don’t',
          'Set up easy wins and raise criteria gradually',
          'Track reps; consistency beats intensity'
        ]
      },
      {
        heading: 'Choosing Advice',
        points: [
          'Prefer sources citing peer-reviewed evidence',
          'Beware of “quick cure” guarantees',
          'Your dog’s welfare and consent are core metrics'
        ]
      }
    ]
  },
  {
    id: 'product-reviews',
    slug: 'product-reviews-and-discounts',
    title: 'Product Reviews & Discounts',
    summary: 'Curated gear lists with honest reviews and affiliate offers',
    difficulty: 'beginner',
    durationLabel: '15–30 mins',
    rating: 4,
    sections: [
      {
        heading: 'Safety-First Picks',
        points: [
          'Look for crash-test data on car restraints',
          'Check materials: no sharp hardware, rust-proof clips',
          'Prefer harnesses that don’t restrict shoulder movement'
        ]
      },
      {
        heading: 'Value & Fit',
        points: [
          'Measure girth/neck; consult brand fit charts',
          'Trial window and warranty beat rock-bottom price',
          'Read reviews from similar breed/size owners'
        ]
      },
      {
        heading: 'Deals',
        points: [
          'Set price alerts; buy staples during seasonal sales',
          'Bundle subscriptions for food/treat savings',
          'Rotate toys to extend lifespan'
        ]
      }
    ]
  },
  {
    id: 'advanced-sports',
    slug: 'advanced-sports-and-activities',
    title: 'Advanced Sports & Activities',
    summary: 'Agility training, obedience competitions, nose work',
    difficulty: 'advanced',
    durationLabel: '3–6 months',
    rating: 2,
    sections: [
      {
        heading: 'Agility Foundations',
        points: [
          'Teach forward focus and tight turns with cones',
          'Build drive with toy rewards; short, crisp reps',
          'Condition shoulders/core before jumps'
        ]
      },
      {
        heading: 'Rally/Obedience',
        points: [
          'Heeling: reward position, not just movement',
          'Proof sits/downs with handler motion and turns',
          'Use video to refine footwork and timing'
        ]
      },
      {
        heading: 'Nose Work',
        points: [
          'Pair odor with food initially; build independent searching',
          'Vary hide heights and locations weekly',
          'Log finds to track progression'
        ]
      }
    ]
  }

  }
];

export function getTipBySlug(slug: string): Tip | undefined {
  return tips.find((t) => t.slug === slug);
}
