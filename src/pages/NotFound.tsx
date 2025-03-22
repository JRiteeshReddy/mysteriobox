
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="glass-card p-10 rounded-2xl max-w-2xl mx-auto backdrop-blur-md animate-scale-in">
            <div className="relative text-[120px] font-bold text-center mb-6 opacity-20">
              404
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-24 h-24 text-mysterio-purple animate-pulse" />
              </div>
            </div>
            
            <h1 className="mb-4">You've Ventured Into The Void!</h1>
            
            <p className="text-white/70 max-w-md mx-auto mb-8">
              The mysterious page you seek has vanished into the unknown or never existed in our realm. 
              Perhaps fate has other plans for your journey?
            </p>
            
            <Link to="/" className="mysterio-btn inline-flex items-center">
              <ArrowLeft className="mr-2 w-5 h-5" /> Return to Safety
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
