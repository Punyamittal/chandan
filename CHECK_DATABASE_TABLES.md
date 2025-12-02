# ❌ 500 Error: Database Tables Don't Exist

## The Problem

You're getting `500 Internal Server Error` when trying to add items to cart. This means:

✅ API server is running  
✅ Database connection might be working  
❌ **Database tables don't exist yet**

## The Solution

### Step 1: Go to Supabase SQL Editor

1. Go to: https://app.supabase.com
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**

### Step 2: Copy and Paste This SQL

Open the file `SUPABASE_SQL_ONLY.sql` and copy ALL of it, or use this:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Carts table
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Cart items table
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);

-- Function for auto-updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Step 3: Run the SQL

1. Paste the SQL into the editor
2. Click **"Run"** button (or press Ctrl+Enter)
3. Wait for success message

### Step 4: Verify Tables Exist

Run this query to check:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('carts', 'cart_items');
```

You should see both tables listed:
- `carts`
- `cart_items`

### Step 5: Restart API Server

After creating tables, restart your API server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run api
```

### Step 6: Test Again

1. Refresh your browser
2. Try adding item to cart
3. Should work now! ✅

## Quick Test

After creating tables, test the database check endpoint:

```
http://localhost:3001/api/db-check
```

It should show:
```json
{
  "status": "ok",
  "tablesExist": {
    "carts": true,
    "cart_items": true
  }
}
```

## Still Getting Errors?

Check the API server terminal for detailed error messages. The improved error logging will show exactly what's wrong.



