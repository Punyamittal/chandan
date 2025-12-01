import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BulkProductCard from "@/components/BulkProductCard";
import BulkCart, { CartItem } from "@/components/BulkCart";
import ProductFilters, { FilterOptions } from "@/components/ProductFilters";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List, Package, Star, TrendingUp, ShoppingCart, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundPaths } from "@/components/ui/background-paths";
import {
  leftSlideIn,
  rightSlideIn,
  staircaseContainer,
  staircaseItem,
  heroMinimal,
  glowPulse,
  viewportConfig,
} from "@/lib/cinematicAnimations";

const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
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
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&h=600&fit=crop",
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
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&h=600&fit=crop",
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
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&h=600&fit=crop",
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
      image: "https://images.unsplash.com/photo-1561070791-36c11767b26a?q=80&w=800&h=600&fit=crop",
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
      name: "File Covers Professional",
      image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800&h=600&fit=crop",
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
      specs: "Durable material, multiple sizes, custom printing available",
    },
    {
      id: "6",
      name: "Custom Notebooks",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 178,
      pricePerUnit: 25,
      bulkDiscounts: [
        { minQty: 100, discount: 18 },
        { minQty: 200, discount: 28 },
        { minQty: 500, discount: 38 },
      ],
      minOrderQty: 50,
      availability: "In Stock" as const,
      specs: "Quality binding, branded covers, bulk pricing available",
    },
  ];

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          productId,
          productName: product.name,
          quantity,
          pricePerUnit: product.pricePerUnit,
        },
      ];
    });
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products based on active filters
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (activeFilters.categories.length > 0) {
      // For now, we'll skip category filtering since products don't have categories yet
      // You can add categories to products later
    }

    // Price range filter
    if (
      product.pricePerUnit < activeFilters.priceRange[0] ||
      product.pricePerUnit > activeFilters.priceRange[1]
    ) {
      return false;
    }

    // Availability filter
    if (
      activeFilters.availability.length > 0 &&
      !activeFilters.availability.includes(product.availability)
    ) {
      return false;
    }

    // Rating filter
    if (product.rating < activeFilters.rating) {
      return false;
    }

    // Min quantity filter
    if (product.minOrderQty < activeFilters.minQuantity) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerUnit - b.pricePerUnit;
      case "price-high":
        return b.pricePerUnit - a.pricePerUnit;
      case "rating":
        return b.rating - a.rating;
      case "popular":
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <Navigation />

      <main className="relative z-10">
        {/* Hero Section - Background Paths */}
        <BackgroundPaths 
          title="Our Premium Products" 
          buttonText="Explore Collection"
          onButtonClick={() => {
            // Scroll to products section
            const productsSection = document.querySelector('[data-products-section]');
            if (productsSection) {
              productsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Partition/Separator after Hero */}
        <div className="relative w-full bg-gradient-to-b from-white via-orange-50 to-white">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent h-px"></div>
          <div className="h-24 md:h-32 flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-orange-500/50"></div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 backdrop-blur-sm border border-orange-500/30 rounded-full">
                  <Package className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-medium text-orange-700">Premium Quality</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-orange-500/50 to-orange-500/50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-12 px-6 bg-gradient-to-b from-white to-orange-50">
          <div className="container mx-auto">
            <motion.div
              variants={staircaseContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Package, value: "500+", label: "Products" },
                { icon: Star, value: "4.8", label: "Rating" },
                { icon: TrendingUp, value: "10K+", label: "Orders" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={staircaseItem}
                  className="p-6 rounded-xl border border-orange-300 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-shadow"
                >
                  <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Filters and Sorting */}
        <section className="py-8 px-6 bg-gradient-to-b from-transparent to-orange-50" data-products-section>
          <div className="container mx-auto">
            <motion.div
              variants={leftSlideIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-col md:flex-row gap-4 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300">
                  {sortedProducts.length} Products Found
                </Badge>
                
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden border-orange-300 text-gray-900 hover:bg-orange-50"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 p-1 rounded-lg border border-orange-300 bg-white">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] border-orange-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products with Filters */}
        <section className="py-12 px-4 sm:px-6" data-products-section>
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8">
              {/* Filters Sidebar */}
              <motion.div
                variants={leftSlideIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                className={`lg:w-80 flex-shrink-0 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                <div className="sticky top-24">
                  <ProductFilters
                    filters={activeFilters}
                    onFilterChange={setActiveFilters}
                  />
                </div>
              </motion.div>

              {/* Products Grid */}
              <div className="flex-1 w-full min-w-0 overflow-visible">
                {sortedProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      No Products Found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your filters to see more products
                    </p>
                    <Button
                      onClick={() =>
                        setActiveFilters({
                          categories: [],
                          priceRange: [0, 1000],
                          availability: [],
                          rating: 0,
                          minQuantity: 0,
                        })
                      }
                      variant="outline"
                      className="border-orange-500 text-gray-900 hover:bg-orange-50"
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={staircaseContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig}
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full"
                        : "flex flex-col gap-4 md:gap-6 w-full"
                    }
                  >
                    {sortedProducts.map((product, idx) => (
                      <motion.div key={product.id} variants={staircaseItem} className="w-full">
                        <BulkProductCard
                          {...product}
                          viewMode={viewMode}
                          onAddToCart={handleAddToCart}
                          onRequestQuote={(productId, quantity) => {
                            console.log("Quote requested:", productId, quantity);
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 relative overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl" />

          <div className="container mx-auto text-center relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
            >
              <div className="inline-block mb-6 px-6 py-2 rounded-full border border-orange-500 bg-orange-50">
                <span className="text-sm font-medium text-orange-600">
                  NEED HELP?
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                Can't Find What You're Looking For?
              </h2>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Contact our team for custom product inquiries and bulk order quotes
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white h-14 px-8"
                >
                  Contact Sales
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500 text-gray-900 hover:bg-orange-50 h-14 px-8"
                >
                  Request Catalog
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full p-4 shadow-2xl hover:shadow-orange-500/50 transition-all"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-white text-orange-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold border-2 border-orange-500">
            {totalItems}
          </span>
        </motion.button>
      )}

      {/* Cart Sidebar */}
      <BulkCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <Footer />
    </div>
  );
};

export default Products;
