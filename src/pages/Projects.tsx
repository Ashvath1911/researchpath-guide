import React, { useState } from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import { Plus, MoreVertical, Archive, Trash2, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Projects: React.FC = () => {
  const { projects, activeProject, createProject, setActiveProject, updateProject, deleteProject } = useProjects();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [researchType, setResearchType] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [topic, setTopic] = useState('');

  const handleCreate = () => {
    createProject({ title, researchType, specialty, topic });
    setTitle(''); setResearchType(''); setSpecialty(''); setTopic('');
    setOpen(false);
  };

  const visibleProjects = projects.filter(p => p.status !== 'archived');
  const archivedProjects = projects.filter(p => p.status === 'archived');

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-heading">My Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your research projects</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Project Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Burnout Systematic Review" className="mt-1.5" /></div>
              <div>
                <Label>Research Type</Label>
                <Select value={researchType} onValueChange={setResearchType}>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Systematic Review">Systematic Review</SelectItem>
                    <SelectItem value="Cross-sectional">Cross-sectional Study</SelectItem>
                    <SelectItem value="Retrospective Cohort">Retrospective Cohort</SelectItem>
                    <SelectItem value="Case Report">Case Report</SelectItem>
                    <SelectItem value="Clinical Audit">Clinical Audit</SelectItem>
                    <SelectItem value="Narrative Review">Narrative Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Specialty</Label><Input value={specialty} onChange={e => setSpecialty(e.target.value)} placeholder="e.g., Cardiology" className="mt-1.5" /></div>
              <div><Label>Topic Area</Label><Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., Telemedicine in heart failure" className="mt-1.5" /></div>
              <Button onClick={handleCreate} className="w-full" disabled={!title}>Create Project</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {visibleProjects.length === 0 ? (
        <div className="card-elevated p-12 text-center">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-heading text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Create your first research project to get started.</p>
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> Create Project</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleProjects.map(p => (
            <div key={p.id} className={`card-elevated p-5 flex items-center gap-4 cursor-pointer transition-all ${activeProject?.id === p.id ? 'ring-2 ring-primary/30' : ''}`} onClick={() => setActiveProject(p.id)}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium truncate">{p.title}</h3>
                  {activeProject?.id === p.id && <span className="sage-badge">Active</span>}
                  {p.status === 'completed' && <span className="sage-badge">Completed</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{p.researchType || 'No type'} • {p.specialty || 'No specialty'}</p>
                <div className="mt-2 max-w-xs">
                  <Progress value={p.progress} className="h-1.5" />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="shrink-0"><MoreVertical className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => updateProject(p.id, { status: 'archived' })}><Archive className="h-4 w-4 mr-2" /> Archive</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteProject(p.id)} className="text-destructive"><Trash2 className="h-4 w-4 mr-2" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}

      {archivedProjects.length > 0 && (
        <div className="mt-8">
          <h2 className="section-heading mb-4">Archived</h2>
          <div className="space-y-3 opacity-60">
            {archivedProjects.map(p => (
              <div key={p.id} className="card-elevated p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.researchType}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => updateProject(p.id, { status: 'active' })}>Restore</Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
