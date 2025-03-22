
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'bg-mysterio-darker/80 backdrop-blur-md shadow-md' : 'bg-transparent'} mysterio-transition`}>
      <div className="container px-4 py-3 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold font-playfair tracking-wider text-white">
            <span className="text-mysterio-purple">Mysterio</span>Box
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/shop" className="navbar-link">Shop</Link>
          <div className="relative group">
            <button className="navbar-link flex items-center">
              Categories <ChevronDown className="ml-1 w-4 h-4 group-hover:rotate-180 mysterio-transition" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 rounded-md glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible mysterio-transition z-50">
              <div className="py-2 px-3">
                <Link to="/shop/gamer" className="block py-2 navbar-link">Gamer Box</Link>
                <Link to="/shop/kpop" className="block py-2 navbar-link">K-Pop Box</Link>
                <Link to="/shop/anime" className="block py-2 navbar-link">Anime Box</Link>
                <Link to="/shop/chaos" className="block py-2 navbar-link">Chaos Box</Link>
              </div>
            </div>
          </div>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative p-2 text-white hover:text-mysterio-purple mysterio-transition">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-mysterio-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link to="/login" className="mysterio-btn">
            <User className="w-4 h-4 mr-2 inline" />
            Login
          </Link>
        </div>
        
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && isMobile && (
        <div className="md:hidden glass-card animate-fade-in z-50">
          <div className="py-4 px-4 space-y-4">
            <Link to="/" className="block py-2 text-lg font-medium navbar-link" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/shop" className="block py-2 text-lg font-medium navbar-link" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/about" className="block py-2 text-lg font-medium navbar-link" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="block py-2 text-lg font-medium navbar-link" onClick={() => setIsOpen(false)}>Contact</Link>
            <div className="pt-4 border-t border-white/10 flex justify-between">
              <Link to="/cart" className="mysterio-btn-outline flex items-center" onClick={() => setIsOpen(false)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Link>
              <Link to="/login" className="mysterio-btn flex items-center" onClick={() => setIsOpen(false)}>
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
