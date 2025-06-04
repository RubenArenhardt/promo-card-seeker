
import { ExternalLink, Tag, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  type: string;
  category: string;
  link: string;
  image?: string;
  description?: string;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  isDarkMode: boolean;
}

const ProductCard = ({ product, viewMode, isDarkMode }: ProductCardProps) => {
  const handleProductClick = () => {
    window.open(product.link, '_blank', 'noopener,noreferrer');
  };

  const cardClasses = `hover:shadow-lg transition-all duration-300 border ${
    isDarkMode 
      ? 'bg-gray-800 border-gray-700 hover:border-indigo-400' 
      : 'bg-white border-gray-200 hover:border-indigo-300'
  }`;

  const textClasses = {
    primary: isDarkMode ? 'text-white' : 'text-gray-900',
    secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    muted: isDarkMode ? 'text-gray-400' : 'text-gray-500'
  };

  if (viewMode === 'list') {
    return (
      <Card className={cardClasses}>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
            <img
              src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop'}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                -{product.discount}%
              </Badge>
            )}
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {product.type}
                  </Badge>
                  <span className={`text-xs ${textClasses.muted}`}>{product.category}</span>
                </div>
                
                <h3 className={`font-semibold text-lg mb-2 hover:text-indigo-600 transition-colors cursor-pointer ${textClasses.primary}`}>
                  {product.name}
                </h3>
                
                <p className={`text-sm mb-4 line-clamp-2 ${textClasses.secondary}`}>
                  {product.description}
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-indigo-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className={`line-through text-lg ${textClasses.muted}`}>
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      Save ${(product.originalPrice! - product.price).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={handleProductClick}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Deal
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`${cardClasses} group hover:-translate-y-1`}>
      <div className="relative overflow-hidden">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop'}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            -{product.discount}%
          </Badge>
        )}
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className={`text-xs ${
            isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
          }`}>
            <Tag className="w-3 h-3 mr-1" />
            {product.type}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <span className={`text-xs ${textClasses.muted}`}>{product.category}</span>
        </div>
        
        <h3 className={`font-semibold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors ${textClasses.primary}`}>
          {product.name}
        </h3>
        
        <p className={`text-sm mb-4 line-clamp-2 ${textClasses.secondary}`}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className={`line-through text-sm ${textClasses.muted}`}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.discount && (
            <div className="flex items-center text-green-600 text-xs font-medium">
              <TrendingDown className="w-3 h-3 mr-1" />
              Save ${(product.originalPrice! - product.price).toFixed(2)}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleProductClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white group-hover:bg-indigo-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Deal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
