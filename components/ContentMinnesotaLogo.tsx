interface ContentMinnesotaLogoProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

function ContentMinnesotaLogo({ width = 80, height = 80, className = '', style = {} }: ContentMinnesotaLogoProps) {
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

ContentMinnesotaLogo.displayName = 'ContentMinnesotaLogo';

export default ContentMinnesotaLogo;
