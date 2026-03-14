import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ImageCarousel } from '../ui/ImageCarousel';
import { FaCode, FaEye } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { useCallback, useMemo, useState } from 'react';

import stackForgeImg1 from '../../assets/images/image1 (1).png';
import stackForgeImg2 from '../../assets/images/image1 (2).png';
import stackForgeImg3 from '../../assets/images/image1 (3).png';
import stackForgeImg4 from '../../assets/images/image1 (4).png';

type ProjectImageItem = {
  src: string;
  alt: string;
};

type Project = {
  id: number;
  title: string;
  type: string;
  description: string;
  image: string;
  images?: ProjectImageItem[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  stats: {
    commits: string;
    lines: string;
    features: string;
  };
};

const ProjectsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  position: relative;
  background: ${theme.colors.background};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100px;
    background: linear-gradient(to bottom, transparent, ${theme.colors.accent}, transparent);
  }
`;

const ProjectCardInner = styled.div`
  display: flex;
  gap: ${theme.spacing.xl};
  align-items: stretch;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const MediaColumn = styled.div`
  flex: 0 0 52%;
  min-height: 380px;

  @media (max-width: ${theme.breakpoints.md}) {
    flex: 0 0 auto;
    min-height: 300px;
  }
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectMediaCarousel = styled(ImageCarousel)`
  margin: 0;
  height: 100%;
`;

const ProjectMediaFrame = styled.div`
  width: 100%;
  height: 100%;
  min-height: 380px;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.md}) {
    min-height: 300px;
  }
`;

const ProjectImageLeft = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  display: block;
  border-radius: ${theme.borderRadius.lg};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xxl};
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.light} 0%, ${theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${theme.colors.gradient.accent};
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: ${theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProjectCarousel = styled.div`
  margin-top: ${theme.spacing.xxl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
`;

const ProjectStage = styled.div`
  width: 100%;
`;

const ProjectNavButton = styled.button<{ side: 'left' | 'right' }>`
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
  box-shadow: ${theme.colors.shadow.medium};
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.glass.hover};
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
  }
`;

const ProjectNavigation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
`;

const ProjectDots = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xs};
`;

const ProjectDot = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${theme.colors.glass.border};
  background: ${({ active }) => (active ? theme.colors.accent : theme.colors.glass.card)};
  opacity: ${({ active }) => (active ? 1 : 0.7)};

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const ProjectCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.colors.shadow.large};
  }
`;

const ProjectContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`;

const ProjectTitle = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  color: ${theme.colors.light};
  margin-bottom: ${theme.spacing.xs};
`;

const ProjectType = styled.span`
  background: ${theme.colors.gradient.accent};
  color: ${theme.colors.light};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

const ProjectDescription = styled.p`
  color: ${theme.colors.textMuted};
  line-height: 1.6;
  flex: 1;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
  margin: ${theme.spacing.md} 0;
`;

const TechTag = styled.span`
  background: ${theme.colors.glass.card};
  color: ${theme.colors.accent};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid ${theme.colors.glass.border};
  transition: all ${theme.transitions.default};
  
  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.dark};
    transform: translateY(-1px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: auto;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.glass.border};
`;

const ProjectStats = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin: ${theme.spacing.md} 0;
  padding: ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.glass.border};
`;

const Stat = styled.div`
  text-align: center;
  
  .number {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.accent};
    display: block;
  }
  
  .label {
    font-size: 0.875rem;
    color: ${theme.colors.textMuted};
  }
`;

