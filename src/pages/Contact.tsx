import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Quote request submitted! We'll respond within 24 hours.");
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 bg-background paper-texture">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to scale your production? Request a custom quote and our team 
              will respond within 24 hours with tailored solutions.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="bg-card rounded-lg p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold mb-6">Request a Quote</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Company" required />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="you@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91-XXXX-XXX-XXX" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Required</Label>
                    <select
                      id="service"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                      required
                    >
                      <option value="">Select a service</option>
                      <option>Offset & Digital Printing</option>
                      <option>Product Labeling</option>
                      <option>Bulk Trading</option>
                      <option>Custom Packaging</option>
                      <option>Industrial Supplies</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements, quantities, timeline, etc."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Quote Request
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-card rounded-lg p-8 border border-border">
                  <h2 className="text-2xl font-heading font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold mb-1">ADDRESS</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          PLOT 6A, INDUSTRIAL REEL PARK<br />
                          MUMBAI, MAHARASHTRA 400001<br />
                          INDIA
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold mb-1">PHONE</p>
                        <p className="text-sm text-muted-foreground">+91-XXXX-XXX-XXX</p>
                        <p className="text-sm text-muted-foreground">+91-YYYY-YYY-YYY</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold mb-1">EMAIL</p>
                        <p className="text-sm text-muted-foreground">connect@printreel.com</p>
                        <p className="text-sm text-muted-foreground">sales@printreel.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold mb-1">BUSINESS HOURS</p>
                        <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-sm text-muted-foreground">Saturday: 9:00 AM - 2:00 PM</p>
                        <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary text-primary-foreground rounded-lg p-8">
                  <h3 className="text-xl font-heading font-bold mb-4">Quick Response</h3>
                  <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
                    Our dedicated sales team responds to all inquiries within 24 hours. 
                    For urgent requests, please call our hotline directly.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Currently available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
