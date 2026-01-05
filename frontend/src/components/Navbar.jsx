import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useThemeTranslation } from '../hooks/useThemeTranslation';
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";
import nutrivigile from "../assets/nutrivigile.jpeg";
import LanguagePicker from "./LanguagePicker";

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useThemeTranslation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItem = (path, label, isMobile = false) => {
    const isActive = pathname === path;

    return (
      <Link
        to={path}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
        className={`relative font-medium transition-all duration-300 ${isMobile
            ? "block w-full py-4 text-center text-xl"
            : "px-1 py-2 text-sm md:text-base group"
          } ${theme === "dark"
            ? isActive ? "text-blue-400" : "text-gray-300 hover:text-white"
            : isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
      >
        {label}
        {!isMobile && (
          <span className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            } ${theme === "dark" ? "bg-blue-400" : "bg-blue-600"}`} />
        )}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen
            ? theme === "dark"
              ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
              : "bg-white/80 backdrop-blur-xl border-b border-gray-200/50"
            : "bg-transparent border-transparent"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className={`absolute inset-0 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity ${theme === "dark" ? "bg-blue-500" : "bg-blue-400"
                  }`} />
                <img
                  className="w-10 h-10 relative z-10 rounded-xl object-cover"
                  src={nutrivigile}
                  alt="NutriVigil Logo"
                />
              </motion.div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                {t('appName')}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navItem("/", t("nav.home"))}
                {navItem("/profile", t("nav.profile"))}
              </div>

              <div className="w-px h-6 bg-gray-200 dark:bg-white/10 mx-2" />

              <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2.5 rounded-full transition-colors ${theme === "dark"
                      ? "bg-white/5 hover:bg-white/10 text-yellow-300"
                      : "bg-gray-100 hover:bg-gray-200 text-amber-500"
                    }`}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>

                <LanguagePicker />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors z-50 relative ${theme === "dark" ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-0 z-40 pt-24 px-6 md:hidden ${theme === "dark"
                ? "bg-black/95 backdrop-blur-2xl"
                : "bg-white/95 backdrop-blur-2xl"
              }`}
          >
            <div className="flex flex-col gap-6 items-center">
              <div className="w-full space-y-2">
                {navItem("/", t("nav.home"), true)}
                {navItem("/profile", t("nav.profile"), true)}
              </div>

              <div className={`w-full h-px ${theme === "dark" ? "bg-white/10" : "bg-gray-200"}`} />

              <div className="flex items-center gap-4 justify-center w-full py-4">
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl w-full justify-center transition-colors ${theme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-gray-100 text-gray-900"
                    }`}
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={20} className="text-yellow-300" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={20} className="text-blue-600" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </motion.button>
              </div>

              <div className="flex justify-center w-full">
                <LanguagePicker />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;