import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Currency, Product, Conversation } from '../types';

interface AppContextType {
  language: Language;
  currency: Currency;
  theme: 'light' | 'dark';
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  products: Product[];
  conversations: Conversation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Fresh Organic Apples',
    description: 'Crisp and sweet organic apples from local farm. Perfect for healthy snacking or baking.',
    price: 3.99,
    currency: 'USD',
    category: 'Fruits',
    location: 'Bangkok, Thailand',
    imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600',
    sellerId: '1',
    sellerName: 'Farm Fresh Co.',
    sellerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-15T10:00:00Z',
    isFeatured: true
  },
  {
    id: '2',
    title: 'Homemade Bread Loaf',
    description: 'Freshly baked artisan bread made with organic flour. Soft inside, crispy outside.',
    price: 5.50,
    currency: 'USD',
    category: 'Bakery',
    location: 'Chiang Mai, Thailand',
    imageUrl: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
    sellerId: '2',
    sellerName: 'Artisan Baker',
    sellerAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Thai Jasmine Rice',
    description: 'Premium quality Thai jasmine rice. Aromatic and perfect for Asian dishes.',
    price: 12.99,
    currency: 'USD',
    category: 'Grains',
    location: 'Surin, Thailand',
    imageUrl: 'https://images.pexels.com/photos/33406/pexels-photo-33406.jpg?auto=compress&cs=tinysrgb&w=600',
    sellerId: '3',
    sellerName: 'Rice Farmer',
    sellerAvatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-13T08:00:00Z',
    isFeatured: true
  },
  {
    id: '4',
    title: 'Fresh Vegetables Bundle',
    description: 'Mixed seasonal vegetables including carrots, broccoli, and bell peppers.',
    price: 8.75,
    currency: 'USD',
    category: 'Vegetables',
    location: 'Phuket, Thailand',
    imageUrl: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=600',
    sellerId: '4',
    sellerName: 'Green Garden',
    createdAt: '2024-01-12T12:00:00Z'
  },
  {
    id: '5',
    title: 'Artisan Coffee Beans',
    description: 'Single-origin coffee beans from the mountains of Northern Thailand.',
    price: 18.99,
    currency: 'USD',
    category: 'Beverages',
    location: 'Doi Chang, Thailand',
    imageUrl: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600',
    sellerId: '5',
    sellerName: 'Mountain Coffee',
    createdAt: '2024-01-11T09:30:00Z'
  },
  {
    id: '6',
    title: 'Honey from Local Beehives',
    description: 'Pure, raw honey harvested from local beehives. Rich in flavor and nutrients.',
    price: 15.00,
    currency: 'USD',
    category: 'Pantry',
    location: 'Lampang, Thailand',
    imageUrl: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=600',
    sellerId: '6',
    sellerName: 'Bee Keeper',
    createdAt: '2024-01-10T14:00:00Z'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to English language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en'; // Default to English
  });
  
  // Force dark theme permanently
  const [theme] = useState<'light' | 'dark'>('dark');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const currency: Currency = language === 'en' ? 'USD' : 'THB';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setTheme = () => {
    // Theme is permanently dark, so this function does nothing
  };

  useEffect(() => {
    // Force dark mode on document
    document.documentElement.classList.add('dark');
  }, []);

  const value = {
    language,
    currency,
    theme,
    setLanguage,
    setTheme,
    products: mockProducts,
    conversations: [] as Conversation[],
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};