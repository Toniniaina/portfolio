import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const getButtonStyles = (variant: string, size: string) => {
  const variants = {
    primary: {
      background: theme.colors.gradient.accent,
      color: theme.colors.light,
      border: 'none',
      '&:hover': {
        background: theme.colors.accent,
        transform: 'translateY(-2px)',
        boxShadow: theme.colors.shadow.accent,
      },
    },
    secondary: {
      background: theme.colors.gradient.secondary,
      color: theme.colors.light,
      border: 'none',
      '&:hover': {
        background: theme.colors.accentSecondary,
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
      },
    },
    outline: {
      background: 'transparent',
      color: theme.colors.accent,
      border: `2px solid ${theme.colors.accent}`,
      '&:hover': {
        background: theme.colors.accent,
        color: theme.colors.light,
        transform: 'translateY(-2px)',
        boxShadow: theme.colors.shadow.accent,
      },
    },
    ghost: {
      background: theme.colors.glass.background,
      color: theme.colors.textLight,
      border: `1px solid ${theme.colors.glass.border}`,
      backdropFilter: 'blur(10px)',
      '&:hover': {
        background: theme.colors.glass.hover,
        transform: 'translateY(-2px)',
        boxShadow: theme.colors.shadow.medium,
      },
    },
  };

  const sizes = {
    sm: {
      padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      fontSize: '0.875rem',
      borderRadius: theme.borderRadius.sm,
    },
    md: {
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      fontSize: '1rem',
      borderRadius: theme.borderRadius.md,
    },
    lg: {
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      fontSize: '1.125rem',
      borderRadius: theme.borderRadius.lg,
    },
  };

  return {
    ...variants[variant as keyof typeof variants],
    ...sizes[size as keyof typeof sizes],
  };
};

const StyledButton = styled(motion.button)<{ variant: string; size: string; disabled: boolean }>`
  ${({ variant, size }) => getButtonStyles(variant, size)}
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  font-family: ${theme.fonts.body};
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const StyledLink = styled(motion.a)<{ variant: string; size: string }>`
  ${({ variant, size }) => getButtonStyles(variant, size)}
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  font-family: ${theme.fonts.body};
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  target,
  rel,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap: { scale: disabled ? 1 : 0.98 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <StyledLink
        href={href}
        target={target}
        rel={rel}
        variant={variant}
        size={size}
        className={className}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </StyledButton>
  );
};

