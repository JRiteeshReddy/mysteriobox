
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

const EmptyCart = () => {
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
};

export default EmptyCart;
