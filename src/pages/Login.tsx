
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

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
      
      // No need for toast here as the user will be redirected to Google's auth page
    } catch (error: any) {
      toast({
        title: "Google login failed",
        description: error.message || "An error occurred during Google login",
        variant: "destructive",
        duration: 5000,
      });
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
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <button 
                  className="w-full glass-card hover:bg-white/10 py-3 rounded-md flex items-center justify-center mysterio-transition"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
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
