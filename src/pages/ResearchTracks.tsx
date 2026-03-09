import React from 'react';
import { Link } from 'react-router-dom';
import { tracks } from '@/data/tracks';
import { BookOpen, BarChart3, Database, FileText, ClipboardCheck, ScrollText, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  BookOpen, BarChart3, Database, FileText, ClipboardCheck, ScrollText,
};

const ResearchTracks: React.FC = () => (
  <div className="p-6 lg:p-8 max-w-5xl mx-auto">
    <h1 className="page-heading">Research Tracks</h1>
    <p className="text-muted-foreground mt-1 mb-8">Choose the research type that matches your project</p>

    <div className="grid md:grid-cols-2 gap-5">
      {tracks.map(track => {
        const Icon = iconMap[track.icon] || BookOpen;
        return (
          <Link key={track.id} to={`/tracks/${track.id}`} className="card-interactive p-6 group">
            <Icon className="h-8 w-8 mb-3" style={{ color: 'hsl(var(--sage))' }} />
            <h3 className="text-lg font-heading font-semibold mb-2">{track.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{track.description}</p>
            <div className="mt-4 flex items-center gap-1 text-sm text-primary font-medium">
              Explore track <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        );
      })}
    </div>
  </div>
);

export default ResearchTracks;
