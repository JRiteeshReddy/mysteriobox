import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package, Sparkles, Gift } from "lucide-react";
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mystical-gradient opacity-30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
      
      {/* Purple orb effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-mysterio-purple/20 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-mysterio-purple/20 rounded-full blur-[80px] animate-float" style={{
      animationDelay: '1s'
    }}></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <h5 className="text-mysterio-purple font-semibold mb-2 tracking-wide uppercase">Curiosity Awaits</h5>
              <h1 className="mb-6">Unbox the <span className="text-mysterio-purple">Unknown</span>,<br />Embrace the Mystery</h1>
              <p className="text-lg text-white/80 max-w-xl">
                Every MysterioBox contains carefully curated surprises waiting to be discovered. 
                From gaming collectibles to K-pop treasures, what will your destiny reveal?
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="mysterio-btn flex items-center">
                Shop Boxes <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/about" className="mysterio-btn-outline flex items-center">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="glass-card rounded-lg p-4 text-center">
                <Package className="mx-auto mb-2 text-mysterio-purple" />
                <h3 className="text-sm font-semibold">Premium Items</h3>
              </div>
              <div className="glass-card rounded-lg p-4 text-center">
                <Gift className="mx-auto mb-2 text-mysterio-purple" />
                <h3 className="text-sm font-semibold">Surprise Factor</h3>
              </div>
              <div className="glass-card rounded-lg p-4 text-center">
                <Sparkles className="mx-auto mb-2 text-mysterio-purple" />
                <h3 className="text-sm font-semibold">Rare Finds</h3>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="w-full h-[500px] rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="Mystery Box" className="w-full h-full object-cover object-center" />
                <div className=""></div>
              </div>
              
              <div style={{
              animationDelay: '1.5s'
            }} className="">
                <h3 className="text-xl font-semibold mb-2"></h3>
                <p className=""></p>
                <Link to="/shop/chaos" className="mysterio-btn w-full mt-4 text-center">
                  Explore Chaos Box
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;