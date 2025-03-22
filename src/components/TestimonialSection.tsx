
import { useState, useEffect } from "react";
import { Star, User, ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Gaming Enthusiast",
    content: "I was blown away by my Gamer's Paradise Box! The collectible figurine alone was worth the price, and the other items were perfect for my gaming setup. Can't wait to order another one!",
    rating: 5
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "K-Pop Fan",
    content: "The K-Pop Ultimate Fan Box exceeded all my expectations! I received photocards from my favorite groups and exclusive merch that I couldn't find anywhere else. MysterioBox knows what fans want!",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Webb",
    role: "Collector",
    content: "I took a chance on the Chaos Mystery Box and got some truly unique items that perfectly match my eclectic tastes. The element of surprise makes the unboxing experience so much fun!",
    rating: 4
  },
  {
    id: 4,
    name: "Lena Kim",
    role: "Anime Lover",
    content: "My Anime Collector's Box was packed with amazing merchandise from my favorite series. The curation was thoughtful and showed a real understanding of what anime fans appreciate.",
    rating: 5
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("testimonials");
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
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className="w-5 h-5" 
        fill={i < rating ? "currentColor" : "none"} 
        color={i < rating ? "#9b87f5" : "#9b87f5"}
      />
    ));
  };
  
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h5 className="text-mysterio-purple font-semibold mb-2 tracking-wide uppercase">Testimonials</h5>
          <h2>What Our Customers Say</h2>
          <p className="text-white/70 mt-4">
            Don't just take our word for it. Discover what our community of mystery enthusiasts
            has to say about their MysterioBox experiences.
          </p>
        </div>
        
        <div 
          className={`glass-card rounded-xl p-8 max-w-4xl mx-auto transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="bg-mysterio-purple/20 rounded-full w-12 h-12 flex items-center justify-center">
                <User className="text-mysterio-purple w-6 h-6" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">{testimonials[activeIndex].name}</h4>
                <p className="text-sm text-white/70">{testimonials[activeIndex].role}</p>
              </div>
            </div>
            
            <div className="flex">
              {renderStars(testimonials[activeIndex].rating)}
            </div>
          </div>
          
          <blockquote className="text-lg italic mb-8 text-white/90">
            "{testimonials[activeIndex].content}"
          </blockquote>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'bg-mysterio-purple w-8' : 'bg-mysterio-purple/30'
                  }`}
                  onClick={() => setActiveIndex(index)}
                ></button>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-mysterio-purple/10 mysterio-transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-mysterio-purple/10 mysterio-transition"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
