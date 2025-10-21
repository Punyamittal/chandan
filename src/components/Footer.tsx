import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary-foreground rounded-full" />
              </div>
              <span className="text-xl font-heading font-bold">PrintReel</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Precision. Production. Perfection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Offset & Digital Printing</li>
              <li>Product Labeling</li>
              <li>Bulk Trading</li>
              <li>Custom Packaging</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-primary-foreground/70">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>PLOT 6A, INDUSTRIAL REEL PARK<br />MUMBAI, INDIA</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-primary-foreground/70">
                <Phone size={16} className="flex-shrink-0" />
                <span>+91-XXXX-XXX-XXX</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-primary-foreground/70">
                <Mail size={16} className="flex-shrink-0" />
                <span>connect@printreel.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} PrintReel Industries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
