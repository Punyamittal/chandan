# Troubleshooting: Cart Not Adding Items

## Common Issues and Solutions

### 1. Check if User is Signed In

**Problem:** Cart requires user authentication. If user is not signed in, items won't be added.

**Solution:**
- Make sure you're signed in via Clerk
- Check browser console for "User must be signed in" error

### 2. API Server Not Running

**Problem:** The backend API must be running for cart to work.

**Check:**
```bash
# In one terminal, start the API
npm run api
```

You should see:
```
✅ Connected to PostgreSQL database
Database connection test successful
Email API server running on port 3001
```

### 3. Database Connection Issue

**Problem:** Cannot connect to Supabase database.

**Check:**
1. Verify `.env` file has correct database credentials
2. Check Supabase dashboard - is your project active?
3. Test connection:
   ```bash
   npm run api
   ```
   Look for database connection errors

### 4. Database Tables Not Created

**Problem:** Tables don't exist in Supabase.

**Solution:**
1. Go to Supabase SQL Editor
2. Run the SQL from `SUPABASE_SQL_ONLY.sql`
3. Verify tables exist:
   ```sql
   SELECT * FROM carts;
   SELECT * FROM cart_items;
   ```

### 5. CORS Issues

**Problem:** Browser blocking API requests.

**Check browser console:**
- Look for CORS errors
- Make sure `VITE_API_URL` in `.env` matches where API is running

### 6. Check Browser Console

**Steps:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try adding item to cart
4. Look for error messages

**Common errors:**
- `Failed to fetch` - API server not running
- `User must be signed in` - Need to sign in
- `Network error` - Check API URL and CORS
- `Database connection failed` - Check Supabase credentials

## Quick Diagnostic Checklist

- [ ] User is signed in (check Clerk authentication)
- [ ] API server is running (`npm run api`)
- [ ] Database tables exist in Supabase
- [ ] `.env` file has correct database credentials
- [ ] Browser console shows no errors
- [ ] Network tab shows API requests are being made

## Debug Steps

1. **Check browser console:**
   - Open DevTools (F12)
   - Go to Console
   - Add item to cart
   - Note any errors

2. **Check Network tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Add item to cart
   - Look for `/api/cart/items` request
   - Check if it's successful (200) or failed (400/500)

3. **Check API server logs:**
   - Look at terminal where `npm run api` is running
   - Check for database errors or request logs

4. **Test API directly:**
   ```bash
   # Test if API is responding
   curl http://localhost:3001/api/health
   
   # Should return: {"status":"ok","message":"API is running"}
   ```

## Still Not Working?

Share:
1. Browser console errors (F12 → Console)
2. Network tab response (F12 → Network → click on `/api/cart/items`)
3. API server terminal output
4. Any error messages you see



