import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, User, Package, Star, Mail, Menu, X, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserButton } from "@/components/auth/UserButton";
import { LoginModal } from "@/components/auth/LoginModal";
import { SignUpModal } from "@/components/auth/SignUpModal";
import { Button } from "@/components/ui/button";
import { isClerkConfigured } from "@/lib/clerk-config";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useAuthContext();

  const handleSignInClick = () => {
    if (isClerkConfigured) {
      navigate('/sign-in');
    } else {
      setLoginOpen(true);
    }
  };

  const handleSignUpClick = () => {
    if (isClerkConfigured) {
      navigate('/sign-up');
    } else {
      setSignUpOpen(true);
    }
  };

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

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Desktop Navigation Bar - Pill Style Centered */}
      <motion.nav
        className="hidden md:flex fixed top-6 left-1/2 z-[1000] bg-card/95 backdrop-blur-sm border border-border/50 rounded-full shadow-2xl"
        initial={{ y: -100, opacity: 0, x: "-50%" }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
          x: "-50%"
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center h-16 px-3">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center px-3">
            <motion.div 
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xl font-bold text-white">C</span>
            </motion.div>
          </Link>

          <div className="w-px h-8 bg-border mx-2" />

          {/* Navigation Links */}
          {isVisible && (
            <div className="flex items-center space-x-1 px-1">
              {navLinks.map((link) => {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap
                      transition-all duration-200 ease-in-out
                      ${isActive(link.path) 
                        ? "bg-accent text-white shadow-lg shadow-accent/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="w-px h-8 bg-border mx-2" />

          {/* Auth Section - Always visible */}
          <div className="flex items-center space-x-2 px-2">
            {isSignedIn === true ? (
              <UserButton />
            ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignInClick}
                    className="px-4 py-2 rounded-full text-sm font-medium hover:bg-muted"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSignUpClick}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-orange-600 hover:bg-orange-700 text-white shadow-md"
                  >
                    Sign Up
                  </Button>
                </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Bar */}
      <motion.nav
        className="md:hidden fixed top-0 left-0 right-0 z-[1000] bg-background/98 backdrop-blur-sm border-b border-border/50 shadow-lg"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ 
          y: isVisible ? "0%" : "-100%",
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo/Icon Section */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center justify-center w-10 h-10" onClick={closeMobileMenu}>
              <motion.div 
                className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="w-5 h-5 border-2 border-primary-foreground rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`
                        flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium
                        transition-all duration-200 ease-in-out
                        ${isActive(link.path) 
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        }
                        cursor-pointer select-none
                      `}
                    >
                      <Icon size={20} />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
                
                {/* Mobile Auth Section */}
                <div className="pt-4 border-t border-border space-y-2">
                  {isSignedIn === true ? (
                    <div className="px-4 py-2">
                      <UserButton />
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          handleSignInClick();
                          closeMobileMenu();
                        }}
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                      <Button
                        className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white"
                        onClick={() => {
                          handleSignUpClick();
                          closeMobileMenu();
                        }}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Auth Modals */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <SignUpModal open={signUpOpen} onOpenChange={setSignUpOpen} />
    </>
  );
};

export default Navigation;