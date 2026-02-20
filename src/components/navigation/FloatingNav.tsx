import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { FaHome, FaUser, FaCode, FaCog, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const NavContainer = styled(motion.nav)`
  position: fixed;
  right: ${theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  z-index: ${theme.zIndex.fixed};
  backdrop-filter: blur(10px);
  box-shadow: ${theme.colors.shadow.large};
`;

const NavLink = styled.a<{ isActive: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.isActive ? theme.colors.dark : theme.colors.textMuted)};
  background: ${props => (props.isActive ? theme.colors.gradient.accent : 'transparent')};
  font-size: 1.25rem;
  position: relative;
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.dark};
    transform: scale(1.1);
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  right: 120%;
  top: 50%;
  transform: translateY(-50%);
  background: ${theme.colors.light};
  color: ${theme.colors.dark};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: ${theme.colors.shadow.medium};
  pointer-events: none;
`;

const navItems = [
  { id: 'hero', label: 'Accueil', icon: <FaHome /> },
  { id: 'about', label: 'À propos', icon: <FaUser /> },
  { id: 'projects', label: 'Projets', icon: <FaCode /> },
  { id: 'skills', label: 'Compétences', icon: <FaCog /> },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
];

const navVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section) {
          if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavContainer
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map(item => (
        <motion.div key={item.id} variants={itemVariants}>
          <NavLink
            href={`#${item.id}`}
            isActive={activeSection === item.id}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            aria-label={`Section ${item.label} ${activeSection === item.id ? '(section actuelle)' : ''}`}
          >
            {item.icon}
            {hoveredItem === item.id && (
              <Tooltip
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </Tooltip>
            )}
          </NavLink>
        </motion.div>
      ))}
    </NavContainer>
  );
};

