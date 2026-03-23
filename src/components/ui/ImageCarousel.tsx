import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { type KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { theme } from '../../styles/theme';

type CarouselImage = {
  src: string;
  alt: string;
};

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
  /** Hauteur fixe en px (ex: 320) ou valeur CSS (ex: "100%"). Défaut : 250 */
  height?: number | string;
}

// ─── Carousel styles ──────────────────────────────────────────────────────────

const CarouselRoot = styled.div<{ height: number | string }>`
  width: 100%;
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  position: relative;
  margin: 0 0 ${theme.spacing.lg} 0;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  user-select: none;
  background: ${theme.colors.cardBackground};
  cursor: zoom-in;
`;

const Slides = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SlideBlurBg = styled(motion.img)`
  position: absolute;
  inset: -10%;
  width: 120%;
  height: 120%;
  object-fit: cover;
  object-position: center;
  filter: blur(18px) brightness(0.45) saturate(1.2);
  pointer-events: none;
`;

const Slide = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  pointer-events: none;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    ${theme.colors.accent}18 0%,
    transparent 50%,
    ${theme.colors.accentSecondary}18 100%
  );
  opacity: 0;
  transition: opacity ${theme.transitions.default};
  pointer-events: none;

  ${CarouselRoot}:hover & {
    opacity: 1;
  }
`;

const NavButton = styled.button<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${({ side }) => (side === 'left' ? 'left' : 'right')}: ${theme.spacing.md};
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  color: ${theme.colors.light};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  opacity: 0;
  transition: opacity ${theme.transitions.default}, transform ${theme.transitions.default};

  ${CarouselRoot}:hover & {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-50%) scale(1.05);
    background: ${theme.colors.glass.hover};
  }

  &:focus-visible {
    opacity: 1;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    opacity: 1;
    width: 36px;
    height: 36px;
  }
`;

const Dots = styled.div`
  position: absolute;
  left: 50%;
  bottom: ${theme.spacing.md};
  transform: translateX(-50%);
  display: flex;
  gap: ${theme.spacing.xs};
  z-index: 2;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.full};
  backdrop-filter: blur(10px);
`;

const Dot = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${theme.colors.glass.border};
  background: ${({ active }) => (active ? theme.colors.accent : theme.colors.glass.card)};
  opacity: ${({ active }) => (active ? 1 : 0.8)};

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

// ─── Lightbox styles ──────────────────────────────────────────────────────────

const LightboxBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg};
  cursor: zoom-out;
`;

const LightboxInner = styled(motion.div)`
  position: relative;
  max-width: 92vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

const LightboxImage = styled(motion.img)`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.7);
`;

const CloseButton = styled(motion.button)`
  position: fixed;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 10000;
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  color: ${theme.colors.light};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: background ${theme.transitions.default}, transform ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.glass.hover};
    transform: scale(1.1) rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
`;

const LightboxNavButton = styled.button<{ side: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  ${({ side }) => (side === 'left' ? 'left' : 'right')}: ${theme.spacing.lg};
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  color: ${theme.colors.light};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  backdrop-filter: blur(10px);
  z-index: 10000;
  cursor: pointer;
  transition: background ${theme.transitions.default}, transform ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.glass.hover};
    transform: translateY(-50%) scale(1.08);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
    ${({ side }) => (side === 'left' ? 'left' : 'right')}: ${theme.spacing.sm};
  }
`;

const LightboxCounter = styled.div`
  position: fixed;
  bottom: ${theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.full};
  backdrop-filter: blur(10px);
  font-size: 0.8125rem;
  color: ${theme.colors.textMuted};
  font-weight: 500;
  letter-spacing: 0.05em;
`;

// ─── Lightbox component ───────────────────────────────────────────────────────

interface LightboxProps {
  images: CarouselImage[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox = ({ images, startIndex, onClose }: LightboxProps) => {
  const [index, setIndex] = useState(startIndex);

  const goTo = useCallback(
    (next: number) => {
      const len = images.length;
      setIndex(((next % len) + len) % len);
    },
    [images.length],
  );

  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    },
    [index, goTo, onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const active = images[index]!;
  const hasMultiple = images.length > 1;

  return createPortal(
    <LightboxBackdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <LightboxInner
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <LightboxImage
            key={active.src}
            src={active.src}
            alt={active.alt}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            draggable={false}
          />
        </AnimatePresence>
      </LightboxInner>

      {/* Bouton fermer */}
      <CloseButton
        onClick={onClose}
        aria-label="Fermer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        ✕
      </CloseButton>

      {/* Navigation si plusieurs images */}
      {hasMultiple && (
        <>
          <LightboxNavButton
            type="button"
            side="left"
            onClick={(e) => { e.stopPropagation(); goTo(index - 1); }}
            aria-label="Image précédente"
          >
            ‹
          </LightboxNavButton>
          <LightboxNavButton
            type="button"
            side="right"
            onClick={(e) => { e.stopPropagation(); goTo(index + 1); }}
            aria-label="Image suivante"
          >
            ›
          </LightboxNavButton>
          <LightboxCounter onClick={(e) => e.stopPropagation()}>
            {index + 1} / {images.length}
          </LightboxCounter>
        </>
      )}
    </LightboxBackdrop>,
    document.body,
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

export const ImageCarousel = ({ images, className, height = 250 }: ImageCarouselProps) => {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (safeImages.length === 0) return;
      const next = ((index % safeImages.length) + safeImages.length) % safeImages.length;
      setActiveIndex(next);
    },
    [safeImages.length],
  );

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const openLightbox = useCallback(() => setLightboxOpen(true), []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); }
    },
    [next, prev, openLightbox],
  );

  if (safeImages.length === 0) return null;

  const active = safeImages[activeIndex];

  return (
    <>
      <CarouselRoot
        className={className}
        height={height}
        role="region"
        aria-label="Carrousel d'images du projet"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onClick={openLightbox}
      >
        <Slides>
          <AnimatePresence mode="wait">
            <SlideBlurBg
              key={`bg-${active.src}`}
              src={active.src}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <Slide
              key={active.src}
              src={active.src}
              alt={active.alt}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              loading="lazy"
              draggable={false}
            />
          </AnimatePresence>
          <Overlay />
        </Slides>

        {safeImages.length > 1 && (
          <>
            <NavButton
              type="button"
              side="left"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Image précédente"
            >
              ‹
            </NavButton>
            <NavButton
              type="button"
              side="right"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Image suivante"
            >
              ›
            </NavButton>

            <Dots role="tablist" aria-label="Navigation du carrousel">
              {safeImages.map((img, idx) => (
                <Dot
                  key={img.src}
                  type="button"
                  active={idx === activeIndex}
                  onClick={(e) => { e.stopPropagation(); goTo(idx); }}
                  aria-label={`Aller à l'image ${idx + 1}`}
                  aria-current={idx === activeIndex ? 'true' : undefined}
                />
              ))}
            </Dots>
          </>
        )}
      </CarouselRoot>

      {/* Lightbox portal — rendu hors du DOM du carousel */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={safeImages}
            startIndex={activeIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
};