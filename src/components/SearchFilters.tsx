
import { useState } from 'react';
import { ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SearchFiltersProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  minPrice: number;
  isDarkMode: boolean;
  translations: any;
}

const SearchFilters = ({ 
  priceRange, 
  onPriceRangeChange, 
  maxPrice, 
  minPrice, 
  isDarkMode, 
  translations 
}: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    onPriceRangeChange([value[0], value[1]]);
  };

  const resetFilters = () => {
    onPriceRangeChange([minPrice, maxPrice]);
  };

  return (
    <Card className={`mb-6 border transition-colors ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
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
              <CardTitle className={`text-lg font-medium flex items-center gap-2 transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <DollarSign className="w-5 h-5 text-indigo-600" />
                Advanced Filters
              </CardTitle>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`font-medium transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Price Range</h4>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-xs"
                  >
                    Reset
                  </Button>
                </div>
                
                <div className="px-3">
                  <Slider
                    min={minPrice}
                    max={maxPrice}
                    step={1}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="w-full"
                  />
                  <div className={`flex justify-between mt-3 text-sm transition-colors ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <span>${priceRange[0].toFixed(2)}</span>
                    <span>${priceRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Filter Summary */}
              <div className={`rounded-lg p-4 transition-colors ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h5 className={`font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Active Filters:</h5>
                <div className={`text-sm transition-colors ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Price: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
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
