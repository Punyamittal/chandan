import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReelAnimation from "@/components/ReelAnimation";
import QuoteDialog from "@/components/QuoteDialog";
import { Printer, Tag, Truck, Package, Recycle, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import GradientOrbs from "@/components/backgrounds/GradientOrbs";

const Services = () => {
  const { currentTheme } = useTheme();
  const services = [
    {
      icon: Printer,
      title: "Offset & Digital Printing",
      description: "High-volume precision printing for all media types, from traditional offset to modern digital solutions.",
      features: ["Up to 1M+ sheets/day", "4-color to 8-color presses", "Custom color matching", "Variable data printing"],
    },
    {
      icon: Tag,
      title: "Large-Scale Product Labeling",
      description: "Custom labels and packaging solutions designed for industrial scale production and distribution.",
      features: ["Roll-fed label printing", "Die-cutting services", "Barcode & QR integration", "Weatherproof materials"],
    },
    {
      icon: Truck,
      title: "Bulk Trading & Supply Chain",
      description: "End-to-end supply chain management for printing materials and finished products.",
      features: ["Just-in-time delivery", "Inventory management", "Global shipping", "Warehouse solutions"],
    },
    {
      icon: Package,
      title: "Custom Packaging Design",
      description: "Tailored packaging solutions that protect your products and elevate your brand.",
      features: ["Structural design", "Prototyping services", "Sustainable materials", "Bulk production"],
    },
    {
      icon: Recycle,
      title: "Eco-Print Initiatives",
      description: "Sustainable printing practices using recycled materials and eco-friendly inks.",
      features: ["FSC certified paper", "Soy-based inks", "Carbon-neutral options", "Waste reduction programs"],
    },
    {
      icon: Boxes,
      title: "Industrial Supplies Trading",
      description: "Comprehensive trading of paper, inks, and printing consumables at competitive wholesale prices.",
      features: ["Bulk pricing", "Quality assurance", "Technical support", "Regular stock availability"],
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: currentTheme.colors.background, color: currentTheme.colors.foreground }}>
      <Navigation />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-background paper-texture">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Industrial Printing Solutions
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive services engineered for scale, precision, and reliability. 
              From concept to delivery, we handle every aspect of your production needs.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-card rounded-lg p-8 border border-border hover:shadow-lifted transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold">{service.title}</h3>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ReelAnimation size={60} />
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button variant="outline" size="sm">Learn More</Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our engineering team can design bespoke printing and production workflows 
              tailored to your specific requirements.
            </p>
            <QuoteDialog buttonSize="lg" buttonVariant="secondary" buttonText="Schedule Consultation">
              <Button size="lg" variant="secondary">
                Schedule Consultation
              </Button>
            </QuoteDialog>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
