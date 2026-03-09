import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground font-body">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
