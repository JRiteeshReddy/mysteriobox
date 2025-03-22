
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/components/ProductCard";
import { toast } from "@/components/ui/use-toast";

// Mock data for the cart
const mockCartItems = [
  {
    product: {
      id: 1,
      name: "Gamer's Paradise Box",
      description: "Dive into a world of gaming treasures with collectibles, accessories, and exclusive items.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      rarityLevel: 3,
      chaosMeter: 2,
      category: "Gamer"
    },
    quantity: 1
  },
  {
    product: {
      id: 3,
      name: "Anime Collector's Box",
      description: "From figurines to exclusive merch, this box contains everything an anime lover could wish for.",
      price: 54.99,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
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

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  
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
    const shipping = 4.99;
    return subtotal + shipping;
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        
        <main className="pt-20">
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
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
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
                            ${(item.product.price * item.quantity).toFixed(2)}
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
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-white/70">Shipping</span>
                    <span>$4.99</span>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-mysterio-purple">${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-4">
                    <Link to="/checkout" className="mysterio-btn w-full flex items-center justify-center group">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 mysterio-transition" />
                    </Link>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
