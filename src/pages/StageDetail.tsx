import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stages } from '@/data/stages';
import { useProjects } from '@/contexts/ProjectContext';
import { templates } from '@/data/templates';
import { tools } from '@/data/tools';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert, HelpCircle, Lightbulb, FileStack, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import CautionBox from '@/components/CautionBox';

const StageDetail: React.FC = () => {
  const { id } = useParams();
  const stage = stages.find(s => s.id === id);
  const { activeProject, toggleStageComplete, updateProject } = useProjects();
  const [notes, setNotes] = useState('');

  if (!stage) return <div className="p-8">Stage not found.</div>;

  const prev = stage.index > 0 ? stages[stage.index - 1] : null;
  const next = stage.index < 17 ? stages[stage.index + 1] : null;
  const isComplete = activeProject?.completedStages.includes(stage.index) || false;

  const relatedTemplates = stage.relatedTemplates.map(id => templates.find(t => t.id === id)).filter(Boolean);
  const relatedTools = stage.relatedTools.map(id => tools.find(t => t.id === id)).filter(Boolean);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <Link to="/stages" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> All Stages
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <div className="stage-current h-10 w-10 text-sm font-bold">{stage.index + 1}</div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Stage {stage.index + 1} of 18</p>
          <h1 className="text-2xl lg:text-3xl font-heading font-bold">{stage.title}</h1>
        </div>
      </div>

      {/* What & Why */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="card-elevated p-5">
          <h3 className="font-heading font-semibold mb-2">What this stage means</h3>
          <p className="text-sm text-muted-foreground">{stage.description}</p>
        </div>
        <div className="card-elevated p-5">
          <h3 className="font-heading font-semibold mb-2">Why it matters</h3>
          <p className="text-sm text-muted-foreground">{stage.whyItMatters}</p>
        </div>
      </div>

      {/* Step-by-step */}
      <h2 className="section-heading mt-8 mb-4">Step-by-Step Guide</h2>
      <div className="card-elevated p-5">
        <ol className="space-y-3">
          {stage.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Common Mistakes */}
      <h2 className="section-heading mt-8 mb-4">Common Beginner Mistakes</h2>
      <div className="card-elevated p-5">
        <ul className="space-y-2">
          {stage.commonMistakes.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'hsl(var(--amber))' }} />
              {m}
            </li>
          ))}
        </ul>
      </div>

      {/* Checklist */}
      <h2 className="section-heading mt-8 mb-4">Checklist</h2>
      <div className="card-elevated p-5 space-y-3">
        {stage.checklist.map(item => (
          <label key={item.id} className="flex items-center gap-3 text-sm cursor-pointer">
            <Checkbox />
            <span>{item.label}</span>
          </label>
        ))}
      </div>

      {/* Red Flags */}
      {stage.redFlags.length > 0 && (
        <>
          <h2 className="section-heading mt-8 mb-4">Red Flags</h2>
          <div className="card-elevated p-5">
            <ul className="space-y-2">
              {stage.redFlags.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ShieldAlert className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* When to seek help */}
      <div className="info-box mt-6 flex gap-3">
        <HelpCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--info))' }} />
        <div>
          <p className="font-medium text-sm">When to Seek Expert Help</p>
          <p className="text-sm mt-1">{stage.whenToSeekHelp}</p>
        </div>
      </div>

      {/* Tips */}
      {stage.tips.length > 0 && (
        <>
          <h2 className="section-heading mt-8 mb-4">Tips</h2>
          <div className="card-elevated p-5">
            <ul className="space-y-2">
              {stage.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'hsl(var(--sage))' }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Examples */}
      {stage.examples.length > 0 && (
        <>
          <h2 className="section-heading mt-8 mb-4">Examples</h2>
          <div className="card-elevated p-5 space-y-2">
            {stage.examples.map((e, i) => (
              <p key={i} className="text-sm italic text-muted-foreground">"{e}"</p>
            ))}
          </div>
        </>
      )}

      {/* Related Templates & Tools */}
      {(relatedTemplates.length > 0 || relatedTools.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {relatedTemplates.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold mb-3 flex items-center gap-2"><FileStack className="h-4 w-4" /> Templates</h3>
              <div className="space-y-2">
                {relatedTemplates.map(t => t && (
                  <Link key={t.id} to="/templates" className="card-interactive p-3 block">
                    <p className="font-medium text-sm">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {relatedTools.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold mb-3 flex items-center gap-2"><Wrench className="h-4 w-4" /> Tools</h3>
              <div className="space-y-2">
                {relatedTools.map(t => t && (
                  <Link key={t.id} to="/tools" className="card-interactive p-3 block">
                    <p className="font-medium text-sm">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Notes */}
      <h2 className="section-heading mt-8 mb-4">Your Notes</h2>
      <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add your notes for this stage..." className="min-h-[120px]" />

      {/* Stage completion */}
      {activeProject && (
        <div className="mt-6">
          <Button variant={isComplete ? 'outline' : 'default'} onClick={() => toggleStageComplete(activeProject.id, stage.index)}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {isComplete ? 'Mark as Incomplete' : 'Mark Stage as Complete'}
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-border">
        {prev ? (
          <Link to={`/stages/${prev.id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> {prev.shortTitle}
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/stages/${next.id}`} className="flex items-center gap-2 text-sm text-primary font-medium hover:underline">
            {next.shortTitle} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : <div />}
      </div>

      <CautionBox className="mt-8">
        <p>This is educational guidance, not a substitute for expert supervision. Advanced statistics should be reviewed with an expert.</p>
      </CautionBox>
    </div>
  );
};

export default StageDetail;
