export const theme = {
  colors: {
    primary: '#000000', // Noir
    secondary: '#FFFFFF', // Blanc
    accent: '#00FF00', // Vert vif
    accentSecondary: '#00CC00', // Vert plus foncé
    light: '#FFFFFF', // Texte clair
    dark: '#000000', // Texte foncé
    textLight: '#F0F0F0', // Texte général clair
    textMuted: '#B0B0B0', // Texte estompé
    background: '#000000', // Fond principal noir
    cardBackground: '#1A1A1A', // Fond de carte légèrement plus clair
    border: '#333333', // Bordures sombres
    gradient: {
      primary: 'linear-gradient(135deg, #000000 0%, #1A1A1A 100%)',
      secondary: 'linear-gradient(135deg, #00FF00 0%, #00CC00 100%)',
      accent: 'linear-gradient(135deg, #00FF00 0%, #00CC00 100%)',
      card: 'linear-gradient(135deg, #1A1A1A 0%, #000000 100%)',
    },
    glass: {
      background: 'rgba(26, 26, 26, 0.7)', // Noir transparent
      border: 'rgba(51, 51, 51, 0.5)', // Bordure transparente
      card: 'rgba(26, 26, 26, 0.8)', // Carte transparente
      hover: 'rgba(0, 255, 0, 0.1)', // Vert transparent au survol
    },
    shadow: {
      small: '0 2px 4px rgba(0, 0, 0, 0.2)',
      medium: '0 5px 15px rgba(0, 0, 0, 0.3)',
      large: '0 10px 30px rgba(0, 0, 0, 0.4)',
      accent: '0 0 15px rgba(0, 255, 0, 0.6)',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '64px',
  },
  breakpoints: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '24px',
    full: '9999px',
  },
  fonts: {
    body: 'Geist, sans-serif',
    heading: 'Geist, sans-serif',
  },
  transitions: {
    default: '0.3s ease-in-out',
    fast: '0.15s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  zIndex: {
    base: 1,
    dropdown: 10,
    sticky: 100,
    fixed: 1000,
    modal: 2000,
  },
};

