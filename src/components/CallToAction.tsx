
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("cta-section");
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isInView) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <section id="cta-section" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.15)_0,transparent_70%)]"></div>
      
      <div className={`container mx-auto px-4 relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="bg-gradient-to-r from-mysterio-darker to-mysterio-dark rounded-2xl overflow-hidden shadow-xl border border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-10 lg:p-16 flex flex-col justify-center">
              <h2 className="mb-6">Embark on Your Mystery Journey Today</h2>
              <p className="text-white/80 text-lg mb-8">
                Start your adventure with 15% off your first box. Use code <span className="font-semibold text-mysterio-purple">FIRSTMYSTERY</span> at checkout and discover what fate has in store for you.
              </p>
              
              <div className="">
                <Link to="/shop" className="mysterio-btn flex items-center mx-0">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/faq" className="mysterio-btn-outline flex items-center">
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="relative lg:h-auto">
              <div className="h-full">
                <img src="/lovable-uploads/b502372b-bfb3-43d0-94a9-1b14eeccd019.png" alt="Mystery Boxes" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-mysterio-darker to-transparent"></div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-card p-6 rounded-lg max-w-xs text-center animate-float">
                <Package className="mx-auto mb-4 text-mysterio-purple w-12 h-12" />
                <h3 className="text-xl font-semibold mb-2">Mystery Awaits</h3>
                <p className="text-white/80 text-sm">
                  Every box is a new adventure. What will your destiny reveal?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default CallToAction;
