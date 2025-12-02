# 🔧 Fix Cart Issue - Quick Steps

## The Problem
Products aren't being added to cart because the database tables don't exist.

## ✅ Quick Fix (2 minutes)

### Step 1: Check if Tables Exist

1. Go to: https://app.supabase.com
2. Click **SQL Editor** → **New Query**
3. Paste and run this:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('carts', 'cart_items');
```

**If you see BOTH `carts` and `cart_items` → Skip to Step 3**  
**If you see nothing or only one → Do Step 2**

### Step 2: Create the Tables

1. Still in Supabase SQL Editor
2. Open the file `SUPABASE_SQL_ONLY.sql` from your project
3. Copy ALL the SQL code
4. Paste into Supabase SQL Editor
5. Click **"Run"** button
6. Wait for success message ✅

### Step 3: Restart API Server

1. Go to terminal where `npm run api` is running
2. Press **Ctrl+C** to stop it
3. Run again: `npm run api`
4. You should see: `✅ Connected to PostgreSQL database`

### Step 4: Test

1. Refresh your browser
2. Make sure you're **signed in**
3. Go to Products page
4. Add item to cart
5. Should work now! 🎉

## Still Not Working?

### Check API Server Terminal

Look at the terminal where `npm run api` is running. What error do you see?

Common errors:
- `relation "carts" does not exist` → Tables not created (do Step 2)
- `password authentication failed` → Wrong database password in `.env`
- `Connection refused` → Database host/port wrong in `.env`

### Check Browser Console

1. Press **F12**
2. Go to **Console** tab
3. Try adding item to cart
4. What error message appears?

## Need Help?

Share with me:
1. What error appears in API server terminal?
2. What error appears in browser console?
3. Did you create the tables? (Step 2)

Then I can help fix it!



