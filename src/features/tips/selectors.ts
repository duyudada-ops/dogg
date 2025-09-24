import { Tip, TipDifficulty } from './data';

export function filterTips(
  tips: Tip[], 
  filters: { q?: string; level?: TipDifficulty | 'all' }
): Tip[] {
  return tips.filter(tip => {
    // Search filter - normalize and match in title or summary
    if (filters.q) {
      const query = filters.q.toLowerCase().trim();
      if (query) {
        const titleMatch = tip.title.toLowerCase().includes(query);
        const summaryMatch = tip.summary.toLowerCase().includes(query);
        if (!titleMatch && !summaryMatch) {
          return false;
        }
      }
    }

    // Difficulty filter
    if (filters.level && filters.level !== 'all') {
      if (tip.difficulty !== filters.level) {
        return false;
      }
    }

    return true;
  });
}

export function sortTips(
  tips: Tip[], 
  options: { sort?: 'rating-desc' | 'rating-asc' | 'popular' }
): Tip[] {
  const sortedTips = [...tips];
  
  switch (options.sort) {
    case 'rating-asc':
      return sortedTips.sort((a, b) => a.rating - b.rating);
    case 'popular':
      return sortedTips.sort((a, b) => {
        // Popular items first, then by rating desc
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        return b.rating - a.rating;
      });
    case 'rating-desc':
    default:
      return sortedTips.sort((a, b) => b.rating - a.rating);
  }
}