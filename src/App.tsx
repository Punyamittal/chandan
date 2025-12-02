import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import AppLoader from "./components/AppLoader";
import SkeletonPage from "./components/SkeletonLoader";

// Clerk configuration
import { CLERK_PUBLISHABLE_KEY, isClerkConfigured } from "@/lib/clerk-config";

if (!isClerkConfigured) {
  console.warn("Missing Clerk Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file");
}

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const Services = lazy(() => import("./pages/Services"));
const Clients = lazy(() => import("./pages/Clients"));
const Contact = lazy(() => import("./pages/Contact"));
const BulkDeals = lazy(() => import("./pages/BulkDeals"));
const CinematicLanding = lazy(() => import("./pages/CinematicLanding"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const NotFound = lazy(() => import("./pages/NotFound"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

const queryClient = new QueryClient();

// Conditional ClerkProvider wrapper
const AppWithAuth = ({ children }: { children: React.ReactNode }) => {
  if (!isClerkConfigured) {
    // Return children without ClerkProvider when key is missing
    return <>{children}</>;
  }
  
  return (
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
};

const App = () => (
  <AppLoader>
    <AppWithAuth>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <ScrollToTop />
                <Suspense fallback={<SkeletonPage />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/bulk-deals" element={<BulkDeals />} />
                    <Route path="/cinematic" element={<CinematicLanding />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/contact" element={<Contact />} />
                    {isClerkConfigured && (
                      <>
                        <Route path="/sign-in/*" element={<SignIn />} />
                        <Route path="/sign-up/*" element={<SignUp />} />
                      </>
                    )}
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AppWithAuth>
  </AppLoader>
);

export default App;
