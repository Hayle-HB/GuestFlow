import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../feature/theme/themeSlice.js";
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  Bell,
  Gift,
  Hotel,
  Star,
  MessageSquare,
  Map,
  LogOut,
} from "lucide-react";

const NavBar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Hotel className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-serif font-light text-gray-800 dark:text-white">
                Kuriftu Twin
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/user/give-feedback"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Give Feedback</span>
            </Link>
            <Link
              to="/user/get-bonus"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <Gift className="h-5 w-5" />
              <span>Get Bonus</span>
            </Link>
            <Link
              to="/user/meet-guide"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <Map className="h-5 w-5" />
              <span>Meet Guide</span>
            </Link>
            <Link
              to="/user/loyalty"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <Star className="h-5 w-5" />
              <span>Loyalty</span>
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link
              to="/user/give-feedback"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Give Feedback</span>
            </Link>
            <Link
              to="/user/get-bonus"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Gift className="h-5 w-5" />
              <span>Get Bonus</span>
            </Link>
            <Link
              to="/user/meet-guide"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Map className="h-5 w-5" />
              <span>Meet Guide</span>
            </Link>
            <Link
              to="/user/loyalty"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Star className="h-5 w-5" />
              <span>Loyalty</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
