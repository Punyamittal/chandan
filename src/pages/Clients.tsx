import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import ParticleField from "@/components/backgrounds/ParticleField";

const Clients = () => {
  const { currentTheme } = useTheme();
  // Mock client logos (using initials for demonstration)
  const clients = [
    "TechCorp", "GlobalPrint", "MegaBrand", "Innovate Inc", 
    "PrintPro", "PackageX", "MediaHouse", "RetailGiant",
    "FoodCo", "PharmaTrust", "AutoParts", "EcoGoods"
  ];

  return (
    <div className="min-h-screen" style={{ background: currentTheme.colors.background, color: currentTheme.colors.foreground }}>
      <Navigation />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Trusted by Industry Leaders
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From Fortune 500 companies to innovative startups, we partner with brands 
              that demand precision, reliability, and scale.
            </p>
          </div>
        </section>

        {/* Rotating Reel Carousel */}
        <section className="py-24 bg-muted/30 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
              {/* Central Hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                  <span className="text-sm font-heading font-bold text-primary text-center">
                    1000+<br/>Clients
                  </span>
                </div>
              </div>

              {/* Rotating Client Logos */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                {clients.map((client, index) => {
                  const angle = (index * 360) / clients.length;
                  const radius = 45; // percentage
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-${radius}%) rotate(-${angle}deg)`,
                      }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="group w-20 h-20 rounded-full bg-card border-2 border-border hover:border-primary flex items-center justify-center cursor-pointer transition-all duration-300 grayscale hover:grayscale-0">
                        <span className="text-xs font-heading font-bold text-center text-muted-foreground group-hover:text-primary">
                          {client}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-secondary/20" />
            </div>

            <p className="text-center text-sm text-muted-foreground mt-12">
              Hover over logos to explore. The reel spins to showcase our diverse client portfolio.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-background paper-texture">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16">
              Client Success Stories
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote: "PrintReel's precision and reliability have been instrumental in scaling our packaging operations. Their quality control is unmatched.",
                  author: "Sarah Chen",
                  role: "Operations Director, GlobalPrint",
                },
                {
                  quote: "From prototyping to mass production, the transition was seamless. Their team understood our technical requirements perfectly.",
                  author: "Michael Rodriguez",
                  role: "Supply Chain Manager, MegaBrand",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-card rounded-lg p-8 border border-border"
                >
                  <div className="mb-6">
                    <svg className="w-8 h-8 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-heading font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-12">
              Industries We Serve
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {["Retail & E-commerce", "Food & Beverage", "Pharmaceuticals", "Automotive", 
                "Electronics", "Fashion & Apparel", "Publishing", "Manufacturing"].map((industry, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <p className="font-heading font-semibold text-sm">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Join Our Growing Network
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Discover why leading brands choose PrintReel Industries for their 
              printing and supply chain needs.
            </p>
            <QuoteDialog buttonSize="lg" buttonVariant="secondary" buttonText="Become a Partner">
              <button className="px-8 py-3 bg-primary-foreground text-primary rounded-md font-heading font-semibold hover:bg-primary-foreground/90 transition-colors">
                Become a Partner
              </button>
            </QuoteDialog>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Clients;
