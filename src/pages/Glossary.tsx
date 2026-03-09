import React, { useState } from 'react';
import { glossaryTerms } from '@/data/glossary';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { GlossaryTerm } from '@/types';

const Glossary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<GlossaryTerm | null>(null);

  const filtered = glossaryTerms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(glossaryTerms.map(t => t.category))];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <h1 className="page-heading">Glossary</h1>
      <p className="text-muted-foreground mt-1 mb-6">Research terminology explained simply</p>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search terms..." className="pl-10" />
      </div>

      {categories.map(cat => {
        const catTerms = filtered.filter(t => t.category === cat);
        if (catTerms.length === 0) return null;
        return (
          <div key={cat} className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">{cat}</h2>
            <div className="space-y-2">
              {catTerms.map(term => (
                <div key={term.id} className="card-interactive p-4 flex items-center justify-between" onClick={() => setSelected(term)}>
                  <div>
                    <h3 className="font-medium">{term.term}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{term.definition}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-heading">{selected.term}</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <h4 className="text-sm font-semibold mb-1">Definition</h4>
                <p className="text-sm text-muted-foreground">{selected.definition}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Why It Matters</h4>
                <p className="text-sm text-muted-foreground">{selected.whyItMatters}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">Example</h4>
                <p className="text-sm text-muted-foreground italic">{selected.example}</p>
              </div>
              {selected.relatedTerms.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold mb-1">Related Terms</h4>
                  <div className="flex flex-wrap gap-1">
                    {selected.relatedTerms.map(rt => (
                      <span key={rt} className="sage-badge">{rt}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Glossary;
