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
              Contact Chandan Trading Company
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ready to get your printing stationery and print media solutions? 
              Contact us today and we'll respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-24 bg-muted/30 relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="bg-card rounded-lg p-8 border border-border relative z-10">
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

                  <div className="space-y-2 relative z-30">
                    <Label htmlFor="service">Service Required</Label>
                    <select
                      id="service"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background relative z-[9999]"
                      required
                    >
                      <option value="">Select a product/service</option>
                      <option>Letterheads & Business Cards</option>
                      <option>Diaries & Notebooks</option>
                      <option>Posters & Print Media</option>
                      <option>Carry Bags & File Covers</option>
                      <option>Visiting Cards</option>
                      <option>Other Stationery Items</option>
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
              <div className="space-y-8 relative z-10">
                <div className="bg-card rounded-lg p-8 border border-border relative z-20">
                  <h2 className="text-2xl font-heading font-bold mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold mb-1">ADDRESS</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A-1, Main Road, Kewal Park<br />
                          Azadpur, Delhi - 110033<br />
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
                        <p className="text-sm text-muted-foreground">+91 9873535400</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold mb-1">EMAIL</p>
                        <p className="text-sm text-muted-foreground">Chandantrading2014@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold mb-1">BUSINESS HOURS</p>
                        <p className="text-sm text-muted-foreground">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                        <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                    <div className="bg-primary text-primary-foreground rounded-lg p-8 relative z-20">
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

        {/* Google Map Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
                Find Us
              </h2>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="w-full h-96 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.764889489!2d77.18162331508197!3d28.71542568241223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd1b2b1d3c3f%3A0x8b7b8b8b8b8b8b8b!2sAzadpur%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1635789123456!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chandan Trading Company Location"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    A-1, Main Road, Kewal Park, Azadpur, Delhi - 110033
                  </p>
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
