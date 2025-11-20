import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Percent,
  TrendingUp,
  Clock,
  Package,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  expiresIn?: string;
  savedAmount?: string;
  features: string[];
}

const BulkDeals = () => {
  const featuredDeal: DealProps = {
    id: "featured-1",
    title: "Mega Business Cards Bundle",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2940&auto=format&fit=crop",
    discount: "40%",
    originalPrice: 2.5,
    discountedPrice: 1.5,
    minQuantity: 5000,
    description:
      "Premium business cards with custom designs. Includes free design consultation and multiple finish options.",
    tag: "Flash Sale",
    expiresIn: "2 days",
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
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2787&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2874&auto=format&fit=crop",
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
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800",
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
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
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
        "https://images.unsplash.com/photo-1544906388-1aef9d7ab57b?w=800",
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
        "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800",
      discount: "25%",
      originalPrice: 25,
      discountedPrice: 18.75,
      minQuantity: 200,
      description: "Custom branded notebooks for teams",
      features: ["Quality binding", "Branded covers", "Bulk pricing"],
    },
  ];

  const DealCard = ({ deal, featured = false }: { deal: DealProps; featured?: boolean }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className={`group relative overflow-hidden rounded-2xl ${
          featured ? "col-span-full" : ""
        }`}
      >
        <div className={`relative ${featured ? "h-[500px] md:flex" : "h-96"}`}>
          {/* Image */}
          <div className={`relative ${featured ? "md:w-1/2" : "w-full"} h-full overflow-hidden`}>
            <motion.img
              src={deal.image}
              alt={deal.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Tags */}
            {deal.tag && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                className="absolute top-4 right-4"
              >
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {deal.tag}
                </Badge>
              </motion.div>
            )}

            {/* Discount Badge */}
            <div className="absolute top-4 left-4">
              <div className="bg-green-500 text-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
                <Percent className="w-5 h-5 mb-1" />
                <span className="text-xl font-bold">{deal.discount}</span>
                <span className="text-xs">OFF</span>
              </div>
            </div>

            {deal.expiresIn && (
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="bg-white/90 text-foreground flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Expires in {deal.expiresIn}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`${featured ? "md:w-1/2" : ""} absolute bottom-0 left-0 right-0 ${featured ? "md:relative" : ""} p-6 ${featured ? "md:p-12 md:flex md:flex-col md:justify-center" : ""} text-white ${featured ? "md:text-foreground md:bg-card" : ""}`}>
            <div className={featured ? "max-w-xl" : ""}>
              <h3 className={`font-heading font-bold mb-3 ${featured ? "text-4xl" : "text-2xl"}`}>
                {deal.title}
              </h3>
              <p className={`mb-4 ${featured ? "text-lg" : "text-sm"} ${featured ? "md:text-muted-foreground" : ""} line-clamp-2`}>
                {deal.description}
              </p>

              {/* Pricing */}
              <div className="mb-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className={`${featured ? "text-4xl" : "text-3xl"} font-bold text-green-400 ${featured ? "md:text-primary" : ""}`}>
                    ₹{deal.discountedPrice}
                  </span>
                  <span className={`text-lg line-through ${featured ? "md:text-muted-foreground" : "text-white/60"}`}>
                    ₹{deal.originalPrice}
                  </span>
                  <span className={`text-sm ${featured ? "md:text-muted-foreground" : ""}`}>/unit</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4" />
                  <span>Min. order: {deal.minQuantity.toLocaleString()} units</span>
                </div>
                {deal.savedAmount && (
                  <Badge variant="secondary" className="mt-2">
                    Save {deal.savedAmount} on bulk order
                  </Badge>
                )}
              </div>

              {/* Features */}
              {featured && (
                <ul className="space-y-2 mb-6">
                  {deal.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm md:text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-yellow-400 md:text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA */}
              <Link to="/products">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size={featured ? "lg" : "default"} className="w-full group/btn">
                    Claim This Deal
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="secondary" className="mb-4">
                💰 Limited Time Offers
              </Badge>
              <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6">
                Exclusive Bulk Deals
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Save big on bulk orders with our special discounts. Premium quality,
                unbeatable prices.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Up to 40% Off</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>Limited Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Deal */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-heading font-bold mb-2">
                🔥 Featured Flash Sale
              </h2>
              <p className="text-muted-foreground">
                Don't miss out on our best deal of the month
              </p>
            </motion.div>
            <DealCard deal={featuredDeal} featured={true} />
          </div>
        </section>

        {/* All Deals */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                More Amazing Deals
              </h2>
              <p className="text-muted-foreground">
                Explore all our bulk discount offers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                Need a Custom Quote?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Looking for something specific? Contact us for personalized bulk
                pricing and custom solutions.
              </p>
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BulkDeals;




