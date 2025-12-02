# OAuth Setup Guide

This application uses [Clerk](https://clerk.com) for OAuth authentication with support for Google, GitHub, and email/password authentication.

## 🚀 Quick Setup

### 1. Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

### 2. Get Your API Keys

1. In your Clerk Dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)

### 3. Configure Environment Variables

1. Create a `.env` file in the root directory (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your Clerk Publishable Key:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

### 4. Enable OAuth Providers

1. In Clerk Dashboard, go to **User & Authentication** → **Social Connections**
2. Enable the providers you want:
   - ✅ **Google** (Recommended)
   - ✅ **GitHub** (Recommended)
   - ✅ **Email/Password** (Already enabled)

### 5. Configure Redirect URLs

1. In Clerk Dashboard, go to **Paths**
2. Set the following:
   - **Sign-in path**: `/sign-in`
   - **Sign-up path**: `/sign-up`
   - **After sign-in URL**: `/`
   - **After sign-up URL**: `/`

### 6. Start the Application

```bash
npm run dev
```

## 📦 Features

### Authentication Methods

- ✅ **Google OAuth** - One-click sign-in with Google
- ✅ **GitHub OAuth** - Sign in with GitHub account
- ✅ **Email/Password** - Traditional email and password authentication

### Components

- **LoginModal** - Modal for sign-in
- **SignUpModal** - Modal for sign-up
- **UserButton** - User profile menu with sign-out
- **ProtectedRoute** - Route wrapper for authenticated pages
- **AuthContext** - Global authentication state

### Pages

- `/sign-in` - Sign-in page
- `/sign-up` - Sign-up page

## 🔒 Protected Routes

To protect a route, wrap it with `ProtectedRoute`:

```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 🎨 Customization

### Styling

The Clerk components are styled to match the orange theme. To customize:

1. Edit `src/components/auth/LoginModal.tsx`
2. Edit `src/components/auth/SignUpModal.tsx`
3. Modify the `appearance` prop in the `SignIn`/`SignUp` components

### User Menu

The user menu is displayed in the Navigation component. It shows:
- User avatar
- Profile link
- Sign out option

## 🚨 Troubleshooting

### "Missing Clerk Publishable Key" Warning

- Make sure `.env` file exists in the root directory
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
- Restart the dev server after adding the key

### OAuth Providers Not Showing

- Check that providers are enabled in Clerk Dashboard
- Verify redirect URLs are configured correctly
- Check browser console for errors

### Sign-in Redirect Issues

- Ensure redirect URLs match in Clerk Dashboard
- Check that routes are properly configured in `App.tsx`

## 📚 Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- [OAuth Providers Setup](https://clerk.com/docs/authentication/social-connections)

## 🔐 Production Deployment

### 1. Switch to Production Keys

1. In Clerk Dashboard, create a production instance
2. Copy the production publishable key (starts with `pk_live_`)
3. Update your production environment variables

### 2. Configure Production URLs

1. In Clerk Dashboard → **Paths**, set production URLs
2. Add your production domain to allowed origins

### 3. Environment Variables

For Netlify/Vercel:
- Add `VITE_CLERK_PUBLISHABLE_KEY` to environment variables
- Use production key for live deployments

## ✅ Checklist

- [ ] Clerk account created
- [ ] Publishable key added to `.env`
- [ ] OAuth providers enabled (Google, GitHub)
- [ ] Redirect URLs configured
- [ ] Test sign-in/sign-up flow
- [ ] Test protected routes
- [ ] Production keys configured (for deployment)






