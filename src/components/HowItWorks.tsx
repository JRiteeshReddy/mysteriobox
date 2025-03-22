
import { useEffect, useState } from "react";
import { Package, Truck, Gift, ShoppingCart } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Choose Your Mystery",
    description: "Browse our selection of mystery boxes and pick the theme that intrigues you the most.",
    icon: ShoppingCart,
  },
  {
    id: 2,
    title: "We Curate & Pack",
    description: "Our team carefully selects premium items based on your chosen theme, ensuring quality and value.",
    icon: Package,
  },
  {
    id: 3,
    title: "Fast Delivery",
    description: "Your mystery box is shipped quickly and securely to your doorstep, with tracking provided.",
    icon: Truck,
  },
  {
    id: 4,
    title: "Unbox the Surprise",
    description: "Experience the thrill of the unknown as you reveal what treasures await inside your mystery box.",
    icon: Gift,
  }
];

const HowItWorks = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("how-it-works");
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isInView) {
        const newVisibleItems = steps.map((_, i) => i);
        setVisibleItems(newVisibleItems);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <section id="how-it-works" className="py-20 bg-mysterio-darker relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h5 className="text-mysterio-purple font-semibold mb-2 tracking-wide uppercase">Simple Process</h5>
          <h2>How It Works</h2>
          <p className="text-white/70 mt-4">
            Our mystery box experience is designed to be simple, exciting, and full of surprises. 
            Here's how your journey into the unknown unfolds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id} 
                className={`glass-card rounded-lg p-6 text-center transition-all duration-700 ease-out ${
                  visibleItems.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-mysterio-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-mysterio-purple" />
                </div>
                
                <div className="bg-mysterio-purple text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto -mt-16 mb-6 font-bold">
                  {step.id}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
