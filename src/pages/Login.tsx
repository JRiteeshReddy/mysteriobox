
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    
    checkUser();
  }, [navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful!",
        description: "Welcome back to MysterioBox.",
        duration: 3000,
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully. Welcome to MysterioBox!",
        duration: 3000,
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    isLogin ? handleLogin(e) : handleSignUp(e);
  };
  
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
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="mysterio-input pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mysterio-purple w-5 h-5" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="mysterio-input pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mysterio-purple w-5 h-5" />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                {isLogin && (
                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-mysterio-purple text-sm hover:text-mysterio-purple-light mysterio-transition">
                      Forgot password?
                    </Link>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="mysterio-btn w-full flex items-center justify-center group"
                >
                  {loading ? "Processing..." : isLogin ? "Login" : "Create Account"}
                  {!loading && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 mysterio-transition" />}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-white/70">
                  {isLogin 
                    ? "Not a member yet? What are you waiting for, a prophecy?" 
                    : "Already have an account?"}
                  <button 
                    className="text-mysterio-purple ml-2 hover:text-mysterio-purple-light mysterio-transition"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
