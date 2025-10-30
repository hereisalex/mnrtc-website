import GuestbookWidget from "@/components/GuestbookWidget";

function GuestbookPage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      height: '100%',
      overflow: 'hidden'
    }}>
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '20px',
        background: '#ffffff',
        border: '2px outset #cccccc',
        margin: '10px 0',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '20px',
          textAlign: 'center',
          borderBottom: '2px solid #000000',
          paddingBottom: '10px'
        }}>
          📖 Guestbook
        </h1>
        
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#333333'
        }}>
          Sign our guestbook and leave a message for the community!
        </p>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <GuestbookWidget />
        </div>
      </div>
    </div>
  );
}

GuestbookPage.displayName = 'GuestbookPage';

export default GuestbookPage;
