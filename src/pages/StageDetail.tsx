import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stages } from '@/data/stages';
import { useProjects } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { templates } from '@/data/templates';
import { tools } from '@/data/tools';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert, HelpCircle, Lightbulb, FileStack, Wrench, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import CautionBox from '@/components/CautionBox';
import { useToast } from '@/hooks/use-toast';

const StageDetail: React.FC = () => {
  const { id } = useParams();
  const stage = stages.find(s => s.id === id);
  const { activeProject, toggleStageComplete } = useProjects();
  const { session } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [noteId, setNoteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});

  // Load saved notes and checklist for this stage
  const loadStageData = useCallback(async () => {
    if (!session?.user || !activeProject || !stage) return;

    // Load notes
    const { data: noteData } = await supabase
      .from('project_notes')
      .select('*')
      .eq('project_id', activeProject.id)
      .eq('stage_id', stage.id)
      .order('updated_at', { ascending: false })
      .limit(1);

    if (noteData && noteData.length > 0) {
      setNotes(noteData[0].content);
      setNoteId(noteData[0].id);
    } else {
      setNotes('');
      setNoteId(null);
    }

    // Load checklist state
    const { data: stageData } = await supabase
      .from('project_stages')
      .select('*')
      .eq('project_id', activeProject.id)
      .eq('stage_id', stage.id)
      .single();

    if (stageData?.checklist_state && typeof stageData.checklist_state === 'object') {
      setChecklistState(stageData.checklist_state as Record<string, boolean>);
    } else {
      setChecklistState({});
    }
  }, [session?.user, activeProject?.id, stage?.id]);

  useEffect(() => { loadStageData(); }, [loadStageData]);

  const saveNotes = async () => {
    if (!session?.user || !activeProject || !stage) return;
    setSaving(true);
    if (noteId) {
      await supabase.from('project_notes').update({ content: notes }).eq('id', noteId);
    } else {
      const { data } = await supabase.from('project_notes').insert({
        project_id: activeProject.id,
        user_id: session.user.id,
        stage_id: stage.id,
        content: notes,
      }).select().single();
      if (data) setNoteId(data.id);
    }
    setSaving(false);
    toast({ title: 'Notes saved' });
  };

  const toggleChecklist = async (itemId: string) => {
    if (!session?.user || !activeProject || !stage) return;
    const newState = { ...checklistState, [itemId]: !checklistState[itemId] };
    setChecklistState(newState);

    // Upsert stage checklist state
    const { data: existing } = await supabase
      .from('project_stages')
      .select('id')
      .eq('project_id', activeProject.id)
      .eq('stage_id', stage.id)
      .single();

    if (existing) {
      await supabase.from('project_stages').update({ checklist_state: newState }).eq('id', existing.id);
    } else {
      await supabase.from('project_stages').insert({
        project_id: activeProject.id,
        user_id: session.user.id,
        stage_id: stage.id,
        checklist_state: newState,
      });
    }
  };

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

      <h2 className="section-heading mt-8 mb-4">Checklist</h2>
      <div className="card-elevated p-5 space-y-3">
        {stage.checklist.map(item => (
          <label key={item.id} className="flex items-center gap-3 text-sm cursor-pointer">
            <Checkbox
              checked={!!checklistState[item.id]}
              onCheckedChange={() => toggleChecklist(item.id)}
            />
            <span className={checklistState[item.id] ? 'line-through text-muted-foreground' : ''}>{item.label}</span>
          </label>
        ))}
      </div>

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

      <div className="info-box mt-6 flex gap-3">
        <HelpCircle className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--info))' }} />
        <div>
          <p className="font-medium text-sm">When to Seek Expert Help</p>
          <p className="text-sm mt-1">{stage.whenToSeekHelp}</p>
        </div>
      </div>

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

      {/* Notes with save */}
      <h2 className="section-heading mt-8 mb-4">Your Notes</h2>
      <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add your notes for this stage..." className="min-h-[120px]" />
      <div className="mt-2 flex justify-end">
        <Button variant="outline" size="sm" onClick={saveNotes} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save Notes
        </Button>
      </div>

      {activeProject && (
        <div className="mt-6">
          <Button variant={isComplete ? 'outline' : 'default'} onClick={() => toggleStageComplete(activeProject.id, stage.index)}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            {isComplete ? 'Mark as Incomplete' : 'Mark Stage as Complete'}
          </Button>
        </div>
      )}

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
