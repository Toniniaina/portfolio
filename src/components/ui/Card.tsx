import styled from '@emotion/styled';
import { motion, HTMLMotionProps } from 'framer-motion';
import { theme } from '../../styles/theme';
import { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  as?: any;
}

const getCardStyles = (variant: string, padding: string) => {
  const variants = {
    default: {
      background: theme.colors.glass.card,
      border: `1px solid ${theme.colors.glass.border}`,
      backdropFilter: 'blur(10px)',
    },
    glass: {
      background: theme.colors.glass.background,
      border: `1px solid ${theme.colors.glass.border}`,
      backdropFilter: 'blur(20px)',
    },
    elevated: {
      background: theme.colors.gradient.card,
      border: 'none',
      boxShadow: theme.colors.shadow.large,
    },
  };

  const paddings = {
    sm: theme.spacing.md,
    md: theme.spacing.lg,
    lg: theme.spacing.xl,
  };

  return {
    ...variants[variant as keyof typeof variants],
    padding: paddings[padding as keyof typeof paddings],
  };
};

const StyledCard = styled(motion.div)<{ 
  variant: string; 
  padding: string; 
  hoverable: boolean;
  clickable: boolean;
}>`
  ${({ variant, padding }) => getCardStyles(variant, padding)}
  
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.default};
  position: relative;
  overflow: hidden;
  
  ${({ hoverable }) => hoverable && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.colors.shadow.large};
      background: ${theme.colors.glass.hover};
    }
  `}
  
  ${({ clickable }) => clickable && `
    cursor: pointer;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${theme.colors.glass.border},
      transparent
    );
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    bottom: 0;
    background: linear-gradient(
      180deg,
      transparent,
      ${theme.colors.glass.border},
      transparent
    );
  }
`;

export const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  onClick,
  hoverable = false,
  as,
  ...props
}: CardProps) => {
  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    whileHover: hoverable ? { y: -4 } : undefined,
  };

  // Filtrer les props spécifiques à Card pour éviter de les passer au DOM si 'as' est utilisé
  // Styled-components gère cela pour ses propres props, mais pas pour les nôtres si elles sont passées manuellement
  // Cependant, ici StyledCard consomme variant/padding/hoverable/clickable
  
  // Le problème TS vient du fait que StyledCard attend des props spécifiques
  // et 'as' change le type sous-jacent, ce qui peut causer des conflits de types.
  // En utilisant 'any' pour 'as' dans l'interface, on contourne la vérification stricte.
  // De plus, on doit s'assurer que StyledCard accepte 'as'.
  
  return (
    <StyledCard
      as={as}
      variant={variant}
      padding={padding}
      hoverable={hoverable}
      clickable={!!onClick}
      className={className}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

