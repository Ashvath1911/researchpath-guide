import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Milestone } from '@/types';

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  createProject: (data: Partial<Project>) => Project;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string | null) => void;
  toggleStageComplete: (projectId: string, stageIndex: number) => void;
  addMilestone: (projectId: string, milestone: Omit<Milestone, 'id'>) => void;
  toggleMilestone: (projectId: string, milestoneId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
const STORAGE_KEY = 'researchpath_projects';
const ACTIVE_KEY = 'researchpath_active_project';

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setProjects(JSON.parse(stored)); } catch { /* ignore */ }
    }
    const activeId = localStorage.getItem(ACTIVE_KEY);
    if (activeId) setActiveProjectId(activeId);
  }, []);

  const persist = (p: Project[]) => {
    setProjects(p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  };

  const createProject = (data: Partial<Project>): Project => {
    const now = new Date().toISOString();
    const project: Project = {
      id: crypto.randomUUID(),
      title: data.title || 'Untitled Project',
      researchType: data.researchType || '',
      specialty: data.specialty || '',
      topic: data.topic || '',
      currentStageIndex: data.currentStageIndex || 0,
      notes: data.notes || '',
      milestones: data.milestones || [],
      status: 'active',
      progress: 0,
      deadline: data.deadline,
      completedStages: [],
      createdAt: now,
      updatedAt: now,
    };
    const updated = [...projects, project];
    persist(updated);
    setActiveProjectId(project.id);
    localStorage.setItem(ACTIVE_KEY, project.id);
    return project;
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p);
    persist(updated);
  };

  const deleteProject = (id: string) => {
    persist(projects.filter(p => p.id !== id));
    if (activeProjectId === id) {
      setActiveProjectId(null);
      localStorage.removeItem(ACTIVE_KEY);
    }
  };

  const setActiveProject = (id: string | null) => {
    setActiveProjectId(id);
    if (id) localStorage.setItem(ACTIVE_KEY, id);
    else localStorage.removeItem(ACTIVE_KEY);
  };

  const toggleStageComplete = (projectId: string, stageIndex: number) => {
    const updated = projects.map(p => {
      if (p.id !== projectId) return p;
      const completed = p.completedStages.includes(stageIndex)
        ? p.completedStages.filter(s => s !== stageIndex)
        : [...p.completedStages, stageIndex];
      const progress = Math.round((completed.length / 18) * 100);
      return { ...p, completedStages: completed, progress, updatedAt: new Date().toISOString() };
    });
    persist(updated);
  };

  const addMilestone = (projectId: string, milestone: Omit<Milestone, 'id'>) => {
    const updated = projects.map(p => {
      if (p.id !== projectId) return p;
      return { ...p, milestones: [...p.milestones, { ...milestone, id: crypto.randomUUID() }], updatedAt: new Date().toISOString() };
    });
    persist(updated);
  };

  const toggleMilestone = (projectId: string, milestoneId: string) => {
    const updated = projects.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        milestones: p.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m),
        updatedAt: new Date().toISOString(),
      };
    });
    persist(updated);
  };

  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  return (
    <ProjectContext.Provider value={{ projects, activeProject, createProject, updateProject, deleteProject, setActiveProject, toggleStageComplete, addMilestone, toggleMilestone }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider');
  return ctx;
};
