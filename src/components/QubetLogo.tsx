import React from 'react';
import { useApp } from '../context/AppContext';

interface QubetLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  className?: string;
  showText?: boolean;
  logoUrl?: string | null;
}

export const QubetLogo: React.FC<QubetLogoProps> = ({
  variant = 'light',
  className = 'h-10',
  showText = true,
  logoUrl,
}) => {
  const { customLogoUrl } = useApp();
  const activeLogoUrl = logoUrl !== undefined ? logoUrl : customLogoUrl;

  // Determine color palette based on variant
  const primaryColor =
    variant === 'dark' ? '#FFFFFF' : variant === 'gold' ? '#ffdf9d' : '#801278';
  const secondaryColor =
    variant === 'dark' ? '#e2d4e0' : variant === 'gold' ? '#e6c274' : '#801278';

  if (activeLogoUrl) {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <img
          src={activeLogoUrl}
          alt="Qubet Logo"
          className="h-full w-auto max-h-12 object-contain rounded-lg drop-shadow-xs"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Monogram & Perfume Bottle Emblem */}
      <svg
        viewBox="0 0 160 160"
        className="h-full w-auto aspect-square shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circle Ring */}
        <circle
          cx="80"
          cy="80"
          r="66"
          stroke={primaryColor}
          strokeWidth="6"
        />
        <circle
          cx="80"
          cy="80"
          r="56"
          stroke={primaryColor}
          strokeWidth="2.5"
        />

        {/* Royal Crown Cap at Top */}
        <path
          d="M70 34 H90 V42 H70 Z"
          fill={primaryColor}
        />
        <circle cx="80" cy="28" r="4.5" fill={primaryColor} />
        <rect x="73" y="42" width="14" height="6" rx="1" fill={primaryColor} />

        {/* Central Monogram Emblem */}
        <path
          d="M80 48 V112"
          stroke={primaryColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Left Curve of Q */}
        <path
          d="M80 54 C58 54 48 68 48 83 C48 98 60 108 80 108"
          stroke={primaryColor}
          strokeWidth="5.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right Loop of P */}
        <path
          d="M80 54 C98 54 106 66 106 79 C106 92 96 100 80 100"
          stroke={primaryColor}
          strokeWidth="5.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Vapor Ribbon S-Curve winding through circle out to bottom right */}
        <path
          d="M50 68 C42 50 54 36 60 46 C66 56 62 72 72 86 C82 100 104 102 120 118 C128 126 136 132 148 136 C144 128 134 122 126 114 C114 102 98 96 90 84 C82 72 84 58 76 46 C68 34 48 44 56 62 Z"
          fill={primaryColor}
        />
      </svg>

      {/* Brand Name Typography - Permanent Calligraphic Gothic Wordmark */}
      {showText && (
        <div className="flex flex-col justify-center leading-none pl-0.5 select-none">
          <div className="relative flex items-center">
            {/* Top flourish decoration for Qubet calligraphic Q */}
            <span
              className="font-calligraphic-logo text-2xl sm:text-3xl font-bold tracking-normal leading-tight"
              style={{
                color: primaryColor,
                fontFamily: "'Fondamento', 'UnifrakturMaguntia', 'Pinyon Script', Georgia, serif",
                textShadow: variant === 'gold' ? '0 0 1px rgba(255,223,157,0.3)' : 'none',
              }}
            >
              Qubet
            </span>
          </div>
          <span
            className="text-[9px] sm:text-[10px] tracking-[0.42em] font-medium lowercase mt-0.5 pl-0.5"
            style={{
              color: secondaryColor,
              fontFamily: "'Fondamento', 'UnifrakturMaguntia', 'Pinyon Script', Georgia, serif",
            }}
          >
            p e r f u m e
          </span>
        </div>
      )}
    </div>
  );
};
