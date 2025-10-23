import StyledLink from './StyledLink';

interface NavigationButtonProps {
  href: string;
  label: string;
  isActive: boolean;
  color: string;
}

function NavigationButton({ href, label, isActive, color }: NavigationButtonProps) {
  return (
    <StyledLink
      href={href}
      className={`postit-note ${color} clipped-button`}
      style={{
        display: 'block',
        padding: '4px 8px',
        fontSize: '11px',
        fontFamily: 'Arial, sans-serif',
        color: '#000000',
        textDecoration: 'none',
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '2px 0'
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#d0d0d0';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#e0e0e0';
        }
      }}
    >
      {label}
    </StyledLink>
  );
}

NavigationButton.displayName = 'NavigationButton';

export default NavigationButton;
