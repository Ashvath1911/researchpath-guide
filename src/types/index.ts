export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  specialty: string;
  experienceLevel: string;
  researchType: string;
  currentStage: string;
  needsHelpWith: string;
  mainGoal: string;
  deadline?: string;
  onboarded: boolean;
}

export interface Project {
  id: string;
  title: string;
  researchType: string;
  specialty: string;
  topic: string;
  currentStageIndex: number;
  notes: string;
  milestones: Milestone[];
  status: 'active' | 'paused' | 'completed' | 'archived';
  progress: number;
  deadline?: string;
  completedStages: number[];
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Stage {
  id: string;
  index: number;
  title: string;
  shortTitle: string;
  description: string;
  whyItMatters: string;
  steps: string[];
  commonMistakes: string[];
  checklist: ChecklistItem[];
  redFlags: string[];
  whenToSeekHelp: string;
  tips: string[];
  examples: string[];
  relatedTemplates: string[];
  relatedTools: string[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface ResearchTrack {
  id: string;
  title: string;
  description: string;
  whoIsItFor: string;
  whenToUse: string;
  stageIds: string[];
  deliverables: string[];
  pitfalls: string[];
  recommendedTemplates: string[];
  recommendedTools: string[];
  icon: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  researchTypes: string[];
  category: string;
  content: string;
  sections: TemplateSection[];
}

export interface TemplateSection {
  title: string;
  instructions: string;
  placeholder: string;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  whyItMatters: string;
  example: string;
  relatedTerms: string[];
  category: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
