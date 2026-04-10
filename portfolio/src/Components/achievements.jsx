import { useEffect, useRef, useState } from "react";
import { 
  FaAward, 
  FaBook, 
  FaRobot, 
  FaChartLine, 
  FaVrCardboard, 
  FaMobileAlt, 
  FaGamepad, 
  FaNetworkWired,
  FaArrowUp,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaTrophy,
  FaCode,
  FaUsers,
  FaTimes,
  FaExpand,
  FaCertificate
} from "react-icons/fa";
import { 
  SiHackaday, 
  SiFuturelearn,
  SiGooglecloud,
  SiCoursera
} from "react-icons/si";
import { 
  MdOutlineWork, 
  MdSchool,
  MdEmojiEvents
} from "react-icons/md";
import { 
  GiBrain, 
  GiAchievement,
  GiArtificialIntelligence
} from "react-icons/gi";
import { 
  IoIosRocket 
} from "react-icons/io";

export default function Achievements() {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.2,
        speed: Math.random() * 0.12 + 0.01,
        opacity: Math.random() * 0.8 + 0.1,
        twinkleSpeed: Math.random() * 0.03 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: Math.random() > 0.85 ? "180,160,255" : "200,220,255",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      stars.forEach((s) => {
        const o =
          s.opacity *
          (0.4 + 0.6 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${o})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({
              ...prev,
              [entry.target.dataset.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && lightboxImage) {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxImage]);

  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage]);

  // Helper function to get image source with fallback
  const getImageSrc = (imagePath) => {
    if (!imagePath) return null;
    // If it's a placeholder or invalid path, return null to trigger fallback
    if (imagePath.includes('/images/') || imagePath === '../assets/part.jpg' || imagePath === '../assets/cert.jpg') {
      return null;
    }
    return imagePath;
  };

  // Placeholder component for missing images
  const ImagePlaceholder = ({ icon: Icon, iconColor, title }) => (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, ${iconColor}15, ${iconColor}05)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Icon size={48} color={iconColor} style={{ opacity: 0.6 }} />
      <span style={{ fontSize: 12, color: iconColor, opacity: 0.5 }}>
        {title}
      </span>
    </div>
  );

  const certifications = [
    {
      title: "HexCore Labs PH University Challenge",
      subtitle: "Mission: LearnPossible",
      date: "2025",
      type: "AI / Hackathon",
      description: "The AI Hackathon: Build and deploy innovative AI solutions to a complex challenge where creativity meets technical mastery - automating workflows with AI agents.",
      icon: GiBrain,
      iconColor: "#7dd3fc",
      badgeIcon: SiHackaday,
      badgeText: "AI / Hackathon · 2025",
      image: "../assets/part.jpg",
      achievement: "Participation",
      isCertificate: true
    },
    {
      title: "Certificate of Participation",
      subtitle: "AI Hackathon Competition",
      date: "2025",
      type: "AI / Machine Learning",
      description: "Certificate of Participation in recognition of their participation in the AI Hackathon competition and demonstration of their exemplary skills, teamwork and commitment, overcoming simulated challenges that hone their prowess as future cyber defenders of our country.",
      icon: GiArtificialIntelligence,
      iconColor: "#a78bfa",
      badgeIcon: SiGooglecloud,
      badgeText: "Certificate · 2025",
      image: null, // Will use placeholder
      achievement: "Certificate of Participation",
      isCertificate: true
    }
  ];

  const seminars = [
    { 
      name: "Autonomous Machines and Robotics", 
      date: "Sep 2025", 
      desc: "Exploration of autonomous systems and robotics technology. Covered topics include AI-driven automation, sensor integration, and autonomous decision-making systems.",
      icon: FaRobot,
      iconColor: "#2dd4bf",
      image: null
    },
    { 
      name: "Career Development", 
      date: "Oct 2025", 
      desc: "Professional growth strategies for tech careers. Focused on resume building, interview preparation, and career path planning in the tech industry.",
      icon: FaChartLine,
      iconColor: "#7dd3fc",
      image: null
    },
    { 
      name: "Virtual Reality", 
      date: "Oct 2025", 
      desc: "Immersive VR technologies and their applications in gaming, education, and enterprise training. Hands-on experience with VR development tools.",
      icon: FaVrCardboard,
      iconColor: "#a78bfa",
      image: null
    },
    { 
      name: "Software and Mobile Development", 
      date: "Oct 2025", 
      desc: "Modern frameworks for web and mobile applications. Covered React Native, Flutter, and cross-platform development best practices.",
      icon: FaMobileAlt,
      iconColor: "#f59e0b",
      image: null
    },
    { 
      name: "Game Development", 
      date: "Oct 2025", 
      desc: "Game design principles and development pipelines using Unity and Unreal Engine. Topics included 2D/3D graphics, physics, and game mechanics.",
      icon: FaGamepad,
      iconColor: "#ef4444",
      image: null
    },
    { 
      name: "Data Center, Networking, and Visualization", 
      date: "Oct 2025", 
      desc: "Infrastructure, networking, and data visualization techniques. Covered cloud architecture, network security, and modern data visualization tools.",
      icon: FaNetworkWired,
      iconColor: "#10b981",
      image: null
    },
  ];

  const fadeUp = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0px)" : "translateY(28px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  const getCertificationCardStyle = (id) => ({
    background: hovered === id ? "rgba(22,38,75,0.98)" : "rgba(14,25,50,0.85)",
    border:
      hovered === id
        ? "1px solid rgba(125,211,252,0.5)"
        : "1px solid rgba(125,211,252,0.13)",
    borderRadius: 18,
    overflow: "hidden",
    transform:
      hovered === id ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
    boxShadow:
      hovered === id
        ? "0 20px 60px rgba(125,211,252,0.13), inset 0 0 60px rgba(125,211,252,0.03)"
        : "0 2px 20px rgba(0,0,0,0.3)",
    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
    cursor: "pointer",
    position: "relative",
  });

  const getSeminarCardStyle = (id) => ({
    background: hovered === id ? "rgba(22,38,75,0.96)" : "rgba(14,25,50,0.8)",
    border:
      hovered === id
        ? "1px solid rgba(45,212,191,0.4)"
        : "1px solid rgba(45,212,191,0.1)",
    borderRadius: 20,
    overflow: "hidden",
    transform:
      hovered === id ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
    boxShadow:
      hovered === id 
        ? "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(45,212,191,0.2)"
        : "0 4px 20px rgba(0,0,0,0.3)",
    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
    cursor: "pointer",
    position: "relative",
  });

  const secLabel = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(125,211,252,0.55)",
    marginBottom: 18,
    paddingBottom: 10,
    borderBottom: "1px solid rgba(125,211,252,0.1)",
    display: "flex",
    alignItems: "center",
    gap: 10,
  };

  const PulsingDot = ({ color = "#7dd3fc" }) => (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 14,
        height: 14,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: color,
          opacity: 0.25,
          animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
        }}
      />
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 8px ${color}`,
          position: "relative",
        }}
      />
    </span>
  );

  const ShineOverlay = ({ active }) => (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 18,
        pointerEvents: "none",
        background: active
          ? "radial-gradient(ellipse at 15% 15%, rgba(125,211,252,0.08) 0%, transparent 60%)"
          : "transparent",
        transition: "background 0.3s",
      }}
    />
  );

  const CornerAccent = ({ active, color = "125,211,252" }) => (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: active ? 60 : 0,
        height: active ? 60 : 0,
        overflow: "hidden",
        transition: "all 0.4s ease",
        borderRadius: "0 18px 0 0",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          background: `radial-gradient(circle at top right, rgba(${color},0.15), transparent 70%)`,
        }}
      />
    </div>
  );

  const ImageLightbox = () => {
    if (!lightboxImage) return null;
    
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.95)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          animation: "fadeIn 0.3s ease",
        }}
        onClick={() => setLightboxImage(null)}
      >
        <button
          onClick={() => setLightboxImage(null)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <FaTimes size={20} />
        </button>
        
        <div
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            position: "relative",
            animation: "zoomIn 0.3s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {lightboxImage.startsWith('data:') || lightboxImage.startsWith('blob:') ? (
            <img
              src={lightboxImage}
              alt="Full size view"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 8,
                boxShadow: "0 0 50px rgba(0,0,0,0.5)",
              }}
            />
          ) : (
            <div
              style={{
                width: 400,
                height: 300,
                background: "linear-gradient(135deg, #1a2a3a, #0a1520)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              No image available
            </div>
          )}
          <div
            style={{
              position: "absolute",
              bottom: -30,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Click anywhere to close
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .seminar-expand {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.4s ease;
          opacity: 0;
        }
        .seminar-expand.open {
          max-height: 120px;
          opacity: 1;
        }
        * {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(14,25,50,0.5);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(125,211,252,0.3);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(125,211,252,0.5);
        }
        .image-placeholder {
          background: linear-gradient(135deg, #1a2a3a, #0a1520);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .image-placeholder:hover .image-overlay {
          opacity: 1;
        }
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }
        .tech-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 9px;
          font-weight: 600;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          background: "#050a18",
          fontFamily: "'Inter',sans-serif",
          position: "relative",
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "fixed",
            top: -200,
            right: -200,
            width: 550,
            height: 550,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: -200,
            left: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(125,211,252,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "60px 24px 120px",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            data-id="header"
            style={{
              textAlign: "center",
              marginBottom: 64,
              ...fadeUp("header"),
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(125,211,252,0.6)",
                border: "1px solid rgba(125,211,252,0.2)",
                borderRadius: 20,
                padding: "6px 18px",
                marginBottom: 24,
              }}
            >
              <PulsingDot color="#7dd3fc" />
              <IoIosRocket size={14} />
              Mission Log
            </div>
            <h1
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "clamp(36px,6vw,62px)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 14,
                background:
                  "linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 45%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Achievements & Milestones
            </h1>
            <p
              style={{
                fontSize: 14,
                color: "rgba(148,163,184,0.5)",
                letterSpacing: "0.08em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <MdSchool size={14} />
              Mark Maestre · TUP Taguig
            </p>
          </div>

          {/* Certifications */}
          <div style={{ marginBottom: 52 }}>
            <div
              data-id="cert-label"
              style={{ ...secLabel, ...fadeUp("cert-label") }}
            >
              <PulsingDot color="#7dd3fc" /> 
              <GiAchievement size={14} />
              Certifications & Achievements
            </div>
            
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: 24,
              }}
            >
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                const BadgeIcon = cert.badgeIcon;
                return (
                  <div
                    key={index}
                    data-id={`cert-${index}`}
                    style={{
                      ...getCertificationCardStyle(`cert-${index}`),
                      ...fadeUp(`cert-${index}`, 0.1 + index * 0.1),
                    }}
                    onMouseEnter={() => setHovered(`cert-${index}`)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div
                      className="image-placeholder"
                      style={{
                        position: "relative",
                        height: 200,
                        overflow: "hidden",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Show placeholder info since no image
                        alert(`📜 ${cert.title}\n\nThis is a certificate placeholder.\n\nAchievement: ${cert.achievement}\nDate: ${cert.date}`);
                      }}
                    >
                      <ImagePlaceholder 
                        icon={IconComponent}
                        iconColor={cert.iconColor}
                        title={cert.title}
                      />
                      <div className="image-overlay">
                        <div
                          style={{
                            background: "rgba(0,0,0,0.7)",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `2px solid ${cert.iconColor}`,
                          }}
                        >
                          <FaExpand size={24} color={cert.iconColor} />
                        </div>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "rgba(0,0,0,0.7)",
                          backdropFilter: "blur(8px)",
                          borderRadius: 12,
                          padding: "6px 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          border: `1px solid ${cert.iconColor}40`,
                          zIndex: 3,
                        }}
                      >
                        <FaCertificate size={12} color={cert.iconColor} />
                        <span style={{ fontSize: 10, color: cert.iconColor, fontWeight: 600 }}>
                          {cert.achievement}
                        </span>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(0,0,0,0.7)",
                          backdropFilter: "blur(8px)",
                          borderRadius: 12,
                          padding: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: `1px solid ${cert.iconColor}40`,
                          zIndex: 3,
                        }}
                      >
                        <IconComponent size={20} color={cert.iconColor} />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "linear-gradient(to top, rgba(14,25,50,0.95), transparent)",
                          padding: "20px 16px 12px",
                          zIndex: 2,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 4,
                          }}
                        >
                          <FaCalendarAlt size={10} color={cert.iconColor} />
                          <p
                            style={{
                              fontSize: 10,
                              color: cert.iconColor,
                              fontWeight: 600,
                              letterSpacing: "0.08em",
                              margin: 0,
                            }}
                          >
                            {cert.date}
                          </p>
                        </div>
                        <p
                          style={{
                            fontSize: 14,
                            color: "#e2e8f0",
                            fontWeight: 700,
                            lineHeight: 1.3,
                            margin: 0,
                          }}
                        >
                          {cert.title}
                        </p>
                        <p
                          style={{
                            fontSize: 11,
                            color: `${cert.iconColor}cc`,
                            marginTop: 4,
                          }}
                        >
                          {cert.subtitle}
                        </p>
                      </div>
                    </div>

                    <div style={{ padding: "16px 20px 20px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginBottom: 12,
                        }}
                      >
                        <BadgeIcon size={12} color={cert.iconColor} />
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: cert.iconColor,
                            letterSpacing: "0.06em",
                          }}
                        >
                          {cert.badgeText}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: 12,
                          color: "rgba(148,163,184,0.8)",
                          lineHeight: 1.6,
                          marginBottom: 12,
                        }}
                      >
                        {cert.description}
                      </p>
                    </div>

                    {hovered === `cert-${index}` && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          background: `linear-gradient(90deg, ${cert.iconColor}, #a78bfa, ${cert.iconColor})`,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Seminars */}
          <div style={{ marginBottom: 52 }}>
            <div
              data-id="sem-label"
              style={{ ...secLabel, ...fadeUp("sem-label") }}
            >
              <PulsingDot color="#2dd4bf" /> 
              <SiFuturelearn size={14} />
              Seminars Attended · TUP Taguig, 2025
            </div>
            <p
              data-id="sem-hint"
              style={{
                fontSize: 12,
                color: "rgba(125,211,252,0.35)",
                marginBottom: 20,
                letterSpacing: "0.04em",
                ...fadeUp("sem-hint", 0.05),
              }}
            >
              Click on any card to expand details | Click on images for more info
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 24,
              }}
            >
              {seminars.map((s, i) => {
                const IconComponent = s.icon;
                return (
                  <div
                    key={i}
                    data-id={`sem-${i}`}
                    style={{
                      ...getSeminarCardStyle(`sem-${i}`),
                      ...fadeUp(`sem-${i}`, i * 0.07),
                    }}
                    onMouseEnter={() => setHovered(`sem-${i}`)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div
                      className="image-placeholder"
                      style={{
                        position: "relative",
                        height: 200,
                        overflow: "hidden",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`🎓 ${s.name}\n\nDate: ${s.date}\n\n${s.desc}`);
                      }}
                    >
                      <ImagePlaceholder 
                        icon={IconComponent}
                        iconColor={s.iconColor}
                        title={s.name}
                      />
                      <div className="image-overlay">
                        <div
                          style={{
                            background: "rgba(0,0,0,0.7)",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `2px solid ${s.iconColor}`,
                          }}
                        >
                          <FaExpand size={24} color={s.iconColor} />
                        </div>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          background: "rgba(0,0,0,0.7)",
                          backdropFilter: "blur(8px)",
                          borderRadius: 12,
                          padding: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: `1px solid ${s.iconColor}40`,
                          zIndex: 3,
                        }}
                      >
                        <IconComponent size={20} color={s.iconColor} />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "linear-gradient(to top, rgba(14,25,50,0.95), transparent)",
                          padding: "20px 16px 12px",
                          zIndex: 2,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 4,
                          }}
                        >
                          <FaCalendarAlt size={10} color={s.iconColor} />
                          <p
                            style={{
                              fontSize: 11,
                              color: s.iconColor,
                              fontWeight: 700,
                              letterSpacing: "0.08em",
                              margin: 0,
                            }}
                          >
                            {s.date}
                          </p>
                        </div>
                        <p
                          style={{
                            fontSize: 15,
                            color: "#e2e8f0",
                            fontWeight: 600,
                            lineHeight: 1.4,
                            margin: 0,
                          }}
                        >
                          {s.name}
                        </p>
                      </div>
                    </div>

                    <div style={{ padding: "16px 20px 20px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            background: `rgba(45,212,191,0.1)`,
                            border: `1px solid ${s.iconColor}40`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: s.iconColor,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div
                          style={{
                            flex: 1,
                            height: 1,
                            background: `linear-gradient(90deg, ${s.iconColor}40, transparent)`,
                          }}
                        />
                      </div>

                      <div
                        className={
                          "seminar-expand" +
                          (expanded === `sem-${i}` ? " open" : "")
                        }
                      >
                        <p
                          style={{
                            fontSize: 12,
                            color: "rgba(148,163,184,0.8)",
                            lineHeight: 1.6,
                            marginTop: 8,
                            paddingTop: 12,
                            borderTop: `1px solid ${s.iconColor}20`,
                          }}
                        >
                          {s.desc}
                        </p>
                      </div>

                      {expanded !== `sem-${i}` && (
                        <p
                          style={{
                            fontSize: 11,
                            color: `${s.iconColor}80`,
                            marginTop: 12,
                            textAlign: "center",
                            fontStyle: "italic",
                            cursor: "pointer",
                          }}
                          onClick={() => setExpanded(`sem-${i}`)}
                        >
                          Click to expand ▼
                        </p>
                      )}
                    </div>

                    {(hovered === `sem-${i}` || expanded === `sem-${i}`) && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          background: `linear-gradient(90deg, ${s.iconColor}, #a78bfa, ${s.iconColor})`,
                          borderRadius: "20px 20px 0 0",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Publications */}
          <div style={{ marginBottom: 52 }}>
            <div
              data-id="pub-label"
              style={{ ...secLabel, ...fadeUp("pub-label") }}
            >
              <PulsingDot color="#a78bfa" /> 
              <FaBook size={14} />
              Publications
            </div>
            <div
              data-id="pub-0"
              style={{
                background: hovered === "pub-0" ? "rgba(22,38,75,0.98)" : "rgba(14,25,50,0.85)",
                border: hovered === "pub-0" ? "1px solid rgba(125,211,252,0.5)" : "1px solid rgba(125,211,252,0.13)",
                borderRadius: 18,
                padding: "24px 28px",
                transform: hovered === "pub-0" ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
                boxShadow: hovered === "pub-0" ? "0 20px 60px rgba(125,211,252,0.13)" : "0 2px 20px rgba(0,0,0,0.3)",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                ...fadeUp("pub-0", 0.1),
              }}
              onMouseEnter={() => setHovered("pub-0")}
              onMouseLeave={() => setHovered(null)}
            >
              <ShineOverlay active={hovered === "pub-0"} />
              <CornerAccent active={hovered === "pub-0"} color="167,139,250" />
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "3px 12px",
                      borderRadius: 20,
                      marginBottom: 10,
                      background: "rgba(167,139,250,0.1)",
                      color: "#a78bfa",
                      border: "1px solid rgba(167,139,250,0.25)",
                    }}
                  >
                    <FaBook size={11} />
                    Journal Article · Oct 2025
                  </div>
                  <p
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#e2e8f0",
                      marginBottom: 8,
                      lineHeight: 1.55,
                    }}
                  >
                    DarkWebAware: A descriptive quantitative study of students,
                    online dark web and its related online risks
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(148,163,184,0.6)",
                      marginBottom: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    Maestre, M. R. M. (2025, October) · Cognizance Journal of
                    Multidisciplinary Studies, 5(10), 524-530 · ZAIN Publications
                  </p>
                  <a
                    href="https://doi.org/10.47760/cognizance.2025.v05i10.049"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      fontSize: 12,
                      color: "#a78bfa",
                      textDecoration: "none",
                      background: "rgba(167,139,250,0.08)",
                      border: "1px solid rgba(167,139,250,0.2)",
                      borderRadius: 8,
                      padding: "6px 12px",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(167,139,250,0.18)";
                      e.currentTarget.style.borderColor = "rgba(167,139,250,0.45)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(167,139,250,0.08)";
                      e.currentTarget.style.borderColor = "rgba(167,139,250,0.2)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    View Publication
                    <FaExternalLinkAlt size={10} />
                  </a>
                </div>
                <div style={{ flexShrink: 0, opacity: hovered === "pub-0" ? 1 : 0.5, transition: "opacity 0.3s" }}>
                  <FaBook size={32} color="#a78bfa" />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              marginTop: 40,
              opacity: visible["footer"] ? 1 : 0,
              transition: "opacity 0.5s ease 0.3s",
            }}
            data-id="footer"
          >
            <button
              onClick={() => {
                containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                background: "rgba(125,211,252,0.1)",
                border: "1px solid rgba(125,211,252,0.2)",
                borderRadius: 30,
                padding: "10px 24px",
                color: "#7dd3fc",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Inter',sans-serif",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(125,211,252,0.2)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(125,211,252,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaArrowUp size={12} />
              Back to Top
            </button>
          </div>
        </div>
      </div>

      <ImageLightbox />
    </>
  );
}