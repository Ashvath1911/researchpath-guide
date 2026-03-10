import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Crosshair, ArrowLeft } from 'lucide-react';

interface Props { onBack: () => void; onSave?: (inputs: Record<string, string>, output: Record<string, string>) => void; }

const ObjectiveBuilder: React.FC<Props> = ({ onBack, onSave }) => {
  const [verb, setVerb] = useState('');
  const [subject, setSubject] = useState('');
  const [population, setPopulation] = useState('');
  const [setting, setSetting] = useState('');
  const [generated, setGenerated] = useState<string[]>([]);

  const verbs = [
    { value: 'determine', label: 'To determine' },
    { value: 'assess', label: 'To assess' },
    { value: 'evaluate', label: 'To evaluate' },
    { value: 'compare', label: 'To compare' },
    { value: 'identify', label: 'To identify' },
    { value: 'describe', label: 'To describe' },
    { value: 'explore', label: 'To explore' },
    { value: 'measure', label: 'To measure' },
  ];

  const generate = () => {
    const v = verbs.find(vb => vb.value === verb)?.label || 'To determine';
    const primary = `${v} ${subject} among ${population}${setting ? ` in ${setting}` : ''}.`;
    const secondary1 = `To identify factors associated with ${subject} among ${population}.`;
    const secondary2 = `To describe the characteristics of ${population}${setting ? ` in ${setting}` : ''}.`;
    setGenerated([primary, secondary1, secondary2]);
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--sage-light))' }}>
          <Crosshair className="h-5 w-5" style={{ color: 'hsl(var(--sage))' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold">Objective Builder</h2>
          <p className="text-sm text-muted-foreground">Create SMART research objectives</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card-elevated p-5">
          <Label className="font-medium">Action Verb</Label>
          <Select value={verb} onValueChange={setVerb}>
            <SelectTrigger className="mt-2"><SelectValue placeholder="Select a verb" /></SelectTrigger>
            <SelectContent>
              {verbs.map(v => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="card-elevated p-5">
          <Label className="font-medium">What are you studying?</Label>
          <p className="text-xs text-muted-foreground mb-2">e.g., "the prevalence of burnout", "the association between X and Y"</p>
          <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="the prevalence of burnout" />
        </div>
        <div className="card-elevated p-5">
          <Label className="font-medium">Target Population</Label>
          <Input value={population} onChange={e => setPopulation(e.target.value)} placeholder="e.g., medical residents in Saudi Arabia" className="mt-2" />
        </div>
        <div className="card-elevated p-5">
          <Label className="font-medium">Setting (optional)</Label>
          <Input value={setting} onChange={e => setSetting(e.target.value)} placeholder="e.g., tertiary hospitals" className="mt-2" />
        </div>
      </div>

      <Button onClick={generate} disabled={!verb || !subject || !population} className="mt-6">Generate Objectives</Button>

      {generated.length > 0 && (
        <div className="mt-6 card-elevated p-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--sage))' }}>
          <h3 className="font-heading font-semibold mb-3">Generated Objectives</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">Primary Objective</p>
              <p className="text-sm font-medium">{generated[0]}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">Secondary Objectives</p>
              {generated.slice(1).map((obj, i) => <p key={i} className="text-sm text-muted-foreground">{i + 1}. {obj}</p>)}
            </div>
          </div>
          {onSave && (
            <Button variant="outline" size="sm" className="mt-4" onClick={() => onSave({ verb, subject, population, setting }, { primary: generated[0], secondary: generated.slice(1).join('; ') })}>
              Save Output
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ObjectiveBuilder;
