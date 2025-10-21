import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ZoomHero from "@/components/ZoomHero";
import ReelAnimation from "@/components/ReelAnimation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Printer, Package, Truck, Recycle, Tag, Boxes } from "lucide-react";

const Index = () => {
  const processSteps = [
    { icon: Boxes, label: "Input", description: "Raw materials" },
    { icon: Printer, label: "Print", description: "Precision printing" },
    { icon: Package, label: "Roll", description: "Quality packaging" },
    { icon: Truck, label: "Dispatch", description: "Timely delivery" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Zoom Scroll */}
      <ZoomHero />

      {/* Reel System Overview */}
      <section className="py-24 bg-background paper-texture">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Our Production Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A seamless workflow from raw materials to finished products, 
              engineered for precision and efficiency.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center space-y-4">
                  <ReelAnimation size={160} scrollBased>
                    <Icon className="w-8 h-8 text-primary" />
                  </ReelAnimation>
                  <div className="text-center">
                    <p className="font-heading font-semibold text-lg">{step.label}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -translate-y-1/2 right-[-2rem] text-muted-foreground" size={20} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4 text-xs text-muted-foreground uppercase tracking-wider mt-16">
            <span>Input</span>
            <span>→</span>
            <span>Print</span>
            <span>→</span>
            <span>Roll</span>
            <span>→</span>
            <span>Dispatch</span>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Industrial Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive printing and trading services scaled for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Printer, title: "Offset & Digital Printing", desc: "High-volume precision printing for all media types" },
              { icon: Tag, title: "Product Labeling", desc: "Custom labels and packaging solutions at scale" },
              { icon: Truck, title: "Bulk Trading", desc: "Supply chain management and logistics" },
              { icon: Package, title: "Custom Packaging", desc: "Tailored packaging design and production" },
              { icon: Recycle, title: "Eco-Print Initiatives", desc: "Sustainable printing practices and materials" },
              { icon: Boxes, title: "Industrial Supplies", desc: "Paper, ink, and printing materials trading" },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-card rounded-lg p-8 border border-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ReelAnimation size={40} />
                  </div>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-heading font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="group">
              Explore All Services
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Ready to Scale Your Production?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get a custom quote for your industrial printing and trading needs. 
            Our team responds within 24 hours.
          </p>
          <Button size="lg" variant="secondary" className="group">
            Request a Quote
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
