import { ReactNode } from 'react';

interface PostItNoteProps {
  children: ReactNode;
  color?: 'yellow' | 'blue' | 'pink' | 'green' | 'orange' | 'purple';
  className?: string;
  style?: React.CSSProperties;
}

function PostItNote({ children, color = 'yellow', className = '', style = {} }: PostItNoteProps) {
  const colorClass = `postit-note-${color}`;
  
  return (
    <div className={`postit-note ${colorClass} ${className}`} style={style}>
      {children}
    </div>
  );
}

PostItNote.displayName = 'PostItNote';

export default PostItNote;
