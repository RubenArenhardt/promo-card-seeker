import { useState } from 'react';
import { ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SearchFiltersProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  minPrice: number;
  isDarkMode: boolean;
  translations: any;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

const SearchFilters = ({ 
  priceRange, 
  onPriceRangeChange, 
  maxPrice, 
  minPrice, 
  isDarkMode, 
  translations,
  selectedCategory,
  onCategoryChange,
  categories,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minInput, setMinInput] = useState(priceRange[0].toString());
  const [maxInput, setMaxInput] = useState(priceRange[1].toString());

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    onPriceRangeChange(newRange);
    setMinInput(value[0].toString());
    setMaxInput(value[1].toString());
  };

  const handleMinInputChange = (value: string) => {
    setMinInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= minPrice && numValue <= priceRange[1]) {
      onPriceRangeChange([numValue, priceRange[1]]);
    }
  };

  const handleMaxInputChange = (value: string) => {
    setMaxInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue <= maxPrice && numValue >= priceRange[0]) {
      onPriceRangeChange([priceRange[0], numValue]);
    }
  };

  const resetFilters = () => {
    onPriceRangeChange([minPrice, maxPrice]);
    setMinInput(minPrice.toString());
    setMaxInput(maxPrice.toString());
    onCategoryChange('all');
    onSortByChange('name');
    onSortOrderChange('asc');
  };

  return (
    <Card className={`mb-6 border ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-gray-200'
    }`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className={`cursor-pointer transition-colors ${
            isDarkMode 
              ? 'hover:bg-gray-700' 
              : 'hover:bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <CardTitle className={`text-lg font-medium flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <DollarSign className="w-5 h-5 text-indigo-600" />
                Advanced Filters
              </CardTitle>
              {isOpen ? (
                <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              ) : (
                <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* All Filters in Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <h4 className={`font-medium mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{translations.category || 'Category'}</h4>
                  <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    <SelectTrigger className={`w-full ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}>
                      <SelectValue placeholder={translations.allCategories} />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}>
                      {categories.map(category => (
                        <SelectItem 
                          key={category} 
                          value={category}
                          className={isDarkMode ? 'text-white hover:bg-gray-600 focus:bg-gray-600' : ''}
                        >
                          {category === 'all' ? translations.allCategories : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className={`font-medium mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{translations.sortBy}</h4>
                  <Select value={sortBy} onValueChange={onSortByChange}>
                    <SelectTrigger className={`w-full ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}>
                      <SelectValue placeholder={translations.sortBy} />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}>
                      <SelectItem 
                        value="name"
                        className={isDarkMode ? 'text-white hover:bg-gray-600 focus:bg-gray-600' : ''}
                      >
                        {translations.name}
                      </SelectItem>
                      <SelectItem 
                        value="price"
                        className={isDarkMode ? 'text-white hover:bg-gray-600 focus:bg-gray-600' : ''}
                      >
                        {translations.price}
                      </SelectItem>
                      <SelectItem 
                        value="discount"
                        className={isDarkMode ? 'text-white hover:bg-gray-600 focus:bg-gray-600' : ''}
                      >
                        {translations.discount}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Order */}
                <div>
                  <h4 className={`font-medium mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{translations.order || 'Order'}</h4>
                  <Select value={sortOrder} onValueChange={onSortOrderChange}>
                    <SelectTrigger className={`w-full ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-gray-700 border-gray-600' : ''}>
                      <SelectItem 
                        value="asc"
                        className={isDarkMode ? 'text-white hover:bg-gray-600 focus:bg-gray-600' : ''}
                      >
                        {translations.ascending || 'Ascending'}
                      </SelectItem>
                      <SelectItem 
                        value="desc"
                        className={isDarkMode ? 'text-white hover:bg-gray-600 focus:bg-gray-600' : ''}
                      >
                        {translations.descending || 'Descending'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset Button */}
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className={`w-full ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                        : ''
                    }`}
                  >
                    {translations.resetFilters || 'Reset All Filters'}
                  </Button>
                </div>
              </div>

              {/* Price Range Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{translations.priceRange || 'Price Range'}</h4>
                </div>
                
                {/* Min/Max Input Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={`text-sm font-medium mb-1 block ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{translations.minimum || 'Minimum'} ($)</label>
                    <Input
                      type="number"
                      value={minInput}
                      onChange={(e) => handleMinInputChange(e.target.value)}
                      min={minPrice}
                      max={maxPrice}
                      step="0.01"
                      className={`w-full ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-medium mb-1 block ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{translations.maximum || 'Maximum'} ($)</label>
                    <Input
                      type="number"
                      value={maxInput}
                      onChange={(e) => handleMaxInputChange(e.target.value)}
                      min={minPrice}
                      max={maxPrice}
                      step="0.01"
                      className={`w-full ${
                        isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Price Slider */}
                <div className="px-3">
                  <Slider
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Filter Summary */}
              <div className={`rounded-lg p-4 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h5 className={`font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{translations.activeFilters || 'Active Filters'}:</h5>
                <div className={`text-sm space-y-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <div>{translations.category || 'Category'}: {selectedCategory === 'all' ? translations.allCategories : selectedCategory}</div>
                  <div>{translations.price || 'Price'}: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}</div>
                  <div>{translations.sort || 'Sort'}: {translations[sortBy]} ({sortOrder === 'asc' ? translations.ascending || 'Ascending' : translations.descending || 'Descending'})</div>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default SearchFilters;