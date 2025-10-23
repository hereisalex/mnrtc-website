import Link from 'next/link';

interface StyledLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function StyledLink({ 
  href, 
  children, 
  className = '', 
  style = {}, 
  target, 
  rel,
  onMouseEnter,
  onMouseLeave 
}: StyledLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      style={style}
      target={target}
      rel={rel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Link>
  );
}

StyledLink.displayName = 'StyledLink';

export default StyledLink;
