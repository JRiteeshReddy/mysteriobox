
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rarityLevel: number;
  chaosMeter: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
    
    // In a real implementation, we would call a function to add the product to the cart
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-card rounded-lg overflow-hidden group ${isHovered ? 'animate-wiggle' : ''}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <div className={`absolute inset-0 bg-mysterio-darker/40 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}></div>
          
          <div className="absolute top-3 left-3 bg-mysterio-purple px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </div>
          
          <div className="absolute bottom-3 left-3 flex items-center">
            <div className="flex items-center bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
              <Star className="text-yellow-400 w-4 h-4 mr-1" fill="currentColor" />
              <span className="text-xs font-semibold">Rarity: {product.rarityLevel}/5</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 mysterio-transition group-hover:text-mysterio-purple">
            {product.name}
          </h3>
          
          <p className="text-white/70 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-mysterio-purple">${product.price.toFixed(2)}</span>
            
            <button
              onClick={handleAddToCart}
              className="mysterio-btn-outline py-2 px-3 flex items-center text-sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
