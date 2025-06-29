import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Globe, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';
import SafeImage from '../UI/SafeImage';
import ImagePlaceholder from '../UI/ImagePlaceholder';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              FoodShare Thailand
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-emerald-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('home', language)}
            </Link>
            <Link
              to="/market"
              className={`font-medium transition-colors ${
                isActive('/market') 
                  ? 'text-emerald-400' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t('market', language)}
            </Link>
            {user && (
              <>
                <Link
                  to="/messages"
                  className={`font-medium transition-colors ${
                    isActive('/messages') 
                      ? 'text-emerald-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t('messages', language)}
                </Link>
                <Link
                  to="/dashboard"
                  className={`font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-emerald-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {t('dashboard', language)}
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors hover:bg-gray-800"
              aria-label={`Switch to ${language === 'en' ? 'Thai' : 'English'}`}
            >
              <Globe className="w-4 h-4 text-gray-300" />
              <span className="text-sm font-medium text-gray-300">
                {language.toUpperCase()}
              </span>
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:bg-gray-800"
                >
                  {user.avatar ? (
                    <SafeImage
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full object-cover"
                      placeholderType="avatar"
                      placeholderSize="sm"
                    />
                  ) : (
                    <ImagePlaceholder type="avatar" size="sm" className="rounded-full" />
                  )}
                  <span className="font-medium text-white">
                    {user.username}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg transition-colors text-gray-300 hover:text-red-400 hover:bg-red-900/20"
                  aria-label={t('logout', language)}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 font-medium transition-colors text-gray-300 hover:text-white"
                >
                  {t('login', language)}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors shadow-lg"
                >
                  {t('register', language)}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 bg-gray-900/95 backdrop-blur-md">
            <nav className="space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-emerald-400' 
                    : 'text-gray-300'
                }`}
              >
                {t('home', language)}
              </Link>
              <Link
                to="/market"
                onClick={() => setIsMenuOpen(false)}
                className={`block font-medium transition-colors ${
                  isActive('/market') 
                    ? 'text-emerald-400' 
                    : 'text-gray-300'
                }`}
              >
                {t('market', language)}
              </Link>
              {user && (
                <>
                  <Link
                    to="/messages"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-medium transition-colors ${
                      isActive('/messages') 
                        ? 'text-emerald-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    {t('messages', language)}
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-medium transition-colors ${
                      isActive('/dashboard') 
                        ? 'text-emerald-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    {t('dashboard', language)}
                  </Link>
                </>
              )}
              
              <div className="pt-4 border-t border-gray-700">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 py-2 text-gray-300"
                  aria-label={`Switch to ${language === 'en' ? 'Thai' : 'English'}`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{language === 'en' ? 'ไทย' : 'ENG'}</span>
                </button>
                
                {user ? (
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center space-x-2">
                      {user.avatar ? (
                        <SafeImage
                          src={user.avatar}
                          alt={user.username}
                          className="w-8 h-8 rounded-full object-cover"
                          placeholderType="avatar"
                          placeholderSize="sm"
                        />
                      ) : (
                        <ImagePlaceholder type="avatar" size="sm" className="rounded-full" />
                      )}
                      <span className="font-medium text-white">
                        {user.username}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 py-2 text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">{t('logout', language)}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 mt-4">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 font-medium text-gray-300"
                    >
                      {t('login', language)}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-4 bg-emerald-600 text-white rounded-lg font-medium text-center"
                    >
                      {t('register', language)}
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;