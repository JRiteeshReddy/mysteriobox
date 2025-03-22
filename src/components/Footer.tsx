
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-mysterio-darker mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold font-playfair tracking-wider text-white">
                <span className="text-mysterio-purple">Mysterio</span>Box
              </span>
            </Link>
            <p className="text-white/70 mb-6">
              Unbox the unknown. Embrace the mystery.
              Every box is an adventure waiting to be discovered.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop?category=Tech" className="navbar-link">Tech Box</Link></li>
              <li><Link to="/shop?category=Pokemon" className="navbar-link">Pokemon Box</Link></li>
              <li><Link to="/shop?category=Random" className="navbar-link">Random Box</Link></li>
              <li><Link to="/shop?category=Puzzle" className="navbar-link">Rubik's Cube Box</Link></li>
              <li><Link to="/shop?category=Pet" className="navbar-link">Pet Box</Link></li>
              <li><Link to="/shop?category=Anime" className="navbar-link">Anime Box</Link></li>
              <li><Link to="/shop?category=Food" className="navbar-link">Food Box</Link></li>
              <li><Link to="/shop?category=Sticker" className="navbar-link">Sticker Box</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="navbar-link">About Us</Link></li>
              <li><Link to="/faq" className="navbar-link">FAQ</Link></li>
              <li><Link to="/terms" className="navbar-link">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="navbar-link">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50">
          <p>&copy; {new Date().getFullYear()} MysterioBox. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
