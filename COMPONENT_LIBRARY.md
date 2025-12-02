# Bulk-Order Component Library Guide

## 🎯 Quick Start

This guide provides examples and best practices for using the bulk-order component library.

## 📦 Component Reference

### BulkSearchBar

**Location:** `src/components/BulkSearchBar.tsx`

**Purpose:** Multi-field search interface for bulk product discovery

**Props:**
```typescript
interface BulkSearchBarProps {
  onSearch?: (data: SearchData) => void;
  variant?: "hero" | "inline";
}

interface SearchData {
  product: string;
  quantity: string;
  category: string;
  location: string;
  deliveryDate: string;
}
```

**Example Usage:**
```tsx
import BulkSearchBar from "@/components/BulkSearchBar";

// Hero variant (for landing page)
<BulkSearchBar 
  variant="hero"
  onSearch={(data) => {
    console.log("Searching for:", data);
    // Navigate to products page with filters
    router.push(`/products?q=${data.product}&qty=${data.quantity}`);
  }}
/>

// Inline variant (for product pages)
<BulkSearchBar 
  variant="inline"
  onSearch={handleSearch}
/>
```

---

### BulkProductCard

**Location:** `src/components/BulkProductCard.tsx`

**Purpose:** Display product with bulk pricing, discounts, and quick actions

**Props:**
```typescript
interface BulkProductCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  pricePerUnit: number;
  bulkDiscounts: Array<{ minQty: number; discount: number }>;
  minOrderQty: number;
  availability: "In Stock" | "Made to Order" | "Low Stock";
  popularBadge?: boolean;
  specs?: string;
  onAddToCart?: (productId: string, quantity: number) => void;
  onRequestQuote?: (productId: string, quantity: number) => void;
}
```

**Example Usage:**
```tsx
import BulkProductCard from "@/components/BulkProductCard";

<BulkProductCard
  id="prod-123"
  name="Premium Business Cards"
  image="/images/business-cards.jpg"
  rating={4.9}
  reviews={245}
  pricePerUnit={2.5}
  bulkDiscounts={[
    { minQty: 500, discount: 15 },
    { minQty: 1000, discount: 25 },
    { minQty: 5000, discount: 35 },
  ]}
  minOrderQty={100}
  availability="In Stock"
  popularBadge={true}
  specs="Premium cardstock, custom designs, multiple finishes"
  onAddToCart={(id, qty) => {
    addToCart({ id, quantity: qty });
  }}
  onRequestQuote={(id, qty) => {
    openQuoteDialog({ productId: id, quantity: qty });
  }}
/>
```

**Features:**
- Automatic bulk discount calculation based on quantity
- Real-time price updates
- Favorite/wishlist toggle
- Responsive image with hover effects
- Availability badge
- "Most Ordered" tag support

---

### BulkCart

**Location:** `src/components/BulkCart.tsx`

**Purpose:** Floating cart with full order management

**Props:**
```typescript
interface BulkCartProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  pricePerUnit: number;
  discount: number;
}
```

**Example Usage:**
```tsx
import BulkCart from "@/components/BulkCart";

const [cartItems, setCartItems] = useState<CartItem[]>([]);

<BulkCart
  items={cartItems}
  onUpdateQuantity={(id, newQty) => {
    setCartItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  }}
  onRemoveItem={(id) => {
    setCartItems(items.filter(item => item.id !== id));
  }}
  onCheckout={() => {
    router.push('/checkout');
  }}
/>
```

**Features:**
- Floating action button with badge
- Slide-out sheet interface
- Quantity controls (±10 increments)
- CSV/Excel upload button
- Order summary with discounts
- Multi-step progress indicator
- Responsive design

---

### ProductFilters

**Location:** `src/components/ProductFilters.tsx`

**Purpose:** Advanced filtering sidebar for product discovery

**Props:**
```typescript
interface ProductFiltersProps {
  onFilterChange?: (filters: FilterOptions) => void;
  activeFiltersCount?: number;
}

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  availability: string[];
  rating: number;
  minQuantity: number;
}
```

