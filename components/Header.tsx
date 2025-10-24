import MinnesotaLogo from "./MinnesotaLogo";

function Header() {
  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'transparent',
      borderBottom: 'none',
      gap: '15px',
      flexWrap: 'wrap'
    }}>
      {/* Club Logo */}
      <div style={{ textAlign: 'center', marginRight: '-30px' }}>
        <img
          src="/images/newlogo2.png"
          alt="Minnesota Retro Technology Club Logo"
          width={210}
          height={84}
          style={{ 
            imageRendering: 'pixelated',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
      
      {/* Minnesota State Logo */}
      <div style={{ textAlign: 'center', marginLeft: '-30px' }}>
        <MinnesotaLogo width={200} height={160} />
      </div>
    </div>
  );
}

Header.displayName = 'Header';

export default Header;
