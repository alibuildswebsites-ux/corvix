"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, ArrowLeft } from "lucide-react";

export default function BrandAssets() {
  const profileCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const coverCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!fontsLoaded) return;
    
    // --- DRAW PROFILE PICTURE (400x400) ---
    const pCanvas = profileCanvasRef.current;
    if (pCanvas) {
      const ctx = pCanvas.getContext("2d");
      if (ctx) {
        // Background
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 400, 400);

        // Subtle Glow
        const glow = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
        glow.addColorStop(0, "rgba(0, 119, 255, 0.2)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, 400, 400);

        // Border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, 398, 398);

        // Text "C"
        ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 200px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("C", 200, 220); // Offset for visual centering
      }
    }

    // --- DRAW COVER BANNER (1584x396) ---
    const cCanvas = coverCanvasRef.current;
    if (cCanvas) {
      const ctx = cCanvas.getContext("2d");
      if (ctx) {
        // Background
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1584, 396);

        // Center Glow
        const glow = ctx.createRadialGradient(792, 198, 0, 792, 198, 800);
        glow.addColorStop(0, "rgba(0, 119, 255, 0.15)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, 1584, 396);

        // Particles
        ctx.fillStyle = "#0077FF";
        ctx.strokeStyle = "rgba(0, 119, 255, 0.3)";
        ctx.lineWidth = 1.5;
        
        const points = Array.from({ length: 250 }).map(() => ({
          x: Math.random() * 1584,
          y: Math.random() * 396,
          r: Math.random() * 2 + 0.5
        }));

        // Draw lines
        points.forEach((p1, i) => {
          points.slice(i + 1).forEach(p2 => {
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });

        // Draw dots
        points.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Text
        ctx.shadowColor = "rgba(255, 255, 255, 0.25)";
        ctx.shadowBlur = 20;
        
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "800 72px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("CORVIX", 792, 170);

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#B4BCD0";
        ctx.font = "400 32px Rubik, sans-serif";
        ctx.fillText("We build software that scales.", 792, 250);
      }
    }
  }, [fontsLoaded]);

  const download = (canvasRef: React.RefObject<HTMLCanvasElement | null>, filename: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  return (
    <div className="min-h-screen bg-corvix-bg text-corvix-text p-6 pt-24 md:p-12 md:pt-32 font-body">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-corvix-muted hover:text-corvix-accent transition-colors mb-12">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Brand Asset Generator</h1>
        <p className="text-corvix-muted mb-12">Temporary tool to locally generate high-resolution LinkedIn assets matching the Corvix aesthetic.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Profile Picture */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold font-display text-white">Profile Picture (400x400)</h2>
            <div className="border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden bg-[#0a0a0a] p-8 flex items-center justify-center min-h-[300px]">
              <canvas 
                ref={profileCanvasRef} 
                width={400} 
                height={400} 
                className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] rounded-full shadow-[0_0_40px_rgba(0,119,255,0.2)] border border-[rgba(255,255,255,0.1)] bg-black" 
              />
            </div>
            <button 
              onClick={() => download(profileCanvasRef, "corvix-linkedin-profile.png")}
              className="flex items-center justify-center gap-2 bg-white text-black font-semibold py-4 rounded-xl hover:bg-gray-200 transition-colors w-full"
            >
              <Download size={18} /> Download Profile Image
            </button>
          </div>

          {/* Cover Banner */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold font-display text-white">LinkedIn Banner (1584x396)</h2>
            <div className="border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden bg-[#0a0a0a] p-8 flex items-center justify-center min-h-[300px]">
              <canvas 
                ref={coverCanvasRef} 
                width={1584} 
                height={396} 
                className="w-full h-auto border border-[rgba(255,255,255,0.1)] shadow-[0_0_40px_rgba(0,119,255,0.1)] bg-black rounded-sm" 
              />
            </div>
            <button 
              onClick={() => download(coverCanvasRef, "corvix-linkedin-banner.png")}
              className="flex items-center justify-center gap-2 bg-corvix-accent text-black font-semibold py-4 rounded-xl hover:bg-white transition-colors w-full"
            >
              <Download size={18} /> Download Banner Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
