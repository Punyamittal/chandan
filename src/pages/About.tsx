import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const About = () => {
  const milestones = [
    { year: "1995", title: "Founded", desc: "Established with a vision for precision printing" },
    { year: "2005", title: "Expansion", desc: "Opened second facility, doubled capacity" },
    { year: "2015", title: "Innovation", desc: "Adopted digital printing technology" },
    { year: "2025", title: "Leadership", desc: "Market leader in industrial printing solutions" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Engineering Excellence<br />in Every Print
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For over 25 years, PrintReel Industries has been at the forefront of industrial printing, 
                combining precision engineering with sustainable practices to deliver unmatched quality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-muted/30 blueprint-grid">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-primary">P</span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Precision</h3>
                <p className="text-muted-foreground">
                  Every print meets exact specifications with microscopic accuracy
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-primary">S</span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Scale</h3>
                <p className="text-muted-foreground">
                  From prototype to millions of units without compromising quality
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-primary">T</span>
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">Trust</h3>
                <p className="text-muted-foreground">
                  Long-term partnerships built on reliability and transparency
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16">
              Our Legacy
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
                
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center mb-16 ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                      <h3 className="text-2xl font-heading font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.desc}</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary border-4 border-background flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">{milestone.year}</span>
                    </div>
                    <div className="w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">25+</div>
                <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">500M+</div>
                <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">Prints Delivered</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">1000+</div>
                <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">Active Clients</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-heading font-bold mb-2">99.8%</div>
                <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">Quality Rate</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
