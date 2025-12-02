/**
 * Sign Up Page
 * OAuth sign-up page with Google, GitHub, and email/password
 */

import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-600">Sign up to get started with premium printing services</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <SignUp
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
                },
                variables: {
                  colorPrimary: '#ea580c', // orange-600
                },
              }}
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/"
              forceRedirectUrl="/"
            />
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}



