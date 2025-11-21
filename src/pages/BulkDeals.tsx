import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Percent,
  TrendingUp,
  Package,
  ArrowRight,
  Sparkles,
  Star,
  Trophy,
  Flame,
  ShoppingCart,
  CheckCircle2,
  Tag,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

interface DealProps {
  id: string;
  title: string;
  image: string;
  discount: string;
  originalPrice: number;
  discountedPrice: number;
  minQuantity: number;
  description: string;
  tag?: string;
  savedAmount?: string;
  features: string[];
}

const BulkDeals = () => {
  const { currentTheme } = useTheme();

  const featuredDeal: DealProps = {
    id: "featured-1",
    title: "Mega Business Cards Bundle",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&h=800&fit=crop",
    discount: "40%",
    originalPrice: 2.5,
    discountedPrice: 1.5,
    minQuantity: 5000,
    description:
      "Premium business cards with custom designs. Includes free design consultation and multiple finish options.",
    tag: "Flash Sale",
    savedAmount: "₹5,000",
    features: [
      "Premium cardstock material",
      "Custom design included",
      "Multiple finish options",
      "Express delivery available",
    ],
  };

  const deals: DealProps[] = [
    {
      id: "1",
      title: "Corporate Letterhead Pack",
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&h=800&fit=crop",
      discount: "35%",
      originalPrice: 1.8,
      discountedPrice: 1.17,
      minQuantity: 1000,
      description: "Professional letterheads on premium paper with custom branding",
      tag: "Best Value",
      features: ["High-quality paper", "Custom branding", "Fast turnaround"],
    },
    {
      id: "2",
      title: "Executive Diary Collection",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&h=800&fit=crop",
      discount: "30%",
      originalPrice: 45,
      discountedPrice: 31.5,
      minQuantity: 200,
      description: "Leather-bound diaries perfect for corporate gifting",
      tag: "Popular",
      features: ["Leather cover", "Customizable", "Premium pages"],
    },
    {
      id: "3",
      title: "Eco-Friendly Bag Bundle",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&h=800&fit=crop",
      discount: "40%",
      originalPrice: 8,
      discountedPrice: 4.8,
      minQuantity: 5000,
      description: "Sustainable carry bags with custom branding",
      tag: "Eco Choice",
      features: ["100% recyclable", "Strong handles", "Custom printing"],
    },
    {
      id: "4",
      title: "Visiting Cards Special",
      image:
        "https://images.unsplash.com/photo-1561070791-36c11767b26a?q=80&w=1200&h=800&fit=crop",
      discount: "32%",
      originalPrice: 3.2,
      discountedPrice: 2.18,
      minQuantity: 500,
      description: "Premium visiting cards with embossing options",
      features: ["Multiple finishes", "Embossing available", "Quick delivery"],
    },
    {
      id: "5",
      title: "File Cover Combo",
      image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&h=800&fit=crop",
      discount: "28%",
      originalPrice: 12,
      discountedPrice: 8.64,
      minQuantity: 500,
      description: "Professional file covers in assorted sizes",
      features: ["Durable material", "Multiple sizes", "Custom printing"],
    },
    {
      id: "6",
      title: "Notebook Bundle",
      image:
        "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&h=800&fit=crop",
      discount: "25%",
      originalPrice: 25,
      discountedPrice: 18.75,
      minQuantity: 200,
      description: "Custom branded notebooks for teams",
      features: ["Quality binding", "Branded covers", "Bulk pricing"],
    },
  ];

  const DealCard = ({ deal }: { deal: DealProps }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={deal.image}
            alt={deal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Discount Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-4 shadow-xl">
              <Percent className="w-5 h-5 mb-1" />
              <div className="text-2xl font-bold">{deal.discount}</div>
              <div className="text-[10px]">OFF</div>
            </div>
          </div>

          {/* Tag */}
          {deal.tag && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 flex items-center gap-1 shadow-lg">
                <TrendingUp className="w-4 h-4" />
                {deal.tag}
              </Badge>
            </div>
          )}

          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-2xl font-heading font-bold mb-2">{deal.title}</h3>
            <p className="text-sm text-white/80 line-clamp-2 font-medium mb-3">
              {deal.description}
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Pricing */}
          <div className="bg-muted/50 rounded-xl p-4 mb-4 border border-border/50">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-primary">
                ₹{deal.discountedPrice}
              </span>
              <span className="text-lg line-through text-muted-foreground">
                ₹{deal.originalPrice}
              </span>
              <span className="text-sm text-muted-foreground">/unit</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground/70 font-medium">
              <Package className="w-4 h-4" />
              <span>Min: {deal.minQuantity.toLocaleString()} units</span>
            </div>

            {deal.savedAmount && (
              <Badge variant="secondary" className="mt-2 text-xs">
                Save {deal.savedAmount}
              </Badge>
            )}
          </div>

          {/* Features Preview */}
          {deal.features && deal.features.length > 0 && (
            <div className="space-y-2 mb-4">
              {deal.features.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-foreground/70 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <Link to="/products">
            <Button className="w-full">
              View Deal
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: currentTheme.colors.background, color: currentTheme.colors.foreground }}
    >
      <Navigation />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-5xl mx-auto">
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-base">
                <Tag className="w-4 h-4 mr-2" />
                Limited Time Offers
              </Badge>

              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">
                Exclusive Bulk Deals
              </h1>

              <p className="text-xl md:text-2xl text-foreground/70 font-medium mb-12 leading-relaxed max-w-3xl mx-auto">
                Save big on bulk orders with our special discounts. Premium quality,
                unbeatable prices, and fast delivery.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Percent, value: "Up to 40%", label: "Discount" },
                  { icon: Package, value: "1000+", label: "Products" },
                  { icon: Star, value: "4.9/5", label: "Rating" },
                  { icon: Zap, value: "Fast", label: "Delivery" },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-card border border-border rounded-xl p-6 text-center"
                  >
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Deal Section */}
        <section className="py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-lg mb-4">
                <Flame className="w-5 h-5 mr-2" />
                Featured Flash Sale
              </Badge>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                Deal of the Month
              </h2>
              <p className="text-lg text-foreground/70 font-medium max-w-2xl mx-auto">
                Don't miss out on our best deal with exclusive features and maximum savings
              </p>
            </div>

            {/* Featured Deal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-[400px] md:h-[600px] overflow-hidden">
                  <img
                    src={featuredDeal.image}
                    alt={featuredDeal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                  {/* Floating Discount Badge */}
                  <div className="absolute top-8 left-8">
                    <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white rounded-2xl p-6 shadow-2xl">
                      <Flame className="w-8 h-8 mb-2" />
                      <div className="text-5xl font-bold">{featuredDeal.discount}</div>
                      <div className="text-sm font-medium">OFF</div>
                    </div>
                  </div>

                  {/* Flash Sale Tag */}
                  {featuredDeal.tag && (
                    <div className="absolute top-8 right-8">
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-base flex items-center gap-2 shadow-lg">
                        <Trophy className="w-5 h-5" />
                        {featuredDeal.tag}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Badge variant="secondary" className="mb-4 w-fit">
                    <Trophy className="w-3 h-3 mr-1" />
                    Best Deal of the Month
                  </Badge>

                  <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                    {featuredDeal.title}
                  </h3>

                  <p className="text-lg text-foreground/70 font-medium mb-6 leading-relaxed">
                    {featuredDeal.description}
                  </p>

                  {/* Pricing */}
                  <div className="bg-primary/10 rounded-2xl p-6 mb-6 border border-primary/20">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-5xl font-bold text-primary">
                        ₹{featuredDeal.discountedPrice}
                      </span>
                      <span className="text-2xl line-through text-muted-foreground">
                        ₹{featuredDeal.originalPrice}
                      </span>
                      <span className="text-base text-muted-foreground">/unit</span>
                    </div>

                    <div className="flex items-center gap-2 text-foreground/70 font-medium mb-3">
                      <Package className="w-5 h-5" />
                      <span>Minimum order: {featuredDeal.minQuantity.toLocaleString()} units</span>
                    </div>

                    {featuredDeal.savedAmount && (
                      <Badge className="bg-green-500/20 text-green-600">
                        💰 Save {featuredDeal.savedAmount} on bulk orders
                      </Badge>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {featuredDeal.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground/80 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/products" className="flex-1">
                      <Button size="lg" className="w-full text-lg h-14">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Claim This Deal
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14">
                        Get Custom Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* More Deals Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-base">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending Now
              </Badge>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                More Amazing Deals
              </h2>
              <p className="text-lg text-foreground/70 font-medium max-w-2xl mx-auto">
                Explore our complete collection of bulk discount offers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <Sparkles className="w-16 h-16 mx-auto mb-6" />

              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Need a Custom Quote?
              </h2>
              <p className="text-xl text-primary-foreground/90 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
                Looking for something specific? Our team is ready to create
                personalized bulk pricing and custom solutions tailored to your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="text-lg h-14 px-8">
                    Contact Us Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Browse All Products
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20">
                {[
                  { icon: Trophy, text: "15+ Years" },
                  { icon: Star, text: "4.9 Rating" },
                  { icon: Package, text: "10K+ Orders" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <item.icon className="w-6 h-6" />
                    <span className="text-sm font-medium text-primary-foreground/90">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BulkDeals;
