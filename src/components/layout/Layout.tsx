import styled from '@emotion/styled';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { theme } from '../../styles/theme';
import { FloatingNav } from '../navigation/FloatingNav';
import { KrMonogram } from '../ui/KrMonogram';
import { FaJava } from 'react-icons/fa';
import { SiVuedotjs, SiDotnet, SiOracle } from 'react-icons/si';

interface LayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  background: transparent;
`;

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${theme.colors.gradient.accent};
  transform-origin: 0%;
  z-index: ${theme.zIndex.modal + 100};
`;

const FloatingIcon = styled(motion.div)`
  position: fixed;
  color: ${theme.colors.accent};
  opacity: 0.25;
  font-size: 3.5rem;
  pointer-events: none;
  z-index: 1;
  filter: drop-shadow(0 0 15px ${theme.colors.accent}30);
  will-change: transform;

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 2.2rem;
    opacity: 0.15;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${theme.zIndex.sticky};
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${theme.colors.glass.border};
  transition: all ${theme.transitions.default};
  
  @media print {
    display: none;
  }
`;

const Nav = styled.nav`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    
    @media (max-width: ${theme.breakpoints.sm}) {
      padding: ${theme.spacing.sm} ${theme.spacing.md};
    }
  }
`;

const Logo = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  width: 56px;
  height: 42px;
  filter:
    drop-shadow(0 0 10px ${theme.colors.accent}20)
    drop-shadow(0 0 2px rgba(255, 255, 255, 0.12));
  transform: translateZ(0);
  
  &:hover {
    transform: scale(1.04);
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -6px;
    width: 34px;
    height: 2px;
    background: ${theme.colors.light};
    border-radius: ${theme.borderRadius.full};
    transform: translateX(-50%);
    opacity: 0.7;
    transition: width ${theme.transitions.default}, opacity ${theme.transitions.default};
  }

  &:hover::after {
    width: 50px;
    opacity: 0.95;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 52px;
    height: 38px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
  
  a {
    color: ${theme.colors.textLight};
    font-weight: 500;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    transition: all ${theme.transitions.default};
    position: relative;
    
    &:hover {
      color: ${theme.colors.accent};
      background: ${theme.colors.glass.hover};
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: ${theme.colors.accent};
      transition: width ${theme.transitions.default};
    }
    
    &:hover::after {
      width: 80%;
    }
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  overflow-x: hidden;
  padding-top: 80px;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding-top: 70px;
  }
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: ${theme.spacing.md};
  background: ${theme.colors.accent};
  color: ${theme.colors.light};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.sm};
  font-weight: 600;
  z-index: ${theme.zIndex.modal};
  transition: top ${theme.transitions.fast};
  text-decoration: none;
  
  &:focus {
    top: ${theme.spacing.sm};
  }
`;

const Footer = styled.footer`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(20px);
  border-top: 1px solid ${theme.colors.glass.border};
  color: ${theme.colors.textMuted};
  padding: ${theme.spacing.xl} 0;
  text-align: center;
  position: relative;
  margin-top: auto;
  
  @media print {
    display: none;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  
  .heart {
    color: ${theme.colors.accentSecondary};
    animation: pulse 2s infinite;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.md};
  }
  
  a {
    color: ${theme.colors.textMuted};
    font-size: 0.875rem;
    transition: color ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.accent};
    }
  }
`;

const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  width: 50px;
  height: 50px;
  background: ${theme.colors.gradient.accent};
  border: none;
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.light};
  font-size: 1.25rem;
  cursor: pointer;
  z-index: ${theme.zIndex.fixed};
  box-shadow: ${theme.colors.shadow.large};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    bottom: calc(${theme.spacing.lg} + 70px);
    left: ${theme.spacing.md};
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.colors.shadow.accent};
  }
`;

export const Layout = ({ children }: LayoutProps) => {
  const progressValue = useMotionValue(0.25);
  const scaleX = useSpring(progressValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lastIndex = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'skills', 'contact'];
      const viewportHeight = window.innerHeight;
      
      let currentSectionIndex = 0;
      
      for (let i = 0; i < sections.length; i++) {
        const sectionId = sections[i];
        if (!sectionId) continue;
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Détection plus précise : si le haut de la section a dépassé 40% de l'écran
          if (rect.top <= viewportHeight * 0.4) {
            currentSectionIndex = i;
          }
        }
      }
      
      if (currentSectionIndex !== lastIndex.current) {
        lastIndex.current = currentSectionIndex;
        const targetProgress = (currentSectionIndex + 1) / sections.length;
        progressValue.set(targetProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progressValue]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LayoutWrapper>
      <ProgressBar style={{ scaleX }} />
      
      {/* Animation de chute (Haut vers Bas) */}
      <FloatingIcon
        style={{ left: '10%' }}
        animate={{ 
          y: ['-20vh', '115vh'],
          rotate: [0, 360],
          x: [0, 15, -15, 0]
        }}
        transition={{ 
          y: { duration: 18, repeat: Infinity, ease: "linear" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <FaJava />
      </FloatingIcon>

      <FloatingIcon
        style={{ left: '85%' }}
        animate={{ 
          y: ['-20vh', '115vh'],
          rotate: [360, 0],
          x: [0, -20, 20, 0]
        }}
        transition={{ 
          y: { duration: 22, repeat: Infinity, ease: "linear", delay: 2 },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" },
          x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <SiOracle />
      </FloatingIcon>

      {/* Animation de traversée (Gauche vers Droite) */}
      <FloatingIcon
        style={{ top: '15%' }}
        animate={{ 
          x: ['-15vw', '115vw'],
          y: [0, 30, -30, 0],
          rotate: [5, 15, 5]
        }}
        transition={{ 
          x: { duration: 28, repeat: Infinity, ease: "linear", delay: 5 },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <SiDotnet />
      </FloatingIcon>

      {/* Animation de traversée (Droite vers Gauche) */}
      <FloatingIcon
        style={{ top: '75%' }}
        animate={{ 
          x: ['115vw', '-15vw'],
          y: [0, -40, 40, 0],
          rotate: [-5, -15, -5]
        }}
        transition={{ 
          x: { duration: 24, repeat: Infinity, ease: "linear", delay: 10 },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <SiVuedotjs />
      </FloatingIcon>

      <SkipLink href="#main-content">
        Aller au contenu principal
      </SkipLink>

      <Header role="banner">
        <Nav role="navigation" aria-label="Navigation principale">
          <div className="container">
            <Logo
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => scrollToSection('hero')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToSection('hero');
                }
              }}
            >
              <KrMonogram />
            </Logo>
            
            <NavLinks role="list">
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
                role="listitem"
              >
                Accueil
              </a>
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                role="listitem"
              >
                Projets
              </a>
              <a 
                href="#skills" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('skills');
                }}
                role="listitem"
              >
                Compétences
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                role="listitem"
              >
                Contact
              </a>
            </NavLinks>
          </div>
        </Nav>
      </Header>

      <Main id="main-content" role="main" tabIndex={-1}>
        {children}
      </Main>

      <FloatingNav />

      <BackToTop
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Retour en haut de la page"
      >
        ↑
      </BackToTop>

      <Footer role="contentinfo">
        <div className="container">
          <FooterContent>
            <FooterText>
              © {new Date().getFullYear()} Randrianjanahary Kantoniaina. 
              Créé avec <span className="heart">♥</span> à Madagascar.
            </FooterText>
            <FooterLinks>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Mentions légales
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Politique de confidentialité
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Plan du site
              </a>
            </FooterLinks>
          </FooterContent>
        </div>
      </Footer>
    </LayoutWrapper>
  );
};

