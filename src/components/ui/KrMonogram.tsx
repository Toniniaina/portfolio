import { theme } from '../../styles/theme';

interface KrMonogramProps {
  className?: string;
  strokeWidth?: number;
  title?: string;
}

export const KrMonogram = ({ className, strokeWidth = 9, title = 'KR' }: KrMonogramProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 220 200"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title}
      focusable="false"
    >
      <g transform="translate(-15 0)">
        <line
          x1="60"
          y1="15"
          x2="60"
          y2="185"
          stroke={theme.colors.light}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />

        <line
          x1="60"
          y1="185"
          x2="130"
          y2="40"
          stroke={theme.colors.light}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />

        <line
          x1="95"
          y1="110"
          x2="135"
          y2="185"
          stroke={theme.colors.light}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M60 20 Q190 20 190 80 Q190 140 120 120"
          stroke={theme.colors.light}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <line
          x1="120"
          y1="120"
          x2="165"
          y2="185"
          stroke={theme.colors.light}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
