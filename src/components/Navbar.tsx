
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, User, LogOut, UserCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/AuthService";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
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
  
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    const result = await AuthService.signOut();
    if (result.success) {
      navigate("/");
      setShowUserMenu(false);
    }
  };
  
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
            <div className="absolute top-full left-0 mt-2 w-48 rounded-md glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible mysterio-transition z-50" style={{ backgroundColor: 'rgba(36, 37, 59, 0.7)' }}>
              <div className="py-2 px-3">
                <Link to="/shop?category=Tech" className="block py-2 navbar-link">Tech Box</Link>
                <Link to="/shop?category=Pokemon" className="block py-2 navbar-link">Pokemon Box</Link>
                <Link to="/shop?category=Random" className="block py-2 navbar-link">Random Box</Link>
                <Link to="/shop?category=Puzzle" className="block py-2 navbar-link">Rubik's Cube Box</Link>
                <Link to="/shop?category=Pet" className="block py-2 navbar-link">Pet Box</Link>
                <Link to="/shop?category=Anime" className="block py-2 navbar-link">Anime Box</Link>
                <Link to="/shop?category=Food" className="block py-2 navbar-link">Food Box</Link>
                <Link to="/shop?category=Sticker" className="block py-2 navbar-link">Sticker Box</Link>
              </div>
            </div>
          </div>
          <Link to="/about" className="navbar-link">About</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative p-2 text-white hover:text-mysterio-purple mysterio-transition">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-mysterio-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 mysterio-btn-outline"
              >
                <UserCircle className="w-5 h-5" />
                <span>{user.email?.split('@')[0]}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {/* User dropdown menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md glass-card shadow-lg z-50" style={{ backgroundColor: 'rgba(36, 37, 59, 0.9)' }}>
                  <div className="py-2 px-3">
                    <Link to="/profile" className="block py-2 navbar-link flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                    <Link to="/orders" className="block py-2 navbar-link flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      My Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left py-2 navbar-link flex items-center text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="mysterio-btn">
              <User className="w-4 h-4 mr-2 inline" />
              Login
            </Link>
          )}
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
        <div className="md:hidden glass-card animate-fade-in z-50" style={{ backgroundColor: 'rgba(36, 37, 59, 0.7)' }}>
          <div className="py-4 px-4 space-y-4">
            <Link to="/" className="block py-2 text-lg font-medium navbar-link" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/shop" className="block py-2 text-lg font-medium navbar-link" onClick={() => setIsOpen(false)}>Shop</Link>
            <Link to="/about" className="block py-2 text-lg font-medium navbar-link" onClick={() => setIsOpen(false)}>About</Link>
            <div className="pt-4 border-t border-white/10 flex justify-between">
              <Link to="/cart" className="mysterio-btn-outline flex items-center" onClick={() => setIsOpen(false)}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Link>
              
              {user ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="mysterio-btn flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              ) : (
                <Link to="/login" className="mysterio-btn flex items-center" onClick={() => setIsOpen(false)}>
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
