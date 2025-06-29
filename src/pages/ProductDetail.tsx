import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, MessageSquare, Star, Heart, Share2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../utils/translations';
import Button from '../components/UI/Button';
import SafeImage from '../components/UI/SafeImage';
import ImagePlaceholder from '../components/UI/ImagePlaceholder';
import ChatWindow from '../components/Chat/ChatWindow';
import { Conversation } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, currency, language } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('productNotFound', language)}</h2>
          <Button onClick={() => navigate('/market')}>
            {t('backToMarket', language)}
          </Button>
        </div>
      </div>
    );
  }

  const displayPrice = currency === 'THB' ? product.price * 35 : product.price;
  const currencySymbol = currency === 'THB' ? '฿' : '$';

  const handleChatNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowChat(true);
  };

  // Mock conversation for chat
  const mockConversation: Conversation = {
    id: `chat-${product.id}`,
    productId: product.id,
    productTitle: product.title,
    buyerId: user?.id || 'temp-buyer',
    sellerId: product.sellerId,
    createdAt: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate('/market')}
          className="mb-6"
        >
          {t('backToMarket', language)}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              {product.imageUrl ? (
                <SafeImage
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  placeholderType="product"
                  placeholderSize="xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImagePlaceholder type="product" size="xl" />
                </div>
              )}
            </div>
            
            {/* Additional Images Placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden opacity-60">
                  {product.imageUrl ? (
                    <SafeImage
                      src={product.imageUrl}
                      alt={`${product.title} ${i}`}
                      className="w-full h-full object-cover"
                      placeholderType="product"
                      placeholderSize="md"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImagePlaceholder type="product" size="md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="text-4xl font-bold text-emerald-600 mb-4">
                {currencySymbol}{displayPrice.toFixed(2)}
              </div>
              {product.isFeatured && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {t('featured', language)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.8 {t('stars', language)}, 24 {t('reviews', language)})</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('description', language)}</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{product.location}</span>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('seller', language)}
              </h3>
              <div className="flex items-center space-x-4">
                {product.sellerAvatar ? (
                  <SafeImage
                    src={product.sellerAvatar}
                    alt={product.sellerName}
                    className="w-12 h-12 rounded-full object-cover"
                    placeholderType="avatar"
                    placeholderSize="md"
                  />
                ) : (
                  <ImagePlaceholder type="avatar" size="md" className="rounded-full" />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{product.sellerName}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9 (127 {t('reviews', language)})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleChatNow}
                icon={MessageSquare}
                className="w-full"
                size="lg"
              >
                {t('chatNow', language)}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
              >
                {t('buyNow', language)}
              </Button>
            </div>

            {/* Safety Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">{t('safetyFirst', language)}</h4>
              <p className="text-sm text-blue-700">
                {t('safetyMessage', language)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {showChat && user && (
        <ChatWindow
          conversation={mockConversation}
          onClose={() => setShowChat(false)}
          isOpen={showChat}
        />
      )}
    </div>
  );
};

export default ProductDetail;