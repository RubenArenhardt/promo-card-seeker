
import { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, List, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import SearchFilters from '@/components/SearchFilters';
import ProductUploader from '@/components/ProductUploader';

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

// Sample products for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 129.99,
    type: 'Electronics',
    category: 'Audio',
    link: 'https://example.com/headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    description: 'Premium wireless headphones with noise cancellation',
    discount: 38
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 299.99,
    type: 'Electronics',
    category: 'Wearables',
    link: 'https://example.com/watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    description: 'Track your fitness goals with advanced health monitoring',
    discount: 33
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 39.99,
    type: 'Clothing',
    category: 'Apparel',
    link: 'https://example.com/tshirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    description: '100% organic cotton, comfortable and sustainable',
    discount: 37
  },
  {
    id: '4',
    name: 'Coffee Maker Deluxe',
    price: 89.99,
    originalPrice: 149.99,
    type: 'Home & Kitchen',
    category: 'Appliances',
    link: 'https://example.com/coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    description: 'Brew perfect coffee every morning with this premium machine',
    discount: 40
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    price: 129.99,
    originalPrice: 179.99,
    type: 'Electronics',
    category: 'Gaming',
    link: 'https://example.com/keyboard',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
    description: 'RGB backlit mechanical keyboard for gaming enthusiasts',
    discount: 28
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    price: 49.99,
    originalPrice: 79.99,
    type: 'Sports & Outdoors',
    category: 'Fitness',
    link: 'https://example.com/yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    description: 'Non-slip premium yoga mat for all fitness levels',
    discount: 37
  }
];

const Index = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploader, setShowUploader] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.type))];
    return ['all', ...uniqueCategories];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.type === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Product];
      let bValue: any = b[sortBy as keyof Product];
      
      if (sortBy === 'price') {
        aValue = a.price;
        bValue = b.price;
      } else if (sortBy === 'discount') {
        aValue = a.discount || 0;
        bValue = b.discount || 0;
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy, sortOrder]);

  const handleProductsUpload = (newProducts: Product[]) => {
    setProducts(newProducts);
    setShowUploader(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">PromoHub</h1>
              <p className="text-gray-600 mt-1">Discover amazing deals and promotions</p>
            </div>
            <Button 
              onClick={() => setShowUploader(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Upload Products
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products, categories, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="discount">Discount</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <SearchFilters
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          maxPrice={Math.max(...products.map(p => p.price))}
        />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {filteredProducts.length} Products Found
          </h2>
          <div className="text-sm text-gray-600">
            Showing deals up to {Math.max(...filteredProducts.map(p => p.discount || 0))}% off
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Product Uploader Modal */}
      {showUploader && (
        <ProductUploader
          onProductsUpload={handleProductsUpload}
          onClose={() => setShowUploader(false)}
        />
      )}
    </div>
  );
};

export default Index;
