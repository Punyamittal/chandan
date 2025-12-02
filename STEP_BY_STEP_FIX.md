# 🚨 FIX YOUR CART - Step by Step

## The Problem

You're getting **500 errors** because the database tables **don't exist yet**.

Every time you try to add to cart, the API tries to access the `carts` table, but it doesn't exist, so you get a 500 error.

## ✅ THE FIX - Follow These Steps:

### 📝 Step 1: Open Supabase Dashboard

1. Go to: **https://app.supabase.com**
2. Sign in
3. Click on your project (or create one if you don't have one)

### 📝 Step 2: Open SQL Editor

1. In the left sidebar, click **"SQL Editor"**
2. Click the **"New Query"** button at the top

### 📝 Step 3: Copy the SQL Code

**Option A: Use the file in your project**
1. Open the file: `SUPABASE_SQL_ONLY.sql` in your project folder
2. Copy **ALL** the code from that file

**Option B: Copy from here**

Copy this entire code block:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(500),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_per_unit DECIMAL(10, 2) NOT NULL CHECK (price_per_unit >= 0),
    discount_percent DECIMAL(5, 2) DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cart_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_session_id ON carts(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 📝 Step 4: Paste and Run

1. Paste the SQL code into the Supabase SQL Editor
2. Click the **"Run"** button (or press `Ctrl+Enter`)
3. Wait for a success message at the bottom

**You should see:** "Success. No rows returned" or similar ✅

### 📝 Step 5: Verify Tables Were Created

In the same SQL Editor, run this query:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('carts', 'cart_items');
```

Click **"Run"** again.

**You should see:**
```
table_name
----------
carts
cart_items
```

If you see both, you're good! ✅

### 📝 Step 6: Restart Your API Server

1. Go to your terminal where `npm run api` is running
2. Press **Ctrl+C** to stop it
3. Start it again: `npm run api`
4. You should see: `✅ Connected to PostgreSQL database`

### 📝 Step 7: Test Your Cart

1. **Refresh your browser** (F5 or Ctrl+R)
2. Make sure you're **signed in** (check top right corner)
3. Go to the **Products** page
4. Click **"Add to Cart"** on any product
5. **It should work now!** 🎉

## ❓ Still Not Working?

If you still get errors after creating the tables:

### Check the API Server Terminal

Look at the terminal where `npm run api` is running. What error message do you see?

Common messages:
- `relation "carts" does not exist` → Tables not created properly (redo Step 4)
- `password authentication failed` → Wrong password in `.env` file
- `Connection refused` → Database host wrong in `.env` file

### Check Browser Console

1. Press **F12** in your browser
2. Click the **Console** tab
3. Try adding an item to cart
4. What error message appears?

Share those error messages with me and I'll help you fix it!

## ✅ Checklist

Before asking for help, make sure:
- [ ] You created the tables in Supabase (Step 4)
- [ ] You verified tables exist (Step 5 shows both tables)
- [ ] You restarted the API server (Step 6)
- [ ] You refreshed your browser (Step 7)

If all checkboxes are done and it still doesn't work, share the error messages!



