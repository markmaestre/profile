import { useState, useEffect, useRef } from "react";
import avatar from "../assets/download.png";
import About from "./About";
import Achievements from "./achievements";
import Projects from "./Projects";
import Contact from "./Contact";

// ── Loading Screen ─────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    let angle = 0;
    let moonAngle = 0;
    let raf;

    const stars = Array.from({ length: Math.min(120, Math.floor(window.innerWidth / 10)) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#020b18";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.twinkle += 0.04;
        const op = 0.4 + Math.sin(s.twinkle) * 0.4;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,220,255,${op})`;
        ctx.fill();
      });

      const moonR = Math.min(70, canvas.width * 0.09, canvas.height * 0.12);
      ctx.save();
      ctx.translate(cx, cy);

      const grd = ctx.createRadialGradient(0, 0, moonR * 0.6, 0, 0, moonR * 1.8);
      grd.addColorStop(0, "rgba(56,189,248,0.12)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(0, 0, moonR * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, moonR, 0, Math.PI * 2);
      ctx.fillStyle = "#d4eaf7";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(20, 0, moonR * 0.82, 0, Math.PI * 2);
      ctx.fillStyle = "#020b18";
      ctx.fill();

      [[-28, -18, 6], [-10, 24, 4], [-38, 10, 3]].forEach(([mx, my, mr]) => {
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,200,230,0.3)";
        ctx.fill();
      });

      ctx.restore();

      const orbitR = Math.min(140, canvas.width * 0.18, canvas.height * 0.2);
      ctx.beginPath();
      ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56,189,248,0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      const sx = cx + Math.cos(angle) * orbitR;
      const sy = cy + Math.sin(angle) * orbitR;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(angle + Math.PI / 2);

      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(7, 8);
      ctx.lineTo(0, 4);
      ctx.lineTo(-7, 8);
      ctx.closePath();
      ctx.fillStyle = "#e0f4ff";
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, -4, 3.5, 5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#38bdf8";
      ctx.fill();

      const eGrd = ctx.createRadialGradient(0, 10, 0, 0, 10, 12);
      eGrd.addColorStop(0, "rgba(56,189,248,0.9)");
      eGrd.addColorStop(0.5, "rgba(56,189,248,0.3)");
      eGrd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(0, 10, 12, 0, Math.PI * 2);
      ctx.fillStyle = eGrd;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-7, 4);
      ctx.lineTo(-16, 12);
      ctx.lineTo(-4, 8);
      ctx.closePath();
      ctx.fillStyle = "#7dd3fc";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(7, 4);
      ctx.lineTo(16, 12);
      ctx.lineTo(4, 8);
      ctx.closePath();
      ctx.fillStyle = "#7dd3fc";
      ctx.fill();

      ctx.restore();

      for (let i = 1; i <= 8; i++) {
        const ta = angle - i * 0.12;
        const tx = cx + Math.cos(ta) * orbitR;
        const ty = cy + Math.sin(ta) * orbitR;
        ctx.beginPath();
        ctx.arc(tx, ty, (9 - i) * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${0.4 - i * 0.045})`;
        ctx.fill();
      }

      angle -= 0.022;
      moonAngle += 0.003;
      raf = requestAnimationFrame(draw);
    };
    draw();

    let p = 0;
    const pInt = setInterval(() => {
      p += Math.random() * 3 + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(pInt);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onDone, 600);
        }, 400);
      }
      setProgress(Math.floor(p));
    }, 40);

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(pInt);
      window.removeEventListener('resize', handleResize);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute", bottom: "12%", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
        }}
      >
        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(11px, 3vw, 13px)", color: "#38bdf8", letterSpacing: ".14em" }}>
          NASAN AKING SALAMIN?
        </div>
        <div style={{ width: "clamp(180px, 40vw, 240px)", height: 2, background: "rgba(56,189,248,0.15)", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              height: "100%", borderRadius: 2, background: "#38bdf8",
              width: `${progress}%`, transition: "width 0.1s linear",
              boxShadow: "0 0 8px #38bdf8",
            }}
          />
        </div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(10px, 2.5vw, 11px)", color: "rgba(255,255,255,0.3)", letterSpacing: ".08em" }}>
          {progress}%
        </div>
      </div>
    </div>
  );
}

