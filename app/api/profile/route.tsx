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
          {/* Subtle Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '400px',
              height: '400px',
              transform: 'translate(-50%, -50%)',
              backgroundImage: 'radial-gradient(circle at center, rgba(0,119,255,0.2) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: '2px solid rgba(255, 255, 255, 0.08)',
            }}
          />

          <div
            style={{
              fontSize: '220px',
              color: '#FFFFFF',
              fontWeight: 800,
              marginTop: '-20px', // Visual centering
              textShadow: '0 0 30px rgba(255,255,255,0.4)',
            }}
          >
            C
          </div>
        </div>
      ),
      {
        width: 400,
        height: 400,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
