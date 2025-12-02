# PostgreSQL Database Setup for Cart Storage

This guide will help you set up PostgreSQL database for storing customer cart data.

## 📋 Prerequisites

1. **PostgreSQL installed** on your system
   - Download from: https://www.postgresql.org/download/
   - Or use a cloud service like:
     - [Supabase](https://supabase.com) (Free tier available)
     - [Neon](https://neon.tech) (Free tier available)
     - [Railway](https://railway.app) (Free tier available)
     - [AWS RDS](https://aws.amazon.com/rds/)
     - [Heroku Postgres](https://www.heroku.com/postgres)

2. **Node.js and npm** installed

## 🚀 Setup Steps

### Step 1: Install Dependencies

```bash
cd print-arc-hub
npm install
```

This will install:
- `pg` - PostgreSQL client for Node.js
- `express` - Web framework (if not already installed)
- `cors` - CORS middleware (if not already installed)

### Step 2: Set Up PostgreSQL Database

#### Option A: Local PostgreSQL Installation

1. **Create a new database:**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE print_arc_hub;

   # Create a user (optional but recommended)
   CREATE USER print_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE print_arc_hub TO print_user;

   # Exit psql
   \q
   ```

2. **Run the schema:**
   ```bash
   psql -U postgres -d print_arc_hub -f api/database/schema.sql
   ```

#### Option B: Cloud PostgreSQL (Recommended for Production)

1. **Sign up for a free PostgreSQL service** (e.g., Supabase, Neon)
2. **Get your connection string** from the dashboard
3. **Use the connection string** in your `.env` file (see Step 3)

### Step 3: Configure Environment Variables

Add these variables to your `.env` file in the project root:

```env
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=print_arc_hub
DB_USER=postgres
DB_PASSWORD=your_password

# API Configuration
VITE_API_URL=http://localhost:3001
PORT=3001
```

**For cloud databases**, use the connection string format:
```env
# Example for Supabase/Neon
DB_HOST=your-db-host.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
```

### Step 4: Verify Database Connection

1. **Start the API server:**
   ```bash
   npm run api
   ```

2. **Check the console** - you should see:
   ```
   ✅ Connected to PostgreSQL database
   Database connection test successful: { now: '2024-...' }
   Email API server running on port 3001
   ```

3. **Test the health endpoint:**
   ```bash
   curl http://localhost:3001/api/health
   ```

### Step 5: Test Cart API

You can test the cart API endpoints using curl or Postman:

```bash
# Get cart (replace USER_ID with actual Clerk user ID)
curl http://localhost:3001/api/cart?userId=USER_ID \
  -H "x-user-id: USER_ID"

# Add item to cart
curl -X POST http://localhost:3001/api/cart/items \
  -H "Content-Type: application/json" \
  -H "x-user-id: USER_ID" \
  -d '{
    "productId": "prod-123",
    "productName": "Business Cards",
    "quantity": 10,
    "pricePerUnit": 2.50,
    "discount": 5
  }'
```

## 📁 Database Schema

The database includes:

### Tables:

1. **`carts`** - Stores cart information
   - `id` (UUID) - Primary key
   - `user_id` (VARCHAR) - Clerk user ID
   - `session_id` (VARCHAR) - For guest users (optional)
   - `created_at`, `updated_at` - Timestamps

2. **`cart_items`** - Stores individual cart items
   - `id` (UUID) - Primary key
   - `cart_id` (UUID) - Foreign key to carts
   - `product_id` (VARCHAR) - Product identifier
   - `product_name` (VARCHAR) - Product name
   - `product_image` (VARCHAR) - Product image URL
   - `quantity` (INTEGER) - Item quantity
   - `price_per_unit` (DECIMAL) - Price per unit
   - `discount_percent` (DECIMAL) - Discount percentage
   - `created_at`, `updated_at` - Timestamps

### Features:

- ✅ Automatic timestamp updates
- ✅ Unique constraints to prevent duplicates
- ✅ Cascade delete (removing cart removes items)
- ✅ Indexes for better query performance
- ✅ Cart summary view for analytics

## 🔌 API Endpoints

### GET `/api/cart`
Get user's cart with all items

**Headers:**
- `x-user-id`: User ID (Clerk user ID)

**Response:**
```json
{
  "success": true,
  "cart": {
    "id": "uuid",
    "userId": "user_xxx",
    "items": [...]
  }
}
```

### POST `/api/cart/items`
Add item to cart

**Body:**
```json
{
  "productId": "prod-123",
  "productName": "Business Cards",
  "image": "https://...",
  "quantity": 10,
  "pricePerUnit": 2.50,
  "discount": 5
}
```

### PUT `/api/cart/items/:itemId`
Update cart item quantity

**Body:**
```json
{
  "quantity": 20
}
```

### DELETE `/api/cart/items/:itemId`
Remove item from cart

### DELETE `/api/cart`
Clear entire cart

## 🎨 Frontend Integration

The frontend uses React Query to manage cart state. The `useCart` hook provides:

```typescript
const {
  cart,
  items,
  isLoading,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  totalItems,
  subtotal,
  totalDiscount,
  total,
} = useCart();
```

## 🐛 Troubleshooting

### Connection Issues

1. **Check PostgreSQL is running:**
   ```bash
   # Windows
   services.msc  # Look for PostgreSQL service

   # Mac/Linux
   brew services list  # or systemctl status postgresql
   ```

2. **Verify credentials** in `.env` file

3. **Check firewall** - PostgreSQL default port is 5432

4. **Test connection manually:**
   ```bash
   psql -h localhost -U postgres -d print_arc_hub
   ```

### Common Errors

- **"relation does not exist"** - Run the schema.sql file
- **"password authentication failed"** - Check DB_PASSWORD in .env
- **"connection refused"** - Check DB_HOST and DB_PORT
- **"database does not exist"** - Create the database first

## 📊 Database Management

### View Cart Data

```sql
-- View all carts
SELECT * FROM carts;

-- View cart with items
SELECT c.*, ci.* 
FROM carts c
LEFT JOIN cart_items ci ON c.id = ci.cart_id
WHERE c.user_id = 'user_xxx';

-- View cart summary
SELECT * FROM cart_summary WHERE user_id = 'user_xxx';
```

### Backup Database

```bash
pg_dump -U postgres print_arc_hub > backup.sql
```

### Restore Database

```bash
psql -U postgres print_arc_hub < backup.sql
```

## 🚀 Production Deployment

For production:

1. **Use environment variables** for all database credentials
2. **Enable SSL** for database connections
3. **Set up connection pooling** (already configured)
4. **Monitor database performance**
5. **Set up automated backups**
6. **Use a managed PostgreSQL service** (Supabase, Neon, etc.)

## 📝 Next Steps

1. ✅ Database is set up
2. ✅ API endpoints are working
3. ✅ Frontend is integrated
4. 🔄 Test cart functionality
5. 🔄 Deploy to production

## 🆘 Support

If you encounter issues:
1. Check the console logs
2. Verify database connection
3. Check environment variables
4. Review the API endpoint responses

---

**Note:** Make sure to keep your database credentials secure and never commit them to version control!




