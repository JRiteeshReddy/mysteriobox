
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import LoginForm from "@/components/auth/LoginForm";
import { AuthService } from "@/services/AuthService";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const session = await AuthService.checkSession();
      if (session) {
        navigate("/");
      }
    };
    
    checkUser();
  }, [navigate]);
  
  return (
    <div className="min-h-screen">
      {/* Simple navbar with only the logo */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-mysterio-darker/90 backdrop-blur-md">
        <div className="container px-4 py-3 mx-auto">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold font-playfair tracking-wider text-white">
              <span className="text-mysterio-purple">Mysterio</span>Box
            </span>
          </Link>
        </div>
      </nav>
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-md mx-auto">
            <div className="glass-card rounded-xl p-8 backdrop-blur-md animate-scale-in" style={{ backgroundColor: 'rgba(36, 37, 59, 0.7)' }}>
              <div className="text-center mb-8">
                <h2 className="mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h2>
                <p className="text-white/70">
                  {isLogin 
                    ? "Enter your credentials to access your account" 
                    : "Join the MysterioBox community today"}
                </p>
              </div>
              
              <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
