import React from 'react';
import { tools } from '@/data/tools';
import { FlaskConical, Target, Lightbulb, Crosshair, Filter, Search, Table, Scale, PenTool, CheckSquare, BookMarked, TrendingUp } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  FlaskConical, Target, Lightbulb, Crosshair, Filter, Search, Table, Scale, PenTool, CheckSquare, BookMarked, TrendingUp,
};

const categoryColors: Record<string, string> = {
  Planning: 'hsl(var(--sage))',
  Search: 'hsl(var(--info))',
  'Data Collection': 'hsl(var(--primary))',
  'Quality Assessment': 'hsl(var(--amber))',
  Writing: 'hsl(var(--sage))',
  Submission: 'hsl(var(--primary))',
  Learning: 'hsl(var(--info))',
  Progress: 'hsl(var(--sage))',
};

const Tools: React.FC = () => (
  <div className="p-6 lg:p-8 max-w-5xl mx-auto">
    <h1 className="page-heading">Tools Hub</h1>
    <p className="text-muted-foreground mt-1 mb-8">Interactive utilities to guide your research process</p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map(tool => {
        const Icon = iconMap[tool.icon] || FlaskConical;
        return (
          <div key={tool.id} className="card-interactive p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: `${categoryColors[tool.category] || 'hsl(var(--muted))'}20` }}>
                <Icon className="h-5 w-5" style={{ color: categoryColors[tool.category] || 'hsl(var(--foreground))' }} />
              </div>
              <span className="sage-badge">{tool.category}</span>
            </div>
            <h3 className="font-heading font-semibold mb-1">{tool.title}</h3>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default Tools;
