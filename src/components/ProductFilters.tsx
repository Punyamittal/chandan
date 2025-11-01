import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useState } from "react";

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  availability: string[];
  rating: number;
  minQuantity: number;
}

interface ProductFiltersProps {
  onFilterChange?: (filters: FilterOptions) => void;
  activeFiltersCount?: number;
}

const ProductFilters = ({
  onFilterChange,
  activeFiltersCount = 0,
}: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    availability: [],
    rating: 0,
    minQuantity: 0,
  });

  const categories = [
    "Letterheads",
    "Business Cards",
    "Visiting Cards",
    "Diaries & Notebooks",
    "File Covers",
    "Carry Bags",
    "Posters",
    "Print Media",
  ];

  const availabilityOptions = ["In Stock", "Made to Order", "Pre-Order"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, option]
      : filters.availability.filter((a) => a !== option);
    const newFilters = { ...filters, availability: newAvailability };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterOptions = {
      categories: [],
      priceRange: [0, 1000],
      availability: [],
      rating: 0,
      minQuantity: 0,
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{activeFiltersCount} Active Filters</Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Clear All
          </Button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <span>Categories</span>
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label
                htmlFor={`cat-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">
          Price per Unit (₹{filters.priceRange[0]} - ₹{filters.priceRange[1]})
        </h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹0</span>
          <span>₹1000+</span>
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-4">Availability</h3>
        <div className="space-y-3">
          {availabilityOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`avail-${option}`}
                checked={filters.availability.includes(option)}
                onCheckedChange={(checked) =>
                  handleAvailabilityChange(option, checked as boolean)
                }
              />
              <Label
                htmlFor={`avail-${option}`}
                className="text-sm cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Minimum Rating */}
      <div>
        <h3 className="font-semibold mb-4">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating === rating ? "default" : "outline"}
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                const newFilters = { ...filters, rating };
                setFilters(newFilters);
                onFilterChange?.(newFilters);
              }}
            >
              {rating}+ ⭐
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters - Sidebar */}
      <div className="hidden lg:block w-72 pr-8">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </h2>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters - Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ProductFilters;


