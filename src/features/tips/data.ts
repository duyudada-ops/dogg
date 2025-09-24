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
    summary:
      'Structured video courses from basic commands to advanced training techniques',
    difficulty: 'beginner',
    durationLabel: '2-8 weeks',
    rating: 5,
    popular: true,
    sections: [
      {
        heading: 'Foundation Skills (Weeks 1–2)',
        points: [
          'Name response: reward eye contact within 1s of saying the name',
          'Marker word (e.g., “Yes!”) before delivering food/toy reward',
          'Lure → hand signal → verbal cue progression for each skill',
          'Sit/Down/Stand with clean criteria; 3–5 reps, 2–3 sets daily',
          '“Come” on a long line; reinforce heavily, never punish after recall',
          'Loose-leash start: 3–5 steps, reward at your knee, gradually extend',
          'Place/Mat training for calmness and impulse control',
          'Release cue (e.g., “Free!”) so the dog knows when behavior ends',
          'Short, upbeat sessions (2–5 minutes) to prevent fatigue',
          'End on success; log sessions to track progress'
        ]
      },
      {
        heading: 'Proofing & Distractions (Weeks 3–5)',
        points: [
          'Generalize cues in 3 locations indoors before going outside',
          'Add one distraction at a time (distance → duration → intensity)',
          'Use real-world reinforcers (sniffing, greeting) as rewards',
          'Practice “Stay” with clear duration goals: 5s → 15s → 30s → 1m',
          'Leash skills around low-value distractions before dog parks',
          'Recall games (“Catch Me,” “Hide & Seek”) to build speed and joy',
          'Calm greetings: sit for petting, hands off if jumping starts',
          'Default settle on a mat in cafés or at the sidelines of parks',
          'Record 2–3 weekly proofing sessions; adjust criteria if errors spike',
          'Celebrate small wins; keep reinforcement varied and valuable'
        ]
      },
      {
        heading: 'Advanced Handler Skills (Weeks 6–8)',
        points: [
          'Fade food lures to hand signals, then to verbal-only cues',
          'Add mild latency (1–2s) before reward to build endurance',
          'Chain behaviors: e.g., “Come → Sit → Down → Free”',
          'Emergency stop or “Down at distance” with a long line first',
          'Heeling patterns (inside/outside turns, halts, figure-8s)',
          'Distraction-heavy recalls (toys on ground, passing joggers)',
          'Distance cues via hand target or platform work',
          'Randomize reinforcement (variable schedule) once fluent',
          'Weekly maintenance: 2 short polish sessions + 1 field session',
          'Revisit basics monthly to prevent cue drift or sloppy responses'
        ]
      }
    ]
  },
  {
    id: 'puppy-essentials',
    slug: 'puppy-training-essentials',
    title: 'Puppy Training Essentials',
    summary:
      'Crate training, housebreaking, and crucial socialization techniques',
    difficulty: 'beginner',
    durationLabel: '4-12 weeks',
    rating: 5,
    popular: true
  },
  {
    id: 'behavior-problems',
    slug: 'behavior-problem-solver',
    title: 'Behavior Problem Solver',
    summary:
      'Proven methods to curb barking, chewing, aggression, and other issues',
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
    summary:
      'Vet-approved diets, weight management, and feeding schedules',
    difficulty: 'beginner',
    durationLabel: '1 week',
    rating: 4,
    sections: [
      {
        heading: 'Vet-approved diets',
        points: [
          'Choose complete & balanced foods that meet AAFCO standards',
          'Prioritize named proteins (chicken, salmon) over generic “meat”',
          'Rotate 2–3 compatible brands to diversify nutrient exposure',
          'Transition slowly over 5–7 days (25% steps) to avoid GI upset',
          'Confirm kcal/cup (or per gram) to manage total calories accurately',
          'Use puppy/adult/senior & small/large breed formulas as appropriate',
          'Omega-3 (EPA/DHA) supports skin, coat, joints; verify sources',
          'Limited-ingredient diets can help mild sensitivities—consult your vet',
          'Avoid unneeded “grain-free” unless instructed by a veterinarian',
          'Store kibble airtight; note best-by date and lot in case of recalls',
          'Warm refrigerated food slightly to improve aroma and intake',
          'Track stool quality and energy levels after any diet changes',
          'Record brand/recipe changes in a simple feeding log',
          'For medical diets (GI/renal/allergy), follow veterinary guidance only',
          'Recheck fit & tolerance at 6–8 weeks after any change',
          'Keep fresh water available at all times; wash bowls daily',
          'Avoid artificial colors and unclear by-product labelling where possible',
          'Introduce novel proteins under vet guidance for suspected allergies',
          'Do not home-cook long-term without a veterinary nutrition plan',
          'Consult a veterinary nutritionist for complex cases'
        ]
      },
      {
        heading: 'Weight management',
        points: [
          'Calculate daily calories with your vet (RER × factor)',
          'Weigh food with a gram scale; measuring cups are imprecise',
          'Budget training treats into total daily calories',
          'Target 1–2% loss per week under veterinary supervision',
          'Increase fiber gradually (per vet) to aid satiety',
          'Replace high-cal treats with crunchy veggies when appropriate',
          'Use puzzle feeders to slow intake and add enrichment',
          'Daily activity: add 5–10 minutes of walks per week gradually',
          'Track weekly weight + BCS (body condition score)',
          'Audit all chews/treats monthly; many are calorie-dense',
          'Recheck thyroid/medical contributors if weight stalls',
          'Hydration can mask hunger; ensure adequate water',
          'Low-impact strength games preserve muscle during fat loss',
          'Keep a visible progress chart for accountability',
          'Avoid table scraps; “one bite” adds up fast',
          'Reassess calories after goal weight—shift to maintenance',
          'Plan rewards for owners (!) to keep motivation strong',
          'Limit free-feeding; schedule meals to manage portions precisely',
          'Use low-cal kibble as training treats to reduce extras',
          'Quarterly weigh-ins help prevent rebound weight gain'
        ]
      },
      {
        heading: 'Feeding schedules',
        points: [
          'Puppies: 3–4 meals/day; adults: 2; seniors: 2–3 as needed',
          'Feed in a calm, consistent location to reduce stress and gulping',
          'Avoid large meals immediately before/after vigorous exercise',
          'Use slow-feed bowls for fast eaters to reduce GI upset',
          'Set 15–20 minute mealtime windows; pick up leftovers',
          'Warm refrigerated food slightly for aroma/palatability',
          'For multi-dog homes, supervise to prevent resource guarding',
          'Travel with pre-measured, labeled meal packs',
          'Keep weekend/weekday schedule within 30 minutes',
          'Log appetite changes; sudden declines need vet checks',
          'Adjust for meds that require food at set times',
          'Senior dogs may do better with smaller, more frequent meals',
          'Track stool changes when altering schedule or formula',
          'Record brand/lot in case of recalls; check storage dates',
          'Hydrate well—especially during hot weather or heavy exercise',
          'Use feeding time to review simple cues (sit/wait/free)',
          'Avoid feeding from the table; creates begging/stealing patterns',
          'Introduce enrichment feeding (snuffle mats, scatter feeds)',
          'Monthly inventory prevents emergency brand switches',
          'Keep routines: predictable patterns lower anxiety'
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
    popular: true
  },
  {
    id: 'grooming',
    slug: 'grooming-tutorials',
    title: 'Grooming Tutorials',
    summary:
      'Nail clipping, brushing techniques, and managing shedding',
    difficulty: 'beginner',
    durationLabel: '30-60 mins',
    rating: 3
  },
  {
    id: 'health-basics',
    slug: 'first-aid-and-health-basics',
    title: 'First-Aid & Health Basics',
    summary:
      'Recognizing illness signs, emergency tips, and basic care',
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
    summary:
      'Restaurants, parks, trails with user reviews and ratings',
    difficulty: 'beginner',
    durationLabel: 'As needed',
    rating: 4
  },
  {
    id: 'seasonal-safety',
    slug: 'seasonal-safety-tips',
    title: 'Seasonal Safety Tips',
    summary:
      'Heatstroke prevention, winter paw care, weather prep',
    difficulty: 'beginner',
    durationLabel: '30 mins',
    rating: 4
  },
  {
    id: 'myths-debunked',
    slug: 'training-myths-debunked',
    title: 'Training Myths Debunked',
    summary:
      'Evidence-based answers to common training misconceptions',
    difficulty: 'intermediate',
    durationLabel: '1-2 hours',
    rating: 3
  },
  {
    id: 'product-reviews',
    slug: 'product-reviews-and-discounts',
    title: 'Product Reviews & Discounts',
    summary:
      'Curated gear lists with honest reviews and affiliate offers',
    difficulty: 'beginner',
    durationLabel: '15-30 mins',
    rating: 4
  },
  {
    id: 'advanced-sports',
    slug: 'advanced-sports-and-activities',
    title: 'Advanced Sports & Activities',
    summary:
      'Agility training, obedience competitions, nose work',
    difficulty: 'advanced',
    durationLabel: '3-6 months',
    rating: 2
  }
];

export function getTipBySlug(slug: string): Tip | undefined {
  return tips.find((t) => t.slug === slug);
}
