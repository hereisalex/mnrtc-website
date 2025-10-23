interface WebringBadgeProps {
  text: string;
  color: 'yellow' | 'blue' | 'pink' | 'green' | 'orange' | 'purple';
}

function WebringBadge({ text, color }: WebringBadgeProps) {
  return (
    <span className={`postit-note postit-note-${color}`} style={{
      display: 'inline-block',
      color: '#000000',
      padding: '2px 6px',
      fontSize: '9px',
      fontWeight: 'bold',
      margin: '2px'
    }}>
      {text}
    </span>
  );
}

WebringBadge.displayName = 'WebringBadge';

export default WebringBadge;
