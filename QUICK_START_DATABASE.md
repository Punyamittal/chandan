# Quick Start: PostgreSQL Cart Database

## 🚀 Quick Setup (5 minutes)

### 1. Install PostgreSQL

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Or use Chocolatey: `choco install postgresql`

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE print_arc_hub;

# Exit
\q
```

### 3. Run Schema

```bash
psql -U postgres -d print_arc_hub -f api/database/schema.sql
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Configure Environment

Add to `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=print_arc_hub
DB_USER=postgres
DB_PASSWORD=your_password
VITE_API_URL=http://localhost:3001
```

### 6. Start Server

```bash
# Start both frontend and API
npm run dev:all
```

## ✅ Verify It Works

1. Sign in to your app (Clerk authentication)
2. Add items to cart
3. Check database:
```sql
SELECT * FROM carts;
SELECT * FROM cart_items;
```

## 🎉 Done!

Your cart is now stored in PostgreSQL and persists across sessions!




