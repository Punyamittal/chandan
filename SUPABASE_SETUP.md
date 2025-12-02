# Supabase Setup Guide for Cart Database

## Step 1: Create Tables in Supabase

1. **Go to your Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Select your project

2. **Navigate to SQL Editor**
   - Click on **"SQL Editor"** in the left sidebar
   - Click **"New Query"**

3. **Run this SQL script:**

```sql
-- Enable UUID extension (usually already enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Carts table - stores cart information for each user
CREATE TABLE IF NOT EXISTS carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL, -- Clerk user ID
    session_id VARCHAR(255), -- For guest users (optional)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Ensure one active cart per user
    UNIQUE(user_id)
);

-- Cart items table - stores individual items in each cart
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
    -- Prevent duplicate products in the same cart
    UNIQUE(cart_id, product_id)
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_session_id ON carts(session_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for cart summary
CREATE OR REPLACE VIEW cart_summary AS
SELECT 
    c.id AS cart_id,
    c.user_id,
    c.created_at AS cart_created_at,
    c.updated_at AS cart_updated_at,
    COUNT(ci.id) AS total_items,
    SUM(ci.quantity) AS total_quantity,
    SUM(ci.quantity * ci.price_per_unit) AS subtotal,
    SUM(ci.quantity * ci.price_per_unit * ci.discount_percent / 100) AS total_discount,
    SUM(ci.quantity * ci.price_per_unit * (1 - ci.discount_percent / 100)) AS total_amount
FROM carts c
LEFT JOIN cart_items ci ON c.id = ci.cart_id
GROUP BY c.id, c.user_id, c.created_at, c.updated_at;
```

4. **Click "Run"** to execute the SQL

## Step 2: Get Your Supabase Connection Details

1. **Go to Project Settings**
   - Click on the **gear icon** (⚙️) in the left sidebar
   - Select **"Database"**

2. **Find Connection String**
   - Scroll to **"Connection string"** section
   - Copy the **"URI"** connection string
   - It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

3. **Or get individual settings:**
   - **Host**: `db.xxxxx.supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres` (default)
   - **User**: `postgres` (default)
   - **Password**: (Your database password - found in Settings → Database)

## Step 3: Update Your .env File

Add these variables to your `.env` file:

```env
# Supabase Database Configuration
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_supabase_password

# API Configuration
VITE_API_URL=http://localhost:3001
PORT=3001
```

**Replace:**
- `db.xxxxx.supabase.co` with your actual Supabase host
- `your_supabase_password` with your actual database password

## Step 4: Enable Row Level Security (Optional but Recommended)

For production, you should enable Row Level Security. Add this SQL in Supabase SQL Editor:

```sql
-- Enable RLS on carts table
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Enable RLS on cart_items table
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own carts
CREATE POLICY "Users can view own cart"
ON carts FOR SELECT
USING (auth.uid()::text = user_id);

-- Create policy: Users can insert their own carts
CREATE POLICY "Users can insert own cart"
ON carts FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

-- Create policy: Users can update their own carts
CREATE POLICY "Users can update own cart"
ON carts FOR UPDATE
USING (auth.uid()::text = user_id);

-- Similar policies for cart_items
CREATE POLICY "Users can view own cart items"
ON cart_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM carts 
    WHERE carts.id = cart_items.cart_id 
    AND carts.user_id = auth.uid()::text
  )
);

CREATE POLICY "Users can insert own cart items"
ON cart_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM carts 
    WHERE carts.id = cart_items.cart_id 
    AND carts.user_id = auth.uid()::text
  )
);

CREATE POLICY "Users can update own cart items"
ON cart_items FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM carts 
    WHERE carts.id = cart_items.cart_id 
    AND carts.user_id = auth.uid()::text
  )
);

CREATE POLICY "Users can delete own cart items"
ON cart_items FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM carts 
    WHERE carts.id = cart_items.cart_id 
    AND carts.user_id = auth.uid()::text
  )
);
```

**Note:** RLS policies above use `auth.uid()` which works if you're using Supabase Auth. Since you're using Clerk, you'll need to adjust the policies or disable RLS for now and handle authentication in your API layer (which is what we're doing).

## Step 5: Verify Tables Created

In Supabase SQL Editor, run:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('carts', 'cart_items');

-- Check table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'carts';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cart_items';
```

## Step 6: Test Your Setup

1. **Start your API server:**
   ```bash
   npm run api
   ```

2. **Check console** - you should see:
   ```
   ✅ Connected to PostgreSQL database
   Database connection test successful
   Email API server running on port 3001
   ```

## 📋 Summary

**Tables Created:**
1. ✅ `carts` - Stores user carts
2. ✅ `cart_items` - Stores cart items

**What Each Table Stores:**

### `carts` table:
- `id` - Unique cart ID
- `user_id` - Clerk user ID
- `session_id` - For guest users (optional)
- `created_at` - When cart was created
- `updated_at` - When cart was last updated

### `cart_items` table:
- `id` - Unique item ID
- `cart_id` - Links to cart
- `product_id` - Product identifier
- `product_name` - Product name
- `product_image` - Product image URL
- `quantity` - Item quantity
- `price_per_unit` - Price per unit
- `discount_percent` - Discount percentage
- `created_at` - When item was added
- `updated_at` - When item was last updated

That's it! Once you run the SQL in Supabase and update your `.env` file, your cart database will be ready to use.



