# ⚠️ URGENT: Cart Not Working - Database Tables Missing

## The Problem

You're getting **500 Internal Server Error** which means:
- ✅ API server IS running
- ✅ User IS signed in (Clerk working)
- ❌ **Database tables DON'T EXIST**

The error happens because the code tries to access `carts` and `cart_items` tables, but they don't exist in your Supabase database.

## ✅ The Fix - DO THIS NOW:

### Step 1: Open Supabase

1. Go to: **https://app.supabase.com**
2. Sign in
3. Click on your project

### Step 2: Open SQL Editor

1. Click **"SQL Editor"** in the left sidebar
2. Click **"New Query"** button

### Step 3: Copy This SQL

Copy **ALL** of this SQL code:

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

### Step 4: Run the SQL

1. Paste the SQL into the editor
2. Click the **"Run"** button (or press Ctrl+Enter)
3. Wait for: **"Success. No rows returned"** message

### Step 5: Verify Tables Created

Run this query to check:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('carts', 'cart_items');
```

You should see:
```
carts
cart_items
```

### Step 6: Restart API Server

1. In your terminal, press **Ctrl+C** to stop the API server
2. Run: `npm run api`
3. Should see: `✅ Connected to PostgreSQL database`

### Step 7: Test Cart

1. Refresh your browser (F5)
2. Make sure you're signed in
3. Go to Products page
4. Add item to cart
5. **Should work now!** ✅

## Why This Happens

The 500 error means the server tried to run:
```sql
SELECT id FROM carts WHERE user_id = $1
```

But the `carts` table doesn't exist, so PostgreSQL returns an error, and the API returns 500.

Once you create the tables, this will work!

## Still Having Issues?

After creating tables, if it still doesn't work, check:

1. **API Server Terminal** - What error messages do you see?
2. **Browser Console** - Any new error messages?
3. **Tables Verified** - Did the verification query show both tables?

Let me know what you see!



