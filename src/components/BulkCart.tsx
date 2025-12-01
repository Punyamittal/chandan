import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Upload,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  pricePerUnit: number;
  discount: number;
}

interface BulkCartProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

const BulkCart = ({
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: BulkCartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartPosition, setCartPosition] = useState({ bottom: 24, isStuck: false });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.pricePerUnit,
    0
  );
  const totalDiscount = items.reduce(
    (sum, item) =>
      sum + (item.quantity * item.pricePerUnit * item.discount) / 100,
    0
  );
  const total = subtotal - totalDiscount;

  // Handle scroll behavior to stop at footer
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const cartButtonHeight = 64; // Height of cart button (h-16 = 64px)
      const defaultBottomSpacing = 24; // bottom-6 = 24px
      const minimumGap = 16; // Minimum gap between cart and footer

      // Calculate if footer is visible in viewport
      const footerTop = footerRect.top;
      
      if (footerTop < windowHeight) {
        // Footer is visible, calculate new bottom position
        const distanceFromBottom = windowHeight - footerTop;
        const newBottom = distanceFromBottom + minimumGap;
        
        setCartPosition({
          bottom: Math.max(defaultBottomSpacing, newBottom),
          isStuck: true
        });
      } else {
        // Footer not visible, use default position
        setCartPosition({
          bottom: defaultBottomSpacing,
          isStuck: false
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleQuantityChange = (id: string, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      const newQty = Math.max(1, item.quantity + delta);
      onUpdateQuantity?.(id, newQty);
    }
  };

  return (
    <>
      {/* Floating Cart Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          bottom: cartPosition.bottom
        }}
        transition={{ 
          scale: { duration: 0.3 },
          opacity: { duration: 0.3 },
          bottom: { 
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }
        }}
        className="fixed right-6 z-50"
        style={{ bottom: `${cartPosition.bottom}px` }}
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -5, 5, 0],
                transition: { 
                  scale: { duration: 0.2 },
                  rotate: { duration: 0.5, ease: "easeInOut" }
                }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <Button
                size="lg"
                className="relative rounded-full h-16 w-16 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-lg"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </SheetTrigger>

          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-2xl">
                <ShoppingCart className="w-6 h-6" />
                Bulk Cart
                <Badge variant="secondary" className="ml-auto">
                  {totalItems} items
                </Badge>
              </SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <ShoppingCart className="w-20 h-20 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cart is Empty</h3>
                <p className="text-muted-foreground">
                  Start adding products to your bulk cart
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* CSV Upload Option */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="my-4 p-3 bg-muted/50 rounded-lg border border-dashed border-border"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Bulk Order (CSV/Excel)
                  </Button>
                </motion.div>

                <Separator className="my-2" />

                {/* Cart Items */}
                <ScrollArea className="flex-1 pr-4">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="mb-4 p-4 bg-card border border-border rounded-lg"
                      >
                        <div className="flex gap-3">
                          {/* Product Image */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />

                          {/* Product Info */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-sm line-clamp-2">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem?.(item.id)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="mb-2">
                              <span className="font-bold text-primary">
                                ₹{item.pricePerUnit.toFixed(2)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {" "}
                                /unit
                              </span>
                              {item.discount > 0 && (
                                <Badge
                                  variant="secondary"
                                  className="ml-2 text-xs"
                                >
                                  {item.discount}% off
                                </Badge>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-muted rounded-md">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleQuantityChange(item.id, -10)
                                  }
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="font-semibold text-sm min-w-[40px] text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() =>
                                    handleQuantityChange(item.id, 10)
                                  }
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <span className="font-bold">
                                ₹
                                {(
                                  item.quantity *
                                  item.pricePerUnit *
                                  (1 - item.discount / 100)
                                ).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>

                <Separator className="my-4" />

                {/* Order Summary */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Bulk Discounts
                    </span>
                    <span className="font-semibold text-green-600">
                      -₹{totalDiscount.toFixed(2)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Delivery charges calculated at checkout
                  </p>
                </div>

                {/* Checkout Button */}
                <motion.div 
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }} 
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                >
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      onCheckout?.();
                      setIsOpen(false);
                    }}
                  >
                    Proceed to Checkout
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                      }}
                      className="inline-block ml-2"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Progress Indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Step 1: Cart
                  </span>
                  <ChevronRight className="w-3 h-3" />
                  <span>Quote</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>Approval</span>
                  <ChevronRight className="w-3 h-3" />
                  <span>Payment</span>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
};

export default BulkCart;






