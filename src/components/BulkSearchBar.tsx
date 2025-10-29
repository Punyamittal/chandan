import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface BulkSearchBarProps {
  onSearch?: (data: SearchData) => void;
  variant?: "hero" | "inline";
}

export interface SearchData {
  product: string;
  quantity: string;
  category: string;
  location: string;
  deliveryDate: string;
}

const BulkSearchBar = ({ onSearch, variant = "hero" }: BulkSearchBarProps) => {
  const [searchData, setSearchData] = useState<SearchData>({
    product: "",
    quantity: "",
    category: "",
    location: "",
    deliveryDate: "",
  });

  const handleSearch = () => {
    onSearch?.(searchData);
  };

  const isHero = variant === "hero";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`${
        isHero
          ? "bg-white/95 backdrop-blur-lg shadow-2xl rounded-2xl p-8"
          : "bg-card border border-border rounded-xl p-6"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Product Search */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-foreground">
            Product Name
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="e.g., Letterheads"
              className="pl-10"
              value={searchData.product}
              onChange={(e) =>
                setSearchData({ ...searchData, product: e.target.value })
              }
            />
          </div>
        </div>

        {/* Quantity */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-foreground">
            Quantity
          </label>
          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Min. 100"
              type="number"
              className="pl-10"
              value={searchData.quantity}
              onChange={(e) =>
                setSearchData({ ...searchData, quantity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Category */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-foreground">
            Category
          </label>
          <Select
            value={searchData.category}
            onValueChange={(value) =>
              setSearchData({ ...searchData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="letterheads">Letterheads</SelectItem>
              <SelectItem value="business-cards">Business Cards</SelectItem>
              <SelectItem value="diaries">Diaries & Notebooks</SelectItem>
              <SelectItem value="folders">File Covers</SelectItem>
              <SelectItem value="bags">Carry Bags</SelectItem>
              <SelectItem value="posters">Posters</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-foreground">
            Delivery Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="City/PIN"
              className="pl-10"
              value={searchData.location}
              onChange={(e) =>
                setSearchData({ ...searchData, location: e.target.value })
              }
            />
          </div>
        </div>

        {/* Delivery Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-foreground">
            Required By
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="date"
              className="pl-10"
              value={searchData.deliveryDate}
              onChange={(e) =>
                setSearchData({ ...searchData, deliveryDate: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            className="px-12 py-6 text-lg font-semibold"
            onClick={handleSearch}
          >
            <Search className="mr-2 w-5 h-5" />
            Search Bulk Products
          </Button>
        </motion.div>
      </div>

      {/* Quick Stats */}
      {isHero && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 pt-6 border-t border-border/50 flex justify-center gap-8 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">500+</strong> Products
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">1000+</strong> Happy Clients
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Fast</strong> Delivery
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BulkSearchBar;

