interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function ExternalLink({ 
  href, 
  children, 
  className = '', 
  style = {},
  onMouseEnter,
  onMouseLeave 
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

ExternalLink.displayName = 'ExternalLink';

export default ExternalLink;
