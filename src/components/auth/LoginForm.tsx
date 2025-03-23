
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthService } from "@/services/AuthService";

interface LoginFormProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const LoginForm = ({ isLogin, setIsLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Load saved email when component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem('lastLoginEmail');
    if (savedEmail && isLogin) {
      setEmail(savedEmail);
    }
  }, [isLogin]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = isLogin 
        ? await AuthService.login(email, password)
        : await AuthService.signUp(email, password);
      
      if (result.success) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
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
      
      <div className="mt-4 text-center">
        <p className="text-white/70">
          {isLogin 
            ? "Not a member yet? What are you waiting for, a prophecy?" 
            : "Already have an account?"}
          <button 
            type="button"
            className="text-mysterio-purple ml-2 hover:text-mysterio-purple-light mysterio-transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
