import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Filter, ArrowLeft, Plus, X } from 'lucide-react';

interface Props { onBack: () => void; onSave?: (inputs: Record<string, string>, output: Record<string, string>) => void; }

const InclusionExclusionBuilder: React.FC<Props> = ({ onBack, onSave }) => {
  const [inclusions, setInclusions] = useState<string[]>(['']);
  const [exclusions, setExclusions] = useState<string[]>(['']);
  const [generated, setGenerated] = useState(false);

  const updateItem = (type: 'inc' | 'exc', index: number, value: string) => {
    if (type === 'inc') {
      setInclusions(prev => prev.map((item, i) => i === index ? value : item));
    } else {
      setExclusions(prev => prev.map((item, i) => i === index ? value : item));
    }
  };

  const addItem = (type: 'inc' | 'exc') => {
    if (type === 'inc') setInclusions(prev => [...prev, '']);
    else setExclusions(prev => [...prev, '']);
  };

  const removeItem = (type: 'inc' | 'exc', index: number) => {
    if (type === 'inc') setInclusions(prev => prev.filter((_, i) => i !== index));
    else setExclusions(prev => prev.filter((_, i) => i !== index));
  };

  const filteredInclusions = inclusions.filter(i => i.trim());
  const filteredExclusions = exclusions.filter(e => e.trim());

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--sage-light))' }}>
          <Filter className="h-5 w-5" style={{ color: 'hsl(var(--sage))' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold">Inclusion / Exclusion Criteria Builder</h2>
          <p className="text-sm text-muted-foreground">Systematically define your study criteria</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-elevated p-5">
          <Label className="font-medium text-base" style={{ color: 'hsl(var(--sage))' }}>Inclusion Criteria</Label>
          <p className="text-xs text-muted-foreground mb-3">Define who/what will be included in your study</p>
          <div className="space-y-2">
            {inclusions.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} onChange={e => updateItem('inc', i, e.target.value)} placeholder={i === 0 ? 'e.g., Adults aged 18+' : 'Add criterion...'} />
                {inclusions.length > 1 && <button onClick={() => removeItem('inc', i)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>}
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => addItem('inc')} className="text-xs"><Plus className="h-3 w-3 mr-1" /> Add</Button>
          </div>
        </div>

        <div className="card-elevated p-5">
          <Label className="font-medium text-base text-destructive">Exclusion Criteria</Label>
          <p className="text-xs text-muted-foreground mb-3">Define who/what will be excluded</p>
          <div className="space-y-2">
            {exclusions.map((item, i) => (
              <div key={i} className="flex gap-2">
                <Input value={item} onChange={e => updateItem('exc', i, e.target.value)} placeholder={i === 0 ? 'e.g., Pregnant women' : 'Add criterion...'} />
                {exclusions.length > 1 && <button onClick={() => removeItem('exc', i)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>}
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => addItem('exc')} className="text-xs"><Plus className="h-3 w-3 mr-1" /> Add</Button>
          </div>
        </div>
      </div>

      <Button onClick={() => setGenerated(true)} disabled={filteredInclusions.length === 0} className="mt-6">Generate Summary</Button>

      {generated && filteredInclusions.length > 0 && (
        <div className="mt-6 card-elevated p-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--sage))' }}>
          <h3 className="font-heading font-semibold mb-3">Eligibility Criteria Summary</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold mb-2" style={{ color: 'hsl(var(--sage))' }}>Inclusion Criteria</h4>
              <ol className="list-decimal list-inside space-y-1">
                {filteredInclusions.map((c, i) => <li key={i} className="text-sm">{c}</li>)}
              </ol>
            </div>
            {filteredExclusions.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 text-destructive">Exclusion Criteria</h4>
                <ol className="list-decimal list-inside space-y-1">
                  {filteredExclusions.map((c, i) => <li key={i} className="text-sm">{c}</li>)}
                </ol>
              </div>
            )}
          </div>
          {onSave && (
            <Button variant="outline" size="sm" className="mt-4" onClick={() => onSave(
              { inclusions: filteredInclusions.join('; '), exclusions: filteredExclusions.join('; ') },
              { inclusions: filteredInclusions.join('; '), exclusions: filteredExclusions.join('; ') }
            )}>Save Output</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default InclusionExclusionBuilder;
