/**
 * Clerk Configuration
 * Shared configuration check for Clerk OAuth
 */

export const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

// Debug logging to help diagnose issues (only in development)
if (import.meta.env.DEV) {
  const rawEnvValue = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  console.log("🔍 Clerk Config Debug:");
  console.log("  rawEnvValue:", rawEnvValue);
  console.log("  processedKey:", CLERK_PUBLISHABLE_KEY);
  console.log("  keyLength:", CLERK_PUBLISHABLE_KEY.length);
  console.log("  isConfigured:", !!(CLERK_PUBLISHABLE_KEY && CLERK_PUBLISHABLE_KEY.trim() !== ""));
  
  if (CLERK_PUBLISHABLE_KEY && CLERK_PUBLISHABLE_KEY.startsWith('pk_test_')) {
    console.log("  ✅ Key format looks correct (starts with pk_test_)");
  } else if (CLERK_PUBLISHABLE_KEY && CLERK_PUBLISHABLE_KEY.startsWith('pk_live_')) {
    console.log("  ✅ Key format looks correct (starts with pk_live_)");
  } else if (CLERK_PUBLISHABLE_KEY) {
    console.warn("  ⚠️ Key format might be incorrect (should start with pk_test_ or pk_live_)");
  }
}

export const isClerkConfigured = !!(CLERK_PUBLISHABLE_KEY && CLERK_PUBLISHABLE_KEY.trim() !== "");



