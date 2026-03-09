import React from 'react';
import { learningModules } from '@/data/learning';
import { Clock, BookOpen, GraduationCap } from 'lucide-react';
import CautionBox from '@/components/CautionBox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LearningModule } from '@/types';

const LearningCenter: React.FC = () => {
  const [selected, setSelected] = React.useState<LearningModule | null>(null);
  const categories = [...new Set(learningModules.map(m => m.category))];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="page-heading">Learning Center</h1>
      <p className="text-muted-foreground mt-1 mb-8">Mini-guides and quick lessons for beginner researchers</p>

      {categories.map(cat => (
        <div key={cat} className="mb-8">
          <h2 className="section-heading mb-4">{cat}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {learningModules.filter(m => m.category === cat).map(mod => (
              <div key={mod.id} className="card-interactive p-5" onClick={() => setSelected(mod)}>
                <GraduationCap className="h-6 w-6 mb-2" style={{ color: 'hsl(var(--info))' }} />
                <h3 className="font-heading font-semibold mb-1">{mod.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{mod.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{mod.duration}</span>
                  <span className="sage-badge">{mod.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">{selected.title}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{selected.duration}</span>
              <span className="sage-badge">{selected.difficulty}</span>
            </div>
            <div className="prose prose-sm max-w-none">
              {selected.content.split('\n').map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={i} className="font-heading font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.startsWith('- ') || line.startsWith('1. ')) {
                  return <p key={i} className="text-sm text-muted-foreground ml-4">{line}</p>;
                }
                if (line.trim() === '') return <br key={i} />;
                return <p key={i} className="text-sm text-muted-foreground">{line}</p>;
              })}
            </div>
          </DialogContent>
        )}
      </Dialog>

      <CautionBox className="mt-8">
        <p>These guides provide foundational knowledge. For specific methodological questions, consult your supervisor or a research methodologist.</p>
      </CautionBox>
    </div>
  );
};

export default LearningCenter;
