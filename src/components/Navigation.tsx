import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home, User, Package, Star, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import QuoteDialog from "./QuoteDialog";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", icon: Package },
    { name: "Bulk Deals", path: "/bulk-deals", icon: Star },
    { name: "About", path: "/about", icon: User },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Auto-show navigation after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Show after 500ms

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Pill Navigation Bar */}
      <motion.nav
        className="fixed top-6 z-[1000] bg-background/95 backdrop-blur-lg border border-border/50 rounded-full shadow-xl overflow-hidden"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ 
          x: isVisible ? "0%" : "-100%",
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          left: "21%",
          width: "auto",
          height: "60px",
        }}
      >
        <div className="flex items-center h-full">
          {/* Logo/Icon Section */}
          <motion.div
            className="flex-shrink-0 w-15 h-15 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center justify-center w-12 h-12">
              <motion.div 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="w-6 h-6 border-2 border-primary-foreground rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          {isVisible && (
            <div className="flex items-center space-x-2 px-4">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium
                      transition-all duration-200 ease-in-out
                      ${isActive(link.path) 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }
                      cursor-pointer select-none
                    `}
                  >
                    <Icon size={16} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              {/* Quote Button */}
              <div className="ml-2">
                <QuoteDialog buttonSize="sm" buttonVariant="default">
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-2"
                  >
                    <span className="text-sm font-medium">Get Quote</span>
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </QuoteDialog>
              </div>
            </div>
          )}

        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;