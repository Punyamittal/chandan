import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="relative bg-slate-900 border-t border-orange-500/20 overflow-hidden">
      {/* Background Boxes */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
      </div>
      
      {/* Footer Content */}
      <div className="relative z-20">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mb-12">
            {/* Company Info - Takes more space */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">C</span>
                </div>
                <span className="text-2xl font-heading font-bold text-white">Chandan Trading</span>
              </div>
              <p className="text-base text-gray-300 leading-relaxed max-w-md">
                Leading provider of premium printing stationery and bulk trading solutions. Delivering precision in every print since 2014.
              </p>
              <div className="flex gap-4">
                <Link to="/about" className="text-orange-400 hover:text-orange-300 transition-colors">About</Link>
                <span className="text-gray-600">•</span>
                <Link to="/contact" className="text-orange-400 hover:text-orange-300 transition-colors">Contact</Link>
                <span className="text-gray-600">•</span>
                <Link to="/products" className="text-orange-400 hover:text-orange-300 transition-colors">Products</Link>
              </div>
            </div>

            {/* Products */}
            <div className="lg:col-span-3">
              <h3 className="font-heading font-semibold mb-6 text-white text-sm uppercase tracking-wider">Products</h3>
              <ul className="space-y-3">
                {["Business Cards", "Letterheads", "Diaries & Notebooks", "File Covers", "Carry Bags", "Print Media"].map((item) => (
                  <li key={item}>
                    <Link to="/products" className="text-gray-300 hover:text-orange-400 transition-colors inline-flex items-center group">
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-orange-400" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-4">
              <h3 className="font-heading font-semibold mb-6 text-white text-sm uppercase tracking-wider">Get in Touch</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 text-orange-400" />
                  <span className="text-gray-300">A-1, Main Road, Kewal Park<br />Azadpur, Delhi - 110033</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone size={18} className="flex-shrink-0 text-orange-400" />
                  <a href="tel:+919873535400" className="text-gray-300 hover:text-orange-400 transition-colors">+91 9873535400</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={18} className="flex-shrink-0 text-orange-400" />
                  <a href="mailto:Chandantrading2014@gmail.com" className="text-gray-300 hover:text-orange-400 transition-colors">Chandantrading2014@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-orange-500/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Chandan Trading Company. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link to="/privacy-policy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms-conditions" className="hover:text-orange-400 transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
