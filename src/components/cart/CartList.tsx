
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CartItem from "./CartItem";
import { Product } from "@/components/ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartListProps {
  cartItems: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}

const CartList = ({ cartItems, updateQuantity, removeItem }: CartListProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</h2>
        </div>
        
        <div className="divide-y divide-white/10">
          {cartItems.map(item => (
            <CartItem 
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>
        
        <div className="p-6 flex justify-between items-center border-t border-white/10">
          <Link to="/shop" className="text-mysterio-purple hover:text-mysterio-purple-light mysterio-transition flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartList;
