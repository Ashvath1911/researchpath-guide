import React, { useState } from 'react';
import { templates } from '@/data/templates';
import { Search, FileStack } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Template } from '@/types';

const Templates: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Template | null>(null);

  const filtered = templates.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="page-heading">Templates Library</h1>
      <p className="text-muted-foreground mt-1 mb-6">Ready-to-use templates for every stage of research</p>

      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..." className="pl-10" />
      </div>

      {categories.map(cat => {
        const catTemplates = filtered.filter(t => t.category === cat);
        if (catTemplates.length === 0) return null;
        return (
          <div key={cat} className="mb-8">
            <h2 className="section-heading mb-4">{cat}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catTemplates.map(t => (
                <div key={t.id} className="card-interactive p-5" onClick={() => setSelected(t)}>
                  <FileStack className="h-6 w-6 mb-2" style={{ color: 'hsl(var(--sage))' }} />
                  <h3 className="font-heading font-semibold mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{t.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {t.researchTypes.slice(0, 2).map(rt => (
                      <span key={rt} className="sage-badge text-[10px]">{rt}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading">{selected.title}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground mb-4">{selected.description}</p>
            <div className="space-y-6">
              {selected.sections.map((section, i) => (
                <div key={i}>
                  <h3 className="font-heading font-semibold mb-1">{section.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{section.instructions}</p>
                  <Textarea placeholder={section.placeholder} className="min-h-[80px] text-sm" />
                </div>
              ))}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default Templates;
