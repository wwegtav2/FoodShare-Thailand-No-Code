import React from 'react';
import { Search, Filter } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { t } from '../../utils/translations';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  showFilters?: boolean;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  showFilters = true,
  className = ''
}) => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, language } = useApp();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const categories = [
    { value: '', label: t('allCategories', language) },
    { value: 'fruits', label: t('fruits', language) },
    { value: 'vegetables', label: t('vegetables', language) },
    { value: 'bakery', label: t('bakery', language) },
    { value: 'grains', label: t('grains', language) },
    { value: 'beverages', label: t('beverages', language) },
    { value: 'pantry', label: t('pantry', language) }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t('searchPlaceholder', language)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base text-white placeholder-gray-400 bg-gray-800"
          />
        </div>

        {/* Category Filter */}
        {showFilters && (
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base bg-gray-800 text-white"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;