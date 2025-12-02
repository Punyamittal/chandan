/**
 * Login Modal Component
 * OAuth login with Google, GitHub, and email/password
 */

import { SignIn } from '@clerk/clerk-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { isClerkConfigured } from '@/lib/clerk-config';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  if (!isClerkConfigured) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">Authentication Not Configured</DialogTitle>
            <DialogDescription className="space-y-3 pt-2 text-xs">
              <p>
                To enable authentication, you need to configure Clerk OAuth.
              </p>
              <div className="space-y-1.5">
                <p className="text-xs font-medium">Quick Setup:</p>
                <ol className="text-xs space-y-0.5 list-decimal list-inside text-gray-600">
                  <li>Create a free account at <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline inline-flex items-center gap-1">clerk.com <ExternalLink className="w-2.5 h-2.5" /></a></li>
                  <li>Get your Publishable Key from the dashboard</li>
                  <li>Add it to your <code className="bg-gray-100 px-1 rounded text-xs">.env</code> file as <code className="bg-gray-100 px-1 rounded text-xs">VITE_CLERK_PUBLISHABLE_KEY</code></li>
                  <li>Restart your dev server</li>
                </ol>
              </div>
              <Button
                onClick={() => onOpenChange(false)}
                className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-sm"
              >
                Got it
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="flex justify-center items-center p-6 bg-gradient-to-br from-orange-50 to-white">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'shadow-none bg-transparent',
                headerTitle: 'text-2xl font-bold text-gray-900',
                headerSubtitle: 'text-gray-600',
                socialButtonsBlockButton: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-900',
                formButtonPrimary: 'bg-orange-600 hover:bg-orange-700 text-white',
                footerActionLink: 'text-orange-600 hover:text-orange-700',
                // Hide phone number fields
                phoneInputBox: 'hidden',
                phoneInputRow: 'hidden',
                formFieldInputShowPasswordButton: 'hidden',
              },
              variables: {
                colorPrimary: '#ea580c', // orange-600
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/"
            forceRedirectUrl="/"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

