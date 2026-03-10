import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, ArrowLeft } from 'lucide-react';

interface Props { onBack: () => void; onSave?: (inputs: Record<string, string>, output: Record<string, string>) => void; }

const frameworks = [
  { value: 'pico', label: 'PICO', fields: ['Population', 'Intervention', 'Comparison', 'Outcome'] },
  { value: 'peco', label: 'PECO', fields: ['Population', 'Exposure', 'Comparison', 'Outcome'] },
  { value: 'peo', label: 'PEO', fields: ['Population', 'Exposure', 'Outcome'] },
];

const PICOBuilder: React.FC<Props> = ({ onBack, onSave }) => {
  const [framework, setFramework] = useState('pico');
  const [values, setValues] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState('');

  const current = frameworks.find(f => f.value === framework)!;

  const generate = () => {
    const parts = current.fields.map(f => values[f] || `[${f}]`);
    let question = '';
    if (framework === 'pico') {
      question = `In ${parts[0]}, does ${parts[1]} compared to ${parts[2]} improve ${parts[3]}?`;
    } else if (framework === 'peco') {
      question = `In ${parts[0]}, is ${parts[1]} compared to ${parts[2]} associated with ${parts[3]}?`;
    } else {
      question = `In ${parts[0]}, what is the effect of ${parts[1]} on ${parts[2]}?`;
    }
    setGenerated(question);
  };

  const allFilled = current.fields.every(f => values[f]?.trim());

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--sage-light))' }}>
          <Target className="h-5 w-5" style={{ color: 'hsl(var(--sage))' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold">PICO / PECO / PEO Builder</h2>
          <p className="text-sm text-muted-foreground">Build a structured research question step by step</p>
        </div>
      </div>

      <div className="card-elevated p-5 mb-5">
        <Label className="font-medium">Select Framework</Label>
        <Select value={framework} onValueChange={v => { setFramework(v); setValues({}); setGenerated(''); }}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>
            {frameworks.map(f => <SelectItem key={f.value} value={f.value}>{f.label} ({f.fields.join(', ')})</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {current.fields.map(field => (
          <div key={field} className="card-elevated p-5">
            <Label className="font-medium">{field}</Label>
            <p className="text-xs text-muted-foreground mt-0.5 mb-2">
              {field === 'Population' && 'Who are you studying? (e.g., "adults aged 18-65 with type 2 diabetes")'}
              {field === 'Intervention' && 'What intervention are you testing? (e.g., "metformin therapy")'}
              {field === 'Exposure' && 'What exposure or factor? (e.g., "air pollution levels")'}
              {field === 'Comparison' && 'What is the comparator? (e.g., "placebo", "standard care")'}
              {field === 'Outcome' && 'What outcome are you measuring? (e.g., "HbA1c reduction")'}
            </p>
            <Input value={values[field] || ''} onChange={e => setValues(prev => ({ ...prev, [field]: e.target.value }))} placeholder={`Enter ${field.toLowerCase()}...`} />
          </div>
        ))}
      </div>

      <Button onClick={generate} disabled={!allFilled} className="mt-6">Generate Research Question</Button>

      {generated && (
        <div className="mt-6 card-elevated p-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--sage))' }}>
          <h3 className="font-heading font-semibold mb-2">Your Research Question</h3>
          <p className="text-foreground italic">"{generated}"</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {current.fields.map(f => (
              <div key={f} className="p-2 rounded-lg" style={{ background: 'hsl(var(--muted))' }}>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{f}</p>
                <p className="text-sm font-medium mt-0.5">{values[f]}</p>
              </div>
            ))}
          </div>
          {onSave && (
            <Button variant="outline" size="sm" className="mt-4" onClick={() => onSave({ framework, ...values }, { question: generated })}>
              Save Output
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PICOBuilder;
