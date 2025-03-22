
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-mysterio-darker mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-mysterio-purple mysterio-transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-mysterio-purple mysterio-transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-mysterio-purple mysterio-transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-mysterio-purple mysterio-transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/shop/gamer" className="navbar-link">Gamer Box</Link></li>
              <li><Link to="/shop/kpop" className="navbar-link">K-Pop Box</Link></li>
              <li><Link to="/shop/anime" className="navbar-link">Anime Box</Link></li>
              <li><Link to="/shop/chaos" className="navbar-link">Chaos Box</Link></li>
              <li><Link to="/shop" className="navbar-link">All Boxes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="navbar-link">About Us</Link></li>
              <li><Link to="/faq" className="navbar-link">FAQ</Link></li>
              <li><Link to="/contact" className="navbar-link">Contact</Link></li>
              <li><Link to="/terms" className="navbar-link">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="navbar-link">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
            <p className="text-white/70 mb-4">Subscribe to receive updates on new mystery boxes and exclusive offers.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="mysterio-input rounded-r-none" />
              <button className="mysterio-btn rounded-l-none px-4 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </button>
            </div>
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
