import { Commodore64Terminal } from "@/components/Commodore64Terminal";

function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Construction Banner */}
      <div style={{
        width: '100%',
        textAlign: 'center',
        marginBottom: '-20px'
      }}>
        <img
          src="/images/construction.gif"
          alt="Under Construction"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      {/* Main Content Section */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '10px',
        background: '#ffffff',
        border: '2px outset #cccccc',
        margin: '10px 0',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{
          fontSize: '20px',
          color: '#000000',
          marginBottom: '15px',
          textAlign: 'center',
          borderBottom: '2px solid #000000',
          paddingBottom: '5px'
        }}>
          Welcome to MNRTC!
        </h2>

        {/* Commodore 64 Terminal Animation */}
        <Commodore64Terminal
          lines={[
            'READY.',
            '10 PRINT "HELLO WORLD"',
            '20 GOTO 10',
            'RUN'
          ]}
          typingSpeed={50}
          lineDelay={800}
        />

        <div style={{
          fontSize: '18px',
          lineHeight: '1.6',
          color: '#000000',
          marginBottom: '20px',
          marginTop: '20px'
        }}>
          <p style={{ marginBottom: '15px' }}>
            We are a community of enthusiasts, collectors, and tinkerers who love vintage computers, 
            audiovisual equipment, telephony, and other electronic technologies of yesteryear!
          </p>

          <p style={{ marginBottom: '15px' }}>
            Our goal is to connect people within the Twin Cities and greater Minnesota area to share 
            our passion and knowledge, as well as preserve computing history for future generations to enjoy.
          </p>

          <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            Click on the links to the left to learn more and get involved!
          </p>
        </div>

        <div style={{
          background: '#f0f0f0',
          border: '2px inset #cccccc',
          padding: '15px',
          marginTop: '20px'
        }}>
          <h3 style={{
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '10px',
            fontFamily: 'Arial, sans-serif'
          }}>
            WHY VINTAGE COMPUTERS?
          </h3>

          <div style={{
            fontSize: '16px',
            lineHeight: '1.5',
            color: '#000000'
          }}>
            <p style={{ marginBottom: '12px' }}>
              In the modern day, computers have become ubiquitous and heavily integrated into everyday life. 
              Our home appliances and vehicles have computers inside them. Our entertainment is delivered to 
              us on computers via the Internet. We carry miniaturized computers in our pockets. Stores, public 
              transportation, and many businesses rely on computers to process our money and staggering amounts 
              of data. Unfortunately, that means we often take them for granted until disaster strikes. Many 
              people don't know how they work, or why they are made the way they are!
            </p>

            <p style={{ marginBottom: '12px' }}>
              There is also the problem of so-called "enshittification." As the corporations that run our 
              digital world become more huge and unsustainable, they find new ways to nickel-and-dime the 
              everyday user, making our experience worse in the name of profit and "progress."
            </p>

            <p style={{ marginBottom: '0' }}>
              There is a growing desire to return to the past, to a time when the computer was a simple 
              appliance, enshrined on a dedicated desk in our home. When connecting to the Internet was a 
              time-consuming luxury, and the websites we visited were text-based and straight to the point. 
              Computer programs were a means to an end, rather than a constant battle for our attention and 
              our money. Limitations bred creativity. [unfinished]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.displayName = 'Home';

export default Home;

