import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

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

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async (authUser: User): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      email: authUser.email || '',
      fullName: data.full_name,
      role: data.role,
      specialty: data.specialty,
      experienceLevel: data.experience_level,
      researchType: data.research_type,
      currentStage: data.current_stage,
      needsHelpWith: data.needs_help_with,
      mainGoal: data.main_goal,
      deadline: data.deadline || undefined,
      onboarded: data.onboarded,
    };
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        // Use setTimeout to avoid potential deadlock with Supabase auth
        setTimeout(async () => {
          const profile = await fetchProfile(session.user);
          setUser(profile);
          setIsLoading(false);
        }, 0);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const profile = await fetchProfile(session.user);
        setUser(profile);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' });
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast({ title: 'Signup failed', description: error.message, variant: 'destructive' });
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!session?.user) return;

    const updates: Record<string, unknown> = {};
    if (data.fullName !== undefined) updates.full_name = data.fullName;
    if (data.role !== undefined) updates.role = data.role;
    if (data.specialty !== undefined) updates.specialty = data.specialty;
    if (data.experienceLevel !== undefined) updates.experience_level = data.experienceLevel;
    if (data.researchType !== undefined) updates.research_type = data.researchType;
    if (data.currentStage !== undefined) updates.current_stage = data.currentStage;
    if (data.needsHelpWith !== undefined) updates.needs_help_with = data.needsHelpWith;
    if (data.mainGoal !== undefined) updates.main_goal = data.mainGoal;
    if (data.deadline !== undefined) updates.deadline = data.deadline;
    if (data.onboarded !== undefined) updates.onboarded = data.onboarded;

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', session.user.id);

    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }

    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAuthenticated: !!session, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
