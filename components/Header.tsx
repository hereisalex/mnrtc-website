function Header() {
  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'transparent',
      borderBottom: 'none'
    }}>
      {/* Full Logo */}
      <div style={{ textAlign: 'center' }}>
        <img
          src="/images/full-logo.png"
          alt="Minnesota Retro Technology Club Logo"
          width={400}
          height={160}
          style={{ 
            imageRendering: 'pixelated',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
