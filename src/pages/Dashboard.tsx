import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';
import { stages } from '@/data/stages';
import { ArrowRight, FolderOpen, Compass, Wrench, FileStack, BookOpen, GraduationCap, Play, Plus, Target, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CautionBox from '@/components/CautionBox';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { projects, activeProject, isLoading } = useProjects();
  const navigate = useNavigate();

  const currentStage = activeProject ? stages[activeProject.currentStageIndex] : null;
  const nextStage = activeProject && activeProject.currentStageIndex < 17 ? stages[activeProject.currentStageIndex + 1] : null;

  const quickLinks = [
    { title: 'Templates', desc: 'Ready-to-use research templates', icon: FileStack, to: '/templates', color: 'hsl(var(--sage))' },
    { title: 'Tools', desc: 'Interactive research utilities', icon: Wrench, to: '/tools', color: 'hsl(var(--primary))' },
    { title: 'Glossary', desc: 'Research terminology explained', icon: BookOpen, to: '/glossary', color: 'hsl(var(--amber))' },
    { title: 'Learning', desc: 'Mini-guides and lessons', icon: GraduationCap, to: '/learning', color: 'hsl(var(--info))' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      <div className="card-elevated p-6 lg:p-8" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(224 40% 18%))' }}>
        <h1 className="text-2xl lg:text-3xl font-heading font-bold" style={{ color: 'hsl(var(--primary-foreground))' }}>
          Welcome back{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}
        </h1>
        <p className="mt-1 opacity-80" style={{ color: 'hsl(var(--primary-foreground))' }}>
          {activeProject ? `Continue working on "${activeProject.title}"` : 'Create a project to begin your research journey'}
        </p>
        <div className="mt-4 flex gap-3">
          {activeProject ? (
            <Button onClick={() => navigate(`/stages/${currentStage?.id}`)} className="bg-sage text-sage-foreground hover:bg-sage/90">
              <Play className="h-4 w-4 mr-2" /> Resume Stage
            </Button>
          ) : (
            <Button onClick={() => navigate('/projects')} className="bg-sage text-sage-foreground hover:bg-sage/90">
              <Plus className="h-4 w-4 mr-2" /> New Project
            </Button>
          )}
        </div>
      </div>

      {activeProject && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card-elevated p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold">Current Project</h3>
              <Link to="/projects" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            <p className="font-medium">{activeProject.title}</p>
            <p className="text-sm text-muted-foreground mt-1">{activeProject.researchType || 'No type selected'} • {activeProject.specialty || 'No specialty'}</p>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{activeProject.progress}%</span>
              </div>
              <Progress value={activeProject.progress} className="h-2" />
            </div>
          </div>
          <div className="card-elevated p-5">
            <h3 className="font-heading font-semibold mb-3">Current Stage</h3>
            {currentStage && (
              <>
                <div className="flex items-center gap-2">
                  <div className="stage-current h-7 w-7 text-xs font-bold">{currentStage.index + 1}</div>
                  <span className="font-medium">{currentStage.title}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{currentStage.description}</p>
                {nextStage && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    <span>Next: {nextStage.title}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card-elevated p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: 'hsl(var(--sage-light))' }}>
            <Target className="h-6 w-6" style={{ color: 'hsl(var(--sage))' }} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Projects</p>
            <p className="text-2xl font-heading font-bold">{projects.length}</p>
          </div>
        </div>
        <div className="card-elevated p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: 'hsl(var(--info-light))' }}>
            <TrendingUp className="h-6 w-6" style={{ color: 'hsl(var(--info))' }} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stages Completed</p>
            <p className="text-2xl font-heading font-bold">{activeProject?.completedStages.length || 0}</p>
          </div>
        </div>
        <div className="card-elevated p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: 'hsl(var(--amber-light))' }}>
            <Compass className="h-6 w-6" style={{ color: 'hsl(var(--amber))' }} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Research Track</p>
            <p className="text-lg font-heading font-semibold truncate">{activeProject?.researchType || 'None'}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="section-heading mb-4">Quick Access</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(item => (
            <Link key={item.title} to={item.to} className="card-interactive p-5 group">
              <item.icon className="h-8 w-8 mb-3" style={{ color: item.color }} />
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <CautionBox>
        <p className="font-medium">Educational Guidance Only</p>
        <p className="mt-1">ResearchPath provides structured educational guidance. It is not a substitute for expert supervision, statistical consulting, or institutional review.</p>
      </CautionBox>
    </div>
  );
};

export default Dashboard;
