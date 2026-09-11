import { useT } from '../../i18n/useLanguage';
import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ImageItem } from './ImageGallery';

interface LightboxProps {
  isOpen: boolean;
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const t = useT();
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector('button')?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const buttons = dialog?.querySelectorAll<HTMLButtonElement>('button');
      if (!buttons?.length) return;
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    dialog?.addEventListener('keydown', trapFocus);
    return () => { dialog?.removeEventListener('keydown', trapFocus); previous?.focus(); };
  }, [isOpen]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen) return null;

  const currentImg = images[currentIndex];

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={t('Immersion Experience Gallery')} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition"
        aria-label={t("Close lightbox")}
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 transition"
        aria-label={t("Previous image")}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
        <img
          src={currentImg.url}
          alt={t(currentImg.alt)}
          className="max-w-full max-h-[75vh] object-contain rounded-[4px]"
        />
        {currentImg.alt && (
          <p className="text-white text-sm md:text-base mt-4 text-center font-medium">
            {t(currentImg.alt)} {t(currentImg.caption && `— ${t(currentImg.caption)}`)}
          </p>
        )}
      </div>

      <button
        onClick={() => onNavigate((currentIndex + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 transition"
        aria-label={t("Next image")}
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
};