const projects: Project[] = [
  {
    id: 1,
    title: "StackForge Generator",
    type: "Full Stack",
    description: "Projet personnel d’application de bureau StackForge Generator : générateur Full‑Stack (Spring Boot + Vue.js) à partir d’une base MySQL, avec une application JavaFX qui fait l’introspection du schéma, génère un CRUD avancé (DTO/Mapper, relations, Many‑to‑Many), et supporte des filtres dynamiques (QueryDSL) + export/import de configuration.",
    images: [
      { src: stackForgeImg1, alt: 'StackForge Generator - capture 1' },
      { src: stackForgeImg2, alt: 'StackForge Generator - capture 2' },
      { src: stackForgeImg3, alt: 'StackForge Generator - capture 3' },
      { src: stackForgeImg4, alt: 'StackForge Generator - capture 4' },
    ],
    image: stackForgeImg1,
    techStack: ["Java", "MySQL", "JavaFX", "Vue.js", "jlink"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stats: {
      commits: "150+",
      lines: "25K+",
      features: "30+"
    }
  },
  {
    id: 2,
    title: "Task Management App",
    type: "Frontend",
    description: "Application de gestion de tâches collaborative avec drag & drop, notifications en temps réel et synchronisation multi-appareils.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    techStack: ["React", "TypeScript", "Zustand", "Socket.IO", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stats: {
      commits: "200+",
      lines: "18K+",
      features: "25+"
    }
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    type: "Data Viz",
    description: "Dashboard analytique interactif avec visualisations de données en temps réel, rapports personnalisables et export multi-formats.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    techStack: ["Next.js", "D3.js", "PostgreSQL", "Python", "Docker"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    stats: {
      commits: "300+",
      lines: "35K+",
      features: "40+"
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = useMemo(() => projects[activeIndex]!, [activeIndex]);

  const goTo = useCallback((index: number) => {
    const len = projects.length;
    const next = ((index % len) + len) % len;
    setActiveIndex(next);
  }, []);

  const prevProject = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const nextProject = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  return (
    <ProjectsSection id="projects" ref={ref}>
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Projets Récents
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Découvrez une sélection de mes projets les plus récents, 
            alliant innovation technique et design moderne.
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ProjectCarousel>
            <ProjectStage>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.25, ease: 'easeOut' as const }}
                >
                  <ProjectCard variant="glass" padding="lg" hoverable>
                    <ProjectCardInner>
                      <MediaColumn>
                        {activeProject.id === 1 && activeProject.images ? (
                          <ProjectMediaCarousel images={activeProject.images} height={320} />
                        ) : (
                          <ProjectMediaFrame>
                            <ProjectImageLeft src={activeProject.image} alt={activeProject.title} loading="lazy" />
                          </ProjectMediaFrame>
                        )}
                      </MediaColumn>

                      <ContentColumn>
                        <ProjectContent>
                          <ProjectHeader>
                            <div>
                              <ProjectTitle>{activeProject.title}</ProjectTitle>
                              <ProjectType>{activeProject.type}</ProjectType>
                            </div>
                          </ProjectHeader>

                          <ProjectDescription>
                            {activeProject.description}
                          </ProjectDescription>

                          <ProjectStats>
                            <Stat>
                              <span className="number">{activeProject.stats.commits}</span>
                              <span className="label">Commits</span>
                            </Stat>
                            <Stat>
                              <span className="number">{activeProject.stats.lines}</span>
                              <span className="label">Lines</span>
                            </Stat>
                            <Stat>
                              <span className="number">{activeProject.stats.features}</span>
                              <span className="label">Features</span>
                            </Stat>
                          </ProjectStats>

                          <TechStack>
                            {activeProject.techStack.map((tech) => (
                              <TechTag key={tech}>{tech}</TechTag>
                            ))}
                          </TechStack>

                          <ProjectLinks>
                            <Button
                              variant="outline"
                              size="sm"
                              href={activeProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaCode />
                              Code
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              href={activeProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaEye />
                              Demo
                            </Button>
                          </ProjectLinks>
                        </ProjectContent>
                      </ContentColumn>
                    </ProjectCardInner>
                  </ProjectCard>
                </motion.div>
              </AnimatePresence>
            </ProjectStage>

            <ProjectNavigation>
              <ProjectNavButton type="button" side="left" onClick={prevProject} aria-label="Projet précédent">
                ‹
              </ProjectNavButton>

              <ProjectDots role="tablist" aria-label="Navigation des projets">
                {projects.map((p, idx) => (
                  <ProjectDot
                    key={p.id}
                    type="button"
                    active={idx === activeIndex}
                    onClick={() => goTo(idx)}
                    aria-label={`Aller au projet ${idx + 1}`}
                    aria-current={idx === activeIndex ? 'true' : undefined}
                  />
                ))}
              </ProjectDots>

              <ProjectNavButton type="button" side="right" onClick={nextProject} aria-label="Projet suivant">
                ›
              </ProjectNavButton>
            </ProjectNavigation>
          </ProjectCarousel>
        </motion.div>
      </div>
    </ProjectsSection>
  );
};

