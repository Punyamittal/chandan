import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  CreditCard, 
  BookOpen, 
  Notebook, 
  Image, 
  ShoppingBag, 
  FolderOpen, 
  User 
} from "lucide-react";

const Products = () => {
  const products = [
    { name: "Letterheads", specs: "Custom designs, various paper qualities", availability: "In Stock", icon: FileText },
    { name: "Visiting Cards", specs: "Premium finishes, custom sizes", availability: "In Stock", icon: User },
    { name: "Diaries", specs: "Corporate & personal, custom covers", availability: "In Stock", icon: BookOpen },
    { name: "Notebooks", specs: "Spiral bound, hardcover options", availability: "In Stock", icon: Notebook },
    { name: "Posters", specs: "Large format printing, various materials", availability: "Made to Order", icon: Image },
    { name: "Carry Bags", specs: "Eco-friendly, custom branding", availability: "In Stock", icon: ShoppingBag },
    { name: "File Covers", specs: "Professional look, various sizes", availability: "In Stock", icon: FolderOpen },
    { name: "Business Cards", specs: "Premium quality, instant delivery", availability: "In Stock", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Printing Stationery & Print Media
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Premium printing stationery and print media products designed for your business needs. 
              Quality materials and professional finishes for every order.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 bg-muted/30 paper-texture">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => {
                const IconComponent = product.icon;
                return (
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
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
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
                );
              })}
            </div>

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground mb-6">
                All products available with custom specifications and fast delivery. 
                Contact us for bulk orders and special requirements.
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
                Our Quality Promise
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card/50 rounded-lg p-6 border border-border">
                  <h3 className="font-heading font-bold text-xl mb-4">Premium Materials</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• High-quality paper and cardstock</li>
                    <li>• Professional ink and printing</li>
                    <li>• Durable finishes and coatings</li>
                    <li>• Eco-friendly options available</li>
                  </ul>
                </div>
                <div className="bg-card/50 rounded-lg p-6 border border-border">
                  <h3 className="font-heading font-bold text-xl mb-4">Quality Assurance</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Rigorous quality checks</li>
                    <li>• Custom design capabilities</li>
                    <li>• Fast turnaround times</li>
                    <li>• Customer satisfaction guarantee</li>
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
              Need Custom Stationery?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact us for custom designs, bulk orders, and special requirements. 
              We deliver quality printing stationery tailored to your needs.
            </p>
            <QuoteDialog buttonSize="lg" buttonVariant="secondary" buttonText="Get Custom Quote">
              <Button size="lg" variant="secondary">
                Get Custom Quote
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
