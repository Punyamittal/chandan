import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  availability: string[];
  rating: number;
  minQuantity: number;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const ProductFilters = ({
  filters,
  onFilterChange,
}: ProductFiltersProps) => {
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
    onFilterChange(newFilters);
  };

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, option]
      : filters.availability.filter((a) => a !== option);
    const newFilters = { ...filters, availability: newAvailability };
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    };
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterOptions = {
      categories: [],
      priceRange: [0, 1000],
      availability: [],
      rating: 0,
      minQuantity: 0,
    };
    onFilterChange(clearedFilters);
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.availability.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300">
            {activeFiltersCount} Active
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-xs text-gray-700 hover:text-orange-600 hover:bg-orange-50"
          >
            <X className="w-3 h-3 mr-1" />
            Clear All
          </Button>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
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
                className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label
                htmlFor={`cat-${category}`}
                className="text-sm cursor-pointer text-gray-700 hover:text-gray-900"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-orange-200" />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900">
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
        <div className="flex justify-between text-xs text-gray-600">
          <span>₹0</span>
          <span>₹1000+</span>
        </div>
      </div>

      <Separator className="bg-orange-200" />

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900">Availability</h3>
        <div className="space-y-3">
          {availabilityOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`avail-${option}`}
                checked={filters.availability.includes(option)}
                onCheckedChange={(checked) =>
                  handleAvailabilityChange(option, checked as boolean)
                }
                className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label
                htmlFor={`avail-${option}`}
                className="text-sm cursor-pointer text-gray-700 hover:text-gray-900"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-orange-200" />

      {/* Minimum Rating */}
      <div>
        <h3 className="font-semibold mb-4 text-gray-900">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <Button
              key={rating}
              variant={filters.rating === rating ? "default" : "outline"}
              size="sm"
              className={
                filters.rating === rating
                  ? "w-full justify-start bg-orange-500 hover:bg-orange-600 text-white"
                  : "w-full justify-start border-orange-300 text-gray-700 hover:bg-orange-50 hover:text-orange-700"
              }
              onClick={() => {
                const newFilters = { ...filters, rating };
                onFilterChange(newFilters);
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
    <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold flex items-center gap-2 text-gray-900">
          <SlidersHorizontal className="w-5 h-5 text-orange-600" />
          Filters
        </h2>
        {activeFiltersCount > 0 && (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300">
            {activeFiltersCount}
          </Badge>
        )}
      </div>
      <FilterContent />
    </div>
  );
};

export default ProductFilters;







