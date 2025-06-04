
import { useState } from 'react';
import { Upload, X, Download, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

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

interface ProductUploaderProps {
  onProductsUpload: (products: Product[]) => void;
  onClose: () => void;
}

const ProductUploader = ({ onProductsUpload, onClose }: ProductUploaderProps) => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const sampleJson = JSON.stringify([
    {
      "name": "Sample Product",
      "price": 29.99,
      "originalPrice": 49.99,
      "type": "Electronics",
      "category": "Gadgets",
      "link": "https://example.com/product",
      "image": "https://example.com/image.jpg",
      "description": "This is a sample product description"
    }
  ], null, 2);

  const handleUpload = () => {
    try {
      setError('');
      const parsedData = JSON.parse(jsonInput);
      
      if (!Array.isArray(parsedData)) {
        throw new Error('JSON must be an array of products');
      }

      const products: Product[] = parsedData.map((item, index) => {
        // Validate required fields
        if (!item.name || !item.price || !item.type || !item.link) {
          throw new Error(`Product at index ${index} is missing required fields (name, price, type, link)`);
        }

        // Calculate discount if originalPrice is provided
        let discount = 0;
        if (item.originalPrice && item.originalPrice > item.price) {
          discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
        }

        return {
          id: Date.now().toString() + index,
          name: item.name,
          price: Number(item.price),
          originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
          type: item.type,
          category: item.category || item.type,
          link: item.link,
          image: item.image,
          description: item.description,
          discount: discount || undefined
        };
      });

      onProductsUpload(products);
      toast({
        title: "Success!",
        description: `${products.length} products uploaded successfully.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid JSON format';
      setError(errorMessage);
      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const downloadSample = () => {
    const blob = new Blob([sampleJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-products.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Product Data
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">JSON Format Requirements</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>name</strong> (required): Product name</li>
              <li>• <strong>price</strong> (required): Current price as number</li>
              <li>• <strong>type</strong> (required): Product type/category</li>
              <li>• <strong>link</strong> (required): URL to the product</li>
              <li>• <strong>originalPrice</strong> (optional): Original price for discount calculation</li>
              <li>• <strong>category</strong> (optional): Subcategory (defaults to type)</li>
              <li>• <strong>image</strong> (optional): Image URL</li>
              <li>• <strong>description</strong> (optional): Product description</li>
            </ul>
          </div>

          {/* Sample Download */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Need an example?</span>
            <Button variant="outline" onClick={downloadSample} size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Sample JSON
            </Button>
          </div>

          {/* JSON Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Data (JSON Format)
            </label>
            <Textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste your JSON data here..."
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Sample Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Sample JSON Structure:
            </h4>
            <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-x-auto">
              {sampleJson}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpload}
              disabled={!jsonInput.trim()}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Products
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductUploader;
