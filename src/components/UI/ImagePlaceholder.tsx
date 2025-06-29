import React from 'react';
import { ImageIcon, User, Package } from 'lucide-react';

interface ImagePlaceholderProps {
  type?: 'product' | 'avatar' | 'general';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  type = 'general',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const getIcon = () => {
    switch (type) {
      case 'avatar':
        return <User className={`${iconSizes[size]} text-emerald-600 dark:text-emerald-400`} />;
      case 'product':
        return <Package className={`${iconSizes[size]} text-emerald-600 dark:text-emerald-400`} />;
      default:
        return <ImageIcon className={`${iconSizes[size]} text-emerald-600 dark:text-emerald-400`} />;
    }
  };

  return (
    <div className={`${sizeClasses[size]} bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center ${className}`}>
      {getIcon()}
    </div>
  );
};

export default ImagePlaceholder;