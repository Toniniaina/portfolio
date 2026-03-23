import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { type KeyboardEvent, useCallback, useMemo, useState } from 'react';
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

const CarouselRoot = styled.div<{ height: number | string }>`
  width: 100%;
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  position: relative;
  margin: 0 0 ${theme.spacing.lg} 0;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  user-select: none;
  background: ${theme.colors.cardBackground};
`;

const Slides = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

/**
 * Arrière-plan flouté : même image étirée + flou fort.
 * Remplace les bandes noires par une ambiance colorée liée au screenshot.
 */
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

/**
 * Image principale : affichée en entier, sans recadrage.
 */
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

export const ImageCarousel = ({ images, className, height = 250 }: ImageCarouselProps) => {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    },
    [next, prev],
  );

  if (safeImages.length === 0) return null;

  const active = safeImages[activeIndex];

  return (
    <CarouselRoot
      className={className}
      height={height}
      role="region"
      aria-label="Carrousel d'images du projet"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <Slides>
        <AnimatePresence mode="wait">
          {/* Fond flouté — suit l'image active, donne de l'ambiance sans bandes noires */}
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

          {/* Image principale — visible en entier, sans crop */}
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
          <NavButton type="button" side="left" onClick={prev} aria-label="Image précédente">
            ‹
          </NavButton>
          <NavButton type="button" side="right" onClick={next} aria-label="Image suivante">
            ›
          </NavButton>

          <Dots role="tablist" aria-label="Navigation du carrousel">
            {safeImages.map((img, idx) => (
              <Dot
                key={img.src}
                type="button"
                active={idx === activeIndex}
                onClick={() => goTo(idx)}
                aria-label={`Aller à l'image ${idx + 1}`}
                aria-current={idx === activeIndex ? 'true' : undefined}
              />
            ))}
          </Dots>
        </>
      )}
    </CarouselRoot>
  );
};