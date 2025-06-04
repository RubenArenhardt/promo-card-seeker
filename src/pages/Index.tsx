
import { useState, useMemo } from 'react';
import { Search, Grid3X3, List, SortAsc, SortDesc, Sun, Moon, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
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

interface Translations {
  [key: string]: {
    title: string;
    subtitle: string;
    upload: string;
    search: string;
    allCategories: string;
    sortBy: string;
    name: string;
    price: string;
    discount: string;
    productsFound: string;
    dealsUpTo: string;
    off: string;
    noProducts: string;
    noProductsDesc: string;
    darkMode: string;
  };
}

const translations: Translations = {
  en: {
    title: 'TechHub',
    subtitle: 'Best deals on computer components',
    upload: 'Upload Products',
    search: 'Search products, categories, or descriptions...',
    allCategories: 'All Categories',
    sortBy: 'Sort by',
    name: 'Name',
    price: 'Price',
    discount: 'Discount',
    productsFound: 'Products Found',
    dealsUpTo: 'Showing deals up to',
    off: 'off',
    noProducts: 'No products found',
    noProductsDesc: 'Try adjusting your search criteria or filters',
    darkMode: 'Dark Mode'
  },
  'pt-BR': {
    title: 'TechHub',
    subtitle: 'Melhores ofertas em componentes de computador',
    upload: 'Enviar Produtos',
    search: 'Buscar produtos, categorias ou descrições...',
    allCategories: 'Todas as Categorias',
    sortBy: 'Ordenar por',
    name: 'Nome',
    price: 'Preço',
    discount: 'Desconto',
    productsFound: 'Produtos Encontrados',
    dealsUpTo: 'Mostrando ofertas de até',
    off: 'de desconto',
    noProducts: 'Nenhum produto encontrado',
    noProductsDesc: 'Tente ajustar seus critérios de busca ou filtros',
    darkMode: 'Modo Escuro'
  },
  es: {
    title: 'TechHub',
    subtitle: 'Mejores ofertas en componentes de computadora',
    upload: 'Subir Productos',
    search: 'Buscar productos, categorías o descripciones...',
    allCategories: 'Todas las Categorías',
    sortBy: 'Ordenar por',
    name: 'Nombre',
    price: 'Precio',
    discount: 'Descuento',
    productsFound: 'Productos Encontrados',
    dealsUpTo: 'Mostrando ofertas de hasta',
    off: 'de descuento',
    noProducts: 'No se encontraron productos',
    noProductsDesc: 'Intenta ajustar tus criterios de búsqueda o filtros',
    darkMode: 'Modo Oscuro'
  }
};

// Computer components sample products
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Mechanical Gaming Keyboard RGB',
    price: 129.99,
    originalPrice: 179.99,
    type: 'Keyboard',
    category: 'Gaming',
    link: 'https://example.com/keyboard',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
    description: 'RGB backlit mechanical keyboard with cherry MX switches',
    discount: 28
  },
  {
    id: '2',
    name: '27" 4K Gaming Monitor',
    price: 299.99,
    originalPrice: 449.99,
    type: 'Monitor',
    category: 'Display',
    link: 'https://example.com/monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=300&fit=crop',
    description: '27-inch 4K UHD gaming monitor with 144Hz refresh rate',
    discount: 33
  },
  {
    id: '3',
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    originalPrice: 119.99,
    type: 'Mouse',
    category: 'Gaming',
    link: 'https://example.com/mouse',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
    description: 'High-precision wireless gaming mouse with RGB lighting',
    discount: 33
  },
  {
    id: '4',
    name: 'Extended Gaming Mousepad',
    price: 24.99,
    originalPrice: 39.99,
    type: 'Mousepad',
    category: 'Accessories',
    link: 'https://example.com/mousepad',
    image: 'https://images.unsplash.com/photo-1615750185825-4fc0c0f75ac3?w=300&h=300&fit=crop',
    description: 'Large extended gaming mousepad with anti-slip base',
    discount: 37
  },
  {
    id: '5',
    name: 'RTX 4070 Graphics Card',
    price: 599.99,
    originalPrice: 799.99,
    type: 'Graphics Card',
    category: 'Components',
    link: 'https://example.com/gpu',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop',
    description: 'NVIDIA RTX 4070 graphics card for high-end gaming',
    discount: 25
  },
  {
    id: '6',
    name: 'DDR5 32GB RAM Kit',
    price: 189.99,
    originalPrice: 249.99,
    type: 'Memory',
    category: 'Components',
    link: 'https://example.com/ram',
    image: 'https://images.unsplash.com/photo-1562976540-2c3c3503ecf2?w=300&h=300&fit=crop',
    description: '32GB DDR5 RAM kit with RGB lighting',
    discount: 24
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  // Price range limits
  const minPrice = 0;
  const maxPrice = Math.max(1000, ...products.map(p => p.price));

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
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Header */}
      <header className={`shadow-lg border-b transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className={`text-3xl font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.title}</h1>
              <p className={`mt-1 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <Languages className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt-BR">Português</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>

              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
                <Moon className="w-4 h-4" />
              </div>

              <Button 
                onClick={() => setShowUploader(true)}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {t.upload}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className={`rounded-xl shadow-md p-6 mb-8 transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder={t.allCategories} />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? t.allCategories : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder={t.sortBy} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">{t.name}</SelectItem>
                <SelectItem value="price">{t.price}</SelectItem>
                <SelectItem value="discount">{t.discount}</SelectItem>
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
          maxPrice={maxPrice}
          minPrice={minPrice}
          isDarkMode={isDarkMode}
          translations={t}
        />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {filteredProducts.length} {t.productsFound}
          </h2>
          <div className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.dealsUpTo} {Math.max(...filteredProducts.map(p => p.discount || 0))}% {t.off}
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
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{t.noProducts}</h3>
            <p className={`transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t.noProductsDesc}</p>
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
