import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Card } from '../ui/Card';
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaPython
} from 'react-icons/fa';
import {
  SiTypescript,
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiGraphql,
  SiKubernetes
} from 'react-icons/si';
import { useInView } from 'react-intersection-observer';

const SkillsSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  position: relative;
  background: ${theme.colors.background};
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, ${theme.colors.accent}, transparent);
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

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xxl};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const SkillCategory = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${theme.colors.gradient.accent};
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.glass.border};
`;

const CategoryIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${theme.colors.gradient.accent};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${theme.colors.dark};
  box-shadow: ${theme.colors.shadow.medium};
`;

const CategoryTitle = styled.h3`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  color: ${theme.colors.light};
`;

const CategoryDescription = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
  margin-top: ${theme.spacing.xs};
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${theme.spacing.md};
  flex: 1;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.glass.card};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.default};
  cursor: pointer;
  
  &:hover {
    background: ${theme.colors.glass.hover};
    transform: translateY(-4px);
    box-shadow: ${theme.colors.shadow.medium};
    border-color: ${theme.colors.accent};
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem;
  color: ${theme.colors.accent};
  transition: all ${theme.transitions.default};
  
  ${SkillItem}:hover & {
    color: ${theme.colors.light};
    transform: scale(1.1);
  }
`;

const SkillName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.textLight};
  text-align: center;
`;

const SkillLevel = styled.div`
  width: 100%;
  height: 4px;
  background: ${theme.colors.glass.card};
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const SkillProgress = styled(motion.div)<{ level: number }>`
  height: 100%;
  background: ${theme.colors.gradient.accent};
  border-radius: 2px;
  width: ${props => props.level}%;
`;

const ExperienceStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xxl};
`;

const StatCard = styled(Card)`
  text-align: center;
  background: ${theme.colors.gradient.card};
  border: 1px solid ${theme.colors.accent}30;
`;

const StatNumber = styled.div`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: ${theme.colors.textMuted};
  font-weight: 500;
`;

const skillCategories = [
  {
    title: 'Frontend Development',
    description: 'Interfaces utilisateur modernes et réactives',
    icon: <FaReact />,
    skills: [
      { name: 'React', icon: <FaReact />, level: 95 },
      { name: 'TypeScript', icon: <SiTypescript />, level: 90 },
      { name: 'Next.js', icon: <SiNextdotjs />, level: 85 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 90 },
    ],
  },
  {
    title: 'Backend Development',
    description: 'APIs robustes et architectures scalables',
    icon: <FaNodeJs />,
    skills: [
      { name: 'Node.js', icon: <FaNodeJs />, level: 90 },
      { name: 'Python', icon: <FaPython />, level: 85 },
      { name: 'GraphQL', icon: <SiGraphql />, level: 80 },
      { name: 'MongoDB', icon: <SiMongodb />, level: 85 },
    ],
  },
  {
    title: 'DevOps & Tools',
    description: 'Déploiement et infrastructure cloud',
    icon: <FaDocker />,
    skills: [
      { name: 'Docker', icon: <FaDocker />, level: 85 },
      { name: 'AWS', icon: <FaAws />, level: 80 },
      { name: 'Kubernetes', icon: <SiKubernetes />, level: 75 },
      { name: 'Git', icon: <FaGitAlt />, level: 95 },
    ],
  },
];

const stats = [
  { number: '3+', label: 'Années d\'expérience' },
  { number: '50+', label: 'Projets réalisés' },
  { number: '15+', label: 'Technologies maîtrisées' },
  { number: '100%', label: 'Satisfaction client' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <SkillsSection id="skills" ref={ref}>
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Compétences & Expertise
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Un aperçu de mes compétences techniques et de mon expertise 
            dans les technologies modernes de développement web.
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SkillsContainer>
            {skillCategories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <SkillCategory variant="glass" padding="lg">
                  <CategoryHeader>
                    <CategoryIcon>
                      {category.icon}
                    </CategoryIcon>
                    <div>
                      <CategoryTitle>{category.title}</CategoryTitle>
                      <CategoryDescription>{category.description}</CategoryDescription>
                    </div>
                  </CategoryHeader>
                  
                  <SkillsList>
                    {category.skills.map((skill, skillIndex) => (
                      <SkillItem
                        key={skillIndex}
                        whileHover={{ y: -4 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <SkillIcon>{skill.icon}</SkillIcon>
                        <SkillName>{skill.name}</SkillName>
                        <SkillLevel>
                          <SkillProgress
                            level={skill.level}
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          />
                        </SkillLevel>
                      </SkillItem>
                    ))}
                  </SkillsList>
                </SkillCategory>
              </motion.div>
            ))}
          </SkillsContainer>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ExperienceStats>
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatCard variant="elevated" padding="lg">
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              </motion.div>
            ))}
          </ExperienceStats>
        </motion.div>
      </div>
    </SkillsSection>
  );
};

