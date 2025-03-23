
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/components/ProductCard";
import CartList from "./CartList";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";

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
    return <EmptyCart />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-10 text-center">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CartList 
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
        
        <OrderSummary 
          subtotal={calculateSubtotal()}
          shipping={100}
          total={calculateTotal()}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default CartContent;
