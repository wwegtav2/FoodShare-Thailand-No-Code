import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlidersHorizontal, Grid, List } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { t } from '../utils/translations';
import SearchBar from '../components/Search/SearchBar';
import ProductCard from '../components/Product/ProductCard';
import Button from '../components/UI/Button';

const Market: React.FC = () => {
  const { products, searchQuery, selectedCategory, language } = useApp();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'featured'>('newest');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'featured':
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('market', language)}
          </h1>
          <p className="text-gray-300">
            {t('discoverBest', language)}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Filters and Controls */}
        <div className="bg-gray-800 rounded-lg shadow-sm p-4 mb-8 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-white bg-gray-700"
              >
                <option value="newest">{t('newest', language)}</option>
                <option value="featured">{t('featured', language)}</option>
                <option value="price-low">{t('priceAsc', language)}</option>
                <option value="price-high">{t('priceDesc', language)}</option>
              </select>
              
              <div className="text-sm text-gray-300">
                {filteredProducts.length} {t('productsFound', language)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <SlidersHorizontal className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t('noProductsFound', language)}
            </h3>
            <p className="text-gray-300 mb-6">
              {t('noProductsMessage', language)}
            </p>
            <Button
              variant="outline"
              className="border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white"
              onClick={() => {
                window.location.reload();
              }}
            >
              {t('clearFilters', language)}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Market;