import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FaCode, FaEye } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
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

const ProjectImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 250px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  position: relative;
  margin: -${theme.spacing.lg} -${theme.spacing.lg} ${theme.spacing.lg} -${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${theme.colors.accent}20 0%,
      transparent 50%,
      ${theme.colors.accentSecondary}20 100%
    );
    opacity: 0;
    transition: opacity ${theme.transitions.default};
  }
  
  &:hover::before {
    opacity: 1;
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

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    type: "Full Stack",
    description: "Une plateforme e-commerce moderne avec gestion des paiements, système d'inventaire en temps réel et interface d'administration complète.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
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
          <ProjectsGrid>
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard variant="glass" padding="lg" hoverable>
                  <ProjectImage imageUrl={project.image} />
                  
                  <ProjectContent>
                    <ProjectHeader>
                      <div>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectType>{project.type}</ProjectType>
                      </div>
                    </ProjectHeader>
                    
                    <ProjectDescription>
                      {project.description}
                    </ProjectDescription>
                    
                    <ProjectStats>
                      <Stat>
                        <span className="number">{project.stats.commits}</span>
                        <span className="label">Commits</span>
                      </Stat>
                      <Stat>
                        <span className="number">{project.stats.lines}</span>
                        <span className="label">Lines</span>
                      </Stat>
                      <Stat>
                        <span className="number">{project.stats.features}</span>
                        <span className="label">Features</span>
                      </Stat>
                    </ProjectStats>
                    
                    <TechStack>
                      {project.techStack.map((tech) => (
                        <TechTag key={tech}>{tech}</TechTag>
                      ))}
                    </TechStack>
                    
                    <ProjectLinks>
                      <Button
                        variant="outline"
                        size="sm"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaCode />
                        Code
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaEye />
                        Demo
                      </Button>
                    </ProjectLinks>
                  </ProjectContent>
                </ProjectCard>
              </motion.div>
            ))}
          </ProjectsGrid>
        </motion.div>
      </div>
    </ProjectsSection>
  );
};

