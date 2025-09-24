import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Users, Award, BookOpen, Target, CheckCircle } from 'lucide-react';

interface TipCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  popularity: number;
}

const tipCategories: TipCategory[] = [
  {
    id: 'obedience',
    title: 'Step-by-Step Obedience Programs',
    description: 'Structured video courses from basic commands to advanced training techniques',
    icon: '🎓',
    difficulty: 'Beginner',
    estimatedTime: '2-8 weeks',
    popularity: 5
  },
  {
    id: 'puppy-essentials',
    title: 'Puppy Training Essentials',
    description: 'Crate training, housebreaking, and crucial socialization techniques',
    icon: '🐶',
    difficulty: 'Beginner',
    estimatedTime: '4-12 weeks',
    popularity: 5
  },
  {
    id: 'behavior-problems',
    title: 'Behavior Problem Solver',
    description: 'Proven methods to curb barking, chewing, aggression, and other issues',
    icon: '🔧',
    difficulty: 'Intermediate',
    estimatedTime: '2-6 weeks',
    popularity: 4
  },
  {
    id: 'breed-guides',
    title: 'Breed-Specific Care Guides',
    description: 'Tailored advice and training tips for popular dog breeds',
    icon: '🏷️',
    difficulty: 'Beginner',
    estimatedTime: '1-2 weeks',
    popularity: 4
  },
  {
    id: 'nutrition',
    title: 'Nutrition & Feeding Plans',
    description: 'Vet-approved diets, weight management, and feeding schedules',
    icon: '🥘',
    difficulty: 'Beginner',
    estimatedTime: '1 week',
    popularity: 4
  },
  {
    id: 'mental-enrichment',
    title: 'Mental Enrichment Games',
    description: 'Puzzle toys, scent work, and DIY enrichment activities',
    icon: '🧩',
    difficulty: 'Beginner',
    estimatedTime: 'Ongoing',
    popularity: 5
  },
  {
    id: 'grooming',
    title: 'Grooming Tutorials',
    description: 'Nail clipping, brushing techniques, and managing shedding',
    icon: '✂️',
    difficulty: 'Beginner',
    estimatedTime: '30-60 mins',
    popularity: 3
  },
  {
    id: 'health-basics',
    title: 'First-Aid & Health Basics',
    description: 'Recognizing illness signs, emergency tips, and basic care',
    icon: '🏥',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    popularity: 4
  },
  {
    id: 'senior-care',
    title: 'Senior Dog Care',
    description: 'Mobility exercises, dietary adjustments for aging dogs',
    icon: '👴',
    difficulty: 'Intermediate',
    estimatedTime: 'Ongoing',
    popularity: 3
  },
  {
    id: 'travel',
    title: 'Traveling with Your Dog',
    description: 'Packing checklists, hotel policies, airline requirements',
    icon: '✈️',
    difficulty: 'Beginner',
    estimatedTime: '1-2 hours prep',
    popularity: 3
  },
  {
    id: 'venues',
    title: 'Dog-Friendly Venues',
    description: 'Restaurants, parks, trails with user reviews and ratings',
    icon: '📍',
    difficulty: 'Beginner',
    estimatedTime: 'As needed',
    popularity: 4
  },
  {
    id: 'seasonal-safety',
    title: 'Seasonal Safety Tips',
    description: 'Heatstroke prevention, winter paw care, weather prep',
    icon: '🌡️',
    difficulty: 'Beginner',
    estimatedTime: '30 mins',
    popularity: 4
  },
  {
    id: 'myths-debunked',
    title: 'Training Myths Debunked',
    description: 'Evidence-based answers to common training misconceptions',
    icon: '🔍',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 hours',
    popularity: 3
  },
  {
    id: 'product-reviews',
    title: 'Product Reviews & Discounts',
    description: 'Curated gear lists with honest reviews and affiliate offers',
    icon: '🛒',
    difficulty: 'Beginner',
    estimatedTime: '15-30 mins',
    popularity: 4
  },
  {
    id: 'advanced-sports',
    title: 'Advanced Sports & Activities',
    description: 'Agility training, obedience competitions, nose work',
    icon: '🏆',
    difficulty: 'Advanced',
    estimatedTime: '3-6 months',
    popularity: 2
  }
];

export default function TipDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const tip = tipCategories.find(category => category.id === slug);

  if (!tip) {
    return <Navigate to="/tips-and-tricks" replace />;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-100/80 text-emerald-800 border-emerald-200';
      case 'Intermediate': return 'bg-amber-100/80 text-amber-800 border-amber-200';
      case 'Advanced': return 'bg-rose-100/80 text-rose-800 border-rose-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const sampleSteps = [
    'Start with basic foundations and safety setup',
    'Learn the essential techniques step-by-step',
    'Practice daily with consistency and patience',
    'Monitor progress and adjust approach as needed',
    'Apply learned skills in real-world scenarios'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm shadow-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/tips-and-tricks" 
              className="flex items-center px-3 py-2 border border-border rounded-lg hover:bg-accent/50 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tips
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="text-6xl">{tip.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {tip.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-4">{tip.description}</p>
              
              <div className="flex flex-wrap items-center gap-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(tip.difficulty)}`}>
                  {tip.difficulty}
                </span>
                
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-medium">{tip.estimatedTime}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < tip.popularity
                          ? 'text-amber-400 fill-current'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                  <span className="text-muted-foreground ml-2">({tip.popularity}/5)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Overview */}
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">What You'll Learn</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This comprehensive guide will walk you through everything you need to know about {tip.title.toLowerCase()}. 
            Whether you're a complete beginner or looking to refine your technique, this course provides practical, 
            actionable steps that you can implement immediately with your dog.
          </p>
        </div>

        {/* Steps Preview */}
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Training Steps</h2>
          </div>
          
          <div className="space-y-4">
            {sampleSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">{step}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Premium CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-8 text-center">
          <Award className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Unlock Full Training Program
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get access to video tutorials, downloadable guides, progress tracking, and personalized tips 
            from certified dog trainers. Start your journey to better dog training today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Start Free Trial
            </button>
            <Link 
              to="/premium"
              className="px-8 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors inline-block"
            >
              View Premium Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}