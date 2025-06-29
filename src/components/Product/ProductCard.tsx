import React from 'react';
import { MapPin, Star, Heart } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../contexts/AppContext';
import { t, formatPrice } from '../../utils/translations';
import Button from '../UI/Button';
import SafeImage from '../UI/SafeImage';
import ImagePlaceholder from '../UI/ImagePlaceholder';

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false
}) => {
  const { language } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="w-full h-48 overflow-hidden">
          {product.imageUrl ? (
            <SafeImage
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              placeholderType="product"
              placeholderSize="xl"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <ImagePlaceholder type="product" size="xl" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('noImageAvailable', language)}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {t('featured', language)}
          </div>
        )}
        
        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(product.id)}
            className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-300'
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {product.title}
          </h3>
          <div className="text-right">
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatPrice(product.price, language)}
            </p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{product.location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {product.sellerAvatar ? (
              <SafeImage
                src={product.sellerAvatar}
                alt={product.sellerName}
                className="w-6 h-6 rounded-full object-cover"
                placeholderType="avatar"
                placeholderSize="sm"
              />
            ) : (
              <ImagePlaceholder type="avatar" size="sm" className="rounded-full" />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              {product.sellerName}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">4.8</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            onClick={() => onViewDetails(product.id)}
            className="w-full"
          >
            {t('viewDetails', language)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;