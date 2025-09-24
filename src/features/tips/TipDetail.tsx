import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { tips } from './data';

export default function TipDetail() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const tip = tips.find(t => t.slug === slug);

  if (!tip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Tip not found</h1>
          <Link
            to={`/tips-and-tricks${location.search}`}
            className="inline-flex items-center text-primary hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tips
          </Link>
        </div>
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            to={`/tips-and-tricks${location.search}`}
            className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tips
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            {tip.title}
          </h1>

          <div className="flex items-center gap-4 flex-wrap">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(tip.difficulty)}`}>
              {formatDifficultyLabel(tip.difficulty)}
            </span>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < tip.rating
                      ? 'text-amber-400 fill-current'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                ({tip.rating}/5)
              </span>
            </div>

            {tip.durationLabel && (
              <span className="text-sm text-muted-foreground">
                Duration: {tip.durationLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 p-8">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {tip.summary}
          </p>

          {/* Sections */}
          {tip.sections && tip.sections.length > 0 && (
            <div className="space-y-8">
              {tip.sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    {section.heading}
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* CTA Box */}
          <div className="mt-10 p-6 bg-primary/5 rounded-lg border border-primary/20">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-4">
              This is just a preview of what's available in our comprehensive training program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Start Free Trial
              </button>
              <button className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
                View Premium Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
