import StyledLink from './StyledLink';
import { TYPOGRAPHY, BUTTONS } from '@/lib/spacing';

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
        padding: BUTTONS.BUTTON_PADDING_LG,
        fontSize: `${BUTTONS.BUTTON_FONT_SIZE_MD}px`,
        fontFamily: TYPOGRAPHY.FONT_FAMILY_SERIF,
        color: '#000000',
        textDecoration: 'none',
        textAlign: 'center',
        fontWeight: BUTTONS.BUTTON_FONT_WEIGHT,
        margin: BUTTONS.BUTTON_MARGIN_SM
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = '#d0d0d0';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          // Remove inline style to restore CSS class background color
          e.currentTarget.style.background = '';
        }
      }}
    >
      {label}
    </StyledLink>
  );
}

NavigationButton.displayName = 'NavigationButton';

export default NavigationButton;
