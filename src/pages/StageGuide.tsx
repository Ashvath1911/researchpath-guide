import React from 'react';
import { Link } from 'react-router-dom';
import { stages } from '@/data/stages';
import { useProjects } from '@/contexts/ProjectContext';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

const StageGuide: React.FC = () => {
  const { activeProject } = useProjects();
  const completed = activeProject?.completedStages || [];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="page-heading">Research Stage Guide</h1>
      <p className="text-muted-foreground mt-1 mb-8">Your complete research workflow — enter at any stage</p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-1">
          {stages.map((stage, i) => {
            const isComplete = completed.includes(i);
            const isCurrent = activeProject?.currentStageIndex === i;
            return (
              <Link key={stage.id} to={`/stages/${stage.id}`} className="card-interactive p-4 flex items-center gap-4 relative ml-0">
                <div className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-full text-sm font-bold z-10 ${isComplete ? 'stage-complete' : isCurrent ? 'stage-current' : 'stage-upcoming'}`}>
                  {isComplete ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{stage.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StageGuide;
