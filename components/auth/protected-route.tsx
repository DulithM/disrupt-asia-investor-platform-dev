'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { LoadingScreen } from '@/components/ui/loading-screen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'investor';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && requiredRole && user?.role !== requiredRole) {
      // Redirect to home page if user doesn't have required role
      window.location.href = '/';
    }
  }, [isAuthenticated, isLoading, user, requiredRole]);

  if (isLoading) {
    return <LoadingScreen message="Verifying your access..." />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null; // Will redirect to home
  }

  return <>{children}</>;
}
