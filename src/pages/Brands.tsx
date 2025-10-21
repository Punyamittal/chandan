import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import ReelAnimation from "@/components/ReelAnimation";
import { Link } from "react-router-dom";

const Brands = () => {
  const brands = [
    {
      name: "Feelflex Plus",
      description: "Premium flexible packaging solutions with superior print quality and durability",
      logo: "Feelflex Plus",
      features: ["Flexible Packaging", "Superior Print Quality", "Durable Materials", "Custom Solutions"]
    },
    {
      name: "doton",
      description: "Innovative printing materials and solutions for modern businesses",
      logo: "doton",
      features: ["Modern Design", "Quality Materials", "Innovative Solutions", "Business Focus"]
    },
    {
      name: "Lif",
      description: "Lifestyle and branding solutions that make your business stand out",
      logo: "Lif",
      features: ["Lifestyle Branding", "Stand Out Design", "Quality Solutions", "Business Growth"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-background paper-texture">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Our Brand Partners
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We represent premium brands in printing stationery and print media, 
              bringing you the best quality products and solutions.
            </p>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {brands.map((brand, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                      <ReelAnimation size={120} scrollBased>
                        <span className="text-xl font-heading font-bold text-primary">
                          {brand.logo}
                        </span>
                      </ReelAnimation>
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-4">{brand.name}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-center">
                    {brand.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {brand.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <span className="text-xs px-4 py-2 rounded-full bg-primary/10 text-primary">
                      Available Now
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Benefits */}
        <section className="py-24 bg-background blueprint-grid">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12">
                Why Choose Our Brands?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card/50 rounded-lg p-6 border border-border">
                  <h3 className="font-heading font-bold text-xl mb-4">Quality Assurance</h3>
                  <p className="text-sm text-muted-foreground">
                    All our brand partners maintain the highest standards of quality control 
                    and testing to ensure consistent, reliable products.
                  </p>
                </div>
                <div className="bg-card/50 rounded-lg p-6 border border-border">
                  <h3 className="font-heading font-bold text-xl mb-4">Expert Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team provides technical support and guidance to help you choose 
                    the right products for your specific requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Interested in Our Brand Products?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact us to learn more about our brand partnerships and how we can 
              provide you with the best printing stationery and media solutions.
            </p>
            <Link 
              to="/contact" 
              className="inline-block px-8 py-3 bg-primary-foreground text-primary rounded-md font-heading font-semibold hover:bg-primary-foreground/90 transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Brands;
