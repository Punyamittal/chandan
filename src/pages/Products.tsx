import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Products = () => {
  const products = [
    { name: "Premium Paper Rolls", specs: "80-300 GSM, Various finishes", availability: "In Stock" },
    { name: "Industrial Ink Drums", specs: "CMYK + Pantone, 20L/50L", availability: "In Stock" },
    { name: "Packaging Units", specs: "Corrugated, E-flute to B-flute", availability: "Made to Order" },
    { name: "Label Stock", specs: "Self-adhesive, Roll-fed", availability: "In Stock" },
    { name: "Printing Plates", specs: "Offset & Flexo compatible", availability: "In Stock" },
    { name: "Adhesives", specs: "Industrial grade, Food-safe", availability: "In Stock" },
    { name: "Coating Materials", specs: "UV, Aqueous, Lamination", availability: "In Stock" },
    { name: "Die-Cut Blanks", specs: "Custom shapes & sizes", availability: "Made to Order" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Industrial Grade Materials
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Premium printing materials and consumables sourced from trusted manufacturers, 
              available for bulk orders with competitive wholesale pricing.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 bg-muted/30 paper-texture">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative bg-card rounded-lg p-6 border-2 border-border hover:border-primary transition-all duration-300 cursor-pointer"
                >
                  {/* Circular Frame */}
                  <div className="relative mb-6 mx-auto w-32 h-32 rounded-full border-[3px] border-secondary/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-2 border-primary" />
                    </div>
                    {/* Radial Highlight on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <h3 className="font-heading font-semibold text-lg mb-2 text-center">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {product.specs}
                  </p>
                  <div className="flex justify-center">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      product.availability === "In Stock" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {product.availability}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground mb-6">
                All products available in bulk quantities. Custom specifications available on request.
              </p>
              <QuoteDialog buttonSize="lg" buttonText="Request Product Catalog">
                <Button size="lg">Request Product Catalog</Button>
              </QuoteDialog>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="py-24 bg-background blueprint-grid">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-12">
                Quality Standards
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card/50 rounded-lg p-6 border border-border">
                  <h3 className="font-heading font-bold text-xl mb-4">Certifications</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• ISO 9001:2015 Quality Management</li>
                    <li>• FSC Chain of Custody</li>
                    <li>• FDA Food-Safe Materials</li>
                    <li>• SGS Product Testing</li>
                  </ul>
                </div>
                <div className="bg-card/50 rounded-lg p-6 border border-border">
                  <h3 className="font-heading font-bold text-xl mb-4">Testing</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Batch quality control</li>
                    <li>• Color consistency verification</li>
                    <li>• Durability stress testing</li>
                    <li>• Environmental compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Bulk Inquiry?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact our sales team for volume pricing, custom specifications, 
              and supply agreements tailored to your production schedule.
            </p>
            <QuoteDialog buttonSize="lg" buttonVariant="secondary" buttonText="Contact Sales Team">
              <Button size="lg" variant="secondary">
                Contact Sales Team
              </Button>
            </QuoteDialog>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
