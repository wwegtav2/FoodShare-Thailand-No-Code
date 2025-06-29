import React, { useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  placeholderType?: 'product' | 'avatar' | 'general';
  placeholderSize?: 'sm' | 'md' | 'lg' | 'xl';
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  placeholderType = 'general',
  placeholderSize = 'md'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!src || hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
        <div className="text-center">
          <ImagePlaceholder
            type={placeholderType}
            size={placeholderSize}
          />
          {placeholderType === 'product' && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              No image available
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`${className} flex items-center justify-center bg-gray-100 dark:bg-gray-700`}>
          <ImagePlaceholder
            type={placeholderType}
            size={placeholderSize}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </>
  );
};

export default SafeImage;