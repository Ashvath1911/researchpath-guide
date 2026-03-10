import React from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import { stages } from '@/data/stages';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Target } from 'lucide-react';

const ProgressPage: React.FC = () => {
  const { activeProject, projects, milestones, toggleMilestone } = useProjects();
  const completed = activeProject?.completedStages || [];
  const projectMilestones = milestones.filter(m => m.projectId === activeProject?.id);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="page-heading">Progress Tracking</h1>
      <p className="text-muted-foreground mt-1 mb-8">Track your research journey</p>

      {!activeProject ? (
        <div className="card-elevated p-12 text-center">
          <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-heading text-lg font-semibold mb-2">No active project</h3>
          <p className="text-muted-foreground">Create or select a project to start tracking progress.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="card-elevated p-6">
            <h2 className="font-heading font-semibold mb-4">Overall Progress — {activeProject.title}</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{completed.length} of 18 stages completed</span>
              <span className="font-medium">{activeProject.progress}%</span>
            </div>
            <Progress value={activeProject.progress} className="h-3" />
          </div>

          <div className="card-elevated p-6">
            <h2 className="font-heading font-semibold mb-4">Stage Completion</h2>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-2">
              {stages.map((stage, i) => {
                const done = completed.includes(i);
                return (
                  <div key={stage.id} className="flex flex-col items-center gap-1" title={stage.title}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'stage-complete' : 'stage-upcoming'}`}>
                      {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                    </div>
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">{stage.shortTitle}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-elevated p-6">
            <h2 className="font-heading font-semibold mb-4">Milestones</h2>
            {projectMilestones.length === 0 ? (
              <p className="text-sm text-muted-foreground">No milestones yet. Add milestones from your project settings.</p>
            ) : (
              <div className="space-y-2">
                {projectMilestones.map(m => (
                  <button key={m.id} onClick={() => toggleMilestone(m.id)} className="flex items-center gap-3 text-sm w-full text-left hover:bg-muted/50 rounded-lg p-1.5 -ml-1.5 transition-colors">
                    {m.completed ? <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: 'hsl(var(--sage))' }} /> : <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />}
                    <span className={m.completed ? 'line-through text-muted-foreground' : ''}>{m.title}</span>
                    {m.dueDate && <span className="text-xs text-muted-foreground ml-auto">{m.dueDate}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {projects.length > 1 && (
            <div className="card-elevated p-6">
              <h2 className="font-heading font-semibold mb-4">All Projects</h2>
              <div className="space-y-3">
                {projects.filter(p => p.status !== 'archived').map(p => (
                  <div key={p.id} className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{p.title}</p>
                      <Progress value={p.progress} className="h-1.5 mt-1" />
                    </div>
                    <span className="text-sm text-muted-foreground">{p.progress}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
