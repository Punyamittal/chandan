import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroBulkOrder from "@/components/HeroBulkOrder";
import FeaturedBulkDeals from "@/components/FeaturedBulkDeals";
import ReviewsSection from "@/components/ReviewsSection";
import ReelAnimation from "@/components/ReelAnimation";
import TrustBadge from "@/components/TrustBadge";
import QuoteDialog from "@/components/QuoteDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Printer, Package, Truck, Recycle, Tag, Boxes } from "lucide-react";

const Index = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const processSteps = [
    { icon: Boxes, label: "Consultation", description: "Understanding your needs" },
    { icon: Printer, label: "Design", description: "Custom stationery design" },
    { icon: Package, label: "Production", description: "Quality printing process" },
    { icon: Truck, label: "Delivery", description: "Timely delivery" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Bulk Search */}
      <HeroBulkOrder />

      {/* Trust Badges - Modern Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[
              { icon: "✓", label: "Verified Supplier", desc: "Certified & Trusted" },
              { icon: "⚡", label: "Fast Delivery", desc: "Quick Turnaround" },
              { icon: "★", label: "Premium Quality", desc: "Top-Grade Materials" },
              { icon: "%", label: "Bulk Discounts", desc: "Up to 40% Off" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-accent/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Bulk Deals */}
      <FeaturedBulkDeals />

      {/* Why Order Bulk Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-background paper-texture">
        <div className="container mx-auto px-4 sm:px-6" ref={ref}>
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge variant="secondary" className="mb-4">💡 Why Choose Us</Badge>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 sm:mb-4 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Benefits of Bulk Ordering
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto px-4 text-sm sm:text-base"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Save money, get premium quality, and enjoy hassle-free bulk procurement
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 sm:mb-12 px-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center space-y-4 relative"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                  >
                    <ReelAnimation size={120} scrollBased className="sm:w-40 sm:h-40 md:w-[160px] md:h-[160px]">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                    </ReelAnimation>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  >
                    <p className="font-heading font-semibold text-base sm:text-lg">{step.label}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                  </motion.div>
                  {index < processSteps.length - 1 && (
                    <motion.div
                      className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[-2rem]"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    >
                      <ArrowRight className="text-muted-foreground" size={20} />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs text-muted-foreground uppercase tracking-wider mt-8 sm:mt-12 md:mt-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              Consultation
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.0 }}
            >
              →
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.1 }}
            >
              Design
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.2 }}
            >
              →
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              Production
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 1.4 }}
            >
              →
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.5 }}
            >
              Delivery
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews */}
      <ReviewsSection />

      {/* Services Preview - Modern Layout */}
      <section className="py-20 sm:py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <motion.div 
            className="mb-16 sm:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-accent text-sm font-medium tracking-wider uppercase mb-4">
              <span className="w-8 h-px bg-accent"></span>
              Products
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight">
              Complete Print
              <br />
              <span className="text-muted-foreground">Solutions</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              From business essentials to custom packaging, we deliver precision in every product.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { icon: Printer, title: "Letterheads & Business Cards", desc: "Professional letterheads and high-quality business cards" },
              { icon: Tag, title: "Visiting Cards", desc: "Premium visiting cards with custom designs and finishes" },
              { icon: Truck, title: "Diaries & Notebooks", desc: "Custom diaries and notebooks for your business needs" },
              { icon: Package, title: "File Covers & Folders", desc: "Professional file covers and folders in various sizes" },
              { icon: Recycle, title: "Carry Bags", desc: "Eco-friendly and premium carry bags for your business" },
              { icon: Boxes, title: "Posters & Print Media", desc: "High-quality posters and print media solutions" },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative bg-card rounded-lg p-4 sm:p-6 md:p-8 border border-border hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                  variants={cardVariants}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <motion.div 
                    className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ReelAnimation size={40} />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary mb-3 sm:mb-4 group-hover:text-primary/80 transition-colors duration-300" />
                  </motion.div>
                  <motion.h3 
                    className="text-lg sm:text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    {service.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {service.desc}
                  </motion.p>
                  {/* Subtle gradient overlay on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-500 pointer-events-none"
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link to="/products">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button size="lg" className="group relative overflow-hidden">
                  <motion.span
                    className="relative z-10 flex items-center"
                    initial={{ x: 0 }}
                    whileHover={{ x: -2 }}
                    transition={{ duration: 0.3 }}
                  >
                    Explore All Products
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="ml-2" size={16} />
                    </motion.div>
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary to-primary/90"
          initial={{ scale: 1.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready for Bulk Orders?
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-primary-foreground/80 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get a custom quote for your bulk printing needs with exclusive discounts. 
              Our team responds within 24 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <QuoteDialog buttonSize="lg" buttonVariant="secondary" buttonText="Request a Quote">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button size="lg" variant="secondary" className="group relative overflow-hidden">
                    <motion.span
                      className="relative z-10 flex items-center"
                      whileHover={{ x: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      Request a Quote
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="ml-2" size={16} />
                      </motion.div>
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.div>
              </QuoteDialog>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
