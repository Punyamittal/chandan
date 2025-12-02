/**
 * User Button Component
 * Displays user menu with profile and sign out options
 */

import { UserButton as ClerkUserButton } from '@clerk/clerk-react';
import { useAuthContext } from '@/contexts/AuthContext';

export function UserButton() {
  const { isSignedIn } = useAuthContext();

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex items-center">
      <ClerkUserButton
        appearance={{
          elements: {
            avatarBox: 'w-10 h-10',
            userButtonPopoverCard: 'shadow-lg border border-gray-200',
            userButtonPopoverActionButton: 'hover:bg-orange-50',
            userButtonPopoverActionButtonText: 'text-gray-900',
          },
        }}
      />
    </div>
  );
}






