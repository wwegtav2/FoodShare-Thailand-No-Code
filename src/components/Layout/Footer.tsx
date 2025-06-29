import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

const Footer: React.FC = () => {
  const { language } = useApp();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">FoodShare Thailand</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('connectingCommunities', language)}
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>{t('builtWith', language)}</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>{t('onBolt', language)}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('quickLinks', language)}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">{t('home', language)}</a></li>
              <li><a href="/market" className="hover:text-white transition-colors">{t('market', language)}</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">{t('about', language)}</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">{t('contact', language)}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('support', language)}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/help" className="hover:text-white transition-colors">{t('helpCenter', language)}</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">{t('faq', language)}</a></li>
              <li><a href="/privacy" className="hover:text-white transition-colors">{t('privacyPolicy', language)}</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">{t('termsOfService', language)}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FoodShare Thailand. {t('allRightsReserved', language)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;