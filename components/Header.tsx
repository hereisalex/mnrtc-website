function Header() {
  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'transparent',
      borderBottom: 'none',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Banner Logo */}
      <div style={{ 
        textAlign: 'center',
        border: '4px outset #c0c0c0',
        padding: '4px',
        background: '#ffffff',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        width: '100%',
      }}>
        <img
          src="/images/mnrtcbanner.png"
          alt="Minnesota Retro Technology Club Banner"
          style={{ 
            imageRendering: 'pixelated',
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            border: '1px solid #808080'
          }}
        />
      </div>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
