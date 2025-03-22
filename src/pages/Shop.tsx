import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";

// Mock products data (expanded from the FeaturedProducts data)
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
  },
  {
    id: 5,
    name: "Retro Gamer Box",
    description: "A nostalgic journey through gaming history with retro-themed collectibles and memorabilia.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    rarityLevel: 3,
    chaosMeter: 2,
    category: "Gamer"
  },
  {
    id: 6,
    name: "Anime Limited Edition Box",
    description: "Exclusive anime merchandise with limited edition items you won't find anywhere else.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    rarityLevel: 4,
    chaosMeter: 3,
    category: "Anime"
  },
  {
    id: 7,
    name: "K-Pop Lightstick Box",
    description: "Featuring merchandise and possibly a lightstick from one of your favorite K-Pop groups.",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
    rarityLevel: 4,
    chaosMeter: 3,
    category: "K-Pop"
  },
  {
    id: 8,
    name: "Ultimate Chaos Box",
    description: "Our most unpredictable box yet. High-value items from across all categories with maximum surprise factor.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    rarityLevel: 5,
    chaosMeter: 5,
    category: "Chaos"
  }
];

const categories = ["All", "Gamer", "K-Pop", "Anime", "Chaos"];

const Shop = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [rarityFilter, setRarityFilter] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    let filtered = [...mockProducts];
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply rarity filter
    if (rarityFilter > 0) {
      filtered = filtered.filter(product => product.rarityLevel >= rarityFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rarity":
        filtered.sort((a, b) => b.rarityLevel - a.rarityLevel);
        break;
      default:
        // Featured - keep original order
        break;
    }
    
    setProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, rarityFilter, sortBy]);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-10">
            <h1 className="text-center">Mystery Boxes</h1>
            <p className="text-center text-white/70 mt-3 max-w-3xl mx-auto">
              Browse our collection of carefully curated mystery boxes. Each one is filled with 
              surprises waiting to be discovered. What will destiny reveal for you?
            </p>
          </div>
          
          {/* Search and filter section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div className="w-full md:w-1/2 lg:w-1/3 relative">
                <input
                  type="text"
                  placeholder="Search mystery boxes..."
                  className="mysterio-input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mysterio-purple w-5 h-5" />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="glass-card p-2 rounded-md">
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-none text-white focus:ring-0 text-sm py-1"
                  >
                    <option value="featured" className="bg-mysterio-darker">Featured</option>
                    <option value="price-asc" className="bg-mysterio-darker">Price: Low to High</option>
                    <option value="price-desc" className="bg-mysterio-darker">Price: High to Low</option>
                    <option value="name-asc" className="bg-mysterio-darker">Name: A to Z</option>
                    <option value="name-desc" className="bg-mysterio-darker">Name: Z to A</option>
                    <option value="rarity" className="bg-mysterio-darker">Rarity</option>
                  </select>
                </div>
                
                <button 
                  className="glass-card p-3 rounded-md flex items-center"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                  {filtersOpen ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Expandable filters section */}
            {filtersOpen && (
              <div className="glass-card p-6 rounded-lg mt-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          className={`px-4 py-2 rounded-full text-sm ${
                            selectedCategory === category
                              ? 'bg-mysterio-purple text-white'
                              : 'bg-white/5 hover:bg-white/10 text-white/80'
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>${priceRange.min}</span>
                        <span>${priceRange.max}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Minimum Rarity</h3>
                    <div className="flex items-center space-x-2">
                      {[0, 1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          className={`w-8 h-8 rounded-full ${
                            rarityFilter === rating 
                              ? 'bg-mysterio-purple text-white' 
                              : 'bg-white/5 text-white/80'
                          }`}
                          onClick={() => setRarityFilter(rating)}
                        >
                          {rating === 0 ? 'All' : rating}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Products grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={`transition-all duration-500 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl mb-3">No Mystery Boxes Found</h3>
              <p className="text-white/70">
                Try adjusting your filters or search terms to find the perfect mystery box.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
