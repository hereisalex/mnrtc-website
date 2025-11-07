function Header() {
  return (
    <table className="retro-layout" style={{ marginBottom: 0 }}>
      <tbody>
        <tr>
          <td className="left-sidebar" style={{ 
            padding: 0, 
            position: 'static', 
            height: 'auto',
            overflow: 'visible',
            width: '180px'
          }}></td>
          <td className="center-content" style={{ 
            padding: '20px',
            width: 'auto'
          }}>
            <div style={{ 
              width: '100%',
              textAlign: 'center',
              border: '4px outset #c0c0c0',
              padding: '4px',
              background: '#ffffff',
              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              boxSizing: 'border-box',
            }}>
              <img
                src="/images/mnrtcbanner.png"
                alt="Minnesota Retro Technology Club Banner"
                style={{ 
                  imageRendering: 'pixelated',
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  border: '1px solid #808080',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </td>
          <td className="right-sidebar" style={{ 
            padding: 0, 
            position: 'static', 
            height: 'auto',
            overflow: 'visible',
            width: '200px'
          }}></td>
        </tr>
      </tbody>
    </table>
  );
}

Header.displayName = 'Header';

export default Header;
