interface ClubLogoProps {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

function ClubLogo({ width = 120, height = 40, className = '', style = {} }: ClubLogoProps) {
  return (
    <img
      src="/images/full-logo.png"
      alt="Minnesota Retro Technology Club"
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

ClubLogo.displayName = 'ClubLogo';

export default ClubLogo;
