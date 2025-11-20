import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-12">
          {/* Company Info - Takes more space */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <span className="text-2xl font-heading font-bold text-foreground">Chandan Trading</span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Leading provider of premium printing stationery and bulk trading solutions. Delivering precision in every print since 2014.
            </p>
            <div className="flex gap-4">
              <Link to="/about" className="text-accent hover:text-accent/80 transition-colors">About</Link>
              <span className="text-border">•</span>
              <Link to="/contact" className="text-accent hover:text-accent/80 transition-colors">Contact</Link>
              <span className="text-border">•</span>
              <Link to="/products" className="text-accent hover:text-accent/80 transition-colors">Products</Link>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-semibold mb-6 text-foreground text-sm uppercase tracking-wider">Products</h3>
            <ul className="space-y-3">
              {["Business Cards", "Letterheads", "Diaries & Notebooks", "File Covers", "Carry Bags", "Print Media"].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center group">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="font-heading font-semibold mb-6 text-foreground text-sm uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-muted-foreground">A-1, Main Road, Kewal Park<br />Azadpur, Delhi - 110033</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0 text-accent" />
                <a href="tel:+919873535400" className="text-muted-foreground hover:text-accent transition-colors">+91 9873535400</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0 text-accent" />
                <a href="mailto:Chandantrading2014@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">Chandantrading2014@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chandan Trading Company. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
