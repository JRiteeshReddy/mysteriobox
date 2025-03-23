
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import CartContent from "@/components/cart/CartContent";

const Cart = () => {
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
