
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Star, ActivitySquare, Info, Shield, Box, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { toast } from "@/components/ui/use-toast";

// Mock products data (same as shop page)
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Gamer's Paradise Box",
    description: "Dive into a world of gaming treasures with collectibles, accessories, and exclusive items that will level up your gaming experience.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rarityLevel: 3,
    chaosMeter: 2,
    category: "Gamer"
  },
  {
    id: 2,
    name: "K-Pop Ultimate Fan Box",
    description: "For the devoted K-Pop enthusiast! Merchandise, photocards, and surprises from your favorite K-Pop groups.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rarityLevel: 4,
    chaosMeter: 2,
    category: "K-Pop"
  },
  {
    id: 3,
    name: "Anime Collector's Box",
    description: "From figurines to exclusive merch, this box contains everything an anime lover could wish for.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    rarityLevel: 3,
    chaosMeter: 3,
    category: "Anime"
  },
  {
    id: 4,
    name: "Chaos Mystery Box",
    description: "The ultimate mystery experience. Anything could be inside - from tech gadgets to rare collectibles. Are you brave enough?",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    rarityLevel: 5,
    chaosMeter: 5,
    category: "Chaos"
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Simulate fetching product details
    const fetchedProduct = mockProducts.find(p => p.id === Number(id)) || null;
    setProduct(fetchedProduct);
    
    // Get related products from the same category
    if (fetchedProduct) {
      const related = mockProducts
        .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);
    }
    
    // Animation
    setIsVisible(true);
    
    // Scroll to top on component mount or when id changes
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} added to your cart.`,
      duration: 3000,
    });
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className="w-5 h-5" 
        fill={i < rating ? "currentColor" : "none"} 
        color={i < rating ? "#9b87f5" : "#9b87f5"}
      />
    ));
  };
  
  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2>Product not found</h2>
          <p className="mt-4 text-white/70">The mystery box you're looking for doesn't exist or has vanished into the void.</p>
          <Link to="/shop" className="mysterio-btn mt-8 inline-flex items-center">
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link to="/shop" className="inline-flex items-center text-white/70 hover:text-mysterio-purple mysterio-transition">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Shop
            </Link>
          </div>
          
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Product Image */}
            <div className="relative">
              <div className="glass-card rounded-xl overflow-hidden h-[500px]">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute top-4 left-4 bg-mysterio-purple px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="mb-3">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <p className="text-3xl font-semibold text-mysterio-purple">${product.price.toFixed(2)}</p>
                  <div className="glass-card px-3 py-1 rounded-full flex items-center">
                    <Box className="w-4 h-4 mr-2 text-mysterio-purple" />
                    <span className="text-sm">One-time purchase</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl">Mystery Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg">
                    <div className="flex items-center">
                      <Star className="text-mysterio-purple w-5 h-5 mr-2" />
                      <h4 className="text-sm font-semibold">Rarity Level</h4>
                    </div>
                    <div className="mt-2 flex">
                      {renderStars(product.rarityLevel)}
                    </div>
                  </div>
                  
                  <div className="glass-card p-4 rounded-lg">
                    <div className="flex items-center">
                      <ActivitySquare className="text-mysterio-purple w-5 h-5 mr-2" />
                      <h4 className="text-sm font-semibold">Chaos Meter</h4>
                    </div>
                    <div className="mt-2 w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-mysterio-purple h-2 rounded-full" 
                        style={{ width: `${(product.chaosMeter / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-1 text-xs text-right">{product.chaosMeter}/5</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl mb-3">Description</h3>
                <p className="text-white/80">{product.description}</p>
                <p className="text-white/80 mt-3">
                  What treasures await inside? The contents are a mystery until you unbox, 
                  but each item is carefully selected to delight and surprise. The thrill of 
                  the unknown is part of the experience!
                </p>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center mb-4">
                  <div className="flex border border-white/20 rounded-md">
                    <button 
                      className="px-3 py-2 text-white/70 hover:text-white mysterio-transition"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-white/20 min-w-[50px] text-center">
                      {quantity}
                    </span>
                    <button 
                      className="px-3 py-2 text-white/70 hover:text-white mysterio-transition"
                      onClick={() => setQuantity(prev => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    className="mysterio-btn flex-1 flex items-center justify-center"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                  <button className="mysterio-btn-outline flex items-center justify-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Wishlist
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-white/70">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Contents are a mystery! Each box is uniquely packed and may vary from the images shown. 
                    That's part of the excitement!
                  </p>
                </div>
                
                <div className="flex items-start space-x-3 text-white/70">
                  <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Every MysterioBox is guaranteed to contain items of equal or greater value than the purchase price.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
