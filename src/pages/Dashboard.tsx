import React, { useState } from 'react';
import { Package, MessageSquare, Settings, Plus, TrendingUp, Users, ShoppingBag, DollarSign, Heart, Eye, Star, BarChart3, ShoppingCart, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { t, formatPrice } from '../utils/translations';
import Button from '../components/UI/Button';
import SafeImage from '../components/UI/SafeImage';
import ImagePlaceholder from '../components/UI/ImagePlaceholder';
import AnalyticsChart from '../components/Dashboard/AnalyticsChart';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'messages' | 'settings' | 'favorites' | 'orders'>('overview');

  const isSeller = user?.userType === 'seller';

  // Mock dashboard data for sellers
  const sellerStats = {
    itemsPosted: 12,
    itemsSold: 8,
    totalIncome: language === 'en' ? 245.50 : 8592.50,
    messagesSent: 28,
    foodSaved: 45,
    totalViews: 1247,
    activeListings: 4
  };

  // Mock dashboard data for buyers
  const buyerStats = {
    itemsPurchased: 15,
    totalSpent: language === 'en' ? 189.75 : 6641.25,
    favoriteItems: 23,
    messagesSent: 18,
    ordersCompleted: 12,
    pendingOrders: 3
  };

  const getSellerStats = () => [
    {
      label: t('itemsPosted', language),
      value: sellerStats.itemsPosted.toString(),
      icon: Package,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/20'
    },
    {
      label: t('itemsSold', language),
      value: sellerStats.itemsSold.toString(),
      icon: ShoppingBag,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: t('totalIncome', language),
      value: formatPrice(sellerStats.totalIncome, language),
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: t('totalViews', language),
      value: sellerStats.totalViews.toString(),
      icon: Eye,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ];

  const getBuyerStats = () => [
    {
      label: t('itemsPurchased', language),
      value: buyerStats.itemsPurchased.toString(),
      icon: ShoppingCart,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/20'
    },
    {
      label: t('totalSpent', language),
      value: formatPrice(buyerStats.totalSpent, language),
      icon: DollarSign,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: t('favoriteItems', language),
      value: buyerStats.favoriteItems.toString(),
      icon: Heart,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      label: t('ordersCompleted', language),
      value: buyerStats.ordersCompleted.toString(),
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-100 dark:bg-green-900/20'
    }
  ];

  const getSellerTabs = () => [
    { id: 'overview', label: t('overview', language), icon: TrendingUp },
    { id: 'listings', label: t('myListings', language), icon: Package },
    { id: 'messages', label: t('messages', language), icon: MessageSquare },
    { id: 'settings', label: t('settings', language), icon: Settings }
  ];

  const getBuyerTabs = () => [
    { id: 'overview', label: t('overview', language), icon: TrendingUp },
    { id: 'orders', label: t('myOrders', language), icon: ShoppingCart },
    { id: 'favorites', label: t('favorites', language), icon: Heart },
    { id: 'messages', label: t('messages', language), icon: MessageSquare },
    { id: 'settings', label: t('settings', language), icon: Settings }
  ];

  const stats = isSeller ? getSellerStats() : getBuyerStats();
  const tabs = isSeller ? getSellerTabs() : getBuyerTabs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            {user?.avatar ? (
              <SafeImage
                src={user.avatar}
                alt={user.username}
                className="w-16 h-16 rounded-full object-cover"
                placeholderType="avatar"
                placeholderSize="lg"
              />
            ) : (
              <ImagePlaceholder type="avatar" size="lg" className="rounded-full" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('welcomeBack', language)}, {user?.username}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {isSeller ? t('sellerDashboardSubtitle', language) : t('buyerDashboardSubtitle', language)}
              </p>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isSeller 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                }`}>
                  {isSeller ? t('seller', language) : t('buyer', language)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Charts - Only for Sellers */}
        {isSeller && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <AnalyticsChart 
              type="listings" 
              title={t('listingsOverTime', language)} 
            />
            <AnalyticsChart 
              type="sales" 
              title={t('salesGrowth', language)} 
            />
            <AnalyticsChart 
              type="foodWaste" 
              title={t('foodWasteReduced', language)} 
            />
          </div>
        )}

        {/* Quick Actions for Buyers */}
        {!isSeller && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{t('discoverFreshFood', language)}</h3>
                <p className="text-blue-100">{t('exploreLocalMarket', language)}</p>
              </div>
              <Button
                variant="outline"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={() => window.location.href = '/market'}
              >
                {t('browseMarket', language)}
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-8 border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  {isSeller ? (
                    <>
                      <Package className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {t('readyToSell', language)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {t('readyToSellMessage', language)}
                      </p>
                      <Button icon={Plus}>
                        {t('createFirstListing', language)}
                      </Button>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {t('startShopping', language)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {t('startShoppingMessage', language)}
                      </p>
                      <Button 
                        onClick={() => window.location.href = '/market'}
                      >
                        {t('exploreMarket', language)}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'listings' && isSeller && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('noListingsYet', language)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('noListingsMessage', language)}
                </p>
                <Button icon={Plus}>
                  {t('createNewListing', language)}
                </Button>
              </div>
            )}

            {activeTab === 'orders' && !isSeller && (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('noOrdersYet', language)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('noOrdersMessage', language)}
                </p>
                <Button 
                  onClick={() => window.location.href = '/market'}
                >
                  {t('startShopping', language)}
                </Button>
              </div>
            )}

            {activeTab === 'favorites' && !isSeller && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('noFavoritesYet', language)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('noFavoritesMessage', language)}
                </p>
                <Button 
                  onClick={() => window.location.href = '/market'}
                >
                  {t('findFavorites', language)}
                </Button>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('noMessagesYet', language)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {isSeller ? t('noMessagesSellerMessage', language) : t('noMessagesBuyerMessage', language)}
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('profile', language)}
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('profileSettings', language)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;