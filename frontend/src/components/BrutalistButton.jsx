import React from 'react';

export default function BrutalistButton({
  onClick,
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  disabled = false
}) {
  // Preset color mappings for neo-brutalist palette
  const variantStyles = {
    primary: {
      '--btn-bg': '#2563eb',     // Brand blue
      '--btn-text': '#ffffff',
      '--btn-shadow': '#000000'
    },
    secondary: {
      '--btn-bg': '#ffffff',     // Neutral white
      '--btn-text': '#0f172a',
      '--btn-shadow': '#000000'
    },
    success: {
      '--btn-bg': '#10b981',     // Success emerald
      '--btn-text': '#ffffff',
      '--btn-shadow': '#000000'
    },
    danger: {
      '--btn-bg': '#f43f5e',     // Error rose
      '--btn-text': '#ffffff',
      '--btn-shadow': '#000000'
    },
    accent: {
      '--btn-bg': '#ff3e00',     // seoulchik orange
      '--btn-text': '#ffffff',
      '--btn-shadow': '#000000'
    },
    yellow: {
      '--btn-bg': '#fbbf24',     // Warning amber
      '--btn-text': '#0f172a',
      '--btn-shadow': '#000000'
    }
  };

  const styleOverrides = variantStyles[variant] || variantStyles.primary;

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={`brutalist-btn-outer ${disabled ? 'btn-disabled' : ''} ${className}`}
      style={styleOverrides}
    >
      <button
        type={type}
        disabled={disabled}
        className="brutalist-btn-inner w-full h-full cursor-pointer border-none outline-none"
        style={{ background: 'none', border: 'none', padding: 'inherit', color: 'inherit' }}
      >
        <span className="flex items-center justify-center gap-1.5 font-bold">
          {children}
        </span>
      </button>
    </div>
  );
}
