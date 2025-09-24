import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { ChevronRight, Star, Clock, Users, Award, BookOpen, ArrowUpDown } from 'lucide-react';
import { tips } from '../features/tips/data';
import { filterTips, sortTips } from '../features/tips/selectors';

// Icon mapping for the tips
const tipIcons: Record<string, string> = {
  'obedience': '🎓',
  'puppy-essentials': '🐶',
  'behavior-problems': '🔧',
  'breed-guides': '🏷️',
  'nutrition': '🥘',
  'mental-enrichment': '🧩',
  'grooming': '✂️',
  'health-basics': '🏥',
  'senior-care': '👴',
  'travel': '✈️',
  'venues': '📍',
  'seasonal-safety': '🌡️',
  'myths-debunked': '🔍',
  'product-reviews': '🛒',
  'advanced-sports': '🏆'
};

// Debounce hook
function useDebounced<T>(value: T, ms = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

export default function TipsAndTricks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Derive state from URL params
  const q = searchParams.get('q') || '';
  const levelParam = searchParams.get('level') || 'all';
  const sortParam = searchParams.get('sort') || 'rating-desc';

  // Local search input state for immediate UI feedback
  const [searchInput, setSearchInput] = useState(q);
  const debouncedSearch = useDebounced(searchInput);

  // Update URL when debounced search changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearch && debouncedSearch !== '') {
      newParams.set('q', debouncedSearch);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams, { replace: true });
  }, [debouncedSearch, searchParams, setSearchParams]);

  // Sync input with URL when URL changes externally (e.g., back button)
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  // Map UI difficulty labels to data format
  const difficultyMapping = {
    'All': 'all',
    'Beginner': 'beginner', 
    'Intermediate': 'intermediate',
    'Advanced': 'advanced'
  } as const;

  const reverseDifficultyMapping = {
    'all': 'All',
    'beginner': 'Beginner',
    'intermediate': 'Intermediate', 
    'advanced': 'Advanced'
  } as const;

  const selectedDifficultyUI = reverseDifficultyMapping[levelParam as keyof typeof reverseDifficultyMapping] || 'All';

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all' && value !== '') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleDifficultyClick = (difficulty: string) => {
    const mappedValue = difficultyMapping[difficulty as keyof typeof difficultyMapping];
    updateSearchParams('level', mappedValue);
  };

  const handleSortChange = (sortValue: string) => {
    updateSearchParams('sort', sortValue);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchInput('');
    }
  };

  // Compute visible tips using selectors
  const visibleTips = useMemo(() => {
    const level = levelParam === 'all' ? undefined : levelParam;
    const filtered = filterTips(tips, { q, level: level as any });
    return sortTips(filtered, { sort: sortParam as any });
  }, [q, levelParam, sortParam]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-emerald-100/80 text-emerald-800 border-emerald-200';
      case 'intermediate': return 'bg-amber-100/80 text-amber-800 border-amber-200';
      case 'advanced': return 'bg-rose-100/80 text-rose-800 border-rose-200';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDifficultyLabel = (difficulty: string) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background/50 backdrop-blur-sm transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyClick(difficulty)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDifficultyUI === difficulty
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background/50 text-foreground border border-border hover:bg-accent/50'
                }`}
              >
                {difficulty}
              </button>
            ))}
            <div className="flex gap-1 bg-background/50 border border-border rounded-lg p-1">
              {[
                { value: 'rating-desc', label: 'Top rated' },
                { value: 'rating-asc', label: 'Rising' },
                { value: 'popular', label: 'Popular' }
              ].map((sortOption) => (
                <button
                  key={sortOption.value}
                  onClick={() => handleSortChange(sortOption.value)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    sortParam === sortOption.value
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-accent/50'
                  }`}
                >
                  {sortOption.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing {visibleTips.length} of {tips.length} guides
          {sortParam === 'popular' && <span className="ml-2 text-secondary">• Sorted by popularity</span>}
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 p-6 hover:shadow-warm transition-all duration-300 cursor-pointer group paw-animation"
            >
              {/* Category Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl mb-2">{tipIcons[tip.id] || '📖'}</div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < tip.rating
                          ? 'text-amber-400 fill-current'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {tip.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {tip.summary}
              </p>

              {/* Meta Information */}
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(tip.difficulty)}`}>
                  {formatDifficultyLabel(tip.difficulty)}
                </span>
                
                <div className="flex items-center text-muted-foreground text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {tip.durationLabel}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <Link 
                  to={`/tips/${tip.slug}${location.search}`}
                  className="flex items-center text-primary font-medium text-sm group-hover:text-secondary transition-colors"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <div className="flex items-center text-muted-foreground text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {tip.popular ? 'Popular' : 'Guide'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {visibleTips.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-foreground mb-2">No guides found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filter settings
            </p>
            <button
              onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
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