// ── SVG Logos ─────────────────────────────────────────────────────────────────
const LOGOS = {
  JavaScript: (<svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" fill="#f7df1e" rx="3"/><path d="M9 25.7l2.3-1.4c.4.8.8 1.4 1.7 1.4.9 0 1.4-.4 1.4-1.7V16h2.8v8.1c0 2.8-1.6 4-4 4-2.1 0-3.4-1.1-4.2-2.4zm8.5-.3l2.3-1.4c.6 1 1.3 1.8 2.7 1.8 1.1 0 1.9-.6 1.9-1.4 0-1-.7-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.5-3.6 4-3.6 1.7 0 3 .6 3.9 2.2l-2.1 1.4c-.5-.9-1-1.2-1.8-1.2-.8 0-1.3.5-1.3 1.2 0 .9.5 1.2 1.7 1.7l.7.3c2.3 1 3.7 2 3.7 4.3 0 2.4-1.9 3.8-4.5 3.8-2.5 0-4.1-1.2-4.9-2.8z" fill="#000"/></svg>),
  TypeScript: (<svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" fill="#3178c6" rx="3"/><path d="M18.6 22.7v2.7c.5.2 1 .4 1.6.5.6.1 1.2.2 1.9.2.6 0 1.2-.1 1.8-.2.5-.2 1-.4 1.4-.7.4-.3.7-.7.9-1.2.2-.5.3-1.1.3-1.7 0-.5-.1-.9-.2-1.3-.1-.4-.4-.7-.6-1-.3-.3-.6-.5-1-.7-.4-.2-.9-.4-1.4-.6-.4-.1-.7-.3-1-.4-.3-.1-.5-.3-.7-.4-.2-.2-.3-.3-.4-.5-.1-.2-.1-.4-.1-.6 0-.2 0-.4.1-.5.1-.2.2-.3.4-.4.2-.1.3-.2.5-.2.2-.1.4-.1.7-.1.2 0 .4 0 .6.1.2 0 .4.1.6.2.2.1.4.2.5.3.2.1.3.3.4.4l2-2c-.3-.4-.6-.7-1-.9-.4-.2-.8-.4-1.2-.5-.4-.1-.8-.2-1.3-.2-.4 0-.9 0-1.3.1-.5.1-.9.3-1.3.5-.4.2-.7.6-1 1-.3.4-.4.9-.4 1.5 0 .8.2 1.5.7 2 .5.5 1.2 1 2.1 1.3.4.2.8.3 1.1.4.3.1.6.3.8.4.2.2.4.3.5.5.1.2.2.4.2.7 0 .2 0 .4-.1.6-.1.2-.2.3-.4.4-.2.1-.4.2-.6.3-.2.1-.5.1-.8.1-.5 0-1.1-.1-1.6-.4-.5-.2-.9-.6-1.3-1.1l-2 1.9zM8 17.5H5v-2.6h8.6v2.6h-3v8.6H8v-8.6z" fill="#fff"/></svg>),
  Python: (<svg viewBox="0 0 32 32" width="100%" height="100%"><defs><linearGradient id="pyg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#387EB8"/><stop offset="100%" stopColor="#366994"/></linearGradient><linearGradient id="pyg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FFE052"/><stop offset="100%" stopColor="#FFC331"/></linearGradient></defs><path d="M15.9 3C11 3 11.3 5.1 11.3 5.1v2.1h4.7v.6H8.7S5.9 7.5 5.9 12.5s2.5 4.8 2.5 4.8H10v-2.3s-.1-2.5 2.4-2.5h4.2s2.3 0 2.3-2.2V5.4S19.3 3 15.9 3zm-2.3 1.3c.4 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.4-.8.8-.8z" fill="url(#pyg1)"/><path d="M16.1 29c4.9 0 4.6-2.1 4.6-2.1v-2.1h-4.7v-.6h7.3s2.8.3 2.8-4.7-2.5-4.8-2.5-4.8H22v2.3s.1 2.5-2.4 2.5h-4.2s-2.3 0-2.3 2.2v3.9S12.7 29 16.1 29zm2.3-1.3c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.4.8-.8.8z" fill="url(#pyg2)"/></svg>),
  Java: (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M12.3 22.2s-1 .6.7.8c2 .2 3 .2 5.2-.2 0 0 .6.4 1.4.7-4.9 2.1-11.1-.1-7.3-1.3zM11.7 19.4s-1.1.8.6.9c2.2.2 4 .2 7-.3 0 0 .4.4 1 .6-6.2 1.8-13.1.2-8.6-1.2z" fill="#4E7896"/><path d="M17.4 14.6c1.3 1.5-.3 2.8-.3 2.8s3.2-1.6 1.7-3.7c-1.4-1.9-2.5-2.8 3.4-6-.1 0-9.3 2.3-4.8 6.9z" fill="#4E7896"/><path d="M23.3 24.2s.7.6-.8.9c-2.9.9-12 1.1-14.5.1-1-.4.8-.9 1.3-.9.6-.1.9-.1.9-.1-.9-.7-6.4 1.4-2.7 2 9.9 1.6 18.1-.7 15.8-2zM12.7 16.5s-4.3 1-.6 1.4c1.7.2 5 .1 8.1-.1 2.5-.2 5.1-.7 5.1-.7s-.9.4-1.5.7c-6.2 1.6-18.1.9-14.7-.7 3-1.3 3.6-.6 3.6-.6zM20.9 21c6.3-3.3 3.4-6.4 1.4-6-.5.1-.7.2-.7.2s.2-.3.6-.4c4.3-1.5 7.6 4.5-1.3 6.9 0 0 .1-.1 0-.7z" fill="#4E7896"/><path d="M19.1 3s2.5 2.5-2.3 6.3c-3.8 3-2.8 4.7 0 6.7-2-1.8-3.5-3.4-2.5-4.9 1.4-2.2 5.5-3.3 4.8-8.1z" fill="#E76F00"/><path d="M13.5 28.7c6 .4 15.3-.2 15.5-2.9 0 0-.4 1.1-5 1.9-5.2.9-11.7.8-15.5.2 0 0 .8.6 5 .8z" fill="#4E7896"/></svg>),
  PHP: (<svg viewBox="0 0 32 32" width="100%" height="100%"><ellipse cx="16" cy="16" rx="14" ry="9" fill="#8892be"/><path d="M10.5 13h1.8l-.4 2h1.4c.9 0 1.5.2 1.8.5.3.3.4.8.2 1.5l-.5 2.2h-1.8l.5-2c.1-.3.1-.5 0-.6-.1-.1-.3-.2-.6-.2H12l-.6 2.8h-1.8l1-4.2zM16 13h3.2c.7 0 1.2.2 1.5.6.3.4.4.9.2 1.6-.2.7-.5 1.2-1 1.6-.5.4-1.1.5-1.9.5h-1.4l-.4 1.8h-1.8L16 13zm1.2 1.3l-.5 1.8h1.1c.3 0 .6-.1.8-.3.2-.2.3-.4.4-.7.1-.4 0-.6-.1-.7-.1-.1-.4-.1-.7-.1h-1zM4.5 13h3.2c.7 0 1.2.2 1.5.6.3.4.4.9.2 1.6-.2.7-.5 1.2-1 1.6-.5.4-1.1.5-1.9.5H5.1l-.4 1.8H2.9L4.5 13zm1.2 1.3l-.5 1.8h1.1c.3 0 .6-.1.8-.3.2-.2.3-.4.4-.7.1-.4 0-.6-.1-.7-.1-.1-.4-.1-.7-.1h-1z" fill="#fff"/></svg>),
  "C++": (<svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" fill="#00599c" rx="3"/><path d="M9.5 21.8c-3.3-1.9-3.3-6.8 0-8.7 1.6-.9 3.4-.9 4.9-.2l-.9 1.6c-1-.5-2.2-.5-3.1.1-2 1.2-2 4.4 0 5.6.9.5 2.1.5 3 0l.9 1.6c-1.5.8-3.3.8-4.8 0zm8.3-3.6h-1.3v1.3h-1.3v-1.3h-1.3v-1.3h1.3v-1.3h1.3v1.3h1.3v1.3zm4.4 0h-1.3v1.3h-1.3v-1.3h-1.3v-1.3h1.3v-1.3h1.3v1.3h1.3v1.3z" fill="#fff"/></svg>),
  HTML5: (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M5 3l2.3 25.5L16 31l8.7-2.5L27 3H5z" fill="#e44d26"/><path d="M16 28.8V5.3H25.1l-1.9 21.4L16 28.8z" fill="#f16529"/><path d="M16 13.4h-4.3l-.3-3.4H16V6.7H7.8l.9 10h7.3v-.1zm.1 7.7l-3.6-1-.2-2.5H9l.4 4.6 6.6 1.8.1-.1v-3.8z" fill="#ebebeb"/><path d="M16 13.4v3.3h3.9l-.4 4.3-3.5 1v3.8l6.6-1.8L22 14l.1-1-6.1.4zm0-6.7v3.3h7.5l.2-2.5.2-1H16v.2z" fill="#fff"/></svg>),
  CSS3: (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M5 3l2.3 25.5L16 31l8.7-2.5L27 3H5z" fill="#1572b6"/><path d="M16 28.8V5.3H25.1l-1.9 21.4L16 28.8z" fill="#33a9dc"/><path d="M16 13h4.4l.3-3.4H16V6.3H24.4l-.1.8-.9 9.8-.2 1.1H16V13zm.1 7.4l-.1.1-3.5-1-.2-2.5H9l.4 4.6 6.6 1.8v-3z" fill="#fff"/><path d="M16 13v3.3H12.3l-.3-3.3H16zm0-6.7v3.3h-8.3l-.3-3.3H16z" fill="#ebebeb"/><path d="M16 13h4.4l-.4 4.3-4 1.1v-3.3H19l.2-2.1H16zm0-6.7h4.7l-.2 2.2-.1 1.1H16v-3.3z" fill="#fff"/></svg>),
  React: (<svg viewBox="0 0 32 32" width="100%" height="100%"><circle cx="16" cy="16" r="2.8" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="1.2"><ellipse cx="16" cy="16" rx="12" ry="4.8"/><ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(120 16 16)"/></g></svg>),
  "React Native": (<svg viewBox="0 0 32 32" width="100%" height="100%"><circle cx="16" cy="16" r="2.8" fill="#61dafb"/><g fill="none" stroke="#61dafb" strokeWidth="1.2"><ellipse cx="16" cy="16" rx="12" ry="4.8"/><ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="12" ry="4.8" transform="rotate(120 16 16)"/></g><text x="16" y="29" fontSize="5" fill="#61dafb" textAnchor="middle" fontFamily="Arial" fontWeight="bold">NTV</text></svg>),
  Tailwind: (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M16 7c-3.6 0-5.9 1.8-6.9 5.4 1.4-1.8 3-2.5 4.8-2 1 .3 1.8 1.1 2.6 2 1.3 1.4 2.9 3 5.9 3 3.6 0 5.9-1.8 6.9-5.4-1.4 1.8-3 2.5-4.8 2-1-.3-1.8-1.1-2.6-2C20.6 8.6 19 7 16 7zm-6.9 8c-3.6 0-5.9 1.8-6.9 5.4 1.4-1.8 3-2.5 4.8-2 1 .3 1.8 1.1 2.6 2 1.3 1.4 2.9 3 5.9 3 3.6 0 5.9-1.8 6.9-5.4-1.4 1.8-3 2.5-4.8 2-1-.3-1.8-1.1-2.6-2-1.3-1.4-2.9-3-5.9-3z" fill="#38bdf8"/></svg>),
  "Node.js": (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#3c873a"/><path d="M16 13c-.8 0-1.5.3-2 .9-.5.6-.7 1.3-.7 2.1 0 .8.2 1.5.7 2.1.5.6 1.2.9 2 .9s1.5-.3 2-.9c.5-.6.7-1.3.7-2.1 0-.8-.2-1.5-.7-2.1-.5-.6-1.2-.9-2-.9z" fill="#fff"/></svg>),
  Express: (<svg viewBox="0 0 32 32" width="100%" height="100%"><rect width="32" height="32" fill="#000" rx="3"/><text x="4" y="21" fontSize="11" fill="#fff" fontFamily="Arial" fontWeight="bold">ex</text></svg>),
  MongoDB: (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M17.2 3c0 0-3.3 3.5-3.3 9.3 0 3.7 1.9 6.2 1.9 6.2s-.5 8.5-.6 10.2c0 .4.3.6.6.5.3-.1.5-.4.5-.8-.2-1.7-.5-10.1-.5-10.1s1.9-2.5 1.9-6.1c0-5.7-3.3-9.3-3.3-9.3-.1-.2-.2-.1-.2.1z" fill="#47a248"/></svg>),
  MySQL: (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M2 22.3c1.2.1 2.1-.1 2.9-.5.2-.1.6-.1.6-.5 0-.5-.4-.7-.5-.9-.4-.5-.8-1.1-1.2-1.7-.3-.5-.6-1.1-.9-1.6h-.1c-.2.6-.4 1.2-.5 1.9-.2.8-.2 1.6-.2 2.4 0 .3.1.8.2 1 .2.3.7.3.9.2 0 .1-.3-.1-.2 0l.3-.3zm4.2-.2c.5.6 1.1 1.4 2.1 1.8.5.2 1.1.2 1.7.1 1.2-.2 2.2-.9 2.8-1.8.7-1 1-2.4 1-3.8 0-.8-.2-1.5-.5-2.1-.3-.5-.7-.9-1.1-1.3-1.2-1-2.5-1.4-3.9-1.2-1.2.2-2.1.7-2.7 1.5-.7 1-1 2.2-.9 3.5.1 1.2.6 2.4 1.5 3.3z" fill="#00758f"/><path d="M24.4 21c.1-.1.1-.2.2-.3.4-1.2.3-2.8-.3-4.2-.4-.9-.9-1.6-1.6-2-.3-.2-.7-.4-1.2-.4-.4 0-.7.1-1 .3-.7.3-1.2.9-1.5 1.7-.4.9-.5 2-.3 3.1.2 1.1.7 2.1 1.5 2.7.7.5 1.6.7 2.4.5.7-.2 1.4-.7 1.8-1.4z" fill="#f29111"/></svg>),
  Firebase: (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M7.3 26.1L10.8 5.3l5.6 9.9-9.1 10.9z" fill="#ffa000"/><path d="M14.9 13.5L12.4 8.2l12.3 17.9-9.8-12.6z" fill="#f57c00"/><path d="M7.3 26.1l17.4-2.6L14.9 13.5 10.8 5.3 7.3 26.1z" fill="#ffca28"/><path d="M7.3 26.1l3.5-20.8 4.1 8.2-7.6 12.6z" fill="#ffa000"/></svg>),
  Laravel: (<svg viewBox="0 0 32 32" width="100%" height="100%"><path d="M28.8 8.6c0-.1-.1-.1-.1-.2l-4.2-4.2c-.1-.1-.3-.2-.5-.2H11.3c-.2 0-.4.1-.5.2L3.3 11.8c-.1.1-.2.3-.2.5v14.1c0 .2.1.4.2.5l4.2 4.2c.1.1.3.2.5.2h16.8c.2 0 .4-.1.5-.2l4.2-4.2c.1-.1.2-.3.2-.5V9c0-.1 0-.3-.1-.4zm-1.7 17.1l-3.5 3.5H8.4L5 25.8V12.2l3.5-3.5h15.2l3.5 3.5v13.5z" fill="#ff2d20"/><path d="M20.8 15.5h-3.1v-3.1h-1.6v3.1h-3.1v1.6h3.1v3.1h1.6v-3.1h3.1v-1.6z" fill="#ff2d20"/></svg>),
};

const getTechLogo = (label) => LOGOS[label] || null;

// ── Social Icons ──────────────────────────────────────────────────────────────
const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.261 5.638 5.902-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
};

// ── Orbit Data ────────────────────────────────────────────────────────────────
const ORBIT_1 = [
  { label: "JavaScript", bg: "rgba(247,223,30,0.12)", border: "#f7df1e55" },
  { label: "TypeScript", bg: "rgba(49,120,198,0.12)", border: "#3178c655" },
  { label: "Python",     bg: "rgba(53,114,165,0.12)", border: "#3572a555" },
  { label: "Java",       bg: "rgba(248,152,32,0.12)", border: "#f8982055" },
];
const ORBIT_2 = [
  { label: "HTML5",        bg: "rgba(227,79,38,0.12)",  border: "#e34f2655" },
  { label: "CSS3",         bg: "rgba(21,114,182,0.12)", border: "#1572b655" },
  { label: "React",        bg: "rgba(97,218,251,0.12)", border: "#61dafb55" },
  { label: "React Native", bg: "rgba(97,218,251,0.10)", border: "#61dafb44" },
  { label: "Tailwind",     bg: "rgba(56,189,248,0.12)", border: "#38bdf855" },
];
const ORBIT_3 = [
  { label: "Node.js",  bg: "rgba(104,160,99,0.12)",  border: "#68a06355" },
  { label: "Express",  bg: "rgba(255,255,255,0.07)", border: "#ffffff33" },
  { label: "MongoDB",  bg: "rgba(71,162,72,0.12)",   border: "#47a24855" },
  { label: "MySQL",    bg: "rgba(0,117,143,0.12)",   border: "#00758f55" },
  { label: "Firebase", bg: "rgba(255,202,40,0.12)",  border: "#ffca2855" },
  { label: "Laravel",  bg: "rgba(255,45,32,0.12)",   border: "#ff2d2055" },
  { label: "PHP",      bg: "rgba(136,146,190,0.12)", border: "#8892be55" },
  { label: "C++",      bg: "rgba(0,89,156,0.12)",    border: "#00599c55" },
];

function OrbitRing({ techs, radius, duration, reverse = false, iconSize = 38 }) {
  const angleRef     = useRef(0);
  const frameRef     = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [scaledIconSize, setScaledIconSize] = useState(iconSize);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setScaledIconSize(iconSize * 0.6);
      } else if (window.innerWidth <= 768) {
        setScaledIconSize(iconSize * 0.7);
      } else if (window.innerWidth <= 1024) {
        setScaledIconSize(iconSize * 0.85);
      } else {
        setScaledIconSize(iconSize);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [iconSize]);

  useEffect(() => {
    const speed = (2 * Math.PI) / (duration * 60);
    const dir   = reverse ? -1 : 1;
    const count = techs.length;
    const animate = () => {
      angleRef.current += speed * dir;
      if (containerRef.current) {
        const children = containerRef.current.children;
        for (let i = 0; i < count; i++) {
          const base = (i / count) * 2 * Math.PI;
          const a    = base + angleRef.current;
          const x    = Math.cos(a) * radius;
          const y    = Math.sin(a) * radius;
          if (children[i]) {
            children[i].style.transform = `translate(${x - scaledIconSize / 2}px, ${y - scaledIconSize / 2}px)`;
            const inner = children[i].querySelector(".inner");
            if (inner) inner.style.transform = `rotate(${-(angleRef.current + base)}rad)`;
          }
        }
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [techs, radius, duration, reverse, scaledIconSize]);

  return (
    <>
      <svg style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:2 }}
        width={radius*2+scaledIconSize+20} height={radius*2+scaledIconSize+20}
        viewBox={`${-radius-scaledIconSize/2-10} ${-radius-scaledIconSize/2-10} ${radius*2+scaledIconSize+20} ${radius*2+scaledIconSize+20}`}>
        <circle cx={0} cy={0} r={radius} fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="1" strokeDasharray="4 8"/>
      </svg>
      <div ref={containerRef} style={{ position:"absolute", top:"50%", left:"50%", width:0, height:0, zIndex:3 }}>
        {techs.map((t, i) => (
          <div key={t.label} style={{ position:"absolute", width:scaledIconSize, height:scaledIconSize, willChange:"transform" }}>
            <div className="inner" title={t.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: scaledIconSize, height: scaledIconSize, borderRadius: "50%",
                background: hovered === i ? t.bg.replace(/[\d.]+\)$/, m => (parseFloat(m)*2.5).toFixed(2)+")") : t.bg,
                border: `1.5px solid ${hovered === i ? t.border.slice(0,-2)+"cc" : t.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "default", transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                transform: hovered === i ? "scale(1.3)" : "scale(1)",
                position: "relative",
                boxShadow: hovered === i ? `0 0 12px ${t.border.slice(0,-2)}88` : "none",
              }}>
              {getTechLogo(t.label)}
              {hovered === i && (
                <div style={{
                  position:"absolute", bottom:"calc(100% + 6px)", left:"50%", transform:"translateX(-50%)",
                  background:"rgba(4,10,20,0.97)", border:"1px solid rgba(56,189,248,0.3)",
                  borderRadius:6, padding:"3px 9px", whiteSpace:"nowrap",
                  fontFamily:"'Inter',sans-serif", fontSize:10, color:"#fff",
                  pointerEvents:"none", zIndex:30, animation:"fadeUp 0.15s ease",
                }}>
                  {t.label}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Main Portfolio Component ──────────────────────────────────────────────────
export default function Portfolio() {
  const [loading, setLoading]   = useState(true);
  const [loaded, setLoaded]     = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [typedText, setTypedText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const canvasRef    = useRef(null);
  const cursorRef    = useRef(null);
  const ringRef      = useRef(null);
  const mousePos     = useRef({ x: 0, y: 0 });
  const ringPos      = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleLoadingDone = () => {
    setLoading(false);
    setTimeout(() => setLoaded(true), 100);
  };

  useEffect(() => {
    if (loading || isMobile) return;
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX+"px"; cursorRef.current.style.top = e.clientY+"px"; }
    };
    window.addEventListener("mousemove", onMove);
    const lerp = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = ringPos.current.x+"px"; ringRef.current.style.top = ringPos.current.y+"px"; }
      animFrameRef.current = requestAnimationFrame(lerp);
    };
    lerp();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(animFrameRef.current); };
  }, [loading, isMobile]);

  useEffect(() => {
    if (loading) return;
    const roles = ["Full Stack Developer", "Frontend Developer", "React Specialist", "Creative Coder"];
    let ri=0, ci=0, deleting=false, wait=0, timeout;
    const tick = () => {
      const word = roles[ri];
      if (!deleting) { ci++; setTypedText(word.slice(0,ci)); if (ci===word.length){wait++; if(wait>30){deleting=true;wait=0;}} }
      else { ci--; setTypedText(word.slice(0,ci)); if(ci===0){deleting=false;ri=(ri+1)%roles.length;} }
      timeout = setTimeout(tick, deleting?60:90);
    };
    const init = setTimeout(tick, 400);
    return () => { clearTimeout(init); clearTimeout(timeout); };
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    
    const particleCount = isMobile ? 20 : (isTablet ? 35 : 55);
    const particles = Array.from({length: particleCount}, () => ({
      x: Math.random()*canvas.width, y: Math.random()*canvas.height,
      vx: (Math.random()-.5)*.3, vy: (Math.random()-.5)*.3,
      size: Math.random()*1.5+.5, opacity: Math.random()*.35+.08,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const mx=mousePos.current.x, my=mousePos.current.y;
      particles.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
        if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
        const dx=p.x-mx, dy=p.y-my, dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120&&dist>0){const f=.5*(1-dist/120);p.vx+=(dx/dist)*f*.02;p.vy+=(dy/dist)*f*.02;}
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
        ctx.fillStyle=`rgba(56,189,248,${p.opacity})`; ctx.fill();
        particles.forEach(p2=>{
          const d=Math.hypot(p.x-p2.x,p.y-p2.y);
          if(d<100){ctx.strokeStyle=`rgba(56,189,248,${.07*(1-d/100)})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();}
        });
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", handleResize); };
  }, [loading, isMobile, isTablet]);

  const addRipple = (e) => {
    const btn=e.currentTarget, rect=btn.getBoundingClientRect();
    const size=Math.max(rect.width,rect.height)*2;
    const r=document.createElement("span");
    r.style.cssText=`position:absolute;border-radius:50%;background:rgba(56,189,248,0.3);width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;animation:ripple .6s ease-out forwards;pointer-events:none;`;
    btn.appendChild(r); setTimeout(()=>r.remove(),600);
  };

  const tiltAvatar = (e,el) => {
    if (isMobile) return;
    const r=el.getBoundingClientRect();
    el.style.transform=`perspective(700px) rotateY(${((e.clientX-r.left-r.width/2)/r.width)*16}deg) rotateX(${-((e.clientY-r.top-r.height/2)/r.height)*16}deg)`;
  };
  const resetTilt = (el) => { if (!isMobile) el.style.transform=""; };

  const onHoverEnter = () => {
    if (isMobile) return;
    if(cursorRef.current){cursorRef.current.style.width="20px";cursorRef.current.style.height="20px";cursorRef.current.style.opacity=".6";}
    if(ringRef.current){ringRef.current.style.width="50px";ringRef.current.style.height="50px";}
  };
  const onHoverLeave = () => {
    if (isMobile) return;
    if(cursorRef.current){cursorRef.current.style.width="12px";cursorRef.current.style.height="12px";cursorRef.current.style.opacity="1";}
    if(ringRef.current){ringRef.current.style.width="36px";ringRef.current.style.height="36px";}
  };

  const fade = (d) => ({
    opacity: loaded?1:0,
    transform: loaded?"translateY(0)":"translateY(20px)",
    transition:`opacity .6s ease ${d}s, transform .6s ease ${d}s`,
  });

  const socials = [
    { key: "Facebook",  Icon: SocialIcons.Facebook,  href: "#" },
    { key: "X",         Icon: SocialIcons.X,          href: "#" },
    { key: "LinkedIn",  Icon: SocialIcons.LinkedIn,   href: "#" },
    { key: "GitHub",    Icon: SocialIcons.GitHub,     href: "#" },
    { key: "Instagram", Icon: SocialIcons.Instagram,  href: "#" },
  ];

  const getOrbitRadii = () => {
    if (isMobile) {
      return { orbit1: 80, orbit2: 125, orbit3: 170 };
    } else if (isTablet) {
      return { orbit1: 110, orbit2: 165, orbit3: 225 };
    }
    return { orbit1: 128, orbit2: 192, orbit3: 262 };
  };

  const getIconSizes = () => {
    if (isMobile) return { orbit1: 30, orbit2: 28, orbit3: 26 };
    if (isTablet) return { orbit1: 34, orbit2: 32, orbit3: 30 };
    return { orbit1: 38, orbit2: 36, orbit3: 32 };
  };

  const renderPage = () => {
    switch(activePage) {
      case "about": return <About />;
      case "achievements": return <Achievements />;
      case "projects": return <Projects />;
      case "contact": return <Contact />;
      default: return (
        <div style={{flex:1,display:"flex",position:"relative",zIndex:3,overflow:"auto",flexDirection: isMobile ? "column" : "row"}}>
          {/* LEFT */}
          <div style={{
            width: isMobile ? "100%" : (isTablet ? "50%" : "46%"),
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            padding: isMobile ? "20px 20px 40px 20px" : (isTablet ? "0 24px 40px 32px" : "0 32px 40px 48px"),
            flexShrink:0
          }}>
            <div style={fade(.1)}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(56,189,248,.08)",border:"1px solid rgba(56,189,248,.2)",borderRadius:20,padding:"4px 14px",marginBottom:18}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:"#38bdf8",animation:"glowPulse 1.5s infinite",display:"inline-block"}}/>
                <span style={{fontFamily:"'Inter',sans-serif",fontSize:"clamp(9px, 2.5vw, 11px)",color:"#38bdf8",letterSpacing:".08em"}}>AVAILABLE FOR WORK</span>
              </div>

              <div style={{marginBottom:4}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(24px, 6vw, 36px)",lineHeight:1.1,letterSpacing:"-.01em"}}>
                  <span className="name-gradient">Hi, I'm Mark Ranier</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:12,marginTop:4,flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(24px, 6vw, 36px)",color:"#fff",letterSpacing:"-.01em",lineHeight:1.1}}>
                  Maestre
                  </span>
                  <div style={{flex:1,maxWidth:80,height:3,background:"linear-gradient(90deg,#38bdf8,transparent)",borderRadius:2}}/>
                  <div style={{width:6,height:6,borderRadius:"50%",background:"#38bdf8",boxShadow:"0 0 8px #38bdf8"}}/>
                </div>
              </div>
            </div>

            <div style={{...fade(.2),marginTop:8,marginBottom:14,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"clamp(11px, 2.5vw, 17px)",color:"#38bdf8"}}>{typedText}</span>
              <span style={{color:"#38bdf8",fontSize:16,animation:"blink 1s infinite"}}>|</span>
            </div>

            <div style={{...fade(.28),marginBottom:18}}>
              <p style={{fontFamily:"'Inter',sans-serif",fontWeight:300,fontSize:"clamp(11px, 3vw, 13px)",color:"rgba(255,255,255,.42)",lineHeight:1.85,maxWidth:isMobile ? "100%" : (isTablet ? 320 : 360)}}>
                4th Year BSIT student at{" "}
                <span style={{color:"rgba(56,189,248,0.7)"}}>Technological University of the Philippines – Taguig</span>,
                I build web and mobile applications and continuously learn new technologies to improve my skills.
              </p>
            </div>

            <div style={{...fade(.38),display:"flex",gap:12,marginBottom:22,flexWrap:"wrap"}}>
              <button className="btn-primary" onClick={addRipple} onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>
                Download CV
              </button>
              <button className="btn-secondary" onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>Explore my projects</button>
            </div>

            <div style={{...fade(.44),width:"100%",maxWidth:200,height:"1px",background:"linear-gradient(90deg,rgba(56,189,248,0.3),transparent)",marginBottom:16}}/>

            <div style={{...fade(.5),display:"flex",gap:10,flexWrap:"wrap"}}>
              {socials.map(({ key, Icon, href }) => (
                <a key={key} className="social-icon" href={href} title={key} onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{
            flex:1,
            position:"relative",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            overflow:"hidden",
            minHeight: isMobile ? "380px" : (isTablet ? "450px" : "auto"),
            marginTop: isMobile ? "0" : 0,
            padding: isMobile ? "20px 0" : 0
          }}>
            <div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"55%",height:"55%",background:"radial-gradient(ellipse,rgba(56,189,248,.07) 0%,transparent 70%)",animation:"glowPulse 5s ease-in-out infinite",zIndex:1}}/>

            {!isMobile && !isTablet && (
              <svg style={{position:"absolute",top:"10%",right:"8%",zIndex:5,opacity:.6}} width="90" height="180" viewBox="0 0 90 180" fill="none">
                <line x1="85" y1="0" x2="5" y2="180" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round"/>
                <line x1="62" y1="0" x2="0" y2="135" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" opacity=".4"/>
              </svg>
            )}

            {(() => {
              const radii = getOrbitRadii();
              const sizes = getIconSizes();
              return (
                <>
                  <OrbitRing techs={ORBIT_1} radius={radii.orbit1} duration={22} reverse={false} iconSize={sizes.orbit1}/>
                  <OrbitRing techs={ORBIT_2} radius={radii.orbit2} duration={32} reverse={true}  iconSize={sizes.orbit2}/>
                  <OrbitRing techs={ORBIT_3} radius={radii.orbit3} duration={44} reverse={false} iconSize={sizes.orbit3}/>
                </>
              );
            })()}

            <div
              style={{position:"relative",zIndex:4,animation:"floatImg 5s ease-in-out infinite",cursor:"pointer",...fade(.2)}}
              onMouseMove={e=>tiltAvatar(e,e.currentTarget)}
              onMouseLeave={e=>resetTilt(e.currentTarget)}
            >
              <img
                src={avatar}
                alt="Mark Ranier Maestre"
                style={{height:"clamp(150px, 30vh, 360px)",width:"auto",objectFit:"cover",objectPosition:"top center",display:"block",filter:"drop-shadow(0 0 40px rgba(56,189,248,.28))"}}
              />
              <div style={{position:"absolute",inset:-4,borderRadius:20,border:"1px solid rgba(56,189,248,.18)",pointerEvents:"none"}}/>
            </div>

            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:6,height:6,borderRadius:"50%",background:"#38bdf8",boxShadow:"0 0 20px 6px rgba(56,189,248,.3)",zIndex:1}}/>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@300;400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{width:100%;height:100%;overflow:hidden;}
        
        @keyframes floatImg {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes glowPulse{0%,100%{opacity:.6}50%{opacity:1}}
        @keyframes blink    {0%,100%{opacity:1}50%{opacity:0}}
        @keyframes scanline {0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
        @keyframes ripple   {0%{transform:scale(0);opacity:.6}100%{transform:scale(4);opacity:0}}
        @keyframes fadeUp   {from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer  {0%{background-position:200% center}100%{background-position:-200% center}}
        
        .navlink{font-family:'Inter',sans-serif;font-size:clamp(10px, 3vw, 13px);color:rgba(255,255,255,.5);text-decoration:none;letter-spacing:.04em;transition:color .2s,transform .2s;display:inline-block;cursor:pointer;white-space:nowrap;}
        .navlink:hover{color:#38bdf8;transform:translateY(-2px);}
        .navlink.active{color:#38bdf8;}
        
        .btn-primary{background:#38bdf8;color:#030b1a;border:none;border-radius:6px;padding:clamp(7px, 2.5vw, 11px) clamp(16px, 5vw, 28px);font-family:'Syne',sans-serif;font-weight:700;font-size:clamp(10px, 2.5vw, 13px);letter-spacing:.05em;cursor:pointer;position:relative;overflow:hidden;transition:background .2s,transform .15s,box-shadow .2s;}
        .btn-primary:hover{background:#7dd3fc;transform:translateY(-2px);box-shadow:0 8px 24px rgba(56,189,248,.35);}
        
        .btn-secondary{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.3);border-radius:6px;padding:clamp(7px, 2.5vw, 11px) clamp(16px, 5vw, 28px);font-family:'Syne',sans-serif;font-weight:700;font-size:clamp(10px, 2.5vw, 13px);cursor:pointer;transition:border-color .2s,color .2s,transform .15s;}
        .btn-secondary:hover{border-color:#38bdf8;color:#38bdf8;transform:translateY(-2px);}
        
        .social-icon{width:clamp(28px, 8vw, 34px);height:clamp(28px, 8vw, 34px);border-radius:50%;border:1.5px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s,background .2s,color .2s,transform .2s;color:rgba(255,255,255,.5);text-decoration:none;}
        .social-icon:hover{border-color:#38bdf8;background:rgba(56,189,248,.1);color:#38bdf8;transform:scale(1.15);}
        
        @media (max-width: 768px) {
          .social-icon:hover { transform: scale(1.05); }
          .btn-primary:hover, .btn-secondary:hover { transform: translateY(-1px); }
        }
        
        #portfolio-cursor{position:fixed;width:12px;height:12px;background:#38bdf8;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .2s,height .2s,opacity .2s;mix-blend-mode:screen;}
        #portfolio-ring{position:fixed;width:36px;height:36px;border:1.5px solid rgba(56,189,248,.5);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .12s ease,height .12s ease;}
        
        @media (max-width: 768px) {
          #portfolio-cursor, #portfolio-ring { display: none; }
        }
        
        .name-gradient{background:linear-gradient(135deg,#fff 0%,#38bdf8 40%,#7dd3fc 60%,#fff 100%);background-size:300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 6s linear infinite;}
        .name-sub{display:block;font-size:clamp(10px, 2.5vw, 15px);font-weight:400;color:rgba(56,189,248,0.7);letter-spacing:.18em;text-transform:uppercase;margin-top:2px;-webkit-text-fill-color:rgba(56,189,248,0.7);}
        
        @media (max-width: 480px) {
          nav { padding: 0 12px !important; }
          .navlink { margin: 0 4px !important; font-size: 10px !important; }
        }
        
        @media (max-width: 768px) and (min-width: 481px) {
          nav { padding: 0 20px !important; }
          .navlink { margin: 0 8px !important; }
        }
      `}</style>

      {loading && <LoadingScreen onDone={handleLoadingDone} />}

      {!loading && (
        <>
          {!isMobile && <div id="portfolio-cursor" ref={cursorRef}/>}
          {!isMobile && <div id="portfolio-ring"   ref={ringRef}/>}

          <div style={{width:"100vw",height:"100vh",background:"#060e1a",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
            <canvas ref={canvasRef} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}}/>
            <div style={{position:"absolute",bottom:"-20%",left:"-10%",width:"65vw",height:"65vh",background:"radial-gradient(ellipse,rgba(0,120,220,.45) 0%,rgba(0,60,140,.2) 40%,transparent 70%)",pointerEvents:"none",zIndex:0,animation:"glowPulse 4s ease-in-out infinite"}}/>
            <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.008) 2px,rgba(255,255,255,.008) 4px)",pointerEvents:"none",zIndex:2}}/>
            {!isMobile && <div style={{position:"absolute",top:0,left:0,width:"100%",height:"60px",background:"linear-gradient(to bottom,transparent,rgba(56,189,248,.03),transparent)",pointerEvents:"none",zIndex:2,animation:"scanline 6s linear infinite"}}/>}

            {/* NAV */}
            <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding: isMobile ? "0 16px" : (isTablet ? "0 32px" : "0 48px"),height:"clamp(48px, 10vh, 62px)",zIndex:10,position:"relative",flexShrink:0}}>
              <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(16px, 5vw, 20px)",color:"#fff"}}>Mark<span style={{color:"#38bdf8"}}>.</span></span>
              <div style={{display:"flex",gap: isMobile ? "8px" : (isTablet ? "20px" : "32px"),alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
                {["home","about","achievements","projects","contact"].map((page,i)=>(
                  <a key={page} 
                     className={`navlink ${activePage === page ? "active" : ""}`} 
                     onClick={() => setActivePage(page)}
                     onMouseEnter={onHoverEnter} 
                     onMouseLeave={onHoverLeave}
                     style={{cursor:"pointer"}}>
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </a>
                ))}
              </div>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#38bdf8",boxShadow:"0 0 8px #38bdf8",animation:"glowPulse 2s infinite"}}/>
            </nav>

            {/* Page Content */}
            {renderPage()}

            {/* Scroll indicator - only show on home page and desktop */}
            {activePage === "home" && !isMobile && !isTablet && (
              <div
                style={{position:"absolute",bottom:18,left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:.5,cursor:"pointer",transition:"opacity .2s"}}
                onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                onMouseLeave={e=>e.currentTarget.style.opacity=".5"}
              >
                <span style={{fontFamily:"'Inter',sans-serif",fontSize:10,color:"rgba(255,255,255,.5)",letterSpacing:".1em"}}>SCROLL</span>
                <div style={{width:1,height:28,background:"linear-gradient(to bottom,#38bdf8,transparent)"}}/>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}