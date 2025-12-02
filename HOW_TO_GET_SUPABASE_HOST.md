# How to Get Your Supabase Host and Connection Details

## 📍 Step-by-Step Guide

### Step 1: Log into Supabase
1. Go to: https://app.supabase.com
2. Sign in to your account
3. Select your project (or create a new one)

### Step 2: Navigate to Database Settings
1. Click on the **⚙️ Settings** icon in the left sidebar
2. Click on **"Database"** from the settings menu

### Step 3: Find Your Connection Details

Scroll down to the **"Connection string"** section. You'll see several options:

#### Option A: URI Connection String (Easiest)
Look for **"URI"** tab and you'll see:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

From this string:
- **Host**: `db.xxxxx.supabase.co` (the part after `@` and before `:5432`)
- **Port**: `5432`
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: Click "Reveal" to show your password

#### Option B: Individual Settings
If you want to see individual settings:
- **Host**: Look for "Host" field → Usually `db.xxxxx.supabase.co`
- **Port**: Usually `5432`
- **Database name**: Usually `postgres`
- **User**: Usually `postgres`
- **Password**: Click "Reveal" next to Database password

### Step 4: Copy Your Details

Copy these values:
```
Host: db.xxxxx.supabase.co
Port: 5432
Database: postgres
User: postgres
Password: [Click Reveal to see it]
```

## 🔍 Visual Guide - What to Look For

In the Supabase Dashboard:

```
Settings → Database → Connection string
```

You'll see something like:
```
┌─────────────────────────────────────────────────┐
│ Connection string                               │
├─────────────────────────────────────────────────┤
│ URI                                              │
│ postgresql://postgres:[PASSWORD]@               │
│ db.abcdefghijklmn.supabase.co:5432/postgres     │
│                                                 │
│ [👁️ Reveal] button ← Click to show password    │
└─────────────────────────────────────────────────┘
```

## 📝 Example

**If your connection string is:**
```
postgresql://postgres:MyPassword123@db.abcdefghijklmn.supabase.co:5432/postgres
```

**Then your details are:**
- Host: `db.abcdefghijklmn.supabase.co`
- Port: `5432`
- Database: `postgres`
- User: `postgres`
- Password: `MyPassword123`

## 🚀 Alternative: Direct Host Format

Sometimes Supabase shows:
```
Host: db.xxxxx.supabase.co
```
or
```
Host: xxxxx.supabase.co
```

Both are correct! Use whatever is shown in your dashboard.

## ⚠️ Important Notes

1. **Password**: You'll need to click "Reveal" to see it - it's hidden by default for security
2. **Pooling**: If you see "Connection pooling", you can use those settings too, but direct connection (port 5432) is simpler
3. **Session Mode vs Transaction Mode**: For this project, use "Transaction mode" or "Direct connection" (port 5432)

## ✅ What You Need to Copy

Copy these 5 values:
1. ✅ **DB_HOST** - The hostname (e.g., `db.xxxxx.supabase.co`)
2. ✅ **DB_PORT** - Usually `5432`
3. ✅ **DB_NAME** - Usually `postgres`
4. ✅ **DB_USER** - Usually `postgres`
5. ✅ **DB_PASSWORD** - Click "Reveal" to see it

## 🎯 Quick Checklist

- [ ] Logged into Supabase dashboard
- [ ] Clicked Settings → Database
- [ ] Found "Connection string" section
- [ ] Copied the host (part after `@` and before `:5432`)
- [ ] Noted the port (usually `5432`)
- [ ] Clicked "Reveal" to see the password
- [ ] Copied all 5 values

Once you have these, share them with me and I'll update your `.env` file!



