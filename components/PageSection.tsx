import { ReactNode } from 'react';

interface PageSectionProps {
  children: ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

function PageSection({ children, title, className = '', style = {} }: PageSectionProps) {
  return (
    <div className={className} style={style}>
      {title && (
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '15px',
          textAlign: 'center',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
        }}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

PageSection.displayName = 'PageSection';

export default PageSection;
