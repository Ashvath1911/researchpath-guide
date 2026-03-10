import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Project {
  id: string;
  userId: string;
  title: string;
  researchType: string;
  specialty: string;
  topic: string;
  currentStageIndex: number;
  notes: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  progress: number;
  deadline?: string;
  completedStages: number[];
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  milestones: Milestone[];
  isLoading: boolean;
  createProject: (data: Partial<Project>) => Promise<Project | null>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setActiveProject: (id: string | null) => void;
  toggleStageComplete: (projectId: string, stageIndex: number) => Promise<void>;
  addMilestone: (projectId: string, title: string, dueDate?: string) => Promise<void>;
  toggleMilestone: (milestoneId: string) => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
const ACTIVE_KEY = 'researchpath_active_project';

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(localStorage.getItem(ACTIVE_KEY));
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useAuth();
  const { toast } = useToast();

  const mapProject = (row: any): Project => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    researchType: row.research_type,
    specialty: row.specialty,
    topic: row.topic,
    currentStageIndex: row.current_stage_index,
    notes: row.notes,
    status: row.status as Project['status'],
    progress: row.progress,
    deadline: row.deadline || undefined,
    completedStages: row.completed_stages || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });

  const mapMilestone = (row: any): Milestone => ({
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    completed: row.completed,
    dueDate: row.due_date || undefined,
  });

  const refreshProjects = useCallback(async () => {
    if (!session?.user) { setProjects([]); setIsLoading(false); return; }
    const { data, error } = await supabase.from('projects').select('*').order('updated_at', { ascending: false });
    if (error) { console.error(error); setIsLoading(false); return; }
    setProjects((data || []).map(mapProject));
    setIsLoading(false);
  }, [session?.user]);

  const refreshMilestones = useCallback(async () => {
    if (!session?.user) { setMilestones([]); return; }
    const { data } = await supabase.from('project_milestones').select('*').order('created_at');
    setMilestones((data || []).map(mapMilestone));
  }, [session?.user]);

  useEffect(() => {
    refreshProjects();
    refreshMilestones();
  }, [refreshProjects, refreshMilestones]);

  const createProject = async (data: Partial<Project>): Promise<Project | null> => {
    if (!session?.user) return null;
    const { data: row, error } = await supabase.from('projects').insert({
      user_id: session.user.id,
      title: data.title || 'Untitled Project',
      research_type: data.researchType || '',
      specialty: data.specialty || '',
      topic: data.topic || '',
      current_stage_index: data.currentStageIndex || 0,
      deadline: data.deadline || null,
    }).select().single();

    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return null; }
    const project = mapProject(row);
    setProjects(prev => [project, ...prev]);
    setActiveProject(project.id);
    return project;
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    const updates: Record<string, unknown> = {};
    if (data.title !== undefined) updates.title = data.title;
    if (data.researchType !== undefined) updates.research_type = data.researchType;
    if (data.specialty !== undefined) updates.specialty = data.specialty;
    if (data.topic !== undefined) updates.topic = data.topic;
    if (data.currentStageIndex !== undefined) updates.current_stage_index = data.currentStageIndex;
    if (data.notes !== undefined) updates.notes = data.notes;
    if (data.status !== undefined) updates.status = data.status;
    if (data.progress !== undefined) updates.progress = data.progress;
    if (data.deadline !== undefined) updates.deadline = data.deadline;
    if (data.completedStages !== undefined) updates.completed_stages = data.completedStages;

    const { error } = await supabase.from('projects').update(updates).eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p));
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProjectId === id) setActiveProject(null);
  };

  const setActiveProject = (id: string | null) => {
    setActiveProjectId(id);
    if (id) localStorage.setItem(ACTIVE_KEY, id);
    else localStorage.removeItem(ACTIVE_KEY);
  };

  const toggleStageComplete = async (projectId: string, stageIndex: number) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const completed = project.completedStages.includes(stageIndex)
      ? project.completedStages.filter(s => s !== stageIndex)
      : [...project.completedStages, stageIndex];
    const progress = Math.round((completed.length / 18) * 100);
    await updateProject(projectId, { completedStages: completed, progress });
  };

  const addMilestone = async (projectId: string, title: string, dueDate?: string) => {
    if (!session?.user) return;
    const { data, error } = await supabase.from('project_milestones').insert({
      project_id: projectId,
      user_id: session.user.id,
      title,
      due_date: dueDate || null,
    }).select().single();
    if (error) { toast({ title: 'Error', description: error.message, variant: 'destructive' }); return; }
    setMilestones(prev => [...prev, mapMilestone(data)]);
  };

  const toggleMilestone = async (milestoneId: string) => {
    const m = milestones.find(ms => ms.id === milestoneId);
    if (!m) return;
    const { error } = await supabase.from('project_milestones').update({ completed: !m.completed }).eq('id', milestoneId);
    if (error) return;
    setMilestones(prev => prev.map(ms => ms.id === milestoneId ? { ...ms, completed: !ms.completed } : ms));
  };

  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  return (
    <ProjectContext.Provider value={{ projects, activeProject, milestones, isLoading, createProject, updateProject, deleteProject, setActiveProject, toggleStageComplete, addMilestone, toggleMilestone, refreshProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider');
  return ctx;
};
