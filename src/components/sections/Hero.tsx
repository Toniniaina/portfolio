import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Button } from '../ui/Button';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload, FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import profileImg from '../../assets/images/profile.png';



const HeroSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${theme.spacing.xxl} 0;
  overflow: hidden;
  background: ${theme.colors.background};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/hero-bg.png') no-repeat center center/cover;
    opacity: 0.1;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: ${theme.zIndex.base};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.xxl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column-reverse;
    text-align: center;
    gap: ${theme.spacing.xl};
  }
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${theme.breakpoints.md}) {
    align-items: center;
  }
`;

const Greeting = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 600;
`;

const Name = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  color: ${theme.colors.light};
  margin-bottom: ${theme.spacing.md};

  span {
    background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentSecondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.lg};
`;

const Description = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: ${theme.colors.textMuted};
  max-width: 600px;
  line-height: 1.7;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 80%;
  }
`;

const CtaButtons = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};

  a {
    color: ${theme.colors.textMuted};
    font-size: 1.5rem;
    transition: all ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.accent};
      transform: translateY(-3px);
    }
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    order: -1;
  }
`;

const ProfileImageWrapper = styled(motion.div)`
  width: 350px;
  height: 350px;
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  border: 5px solid ${theme.colors.accent};
  box-shadow: ${theme.colors.shadow.large};
  position: relative;
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${theme.colors.accent}20, ${theme.colors.accentSecondary}20);
    mix-blend-mode: overlay;
    opacity: 0;
    transition: opacity ${theme.transitions.default};
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Blob = styled(motion.div)`
  position: absolute;
  background: ${theme.colors.accent};
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(50px);
  z-index: 0;
`;

const blobVariants = {
  animate: {
    scale: [1, 1.2, 1, 0.8, 1],
    rotate: [0, 360, 0],
    x: [0, 50, -50, 0],
    y: [0, -50, 50, 0],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};



export const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <HeroSection id="hero" ref={ref}>
      <HeroContent>
        <TextContent>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            👋 Salut, je suis
          </Greeting>
          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Randrianjanahary <span>Kantoniaina</span>
          </Name>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Développeur Full Stack
          </Subtitle>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Je crée des expériences numériques exceptionnelles en combinant design moderne et technologies de pointe. Spécialisé dans React, Node.js et l'écosystème JavaScript moderne.
          </Description>
          <CtaButtons
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 1 }}
          >
            <Button variant="primary" size="lg" href="#projects">
              Voir mes projets <FaArrowRight />
            </Button>
            <Button variant="outline" size="lg" href="/cv.pdf" target="_blank" rel="noopener noreferrer">
              Télécharger CV <FaDownload />
            </Button>
          </CtaButtons>
          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </SocialLinks>
        </TextContent>
        <ImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <ProfileImageWrapper
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <img src={profileImg} alt="Randrianjanahary Kantoniaina" />
          </ProfileImageWrapper>
          <Blob
            style={{ width: 200, height: 200, top: '10%', left: '10%' }}
            variants={blobVariants}
            animate="animate"
          />
          <Blob
            style={{ width: 150, height: 150, bottom: '20%', right: '15%', background: theme.colors.accentSecondary }}
            variants={blobVariants}
            animate="animate"
          />
        </ImageContainer>
      </HeroContent>
    </HeroSection>
  );
};

