import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'researchpath_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const persistUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, _password: string) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email === email) {
        persistUser(parsed);
        return;
      }
    }
    const newUser: UserProfile = {
      id: crypto.randomUUID(),
      email,
      fullName: '',
      role: '',
      specialty: '',
      experienceLevel: '',
      researchType: '',
      currentStage: '',
      needsHelpWith: '',
      mainGoal: '',
      onboarded: false,
    };
    persistUser(newUser);
  };

  const signup = async (email: string, _password: string) => {
    const newUser: UserProfile = {
      id: crypto.randomUUID(),
      email,
      fullName: '',
      role: '',
      specialty: '',
      experienceLevel: '',
      researchType: '',
      currentStage: '',
      needsHelpWith: '',
      mainGoal: '',
      onboarded: false,
    };
    persistUser(newUser);
  };

  const logout = () => {
    persistUser(null);
    localStorage.removeItem('researchpath_projects');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    persistUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
