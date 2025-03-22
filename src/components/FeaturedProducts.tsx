
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard, { Product } from "./ProductCard";

// Mock products data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Tech Mystery Box",
    description: "Latest gadgets and tech accessories in one amazing box. Perfect for tech enthusiasts and gadget lovers.",
    price: 49.99,
    image: "public/lovable-uploads/a81d30b3-f599-4e9b-a0ca-aeb9fd90571e.png",
    rarityLevel: 3,
    chaosMeter: 2,
    category: "Tech"
  },
  {
    id: 2,
    name: "Pokemon Mystery Box",
    description: "Filled with Pokemon treasures! Cards, figurines and collectibles for trainers of all ages.",
    price: 59.99,
    image: "public/lovable-uploads/25dd2fce-3cea-48c8-890e-2c5937ba7b40.png",
    rarityLevel: 4,
    chaosMeter: 2,
    category: "Pokemon"
  },
  {
    id: 3,
    name: "Random Mystery Box",
    description: "The ultimate surprise package! A completely random assortment of items that could be anything from anywhere.",
    price: 54.99,
    image: "public/lovable-uploads/ca26c4b1-1d9e-41d6-bfc7-676ecb6da4f3.png",
    rarityLevel: 3,
    chaosMeter: 5,
    category: "Random"
  },
  {
    id: 4,
    name: "Rubik's Cube Box",
    description: "For puzzle enthusiasts! Contains Rubik's cubes and other brain-teasing puzzles to challenge your mind.",
    price: 39.99,
    image: "public/lovable-uploads/752a93d8-f686-4126-b28c-ca34e86035ad.png",
    rarityLevel: 2,
    chaosMeter: 2,
    category: "Puzzle"
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