**Example Usage:**
```tsx
import ProductFilters from "@/components/ProductFilters";

const [filters, setFilters] = useState<FilterOptions>({
  categories: [],
  priceRange: [0, 1000],
  availability: [],
  rating: 0,
  minQuantity: 0,
});

<ProductFilters
  onFilterChange={(newFilters) => {
    setFilters(newFilters);
    // Fetch filtered products
    fetchProducts(newFilters);
  }}
  activeFiltersCount={
    filters.categories.length + 
    filters.availability.length + 
    (filters.rating > 0 ? 1 : 0)
  }
/>
```

**Features:**
- Desktop sidebar / Mobile drawer
- Multi-select categories
- Price range slider
- Availability checkboxes
- Rating filter buttons
- Clear all functionality
- Active filter counter

---

### ReviewCard

**Location:** `src/components/ReviewCard.tsx`

**Purpose:** Display customer reviews with verification

**Props:**
```typescript
interface ReviewCardProps {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  productName: string;
  orderQuantity: number;
  verified: boolean;
  helpful: number;
  images?: string[];
}
```

**Example Usage:**
```tsx
import ReviewCard from "@/components/ReviewCard";

<ReviewCard
  id="rev-123"
  userName="Rajesh Kumar"
  userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
  rating={5}
  date="2 weeks ago"
  title="Excellent Quality and Fast Delivery"
  review="Ordered 5000 business cards. Quality exceeded expectations..."
  productName="Premium Business Cards"
  orderQuantity={5000}
  verified={true}
  helpful={24}
  images={["url1.jpg", "url2.jpg"]}
/>
```

**Features:**
- User avatar with fallback
- Verified badge for authenticated buyers
- Star rating display
- Product and order info
- Review images gallery
- Helpful voting system
- Responsive layout

---

### TrustBadge

**Location:** `src/components/TrustBadge.tsx`

**Purpose:** Display trust signals and certifications

**Props:**
```typescript
interface TrustBadgeProps {
  type: "verified" | "fast-delivery" | "quality" | "bulk-discount" | "trusted" | "certified";
  label: string;
  description?: string;
  variant?: "compact" | "detailed";
}
```

**Example Usage:**
```tsx
import TrustBadge from "@/components/TrustBadge";

// Compact variant (for headers)
<TrustBadge 
  type="verified" 
  label="Verified Supplier" 
  variant="compact" 
/>

// Detailed variant (for feature sections)
<TrustBadge 
  type="fast-delivery" 
  label="Fast Delivery"
  description="Express shipping available for bulk orders"
  variant="detailed" 
/>
```

**Available Types:**
- `verified` - Green badge with shield icon
- `fast-delivery` - Blue badge with truck icon
- `quality` - Purple badge with award icon
- `bulk-discount` - Orange badge with users icon
- `trusted` - Indigo badge with check icon
- `certified` - Teal badge with clock icon

---

### HeroBulkOrder

**Location:** `src/components/HeroBulkOrder.tsx`

**Purpose:** Full-screen hero with integrated search

**Props:**
```typescript
interface HeroBulkOrderProps {
  onSearch?: (data: SearchData) => void;
}
```

**Example Usage:**
```tsx
import HeroBulkOrder from "@/components/HeroBulkOrder";

<HeroBulkOrder
  onSearch={(data) => {
    // Handle search submission
    navigateToProducts(data);
  }}
/>
```

**Features:**
- Parallax background image
- Animated statistics cards
- Integrated search bar
- Promotional badges
- Scroll indicator
- Responsive gradients

---

### FeaturedBulkDeals

**Location:** `src/components/FeaturedBulkDeals.tsx`

**Purpose:** Showcase featured bulk discount offers

**Props:** None (self-contained)

**Example Usage:**
```tsx
import FeaturedBulkDeals from "@/components/FeaturedBulkDeals";

<FeaturedBulkDeals />
```

