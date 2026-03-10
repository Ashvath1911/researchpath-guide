import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PenTool, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface Props { onBack: () => void; onSave?: (inputs: Record<string, string>, output: Record<string, string>) => void; }

const sections = [
  { id: 'title', label: 'Title', hint: 'Working title for your manuscript', placeholder: 'e.g., Prevalence of Burnout Among Medical Residents: A Cross-Sectional Study' },
  { id: 'abstract', label: 'Abstract Plan', hint: 'Key points to include (Background, Methods, Results, Conclusion)', placeholder: 'Background: ...\nMethods: ...\nResults: ...\nConclusion: ...' },
  { id: 'introduction', label: 'Introduction Outline', hint: 'What background info, gap, and rationale?', placeholder: 'Background context...\nKnowledge gap...\nStudy rationale and aim...' },
  { id: 'methods', label: 'Methods Plan', hint: 'Study design, population, data collection, analysis', placeholder: 'Study design: ...\nPopulation & setting: ...\nData collection: ...\nAnalysis plan: ...' },
  { id: 'results', label: 'Results Plan', hint: 'What will you report? Tables? Figures?', placeholder: 'Demographics table...\nPrimary outcome...\nSecondary outcomes...\nKey figures...' },
  { id: 'discussion', label: 'Discussion Outline', hint: 'Key findings, comparison, limitations, implications', placeholder: 'Main findings summary...\nComparison with literature...\nLimitations...\nImplications...' },
];

const ManuscriptPlanner: React.FC<Props> = ({ onBack, onSave }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState(false);

  const filledSections = sections.filter(s => values[s.id]?.trim());

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--sage-light))' }}>
          <PenTool className="h-5 w-5" style={{ color: 'hsl(var(--sage))' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold">Manuscript Section Planner</h2>
          <p className="text-sm text-muted-foreground">Plan and organize each section of your manuscript</p>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="card-elevated p-4 mb-6 flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Sections completed:</span>
        <div className="flex gap-1">
          {sections.map(s => (
            <div key={s.id} className="h-2 w-8 rounded-full" style={{ background: values[s.id]?.trim() ? 'hsl(var(--sage))' : 'hsl(var(--muted))' }} />
          ))}
        </div>
        <span className="text-sm font-medium">{filledSections.length}/{sections.length}</span>
      </div>

      <div className="space-y-4">
        {sections.map(section => (
          <div key={section.id} className="card-elevated p-5">
            <div className="flex items-center gap-2 mb-1">
              {values[section.id]?.trim() && <CheckCircle2 className="h-4 w-4" style={{ color: 'hsl(var(--sage))' }} />}
              <Label className="font-medium">{section.label}</Label>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{section.hint}</p>
            <Textarea
              value={values[section.id] || ''}
              onChange={e => setValues(prev => ({ ...prev, [section.id]: e.target.value }))}
              placeholder={section.placeholder}
              className="min-h-[80px]"
            />
          </div>
        ))}
      </div>

      <Button onClick={() => setGenerated(true)} disabled={filledSections.length === 0} className="mt-6">Generate Manuscript Plan</Button>

      {generated && filledSections.length > 0 && (
        <div className="mt-6 card-elevated p-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--sage))' }}>
          <h3 className="font-heading font-semibold mb-4">Manuscript Plan Summary</h3>
          <div className="space-y-4">
            {sections.filter(s => values[s.id]?.trim()).map(s => (
              <div key={s.id}>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</h4>
                <p className="text-sm mt-1 whitespace-pre-line">{values[s.id]}</p>
              </div>
            ))}
          </div>
          {onSave && (
            <Button variant="outline" size="sm" className="mt-4" onClick={() => onSave(values, values)}>
              Save Output
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ManuscriptPlanner;
