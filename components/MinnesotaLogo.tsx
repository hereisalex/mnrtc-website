interface MinnesotaLogoProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

function MinnesotaLogo({ width = 80, height = 60, className = '', style = {} }: MinnesotaLogoProps) {
  return (
    <img
      src="/images/full-logo.png"
      alt="Minnesota Retro Technology Club Logo"
      width={width}
      height={height}
      className={className}
      style={{ 
        imageRendering: 'pixelated', 
        maxWidth: '100%', 
        height: 'auto',
        border: 'none',
        ...style
      }}
    />
  );
}

MinnesotaLogo.displayName = 'MinnesotaLogo';

export default MinnesotaLogo;
