
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/components/ProductCard";

interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ product, quantity, onQuantityChange, onRemove }: CartItemProps) => {
  return (
    <div className="p-6 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <Link 
            to={`/product/${product.id}`} 
            className="text-lg font-semibold hover:text-mysterio-purple mysterio-transition"
          >
            {product.name}
          </Link>
          <p className="text-lg font-semibold text-mysterio-purple">
            Rs. {(product.price * quantity).toFixed(2)}
          </p>
        </div>
        
        <p className="text-white/70 text-sm mb-4 line-clamp-1">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button 
              className="w-8 h-8 rounded-l-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white mysterio-transition"
              onClick={() => onQuantityChange(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-10 h-8 border-y border-white/20 flex items-center justify-center">
              {quantity}
            </span>
            <button 
              className="w-8 h-8 rounded-r-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white mysterio-transition"
              onClick={() => onQuantityChange(product.id, quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            className="text-white/70 hover:text-red-500 mysterio-transition flex items-center"
            onClick={() => onRemove(product.id)}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
