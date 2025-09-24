import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Star, Clock, Users, Award, BookOpen, ArrowUpDown } from 'lucide-react';

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

export default function TipsAndTricks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortByRating, setSortByRating] = useState(false);

  const searchTerm = searchParams.get('q') || '';
  const selectedDifficulty = searchParams.get('level') || 'All';
  const sortParam = searchParams.get('sort');

  useEffect(() => {
    setSortByRating(sortParam === 'rating');
  }, [sortParam]);

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const filteredAndSortedCategories = tipCategories
    .filter(category => {
      const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'All' || category.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => {
      if (sortByRating) {
        return b.popularity - a.popularity;
      }
      return 0; // Keep original order
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-100/80 text-emerald-800 border-emerald-200';
      case 'Intermediate': return 'bg-amber-100/80 text-amber-800 border-amber-200';
      case 'Advanced': return 'bg-rose-100/80 text-rose-800 border-rose-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 pb-20">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm shadow-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                🎓 Dog Training Tips & Tricks
              </h1>
              <p className="mt-2 text-muted-foreground">Expert guidance for every stage of your dog's journey</p>
            </div>
            <Link 
              to="/discover" 
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent/50 transition-colors text-sm"
            >
              ← Back to Discover
            </Link>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tips and guides..."
              value={searchTerm}
              onChange={(e) => updateSearchParams('q', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background/50 backdrop-blur-sm transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => updateSearchParams('level', difficulty)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background/50 text-foreground border border-border hover:bg-accent/50'
                }`}
              >
                {difficulty}
              </button>
            ))}
            <button
              onClick={() => {
                setSortByRating(!sortByRating);
                updateSearchParams('sort', !sortByRating ? 'rating' : '');
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                sortByRating
                  ? 'bg-secondary text-secondary-foreground shadow-lg'
                  : 'bg-background/50 text-foreground border border-border hover:bg-accent/50'
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              Rating
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing {filteredAndSortedCategories.length} of {tipCategories.length} guides
          {sortByRating && <span className="ml-2 text-secondary">• Sorted by rating</span>}
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCategories.map((category) => (
            <div
              key={category.id}
              className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 p-6 hover:shadow-warm transition-all duration-300 cursor-pointer group paw-animation"
            >
              {/* Category Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < category.popularity
                          ? 'text-amber-400 fill-current'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {category.description}
              </p>

              {/* Meta Information */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(category.difficulty)}`}>
                  {category.difficulty}
                </span>
                
                <div className="flex items-center text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {category.estimatedTime}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <Link 
                  to={`/tips/${category.id}`}
                  className="flex items-center text-primary font-medium text-sm group-hover:text-secondary transition-colors"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex items-center text-muted-foreground text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  Popular
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-foreground mb-2">No guides found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filter settings
            </p>
            <button
              onClick={() => {
                setSearchParams(new URLSearchParams());
                setSortByRating(false);
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 bg-primary/5 backdrop-blur-sm rounded-2xl border border-primary/20 p-8 text-center">
          <Award className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Become a Dog Training Expert
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of dog owners who have transformed their relationship with their pets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Start Free Trial
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
              View All Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}