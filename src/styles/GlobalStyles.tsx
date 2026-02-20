import { Global, css } from '@emotion/react';
import { theme } from './theme';

const globalStyles = css`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
  }

  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.textLight};
    line-height: 1.6;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${theme.colors.background};
    background-attachment: fixed;
    position: relative;
    
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(108, 99, 255, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(108, 99, 255, 0.1) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }
  }

  #root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 600;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.7;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: all ${theme.transitions.default};
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    transition: all ${theme.transitions.default};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  section {
    width: 100%;
    position: relative;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
  }

  .container {
    width: min(95%, 1400px);
    margin-inline: auto;
    padding-inline: ${theme.spacing.md};
    position: relative;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.glass.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gradient.accent};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.accent};
  }

  /* Selection */
  ::selection {
    background: ${theme.colors.accent};
    color: ${theme.colors.light};
  }

  /* Focus styles */
  :focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* Screen reader only utility class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  /* Responsive design */
  @media (max-width: ${theme.breakpoints.sm}) {
    html {
      font-size: 14px;
    }
    
    .container {
      width: 95%;
      padding-inline: ${theme.spacing.sm};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    html {
      font-size: 13px;
    }
  }

  /* Print styles */
  @media print {
    html {
      font-size: 12pt;
    }

    body {
      background: white !important;
      color: black !important;
      margin: 0;
      padding: 0;
    }

    section {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    h1, h2, h3 {
      page-break-after: avoid;
      break-after: avoid;
    }

    img {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .no-print,
    button,
    nav,
    .social-links {
      display: none !important;
    }

    a {
      text-decoration: none !important;
      color: black !important;
    }

    a[href^="http"]:after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
      font-style: italic;
    }

    p, li {
      orphans: 3;
      widows: 3;
    }

    * {
      background: transparent !important;
      color: black !important;
      text-shadow: none !important;
      filter: none !important;
      box-shadow: none !important;
    }

    @page {
      margin: 2cm;
    }

    @page :first {
      margin-top: 3cm;
    }
  }

  /* High contrast mode */
  @media (prefers-contrast: high) {
    body {
      background: #000000;
      color: #ffffff;
    }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;

