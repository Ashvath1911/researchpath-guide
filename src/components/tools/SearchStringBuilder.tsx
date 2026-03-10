import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowLeft, Plus, X, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Props { onBack: () => void; onSave?: (inputs: Record<string, string>, output: Record<string, string>) => void; }

interface Concept { keywords: string[]; meshTerms: string[] }

const SearchStringBuilder: React.FC<Props> = ({ onBack, onSave }) => {
  const [database, setDatabase] = useState('pubmed');
  const [concepts, setConcepts] = useState<Concept[]>([{ keywords: [''], meshTerms: [''] }, { keywords: [''], meshTerms: [''] }]);
  const [generated, setGenerated] = useState('');
  const { toast } = useToast();

  const updateKeyword = (ci: number, ki: number, val: string) => {
    setConcepts(prev => prev.map((c, i) => i === ci ? { ...c, keywords: c.keywords.map((k, j) => j === ki ? val : k) } : c));
  };

  const addKeyword = (ci: number) => {
    setConcepts(prev => prev.map((c, i) => i === ci ? { ...c, keywords: [...c.keywords, ''] } : c));
  };

  const addConcept = () => {
    setConcepts(prev => [...prev, { keywords: [''], meshTerms: [''] }]);
  };

  const removeConcept = (ci: number) => {
    if (concepts.length <= 2) return;
    setConcepts(prev => prev.filter((_, i) => i !== ci));
  };

  const generate = () => {
    const parts = concepts.map(concept => {
      const terms = concept.keywords.filter(k => k.trim());
      if (terms.length === 0) return '';
      const keywordPart = terms.map(t => `"${t}"`).join(' OR ');
      return `(${keywordPart})`;
    }).filter(Boolean);

    const str = parts.join(' AND ');
    setGenerated(str);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    toast({ title: 'Copied to clipboard' });
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Tools
      </button>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--info-light))' }}>
          <Search className="h-5 w-5" style={{ color: 'hsl(var(--info))' }} />
        </div>
        <div>
          <h2 className="text-xl font-heading font-bold">Search String Builder</h2>
          <p className="text-sm text-muted-foreground">Construct database search strings with Boolean operators</p>
        </div>
      </div>

      <div className="card-elevated p-5 mb-5">
        <Label className="font-medium">Target Database</Label>
        <Select value={database} onValueChange={setDatabase}>
          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pubmed">PubMed</SelectItem>
            <SelectItem value="scopus">Scopus</SelectItem>
            <SelectItem value="cochrane">Cochrane Library</SelectItem>
            <SelectItem value="web-of-science">Web of Science</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {concepts.map((concept, ci) => (
          <div key={ci} className="card-elevated p-5">
            <div className="flex items-center justify-between mb-3">
              <Label className="font-medium">Concept {ci + 1}</Label>
              {concepts.length > 2 && (
                <button onClick={() => removeConcept(ci)} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-2">Add keywords and synonyms (connected by OR)</p>
            <div className="space-y-2">
              {concept.keywords.map((kw, ki) => (
                <Input key={ki} value={kw} onChange={e => updateKeyword(ci, ki, e.target.value)} placeholder={ki === 0 ? 'e.g., burnout' : 'Add synonym...'} />
              ))}
              <Button variant="ghost" size="sm" onClick={() => addKeyword(ci)} className="text-xs"><Plus className="h-3 w-3 mr-1" /> Add Synonym</Button>
            </div>
            {ci < concepts.length - 1 && (
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>AND</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-4">
        <Button variant="outline" onClick={addConcept}><Plus className="h-4 w-4 mr-2" /> Add Concept</Button>
        <Button onClick={generate}>Build Search String</Button>
      </div>

      {generated && (
        <div className="mt-6 card-elevated p-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--info))' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-semibold">Generated Search String</h3>
            <Button variant="ghost" size="sm" onClick={copyToClipboard}><Copy className="h-4 w-4 mr-1" /> Copy</Button>
          </div>
          <pre className="p-4 rounded-lg text-sm font-mono whitespace-pre-wrap" style={{ background: 'hsl(var(--muted))' }}>{generated}</pre>
          <p className="text-xs text-muted-foreground mt-2">Target: {database.charAt(0).toUpperCase() + database.slice(1)}</p>
          {onSave && (
            <Button variant="outline" size="sm" className="mt-4" onClick={() => onSave({ database }, { searchString: generated })}>
              Save Output
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchStringBuilder;
