
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard, { Product } from "./ProductCard";

// Mock products data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Gamer's Paradise Box",
    description: "Dive into a world of gaming treasures with collectibles, accessories, and exclusive items that will level up your gaming experience.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rarityLevel: 3,
    chaosMeter: 2,
    category: "Gamer"
  },
  {
    id: 2,
    name: "K-Pop Ultimate Fan Box",
    description: "For the devoted K-Pop enthusiast! Merchandise, photocards, and surprises from your favorite K-Pop groups.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rarityLevel: 4,
    chaosMeter: 2,
    category: "K-Pop"
  },
  {
    id: 3,
    name: "Anime Collector's Box",
    description: "From figurines to exclusive merch, this box contains everything an anime lover could wish for.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    rarityLevel: 3,
    chaosMeter: 3,
    category: "Anime"
  },
  {
    id: 4,
    name: "Chaos Mystery Box",
    description: "The ultimate mystery experience. Anything could be inside - from tech gadgets to rare collectibles. Are you brave enough?",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    rarityLevel: 5,
    chaosMeter: 5,
    category: "Chaos"
  }
];

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const elementPosition = document.getElementById("featured-products")?.offsetTop || 0;
      
      if (scrollPosition > elementPosition) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <section id="featured-products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h5 className="text-mysterio-purple font-semibold mb-2 tracking-wide uppercase">Featured</h5>
            <h2>Popular Mystery Boxes</h2>
            <p className="text-white/70 max-w-2xl mt-3">
              Our most sought-after collections, each filled with carefully curated items 
              that will surprise and delight. Which box matches your destiny?
            </p>
          </div>
          
          <Link to="/shop" className="hidden md:flex items-center text-mysterio-purple font-semibold hover:text-mysterio-purple-light mysterio-transition">
            View All Boxes <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`transition-all duration-700 ease-out ${isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-10 md:hidden">
          <Link to="/shop" className="mysterio-btn">
            View All Boxes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
