# 🔍 Get Correct Supabase Database Hostname

## The Problem
The hostname `db.wioejeoyjcgjoubaandt.supabase.co` cannot be resolved (ENOTFOUND error).

## ✅ Solution: Get the Exact Hostname from Supabase

### Step 1: Open Supabase Dashboard
1. Go to: **https://app.supabase.com**
2. Sign in
3. Select your project

### Step 2: Get Connection String
1. Click **⚙️ Settings** (left sidebar)
2. Click **"Database"**
3. Scroll to **"Connection string"** section
4. Click the **"URI"** tab
5. You'll see something like:
   ```
   postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
   OR
   ```
   postgresql://postgres:[PASSWORD]@xxxxx.supabase.co:5432/postgres
   ```

### Step 3: Extract the Hostname
From the connection string, copy the part **between `@` and `:5432`**

**Examples:**
- If you see: `@db.abcdefghijklmn.supabase.co:5432` → Host is: `db.abcdefghijklmn.supabase.co`
- If you see: `@abcdefghijklmn.supabase.co:5432` → Host is: `abcdefghijklmn.supabase.co`

### Step 4: Update Your .env File
Once you have the correct hostname, update your `.env` file:

```env
DB_HOST=db.xxxxx.supabase.co  # Use the EXACT hostname from Supabase
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password_here  # Click "Reveal" in Supabase to see it
```

## 🔍 Alternative: Check Project Status

If the hostname still doesn't work:
1. Check if your Supabase project is **active** (not paused)
2. Verify the project reference ID matches
3. Try both formats:
   - `db.xxxxx.supabase.co`
   - `xxxxx.supabase.co`

## 📝 What to Share

After getting the connection details, share:
1. The **exact hostname** from Supabase dashboard
2. The **password** (click "Reveal" to see it)
3. Any error messages you see

Then I'll update your `.env` file with the correct values!



