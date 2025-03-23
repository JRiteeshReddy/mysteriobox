
import { ArrowRight } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

const OrderSummary = ({ subtotal, shipping, total, onCheckout }: OrderSummaryProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="glass-card rounded-xl overflow-hidden sticky top-24">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl">Order Summary</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-white/70">Subtotal</span>
            <span>Rs. {subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-white/70">Shipping</span>
            <span>Rs. {shipping.toFixed(2)}</span>
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-mysterio-purple">Rs. {total.toFixed(2)}</span>
          </div>
          
          <div className="pt-4">
            <button 
              onClick={onCheckout}
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
  );
};

export default OrderSummary;
