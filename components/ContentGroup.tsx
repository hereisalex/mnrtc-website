import { ReactNode } from 'react';

interface ContentGroupProps {
  children: ReactNode;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

function ContentGroup({ children, title, className = '', style = {} }: ContentGroupProps) {
  return (
    <div className={className} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      ...style
    }}>
      {title && (
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '10px',
          textAlign: 'center',
          textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

ContentGroup.displayName = 'ContentGroup';

export default ContentGroup;
