import { useT } from '../../i18n/useLanguage';
import React, { useState } from 'react';
import { Lightbox } from './Lightbox';

export interface ImageItem {
  url: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  columns?: 2 | 3 | 4;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, columns = 3 }) => {
  const t = useT();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div>
      <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="group relative overflow-hidden rounded-[8px] cursor-pointer aspect-4/3 bg-gray-100 border border-[rgba(0,0,0,0.08)] shadow-xs"
          >
            <img
              src={img.url}
              alt={t(img.alt)}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <p className="text-white text-xs md:text-sm font-medium">{t(img.alt)}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          isOpen={selectedIndex !== null}
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={(newIndex) => setSelectedIndex(newIndex)}
        />
      )}
    </div>
  );
};
