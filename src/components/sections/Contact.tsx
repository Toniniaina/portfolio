import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

import { useForm, ValidationError } from '@formspree/react';

const ContactSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  position: relative;
  background: ${theme.colors.background};
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 10%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, ${theme.colors.accent}15 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(40px);
    animation: float 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 20%;
    right: 10%;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, ${theme.colors.accentSecondary}15 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(30px);
    animation: float 6s ease-in-out infinite reverse;
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xxl};
  align-items: start;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ContactCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  transition: all ${theme.transitions.default};
  
  &:hover {
    transform: translateX(8px);
    border-color: ${theme.colors.accent};
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: ${theme.colors.gradient.accent};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: ${theme.colors.dark};
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.spacing.xs};
`;

const ContactValue = styled.div`
  font-size: 1rem;
  color: ${theme.colors.textLight};
  font-weight: 600;
`;

const SocialSection = styled.div`
  margin-top: ${theme.spacing.xl};
`;

const SocialTitle = styled.h3`
  font-size: 1.25rem;
  color: ${theme.colors.light};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textLight};
  text-decoration: none;
  transition: all ${theme.transitions.default};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${theme.colors.accent};
    color: ${theme.colors.dark};
    transform: translateY(-2px);
    box-shadow: ${theme.colors.shadow.accent};
  }
  
  .icon {
    font-size: 1.125rem;
  }
  
  .label {
    font-weight: 500;
  }
`;

const ContactForm = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.light};
  margin-bottom: ${theme.spacing.md};
  font-weight: 700;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textLight};
  font-size: 1rem;
  transition: all ${theme.transitions.default};
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const FormTextarea = styled.textarea`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textLight};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all ${theme.transitions.default};
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px ${theme.colors.accent}20;
  }
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const AvailabilityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background: ${theme.colors.gradient.secondary};
  color: ${theme.colors.dark};
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
  
  &::before {
    content: '●';
    color: #4ade80;
    animation: pulse 2s infinite;
  }
`;

const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'kantoniaina@example.com',
    href: 'mailto:kantoniaina@example.com'
  },
  {
    icon: <FaPhone />,
    label: 'Téléphone',
    value: '+261 34 12 345 67',
    href: 'tel:+261341234567'
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Localisation',
    value: 'Antananarivo, Madagascar',
    href: null
  }
];

const socialLinks = [
  {
    icon: <FaGithub />,
    label: 'GitHub',
    href: 'https://github.com/Toniniaina'
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/kantoniaina-odilah-randrianjanahary-a2ba69337'
  },
  {
    icon: <FaTwitter />,
    label: 'Twitter',
    href: 'https://twitter.com'
  }
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

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [state, handleSubmit] = useForm("mlgwwpoz");

  if (state.succeeded) {
    return (
      <ContactSection id="contact" ref={ref}>
        <div className="container">
          <SectionHeader>
            <SectionTitle>Message Envoyé !</SectionTitle>
            <SectionSubtitle>
              Merci de m'avoir contacté. Je vous répondrai dès que possible.
            </SectionSubtitle>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => window.location.reload()}
              style={{ marginTop: '2rem' }}
            >
              Retour au formulaire
            </Button>
          </SectionHeader>
        </div>
      </ContactSection>
    );
  }

  return (
    <ContactSection id="contact" ref={ref}>
      <div className="container">
        <SectionHeader>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Travaillons Ensemble
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vous avez un projet en tête ? N'hésitez pas à me contacter. 
            Je serais ravi de discuter de vos idées et de voir comment nous pouvons les concrétiser.
          </SectionSubtitle>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ContactContent>
            <motion.div variants={itemVariants}>
              <ContactInfo>
                <AvailabilityBadge>
                  Disponible pour de nouveaux projets
                </AvailabilityBadge>
                
                {contactInfo.map((info, index) => (
                  <ContactCard
                    key={index}
                    variant="glass"
                    padding="md"
                    {...(info.href ? { as: 'a', href: info.href } : {})}
                  >
                    <ContactIcon>
                      {info.icon}
                    </ContactIcon>
                    <ContactDetails>
                      <ContactLabel>{info.label}</ContactLabel>
                      <ContactValue>{info.value}</ContactValue>
                    </ContactDetails>
                  </ContactCard>
                ))}
                
                <SocialSection>
                  <SocialTitle>Retrouvez-moi sur</SocialTitle>
                  <SocialLinks>
                    {socialLinks.map((social, index) => (
                      <SocialLink
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="icon">{social.icon}</span>
                        <span className="label">{social.label}</span>
                      </SocialLink>
                    ))}
                  </SocialLinks>
                </SocialSection>
              </ContactInfo>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ContactForm as="form" onSubmit={handleSubmit} variant="glass" padding="lg">
                <FormTitle>Envoyez-moi un message</FormTitle>
                
                <FormGroup>
                  <FormLabel htmlFor="name">Nom complet</FormLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    required
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="votre.email@example.com"
                    required
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="subject">Sujet</FormLabel>
                  <FormInput
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Sujet de votre message"
                    required
                  />
                  <ValidationError 
                    prefix="Subject" 
                    field="subject"
                    errors={state.errors}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel htmlFor="message">Message</FormLabel>
                  <FormTextarea
                    id="message"
                    name="message"
                    placeholder="Décrivez votre projet ou votre demande..."
                    required
                  />
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                </FormGroup>
                
                <Button variant="primary" size="lg" type="submit" disabled={state.submitting}>
                  <FaEnvelope />
                  {state.submitting ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </ContactForm>
            </motion.div>
          </ContactContent>
        </motion.div>
      </div>
    </ContactSection>
  );
};

