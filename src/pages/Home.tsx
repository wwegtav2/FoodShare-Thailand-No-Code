import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, Users, Shield, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import ProductCard from '../components/Product/ProductCard';
import Button from '../components/UI/Button';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { products, language } = useApp();
  const navigate = useNavigate();
  
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);

  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`);
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/market');
    } else {
      navigate('/register');
    }
  };

  const handleExploreMarket = () => {
    navigate('/market');
  };

  const features = [
    {
      icon: Leaf,
      title: t('freshLocal', language),
      description: t('freshLocalDesc', language)
    },
    {
      icon: Users,
      title: t('communityDriven', language),
      description: t('communityDrivenDesc', language)
    },
    {
      icon: Shield,
      title: t('safeSecure', language),
      description: t('safeSecureDesc', language)
    },
    {
      icon: Truck,
      title: t('fastDelivery', language),
      description: t('fastDeliveryDesc', language)
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Full-Screen Background */}
      <section className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url(https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=1920)'
      }}>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {t('heroTitle', language)}
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {t('heroSubtitle', language)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <Button 
                  size="lg" 
                  icon={ArrowRight} 
                  iconPosition="right" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg border-0 font-semibold"
                  onClick={handleGetStarted}
                >
                  {t('getStarted', language)}
                </Button>
              )}
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 shadow-lg"
                onClick={handleExploreMarket}
              >
                {t('exploreMarket', language)}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('whyChoose', language)}
            </h2>
            <p className="text-xl text-gray-300">
              {t('whyChooseSubtitle', language)}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-gray-800 transition-colors group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('featured', language)} {t('products', language)}
            </h2>
            <p className="text-xl text-gray-300">
              {t('discoverBest', language)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-gray-700/50 backdrop-blur-sm rounded-xl shadow-lg">
                <ProductCard
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white"
              onClick={handleExploreMarket}
            >
              {t('viewAll', language)}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('readyToJoin', language)}
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            {t('readyToJoinMessage', language)}
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg border-0 font-semibold transition-all duration-200"
          >
            {t('getStarted', language)}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;