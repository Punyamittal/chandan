# Quick Start Guide - Bulk Order Platform

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:5173`

---

## 🗺️ Page Navigation Guide

### Homepage (`/`)
**What You'll See:**
- Full-screen hero with bulk search bar (5 fields)
- Trust badges (4 badges in a row)
- Featured bulk deals carousel
- Benefits of bulk ordering section
- Customer reviews with ratings
- Product categories grid
- CTA section

**Try This:**
1. Fill out the search form and click "Search Bulk Products"
2. Scroll down to see parallax effects
3. Hover over deal cards to see animations
4. Check out the review ratings and testimonials

### Products Page (`/products`)
**What You'll See:**
- Search bar at top
- Filter sidebar (desktop) or drawer (mobile)
- Product grid (3 columns)
- Each product shows:
  - Rating and reviews
  - Bulk discount tiers
  - Quantity input
  - Real-time price calculation
  - Add to cart button

**Try This:**
1. Click the filter categories
2. Adjust the price range slider
3. Change quantity on a product card (watch price update)
4. Click "Add to Cart"
5. Click the floating cart button (bottom-right)
6. Try grid/list view toggle

### Bulk Deals Page (`/bulk-deals`)
**What You'll See:**
- Large featured flash sale at top
- Deal cards grid
- Discount badges (30-40% OFF)
- Countdown timers
- Savings calculations

**Try This:**
1. Hover over deal cards
2. Click "Claim This Deal" buttons
3. Check out the featured section

### Dashboard Page (`/dashboard`)
**What You'll See:**
- 4 stat cards at top
- Tabs: Orders, Quotes, Saved
- Order cards with progress bars
- Status badges (In Production, Shipped, Delivered)

**Try This:**
1. Switch between tabs
2. Click "View Details" on orders
3. Check the progress bars

---

## 🎨 Component Examples

### Using BulkSearchBar

```tsx
import BulkSearchBar from "@/components/BulkSearchBar";

// In your component
<BulkSearchBar 
  variant="hero"
  onSearch={(data) => {
    console.log("Search data:", data);
    // Navigate to products with filters
  }}
/>
```

### Using BulkProductCard

```tsx
import BulkProductCard from "@/components/BulkProductCard";

<BulkProductCard
  id="1"
  name="Premium Business Cards"
  image="/images/card.jpg"
  rating={4.9}
  reviews={245}
  pricePerUnit={2.5}
  bulkDiscounts={[
    { minQty: 500, discount: 15 },
    { minQty: 1000, discount: 25 },
  ]}
  minOrderQty={100}
  availability="In Stock"
  onAddToCart={(id, qty) => console.log(`Added ${qty} of ${id}`)}
/>
```

### Using BulkCart

```tsx
import BulkCart from "@/components/BulkCart";

<BulkCart
  items={cartItems}
  onUpdateQuantity={(id, qty) => updateCart(id, qty)}
  onRemoveItem={(id) => removeFromCart(id)}
  onCheckout={() => navigate('/checkout')}
/>
```

---

## 🎯 Key Features to Test

### 1. Bulk Price Calculation
1. Go to Products page
2. Select any product
3. Change quantity to 100 → see base price
4. Change to 500 → see 15% discount applied
5. Change to 1000 → see 25% discount applied

### 2. Cart Management
1. Add multiple products to cart
2. Click floating cart button
3. Adjust quantities using ± buttons
4. Remove items
5. View total with discounts

### 3. Filter & Sort
1. Go to Products page
2. Select categories (multiple)
3. Adjust price range
4. Apply rating filter
5. Sort by different criteria

### 4. Search Functionality
1. Use hero search on homepage
2. Fill all fields
3. Click "Search Bulk Products"
4. Results should filter accordingly

### 5. Responsive Design
1. Open browser dev tools
2. Toggle device toolbar
3. Test at different breakpoints:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px+)
4. Check:
   - Navigation becomes hamburger on mobile
   - Filters become drawer on mobile
   - Grid changes to 1-2-3 columns

---

## 🎨 Customization Guide

### Change Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      // Add your custom colors
    },
  },
}
```

### Update Products

Edit `src/pages/Products.tsx`:
```typescript
const products = [
  {
    id: "1",
    name: "Your Product",
    image: "url",
    rating: 4.9,
    reviews: 100,
    pricePerUnit: 10,
    bulkDiscounts: [
      { minQty: 100, discount: 10 },
      { minQty: 500, discount: 20 },
    ],
    minOrderQty: 50,
    availability: "In Stock",
    specs: "Your product specs",
  },
  // Add more products...
];
```

### Update Deals

Edit `src/components/FeaturedBulkDeals.tsx`:
```typescript
const deals = [
  {
    title: "Your Deal",
    image: "url",
    discount: "30%",
    minQuantity: "500",
    description: "Deal description",
    tag: "Hot Deal", // optional
  },
  // Add more deals...
];
```

### Update Reviews

Edit `src/components/ReviewsSection.tsx`:
```typescript
const reviews = [
  {
    id: "1",
    userName: "Customer Name",
    rating: 5,
    date: "1 week ago",
    title: "Review Title",
    review: "Review text...",
    productName: "Product Name",
    orderQuantity: 1000,
    verified: true,
    helpful: 10,
  },
  // Add more reviews...
];
```

---

## 🔧 Troubleshooting

### Issue: Components not rendering
**Solution:** Make sure all imports are correct and TypeScript has no errors

### Issue: Images not showing
**Solution:** 
1. Check image URLs are valid
2. For local images, place in `public/` folder
3. Use path like `/images/your-image.jpg`

### Issue: Styles not applying
**Solution:**
1. Restart dev server
2. Check Tailwind CSS classes are valid
3. Clear browser cache

### Issue: Cart not updating
**Solution:**
1. Check state management
2. Verify `onUpdateQuantity` and `onRemoveItem` callbacks
3. Console.log the cart state

---

## 📱 Mobile Testing Checklist

- [ ] Navigation hamburger menu works
- [ ] Filters drawer opens/closes
- [ ] Products display in single column
- [ ] Touch targets are large enough (44px+)
- [ ] Images load properly
- [ ] Cart is accessible
- [ ] Forms are easy to fill
- [ ] Text is readable without zooming

---

## 🎓 Learning Resources

### Understanding the Code
1. **Components:** Start with `BulkSearchBar.tsx` - it's the simplest
2. **State:** Check `Products.tsx` for cart state management
3. **Routing:** Review `App.tsx` for route configuration
4. **Styling:** Look at any component for Tailwind patterns

### Framer Motion Animations
- `initial` - Starting state
- `animate` - End state
- `whileHover` - Hover effects
- `whileInView` - Scroll-triggered animations
- `transition` - Animation timing

Example:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

---

## 🚀 Next Steps

1. **Test all features** listed above
2. **Customize content** (products, deals, reviews)
3. **Update branding** (colors, logo, copy)
4. **Add backend** integration for real data
5. **Deploy** to production

---

## 📞 Need Help?

- **UI Documentation:** `UI_REDESIGN.md`
- **Component Guide:** `COMPONENT_LIBRARY.md`
- **Before/After:** `REDESIGN_SUMMARY.md`

---

**Happy Building! 🎉**