**Customization:**
Edit the `deals` array in the component to add/modify deals:
```typescript
const deals = [
  {
    title: "Business Cards Mega Pack",
    image: "url",
    discount: "35%",
    minQuantity: "1000",
    description: "...",
    tag: "Hot Deal", // optional
  },
  // ... more deals
];
```

---

### ReviewsSection

**Location:** `src/components/ReviewsSection.tsx`

**Purpose:** Complete reviews section with ratings and testimonials

**Props:** None (self-contained)

**Example Usage:**
```tsx
import ReviewsSection from "@/components/ReviewsSection";

<ReviewsSection />
```

**Customization:**
Edit the `reviews` array and `trustBadges` in the component.

---

## 🎨 Styling Guidelines

### Consistency Rules

1. **Spacing:** Use Tailwind's scale (4, 6, 8, 12, 16, 24)
2. **Rounded Corners:** 
   - Cards: `rounded-xl` (12px)
   - Buttons: `rounded-md` (6px)
   - Badges: `rounded-full`
3. **Shadows:**
   - Default: `shadow-md`
   - Hover: `shadow-xl`
4. **Transitions:** `duration-300` for most, `duration-500` for complex

### Color Usage

- **Primary Actions:** `bg-primary text-primary-foreground`
- **Secondary Actions:** `bg-secondary text-secondary-foreground`
- **Destructive:** `bg-destructive text-destructive-foreground`
- **Muted Text:** `text-muted-foreground`

### Animation Patterns

```tsx
// Fade in on view
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>

// Hover scale
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Button
</motion.div>

// Staggered children
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## 🔧 Common Patterns

### State Management

```tsx
// Cart state
const [cartItems, setCartItems] = useState<CartItem[]>([]);

// Add item
const addToCart = (product: Product, quantity: number) => {
  setCartItems([...cartItems, {
    id: product.id,
    name: product.name,
    image: product.image,
    quantity,
    pricePerUnit: product.pricePerUnit,
    discount: calculateDiscount(quantity, product.bulkDiscounts),
  }]);
};

// Update quantity
const updateQuantity = (id: string, newQty: number) => {
  setCartItems(items.map(item => 
    item.id === id ? { ...item, quantity: newQty } : item
  ));
};

// Remove item
const removeItem = (id: string) => {
  setCartItems(items.filter(item => item.id !== id));
};
```

### Discount Calculation

```tsx
const calculateDiscount = (quantity: number, bulkDiscounts: Array<{minQty: number; discount: number}>) => {
  const applicable = bulkDiscounts
    .filter(d => quantity >= d.minQty)
    .sort((a, b) => b.discount - a.discount);
  return applicable[0]?.discount || 0;
};
```

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => (
    <BulkProductCard key={product.id} {...product} />
  ))}
</div>
```

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach

```tsx
// Stack on mobile, grid on desktop
className="flex flex-col lg:flex-row gap-8"

// Hide on mobile, show on desktop
className="hidden lg:block"

// Full width on mobile, constrained on desktop
className="w-full lg:w-1/2"
```

## 🚀 Performance Tips

1. **Lazy Load Images:**
```tsx
<img 
  loading="lazy" 
  src={product.image} 
  alt={product.name} 
/>
```

2. **Memoize Expensive Calculations:**
```tsx
const finalPrice = useMemo(() => 
  calculatePrice(quantity, pricePerUnit, discount),
  [quantity, pricePerUnit, discount]
);
```

3. **Debounce Search:**
```tsx
const debouncedSearch = useMemo(
  () => debounce((value) => performSearch(value), 300),
  []
);
```

## 🧪 Testing Checklist

- [ ] Component renders without errors
- [ ] Props are properly typed
- [ ] Responsive on all breakpoints
- [ ] Animations are smooth
- [ ] Hover states work
- [ ] Click handlers fire correctly
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] No console errors/warnings

---

**Version:** 2.0.0  
**Last Updated:** October 29, 2025











