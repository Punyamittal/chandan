# Debug: Cart Not Adding Items

## Current Status
- ✅ API server is running
- ❌ Getting 500 errors when adding to cart
- ❓ Database tables may not exist

## Steps to Debug

### 1. Check API Server Terminal

Look at the terminal where `npm run api` is running. You should see error messages like:

```
Get cart error: [error details]
Error details: { message: ..., code: ..., detail: ... }
```

**Share the exact error message you see there.**

### 2. Check if Tables Exist in Supabase

1. Go to Supabase → SQL Editor
2. Run this query:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('carts', 'cart_items');
```

**Do you see both `carts` and `cart_items` listed?**

If NO → You need to create the tables (see below)  
If YES → The issue is something else

### 3. Create Tables (If They Don't Exist)

1. Go to Supabase → SQL Editor
2. Copy ALL content from `SUPABASE_SQL_ONLY.sql`
3. Paste and click "Run"
4. Wait for success message
5. Restart API server: `npm run api`

### 4. Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Try adding item to cart
4. Look for error messages

### 5. Check Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Try adding item to cart
4. Click on the `/api/cart/items` request
5. Check the Response tab - what error message do you see?

## Most Common Issues

### Issue 1: Tables Don't Exist
**Error:** `relation "carts" does not exist`  
**Fix:** Create tables in Supabase (Step 3 above)

### Issue 2: Database Connection Failed
**Error:** `Connection refused` or `password authentication failed`  
**Fix:** Check `.env` file has correct database credentials

### Issue 3: User Not Signed In
**Error:** `User must be signed in to add to cart`  
**Fix:** Sign in via Clerk authentication

## What I Need From You

Please share:

1. **API Server Terminal Output** - What errors do you see when you try to add to cart?

2. **Browser Console Errors** - What errors appear in the console (F12)?

3. **Network Tab Response** - What does the `/api/cart/items` request return?

4. **Tables Status** - Do the tables exist in Supabase? (Run the query from Step 2)

With this information, I can pinpoint the exact issue and fix it!



