import { useState, useEffect, useRef } from "react";

export default function Projects() {
  const [active, setActive] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [filterChanging, setFilterChanging] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const searchRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const pts = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      dur: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.3 + 0.05,
    }));
    setParticles(pts);
  }, []);

  useEffect(() => {
    const handler = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const projects = [
    {
      tag: "capstone",
      title: "SolidWaste",
      tech: ["React Native", "TensorFlow", "Image Recognition", "ML"],
      desc: "AI-powered waste management system that detects and classifies biodegradable, recyclable, and non-biodegradable materials using image recognition and machine learning.",
      link: "https://github.com/markmaestre/SolidWaste",
    },
    {
      tag: "mobile",
      title: "TUP Thesis Library",
      tech: ["Python", "Mobile", "Digital Catalog", "Borrowing System"],
      desc: "Mobile-based thesis library system supporting digital catalog browsing, borrowing, and transaction tracking for academic research management.",
      link: "https://github.com/markmaestre/library",
    },
    {
      tag: "mobile",
      title: "SmartFarm",
      tech: ["Mobile", "AI Disease Detection", "Weather API", "E-Learning"],
      desc: "Empowers small-scale farmers with crop guidance, AI-powered disease detection, real-time weather alerts, and direct market access.",
      link: "https://github.com/markmaestre/SmartFarm",
    },
    {
      tag: "mobile",
      title: "MelodyMix",
      tech: ["Mobile", "Music Streaming", "E-Commerce", "Merchandise"],
      desc: "A Spotify-inspired streaming app with a built-in merchandise store — users can listen to tracks and purchase exclusive artist merch all in one place.",
      link: "https://github.com/markmaestre/MelodyMixss",
    },
    {
      tag: "mobile",
      title: "Chatbot",
      tech: ["Python", "Flask", "PostgreSQL", "Cohere AI", "NLP"],
      desc: "Bilingual chatbot (English & Tagalog) built with Flask and PostgreSQL that tracks user history and generates intelligent responses via Cohere's AI API.",
      link: "https://github.com/markmaestre/chat",
    },
    {
      tag: "web",
      title: "Laptop Store",
      tech: ["PHP", "E-Commerce", "Product Management", "Secure Payments"],
      desc: "PHP-based e-commerce platform for browsing, purchasing, and managing laptop products with secure transactions and an intuitive shopping experience.",
      link: "https://github.com/markmaestre/laptop",
    },
    {
      tag: "web",
      title: "Charmstep",
      tech: ["PHP", "Footwear E-Commerce", "Order Management", "Filtering"],
      desc: "PHP-based footwear e-commerce site with product filtering, secure payments, and order history management for a smooth online shoe shopping experience.",
      link: "https://github.com/markmaestre/charmstep",
    },
    {
      tag: "web",
      title: "PhoneFlex",
      tech: ["JavaScript", "E-Commerce", "Product Management", "Secure Payments"],
      desc: "JavaScript-based web platform for browsing, purchasing, and managing phone products with secure transactions and an intuitive product management interface.",
      link: "https://github.com/markmaestre/Phoneflex-main",
    },
  ];

  const filters = [
    { key: "all", label: "All Projects" },
    { key: "capstone", label: "Capstone" },
    { key: "mobile", label: "Mobile Apps" },
    { key: "web", label: "Web Apps" },
  ];

  const filtered = projects.filter((p) => {
    const matchTag = active === "all" || p.tag === active;
    const q = searchTerm.toLowerCase();
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q));
    return matchTag && matchQ;
  });

  const filterCounts = {
    all: projects.length,
    capstone: projects.filter((p) => p.tag === "capstone").length,
    mobile: projects.filter((p) => p.tag === "mobile").length,
    web: projects.filter((p) => p.tag === "web").length,
  };

  const tagMeta = {
    capstone: {
      label: "Capstone",
      accent: "#3b82f6",
      glow: "rgba(59,130,246,0.22)",
      bg: "rgba(59,130,246,0.07)",
      border: "rgba(59,130,246,0.2)",
      text: "#60a5fa",
    },
    mobile: {
      label: "Mobile",
      accent: "#10b981",
      glow: "rgba(16,185,129,0.22)",
      bg: "rgba(16,185,129,0.07)",
      border: "rgba(16,185,129,0.2)",
      text: "#34d399",
    },
    web: {
      label: "Web",
      accent: "#f59e0b",
      glow: "rgba(245,158,11,0.22)",
      bg: "rgba(245,158,11,0.07)",
      border: "rgba(245,158,11,0.2)",
      text: "#fbbf24",
    },
  };

  const icons = {
    capstone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    mobile: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    web: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    search: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    github: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.742 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
    arrow: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    grid: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    externalLink: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
  };

  const filterIcons = { all: icons.grid, capstone: icons.capstone, mobile: icons.mobile, web: icons.web };

  // Stagger cards whenever filter/search changes
  useEffect(() => {
    setVisibleCards([]);
    const timeouts = filtered.map((_, i) => {
      const t = setTimeout(() => setVisibleCards((prev) => [...prev, i]), i * 70);
      return t;
    });
    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, searchTerm]);

  const handleFilterChange = (key) => {
    if (key === active) return;
    setFilterChanging(true);
    setTimeout(() => {
      setActive(key);
      setFilterChanging(false);
    }, 130);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #08080f 0%, #0e0e1c 50%, #131328 100%)",
        padding: "72px 20px 96px",
        overflowX: "hidden",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        @keyframes floatUp {
          0%,100% { transform: translateY(0) translateX(0); opacity: var(--op); }
          33%      { transform: translateY(-28px) translateX(10px); opacity: calc(var(--op)*1.6); }
          66%      { transform: translateY(-14px) translateX(-8px); opacity: calc(var(--op)*0.6); }
        }
        @keyframes heroIn    { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbPulse  { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.18);opacity:.3} }
        @keyframes scanLine  { from{top:-30%} to{top:110%} }
        @keyframes ctaFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes underlineGrow { from{width:0;opacity:0} to{width:72px;opacity:1} }
        @keyframes countIn   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dotPulse  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.6)} }
        @keyframes borderGlow { 0%,100%{opacity:.5} 50%{opacity:1} }

        .proj-card {
          will-change: transform, box-shadow;
          transition: transform .3s cubic-bezier(.22,1,.36,1),
                      box-shadow .3s ease,
                      border-color .3s ease,
                      background .3s ease !important;
        }
        .proj-card:hover { transform: translateY(-8px) scale(1.013) !important; }
        .proj-card:hover .c-top-bar  { transform: scaleX(1) !important; }
        .proj-card:hover .c-icon-box { transform: rotate(8deg) scale(1.1) !important; }
        .proj-card:hover .c-gh-btn   { transform: translateX(3px) !important; }
        .proj-card:hover .c-glow     { opacity: 1 !important; }
        .proj-card:hover .c-scan     { opacity: 1 !important; animation: scanLine 2.4s linear infinite !important; }

        .f-btn {
          cursor: pointer; border: none; font-family: inherit;
          transition: all .22s cubic-bezier(.22,1,.36,1);
        }
        .f-btn:hover  { transform: translateY(-2px); }
        .f-btn:active { transform: scale(0.95); }

        .tech-chip {
          transition: background .18s, color .18s, transform .18s;
        }
        .tech-chip:hover {
          background: rgba(255,255,255,0.12) !important;
          color: #fff !important;
          transform: scale(1.06);
        }

        .search-inp:focus {
          border-color: rgba(255,255,255,0.22) !important;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.04) !important;
          outline: none;
        }

        .cta-btn {
          transition: transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s;
        }
        .cta-btn:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 36px rgba(0,0,0,.45) !important;
        }
        .cta-btn:active { transform: scale(.97) !important; }
      `}</style>

      {/* Floating particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "#fff",
              "--op": p.opacity,
              opacity: p.opacity,
              animation: `floatUp ${p.dur}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Mouse-follow orb */}
      <div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.055) 0%, transparent 70%)",
          transform: `translate(${mousePos.x - 320}px, ${mousePos.y - 320}px)`,
          transition: "transform 0.9s cubic-bezier(.22,1,.36,1)",
        }}
      />

      {/* Static bg orbs */}
      <div style={{ position: "fixed", top: -130, right: -130, width: 580, height: 580, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0, animation: "orbPulse 9s ease-in-out infinite" }} />
      <div style={{ position: "fixed", bottom: -110, left: -110, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0, animation: "orbPulse 12s 3s ease-in-out infinite" }} />

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px", borderRadius: 999, marginBottom: 28, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)", animation: "slideDown .6s .05s ease both", opacity: 0 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#818cf8", display: "inline-block", animation: "dotPulse 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, color: "#a5b4fc", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
              Portfolio
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(42px,6vw,70px)", fontWeight: 700, letterSpacing: "-2.5px", lineHeight: 1.07, marginBottom: 18, background: "linear-gradient(135deg,#fff 0%,rgba(255,255,255,.82) 45%,rgba(165,180,252,.65) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "heroIn .7s .12s ease both", opacity: 0 }}>
            My Projects
          </h1>

          {/* Animated underline */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
            <div style={{ height: 2, background: "linear-gradient(90deg,transparent,#818cf8,transparent)", animation: "underlineGrow .85s .45s ease both", opacity: 0 }} />
          </div>

          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 440, margin: "0 auto", animation: "heroIn .7s .22s ease both", opacity: 0 }}>
            Building innovative solutions with modern technologies and thoughtful design
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 36, marginTop: 36, animation: "slideDown .6s .38s ease both", opacity: 0 }}>
            {[
              { val: projects.length, label: "Total projects" },
              { val: filterCounts.mobile, label: "Mobile apps" },
              { val: filterCounts.web, label: "Web apps" },
              { val: filterCounts.capstone, label: "Capstone" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", animation: `countIn .5s ${0.42 + i * 0.07}s ease both`, opacity: 0 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search ── */}
        <div style={{ maxWidth: 440, margin: "0 auto 22px", animation: "slideDown .6s .32s ease both", opacity: 0 }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.28)", pointerEvents: "none" }}>
              {icons.search}
            </span>
            <input
              ref={searchRef}
              className="search-inp"
              style={{ width: "100%", padding: "12px 40px 12px 40px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", color: "#fff", fontSize: 14, fontFamily: "inherit", transition: "border-color .2s, box-shadow .2s", boxSizing: "border-box" }}
              placeholder="Search projects, tech, or description…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.1)", border: "none", color: "rgba(255,255,255,0.5)", width: 22, height: 22, borderRadius: "50%", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}
              >×</button>
            )}
          </div>
        </div>

        {/* ── Filters ── */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 16, animation: "slideDown .6s .4s ease both", opacity: 0 }}>
          {filters.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                className="f-btn"
                onClick={() => handleFilterChange(f.key)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 999, background: isActive ? "rgba(129,140,248,0.14)" : "rgba(255,255,255,0.03)", border: `1px solid ${isActive ? "rgba(129,140,248,0.38)" : "rgba(255,255,255,0.07)"}`, color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: isActive ? 600 : 400, boxShadow: isActive ? "0 0 22px rgba(129,140,248,0.1)" : "none" }}
              >
                <span style={{ color: isActive ? "#a5b4fc" : "rgba(255,255,255,0.28)" }}>{filterIcons[f.key]}</span>
                {f.label}
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: isActive ? "rgba(129,140,248,0.18)" : "rgba(255,255,255,0.06)", color: isActive ? "#c7d2fe" : "rgba(255,255,255,0.28)", fontWeight: 600, transition: "all .2s" }}>
                  {filterCounts[f.key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result info */}
        <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.2)", marginBottom: 40, letterSpacing: "0.02em" }}>
          Showing {filtered.length} of {projects.length} projects
        </div>

        {/* ── Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
            marginBottom: 80,
            opacity: filterChanging ? 0 : 1,
            transform: filterChanging ? "translateY(6px)" : "translateY(0)",
            transition: "opacity .13s, transform .13s",
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "56px 0", color: "rgba(255,255,255,0.22)", fontSize: 14 }}>
              No projects match your search.
            </div>
          ) : (
            filtered.map((p, i) => {
              const meta = tagMeta[p.tag];
              const isHovered = hoveredCard === i;
              const isVis = visibleCards.includes(i);
              return (
                <div
                  key={p.title}
                  className="proj-card"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: isHovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.025)",
                    border: `1px solid ${isHovered ? meta.border : "rgba(255,255,255,0.07)"}`,
                    borderRadius: 20,
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    backdropFilter: "blur(16px)",
                    boxShadow: isHovered ? `0 22px 64px rgba(0,0,0,.35), 0 0 0 1px ${meta.border}` : "none",
                    opacity: isVis ? 1 : 0,
                    transform: isVis ? "translateY(0) scale(1)" : "translateY(22px) scale(0.97)",
                    transition: `opacity .4s ${i * 0.06}s ease, transform .4s ${i * 0.06}s cubic-bezier(.22,1,.36,1)`,
                  }}
                >
                  {/* Animated top accent bar */}
                  <div
                    className="c-top-bar"
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)`,
                      transformOrigin: "left",
                      transform: "scaleX(0)",
                      transition: "transform .35s cubic-bezier(.22,1,.36,1)",
                    }}
                  />

                  {/* Scan line */}
                  <div
                    className="c-scan"
                    style={{
                      position: "absolute", left: 0, right: 0, height: "35%",
                      background: `linear-gradient(to bottom, transparent, ${meta.glow}, transparent)`,
                      pointerEvents: "none", opacity: 0,
                      transition: "opacity .3s",
                    }}
                  />

                  {/* Corner glow */}
                  <div
                    className="c-glow"
                    style={{
                      position: "absolute", top: -60, right: -60, width: 220, height: 220,
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${meta.glow} 0%, transparent 70%)`,
                      pointerEvents: "none", opacity: 0,
                      transition: "opacity .35s",
                    }}
                  />

                  {/* Card content */}
                  <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div
                        className="c-icon-box"
                        style={{
                          width: 48, height: 48, borderRadius: 14,
                          background: meta.bg, border: `1px solid ${meta.border}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: meta.text, flexShrink: 0,
                          transition: "transform .3s cubic-bezier(.22,1,.36,1)",
                        }}
                      >
                        {icons[p.tag]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", marginBottom: 7 }}>{p.title}</div>
                        <span
                          style={{
                            display: "inline-block", fontSize: 10, fontWeight: 600,
                            padding: "3px 10px", borderRadius: 999,
                            background: meta.bg, border: `1px solid ${meta.border}`, color: meta.text,
                            letterSpacing: "0.05em", textTransform: "uppercase",
                          }}
                        >
                          {meta.label}
                        </span>
                      </div>
                    </div>

                    {/* Tech chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="tech-chip"
                          style={{ fontSize: 11, padding: "4px 11px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.72, margin: 0 }}>
                      {p.desc}
                    </p>

                    {/* Footer */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 14, marginTop: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="c-gh-btn"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 7,
                          fontSize: 13, fontWeight: 500, color: meta.text,
                          textDecoration: "none", padding: "7px 16px", borderRadius: 9,
                          background: meta.bg, border: `1px solid ${meta.border}`,
                          transition: "transform .22s cubic-bezier(.22,1,.36,1), opacity .2s",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {icons.github}
                        View on GitHub
                        <span style={{ opacity: 0.55 }}>{icons.externalLink}</span>
                      </a>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.17)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {p.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── CTA ── */}
        <div
          style={{
            background: "rgba(255,255,255,0.025)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "52px 32px",
            textAlign: "center",
            backdropFilter: "blur(16px)",
            maxWidth: 640,
            margin: "0 auto",
            position: "relative",
            overflow: "hidden",
            animation: mounted ? "slideDown .7s .48s ease both" : "none",
            opacity: 0,
          }}
        >
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "rgba(255,255,255,0.65)", animation: "ctaFloat 3.5s ease-in-out infinite", position: "relative" }}>
            {icons.github}
          </div>

          <div style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 10, position: "relative" }}>
            Want to see more?
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: 30, maxWidth: 380, marginLeft: "auto", marginRight: "auto", position: "relative" }}>
            Check out my complete portfolio on GitHub — detailed documentation, source code, and more projects.
          </p>
          <a
            href="https://github.com/markmaestre"
            target="_blank"
            rel="noreferrer"
            className="cta-btn"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 30px", borderRadius: 999, background: "#fff", color: "#0c0c14", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "inherit", position: "relative" }}
          >
            {icons.github}
            Visit GitHub Profile
            {icons.arrow}
          </a>
        </div>
      </div>
    </div>
  );
}