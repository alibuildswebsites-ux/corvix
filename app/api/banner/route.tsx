import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
            position: 'relative',
          }}
        >
          {/* Subtle Center Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '800px',
              height: '800px',
              transform: 'translate(-50%, -50%)',
              backgroundImage: 'radial-gradient(circle at center, rgba(0,119,255,0.25) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
            }}
          />

          {/* SVG Constellation Simulation */}
          <svg width="1584" height="396" style={{ position: 'absolute', top: 0, left: 0 }}>
            {Array.from({ length: 250 }).map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 1584}
                cy={Math.random() * 396}
                r={Math.random() * 1.5 + 0.5}
                fill="#0077FF"
                opacity={Math.random() * 0.8 + 0.2}
              />
            ))}
          </svg>

          {/* Logo Name */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <h1
              style={{
                fontSize: '120px',
                color: '#FFFFFF',
                fontWeight: 800,
                letterSpacing: '10px',
                margin: 0,
                padding: 0,
                textShadow: '0 0 50px rgba(255,255,255,0.4)',
              }}
            >
              CORVIX
            </h1>
            <p
              style={{
                fontSize: '40px',
                color: '#B4BCD0',
                fontWeight: 400,
                margin: 0,
                padding: 0,
                marginTop: '10px',
              }}
            >
              We build software that scales.
            </p>
          </div>
        </div>
      ),
      {
        width: 1584,
        height: 396,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
