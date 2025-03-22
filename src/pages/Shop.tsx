import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";

// Mock products data (expanded from the FeaturedProducts data)
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
  },
  {
    id: 5,
    name: "Pet Mystery Box",
    description: "Treat your furry friends with premium toys, accessories, and treats they'll absolutely love.",
    price: 44.99,
    image: "public/lovable-uploads/065a5fdc-0dfc-47c7-8468-b0c650fcfb62.png",
    rarityLevel: 3,
    chaosMeter: 2,
    category: "Pet"
  },
  {
    id: 6,
    name: "Anime Mystery Box",
    description: "A treasure trove of anime collectibles featuring popular series like Dragon Ball, Naruto, and more.",
    price: 64.99,
    image: "public/lovable-uploads/8fa12bad-02ed-42ec-afbb-656c34f8f701.png",
    rarityLevel: 4,
    chaosMeter: 3,
    category: "Anime"
  },
  {
    id: 7,
    name: "Food Mystery Box",
    description: "A delicious assortment of snacks and treats from around the world. Perfect for food adventurers!",
    price: 49.99,
    image: "public/lovable-uploads/535087f2-d656-43c4-9527-fb474a09f7ed.png",
    rarityLevel: 3,
    chaosMeter: 3,
    category: "Food"
  },
  {
    id: 8,
    name: "Sticker Mystery Box",
    description: "Hundreds of unique, colorful stickers from pop culture, anime, gaming, and more to decorate your world.",
    price: 29.99,
    image: "public/lovable-uploads/4b6ac6c9-4fb8-4ab3-b8b4-dcd2d246d8eb.png",
    rarityLevel: 2,
    chaosMeter: 3,
    category: "Sticker"
  }
];

// Update categories array
const categories = ["All", "Tech", "Pokemon", "Random", "Puzzle", "Pet", "Anime", "Food", "Sticker"];

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
