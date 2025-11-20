import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BulkProductCard from "@/components/BulkProductCard";
import ProductFilters, { FilterOptions } from "@/components/ProductFilters";
import BulkSearchBar, { SearchData } from "@/components/BulkSearchBar";
import BulkCart, { CartItem } from "@/components/BulkCart";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import ParticleField from "@/components/backgrounds/ParticleField";

const Products = () => {
  const { currentTheme } = useTheme();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    availability: [],
    rating: 0,
    minQuantity: 0,
  });

  const products = [
    {
      id: "1",
      name: "Premium Business Cards",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 245,
      pricePerUnit: 2.5,
      bulkDiscounts: [
        { minQty: 500, discount: 15 },
        { minQty: 1000, discount: 25 },
        { minQty: 5000, discount: 35 },
      ],
      minOrderQty: 100,
      availability: "In Stock" as const,
      popularBadge: true,
      specs: "Premium cardstock, custom designs, multiple finishes available",
    },
    {
      id: "2",
      name: "Corporate Letterheads",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 189,
      pricePerUnit: 1.8,
      bulkDiscounts: [
        { minQty: 500, discount: 20 },
        { minQty: 1000, discount: 30 },
        { minQty: 2500, discount: 40 },
      ],
      minOrderQty: 250,
      availability: "In Stock" as const,
      popularBadge: true,
      specs: "High-quality paper, professional printing, custom branding",
    },
    {
      id: "3",
      name: "Executive Diaries 2025",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 156,
      pricePerUnit: 45,
      bulkDiscounts: [
        { minQty: 50, discount: 10 },
        { minQty: 200, discount: 20 },
        { minQty: 500, discount: 30 },
      ],
      minOrderQty: 25,
      availability: "In Stock" as const,
      specs: "Leather cover, customizable, corporate gifting perfect",
    },
    {
      id: "4",
      name: "Visiting Cards Premium",
      image: "https://images.unsplash.com/photo-1613243555978-0c2ea36f6c6e?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 201,
      pricePerUnit: 3.2,
      bulkDiscounts: [
        { minQty: 250, discount: 12 },
        { minQty: 500, discount: 22 },
        { minQty: 1000, discount: 32 },
      ],
      minOrderQty: 100,
      availability: "In Stock" as const,
      specs: "Multiple finishes, embossing available, fast turnaround",
    },
    {
      id: "5",
      name: "File Covers & Folders",
      image: "https://images.unsplash.com/photo-1544906388-1aef9d7ab57b?w=800&h=600&fit=crop",
      rating: 4.5,
      reviews: 134,
      pricePerUnit: 12,
      bulkDiscounts: [
        { minQty: 100, discount: 15 },
        { minQty: 500, discount: 25 },
        { minQty: 1000, discount: 35 },
      ],
      minOrderQty: 50,
      availability: "In Stock" as const,
      specs: "Durable material, custom printing, professional finish",
    },
    {
      id: "6",
      name: "Custom Notebooks",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 178,
      pricePerUnit: 25,
      bulkDiscounts: [
        { minQty: 50, discount: 10 },
        { minQty: 200, discount: 20 },
        { minQty: 500, discount: 30 },
      ],
      minOrderQty: 25,
      availability: "In Stock" as const,
      specs: "Spiral/hardbound, branded covers, quality paper",
    },
    {
      id: "7",
      name: "Eco-Friendly Carry Bags",
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 98,
      pricePerUnit: 8,
      bulkDiscounts: [
        { minQty: 500, discount: 20 },
        { minQty: 1000, discount: 30 },
        { minQty: 5000, discount: 40 },
      ],
      minOrderQty: 200,
      availability: "In Stock" as const,
      popularBadge: true,
      specs: "Recyclable material, custom branding, strong handles",
    },
    {
      id: "8",
      name: "Large Format Posters",
      image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 112,
      pricePerUnit: 55,
      bulkDiscounts: [
        { minQty: 50, discount: 15 },
        { minQty: 100, discount: 25 },
        { minQty: 500, discount: 35 },
      ],
      minOrderQty: 10,
      availability: "Made to Order" as const,
      specs: "High-resolution printing, multiple sizes, weather-resistant",
    },
  ];

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const discount =
        product.bulkDiscounts
          .filter((d) => quantity >= d.minQty)
          .sort((a, b) => b.discount - a.discount)[0]?.discount || 0;

      setCartItems([
        ...cartItems,
        {
          id: productId,
          name: product.name,
          image: product.image,
          quantity,
          pricePerUnit: product.pricePerUnit,
          discount,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleSearch = (data: SearchData) => {
    console.log("Search:", data);
    // Implement search logic here
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setActiveFilters(filters);
    console.log("Filters:", filters);
    // Implement filter logic here
  };

  const activeFiltersCount =
    activeFilters.categories.length +
    activeFilters.availability.length +
    (activeFilters.rating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen" style={{ background: currentTheme.colors.background, color: currentTheme.colors.foreground }}>
      <Navigation />

      <main className="pt-16 sm:pt-20 md:pt-24">
        {/* Header with Search */}
        <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Badge variant="secondary" className="mb-4">
                🎯 Browse Bulk Products
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4 px-4">
                Premium Bulk Products
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                Discover our complete range of printing stationery with
                exclusive bulk discounts
              </p>
            </motion.div>

            {/* Inline Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BulkSearchBar onSearch={handleSearch} variant="inline" />
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-8 sm:py-10 md:py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
              {/* Filters Sidebar */}
              <ProductFilters
                onFilterChange={handleFilterChange}
                activeFiltersCount={activeFiltersCount}
              />

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Showing <strong>{products.length}</strong> products
                      </p>
                    </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
                    {/* View Mode Toggle */}
                    <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-1">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Sort Dropdown */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="price-low">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high">
                          Price: High to Low
                        </SelectItem>
                        <SelectItem value="rating">Top Rated</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Products Grid */}
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {products.map((product) => (
                    <BulkProductCard
                      key={product.id}
                      {...product}
                      viewMode={viewMode}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bulk Cart */}
      <BulkCart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => console.log("Checkout")}
      />

      <Footer />
    </div>
  );
};

export default Products;
