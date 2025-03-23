
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/components/ProductCard";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Updated mock data for the cart
const mockCartItems = [
  {
    product: {
      id: 1,
      name: "Tech Mystery Box",
      description: "Advanced tech gadgets and accessories for the modern enthusiast.",
      price: 999,
      image: "/lovable-uploads/065a5fdc-0dfc-47c7-8468-b0c650fcfb62.png",
      rarityLevel: 3,
      chaosMeter: 2,
      category: "Tech"
    },
    quantity: 1
  },
  {
    product: {
      id: 3,
      name: "Anime Collector's Box",
      description: "From figurines to exclusive merch, this box contains everything an anime lover could wish for.",
      price: 1499,
      image: "/lovable-uploads/535087f2-d656-43c4-9527-fb474a09f7ed.png",
      rarityLevel: 3,
      chaosMeter: 3,
      category: "Anime"
    },
    quantity: 2
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

const CartContent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === id 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
      duration: 3000,
    });
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 100;
    return subtotal + shipping;
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "Your order is being processed!",
      duration: 3000,
    });
    // Here you would typically redirect to a checkout page
    // or process the order with a payment provider
    setTimeout(() => {
      setCartItems([]);
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
        duration: 3000,
      });
    }, 2000);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-mysterio-purple opacity-70" />
        <h1 className="mb-4">Your Cart is Empty</h1>
        <p className="text-white/70 max-w-md mx-auto mb-8">
          Looks like you haven't added any mystery boxes to your cart yet. 
          Explore our collection to find your perfect mystery!
        </p>
        <Link to="/shop" className="mysterio-btn inline-flex items-center">
          Browse Mystery Boxes <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-10 text-center">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl">Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</h2>
            </div>
            
            <div className="divide-y divide-white/10">
              {cartItems.map(item => (
                <div key={item.product.id} className="p-6 flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <Link 
                        to={`/product/${item.product.id}`} 
                        className="text-lg font-semibold hover:text-mysterio-purple mysterio-transition"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-lg font-semibold text-mysterio-purple">
                        Rs. {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-4 line-clamp-1">
                      {item.product.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 rounded-l-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white mysterio-transition"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-10 h-8 border-y border-white/20 flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button 
                          className="w-8 h-8 rounded-r-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white mysterio-transition"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        className="text-white/70 hover:text-red-500 mysterio-transition flex items-center"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
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
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl overflow-hidden sticky top-24">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl">Order Summary</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-white/70">Subtotal</span>
                <span>Rs. {calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Shipping</span>
                <span>Rs. 100.00</span>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-mysterio-purple">Rs. {calculateTotal().toFixed(2)}</span>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={handleCheckout}
                  className="mysterio-btn w-full flex items-center justify-center group"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 mysterio-transition" />
                </button>
              </div>
              
              {/* Promo Code */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-semibold mb-2">Promo Code</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Enter code" 
                    className="mysterio-input flex-grow rounded-r-none"
                  />
                  <button className="mysterio-btn rounded-l-none px-4">Apply</button>
                </div>
              </div>
              
              {/* Secure Checkout */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-center text-white/50 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 7.2c-2.03 0-3.82-.98-4.9-2.48.49-1.22 1.71-2.02 3.1-2.02h3.6c1.39 0 2.61.8 3.1 2.02A5.982 5.982 0 0112 14.2z" />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { user, isLoading } = useAuth();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <ProtectedRoute>
          <CartContent />
        </ProtectedRoute>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
