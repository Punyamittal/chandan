import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import GradientOrbs from "@/components/backgrounds/GradientOrbs";

const About = () => {
  const { currentTheme } = useTheme();
  
  const milestones = [
    { year: "2014", title: "Founded", desc: "Established with a vision for quality printing stationery" },
    { year: "2018", title: "Growth", desc: "Expanded product range and client base significantly" },
    { year: "2020", title: "Leadership", desc: "Arun Garg's leadership drives excellence in print media" },
    { year: "2024", title: "Excellence", desc: "Trusted partner for premium printing stationery solutions" },
  ];

  return (
    <div className="min-h-screen" style={{ background: currentTheme.colors.background, color: currentTheme.colors.foreground }}>
      <Navigation />
      
      <main className="pt-16 sm:pt-20 md:pt-24">
        {/* Hero */}
        <section className="relative py-12 sm:py-16 md:py-24" style={{ background: currentTheme.colors.background }}>
          <GradientOrbs theme={currentTheme} count={3} />
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto px-4"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6">
                Precision in Every Print<br />Established Excellence
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                For over a decade, Chandan Trading Company has been at the forefront of printing stationery and print media, 
                combining traditional expertise with modern practices to deliver unmatched quality and service.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 sm:py-16 md:py-24 bg-muted/30 blueprint-grid">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.3 }}
            >
              {[
                { letter: "P", title: "Precision", desc: "Every piece of stationery meets exact specifications with attention to detail" },
                { letter: "S", title: "Service", desc: "From small orders to large-scale printing without compromising quality" },
                { letter: "T", title: "Trust", desc: "Long-term partnerships built on reliability and transparency" }
              ].map((value, index) => (
                <motion.div 
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.span 
                      className="text-3xl font-heading font-bold text-primary"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                    >
                      {value.letter}
                    </motion.span>
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                  >
                    {value.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                  >
                    {value.desc}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 sm:py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-center mb-8 sm:mb-12 md:mb-16 px-4">
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
                    className={`relative flex flex-col sm:flex-row items-center mb-8 sm:mb-12 md:mb-16 ${
                      index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? "sm:pr-8 md:pr-12 sm:text-right text-left" : "sm:pl-8 md:pl-12 text-left"} mb-4 sm:mb-0`}>
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

        {/* Leadership Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 sm:mb-8 md:mb-12 px-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Leadership
              </motion.h2>
              <motion.div 
                className="bg-card rounded-lg p-8 border border-border group hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.span 
                    className="text-3xl font-heading font-bold text-primary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    AG
                  </motion.span>
                </motion.div>
                <motion.h3 
                  className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  Arun Garg
                </motion.h3>
                <motion.p 
                  className="text-lg text-muted-foreground mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  Founder & Director
                </motion.p>
                <motion.p 
                  className="text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  With extensive experience in the printing and stationery industry, Arun Garg leads Chandan Trading Company 
                  with a vision for excellence and customer satisfaction. Under his leadership, the company has grown to 
                  become a trusted name in Delhi for premium printing stationery and print media solutions.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 sm:py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary to-primary/90"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }}
            >
              {[
                { value: "10+", label: "Years Experience", suffix: "+" },
                { value: "1000+", label: "Orders Completed", suffix: "+" },
                { value: "500+", label: "Happy Clients", suffix: "+" },
                { value: "100%", label: "Quality Commitment", suffix: "%" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2 group-hover:text-primary-foreground/90 transition-colors duration-300"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2 + 0.3,
                      ease: "easeOut"
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div 
                    className="text-sm text-primary-foreground/70 uppercase tracking-wider"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2 + 0.5
                    }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
