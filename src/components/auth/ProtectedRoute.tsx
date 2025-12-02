/**
 * Protected Route Component
 * Wraps routes that require authentication
 */

import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { SkeletonPage } from '@/components/SkeletonLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn } = useAuthContext();

  // Show loading state while checking auth
  if (isSignedIn === undefined) {
    return <SkeletonPage />;
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}






