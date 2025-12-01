import { useState } from "react";
import { motion } from "framer-motion";
import { Star, TrendingUp, ShoppingCart, Heart, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";

export interface BulkProductCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  pricePerUnit: number;
  bulkDiscounts: Array<{ minQty: number; discount: number }>;
  minOrderQty: number;
  availability: "In Stock" | "Made to Order" | "Low Stock";
  popularBadge?: boolean;
  specs?: string;
  viewMode?: "grid" | "list";
  onAddToCart?: (productId: string, quantity: number) => void;
  onRequestQuote?: (productId: string, quantity: number) => void;
}

const BulkProductCard = ({
  id,
  name,
  image,
  rating,
  reviews,
  pricePerUnit,
  bulkDiscounts,
  minOrderQty,
  availability,
  popularBadge,
  specs,
  viewMode = "grid",
  onAddToCart,
  onRequestQuote,
}: BulkProductCardProps) => {
  const [quantity, setQuantity] = useState(minOrderQty);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const calculateDiscount = (qty: number) => {
    const applicable = bulkDiscounts
      .filter((d) => qty >= d.minQty)
      .sort((a, b) => b.discount - a.discount);
    return applicable[0]?.discount || 0;
  };

  const discount = calculateDiscount(quantity);
  const finalPrice = pricePerUnit * (1 - discount / 100) * quantity;

  const handleAddToCart = () => {
    onAddToCart?.(id, quantity);
    toast({
      title: "Added to Bulk Cart",
      description: `${quantity} units of ${name}`,
    });
  };

  const handleRequestQuote = () => {
    onRequestQuote?.(id, quantity);
    toast({
      title: "Quote Requested",
      description: "We'll get back to you within 24 hours",
    });
  };

  // List view layout
  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative bg-card rounded-xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row gap-6 p-5">
          {/* Fixed Image Corner - Square Shape */}
          <div className="relative w-full md:w-64 h-64 flex-shrink-0 overflow-hidden rounded-lg bg-muted shadow-lg">
            {/* Popular Badge */}
            {popularBadge && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute top-2 left-2 z-10"
              >
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 flex items-center gap-1 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  Most Ordered
                </Badge>
              </motion.div>
            )}

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </motion.button>

            <motion.img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Availability Badge */}
            <div className="absolute bottom-3 left-3">
              <Badge
                variant={availability === "In Stock" ? "default" : "secondary"}
                className={
                  availability === "Low Stock"
                    ? "bg-orange-500 hover:bg-orange-600 text-xs shadow-lg"
                    : "text-xs shadow-lg"
                }
              >
                {availability}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header Section */}
            <div className="flex-1">
              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-base">{rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({reviews} reviews)
                </span>
              </div>

              {/* Product Name */}
              <h3 className="font-heading font-bold text-2xl mb-3 leading-tight">
                {name}
              </h3>

              {/* Specs */}
              {specs && (
                <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                  {specs}
                </p>
              )}

              {/* Bulk Discounts Info */}
              <div className="mb-4">
                <p className="font-semibold mb-2 text-sm">Bulk Discounts:</p>
                <div className="flex flex-wrap gap-2">
                  {bulkDiscounts.map((d, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium"
                    >
                      {d.minQty}+ units: {d.discount}% off
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section - Pricing and Actions */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-end pt-4 border-t border-border">
              {/* Pricing */}
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-4 flex-1 border border-border/50">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">
                    ₹{(pricePerUnit * (1 - discount / 100)).toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">/unit</span>
                  {discount > 0 && (
                    <span className="text-sm line-through text-muted-foreground ml-1">
                      ₹{pricePerUnit}
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <Badge variant="secondary" className="text-xs mb-2">
                    {discount}% Bulk Discount Applied
                  </Badge>
                )}
                <div className="mt-2 text-sm text-muted-foreground">
                  Order Total: <strong className="text-foreground text-lg">₹{finalPrice.toFixed(2)}</strong>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex flex-col gap-3 lg:min-w-[240px]">
                {/* Quantity Input */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Quantity (Min: {minOrderQty})
                  </label>
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-muted-foreground" />
                    <Input
                      type="number"
                      min={minOrderQty}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(minOrderQty, parseInt(e.target.value) || minOrderQty))
                      }
                      className="flex-1 h-11"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 h-11"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRequestQuote}
                    className="h-11 px-4"
                  >
                    Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
      </motion.div>
    );
  }

  // Grid view layout (original)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-card rounded-xl border border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Popular Badge */}
      {popularBadge && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-4 left-4 z-10"
        >
          <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Most Ordered
          </Badge>
        </motion.div>
      )}

      {/* Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </motion.button>

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Availability Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge
            variant={availability === "In Stock" ? "default" : "secondary"}
            className={
              availability === "Low Stock"
                ? "bg-orange-500 hover:bg-orange-600"
                : ""
            }
          >
            {availability}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({reviews} reviews)
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-heading font-bold text-lg mb-2 line-clamp-1">
          {name}
        </h3>

        {/* Specs */}
        {specs && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {specs}
          </p>
        )}

        {/* Pricing */}
        <div className="bg-muted/50 rounded-lg p-3 mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-primary">
              ₹{(pricePerUnit * (1 - discount / 100)).toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">/unit</span>
            {discount > 0 && (
              <span className="text-xs line-through text-muted-foreground">
                ₹{pricePerUnit}
              </span>
            )}
          </div>
          {discount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {discount}% Bulk Discount
            </Badge>
          )}
          <div className="mt-2 text-xs text-muted-foreground">
            Total: <strong className="text-foreground">₹{finalPrice.toFixed(2)}</strong>
          </div>
        </div>

        {/* Bulk Discounts Info */}
        <div className="mb-4 text-xs text-muted-foreground">
          <p className="font-semibold mb-1">Bulk Discounts:</p>
          <div className="flex flex-wrap gap-1">
            {bulkDiscounts.map((d, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-primary/10 text-primary rounded"
              >
                {d.minQty}+ units: {d.discount}% off
              </span>
            ))}
          </div>
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">
            Quantity (Min: {minOrderQty})
          </label>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <Input
              type="number"
              min={minOrderQty}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(minOrderQty, parseInt(e.target.value) || minOrderQty))
              }
              className="flex-1"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            onClick={handleRequestQuote}
          >
            Quote
          </Button>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
    </motion.div>
  );
};

export default BulkProductCard;






