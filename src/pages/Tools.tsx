import React, { useState } from 'react';
import { tools } from '@/data/tools';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FlaskConical, Target, Lightbulb, Crosshair, Filter, Search, Table, Scale, PenTool, CheckSquare, BookMarked, TrendingUp } from 'lucide-react';
import StudyDesignChooser from '@/components/tools/StudyDesignChooser';
import PICOBuilder from '@/components/tools/PICOBuilder';
import ObjectiveBuilder from '@/components/tools/ObjectiveBuilder';
import InclusionExclusionBuilder from '@/components/tools/InclusionExclusionBuilder';
import SearchStringBuilder from '@/components/tools/SearchStringBuilder';
import RoBToolChooser from '@/components/tools/RoBToolChooser';
import ManuscriptPlanner from '@/components/tools/ManuscriptPlanner';

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

const interactiveTools = new Set([
  'study-design-chooser', 'pico-builder', 'objective-builder',
  'inclusion-exclusion-builder', 'search-string-builder',
  'rob-tool-chooser', 'manuscript-section-planner',
]);

const Tools: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const { session } = useAuth();
  const { activeProject } = useProjects();
  const { toast } = useToast();

  const handleSave = async (toolId: string, toolTitle: string, inputs: Record<string, string>, output: Record<string, string>) => {
    if (!session?.user) return;
    const { error } = await supabase.from('tool_outputs').insert({
      user_id: session.user.id,
      project_id: activeProject?.id || null,
      tool_id: toolId,
      tool_title: toolTitle,
      inputs,
      output,
    });
    if (error) { toast({ title: 'Error saving', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Output saved successfully' });
  };

  const makeSave = (toolId: string, toolTitle: string) => (inputs: Record<string, string>, output: Record<string, string>) => handleSave(toolId, toolTitle, inputs, output);

  if (activeTool) {
    const tool = tools.find(t => t.id === activeTool);
    const onBack = () => setActiveTool(null);
    const save = tool ? makeSave(tool.id, tool.title) : undefined;

    switch (activeTool) {
      case 'study-design-chooser': return <div className="p-6 lg:p-8 max-w-4xl mx-auto"><StudyDesignChooser onBack={onBack} onSave={save} /></div>;
      case 'pico-builder': return <div className="p-6 lg:p-8 max-w-4xl mx-auto"><PICOBuilder onBack={onBack} onSave={save} /></div>;
      case 'objective-builder': return <div className="p-6 lg:p-8 max-w-4xl mx-auto"><ObjectiveBuilder onBack={onBack} onSave={save} /></div>;
      case 'inclusion-exclusion-builder': return <div className="p-6 lg:p-8 max-w-4xl mx-auto"><InclusionExclusionBuilder onBack={onBack} onSave={save} /></div>;
      case 'search-string-builder': return <div className="p-6 lg:p-8 max-w-4xl mx-auto"><SearchStringBuilder onBack={onBack} onSave={save} /></div>;
      case 'rob-tool-chooser': return <div className="p-6 lg:p-8 max-w-4xl mx-auto"><RoBToolChooser onBack={onBack} onSave={save} /></div>;
      case 'manuscript-section-planner': return <div className="p-6 lg:p-8 max-w-4xl mx-auto"><ManuscriptPlanner onBack={onBack} onSave={save} /></div>;
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="page-heading">Tools Hub</h1>
      <p className="text-muted-foreground mt-1 mb-8">Interactive utilities to guide your research process</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => {
          const Icon = iconMap[tool.icon] || FlaskConical;
          const isInteractive = interactiveTools.has(tool.id);
          return (
            <div
              key={tool.id}
              className={`card-interactive p-5 ${isInteractive ? 'cursor-pointer' : 'opacity-75'}`}
              onClick={() => isInteractive && setActiveTool(tool.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: `${categoryColors[tool.category] || 'hsl(var(--muted))'}20` }}>
                  <Icon className="h-5 w-5" style={{ color: categoryColors[tool.category] || 'hsl(var(--foreground))' }} />
                </div>
                <div className="flex gap-2">
                  <span className="sage-badge">{tool.category}</span>
                  {isInteractive && <span className="sage-badge" style={{ background: 'hsl(var(--info-light))', color: 'hsl(var(--info))' }}>Interactive</span>}
                </div>
              </div>
              <h3 className="font-heading font-semibold mb-1">{tool.title}</h3>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tools;
