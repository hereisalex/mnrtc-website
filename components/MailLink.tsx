interface MailLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function MailLink({ 
  href, 
  children, 
  className = '', 
  style = {},
  onMouseEnter,
  onMouseLeave 
}: MailLinkProps) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

MailLink.displayName = 'MailLink';

export default MailLink;
