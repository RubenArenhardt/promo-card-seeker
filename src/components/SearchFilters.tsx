
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
}

const SearchFilters = ({ priceRange, onPriceRangeChange, maxPrice }: SearchFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (value: number[]) => {
    onPriceRangeChange([value[0], value[1]]);
  };

  const resetFilters = () => {
    onPriceRangeChange([0, maxPrice]);
  };

  return (
    <Card className="mb-6 bg-white border border-gray-200">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
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
                  <h4 className="font-medium text-gray-900">Price Range</h4>
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
                    min={0}
                    max={maxPrice}
                    step={1}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>${priceRange[0].toFixed(2)}</span>
                    <span>${priceRange[1].toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Filter Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Active Filters:</h5>
                <div className="text-sm text-gray-600">
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
