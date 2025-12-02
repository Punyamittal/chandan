/**
 * Auth Context
 * Wrapper around Clerk for easier authentication management
 */

import { useUser, useAuth } from '@clerk/clerk-react';
import { createContext, useContext, ReactNode } from 'react';
import { isClerkConfigured } from '@/lib/clerk-config';

interface AuthContextType {
  isSignedIn: boolean | undefined;
  user: ReturnType<typeof useUser>['user'];
  userId: string | null | undefined;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider that uses Clerk hooks
// NOTE: This component MUST only be rendered when ClerkProvider is in the tree
function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        user,
        userId: user?.id,
        signOut: async () => {
          await signOut();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Fallback AuthProvider when Clerk is not configured
function FallbackAuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        isSignedIn: false,
        user: null,
        userId: null,
        signOut: async () => {
          console.warn('Clerk is not configured. Cannot sign out.');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Main AuthProvider that conditionally uses Clerk
export function AuthProvider({ children }: { children: ReactNode }) {
  if (isClerkConfigured) {
    return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
  }
  
  return <FallbackAuthProvider>{children}</FallbackAuthProvider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
