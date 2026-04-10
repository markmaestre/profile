export default function Contact() {
  return (
    <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px", overflow:"auto"}}>
      <div style={{maxWidth:600, width:"100%", textAlign:"center"}}>
        <h1 style={{fontFamily:"'Syne',sans-serif", fontSize:"clamp(32px,4vw,48px)", marginBottom:24, background:"linear-gradient(135deg,#fff,#38bdf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
          Get In Touch
        </h1>
        <p style={{fontFamily:"'Inter',sans-serif", fontSize:16, color:"rgba(255,255,255,0.8)", marginBottom:32}}>
          Have a project in mind? Let's collaborate and bring your ideas to life!
        </p>
        <div style={{background:"rgba(56,189,248,0.05)", border:"1px solid rgba(56,189,248,0.2)", borderRadius:12, padding:32}}>
          <input type="text" placeholder="Your Name" style={{width:"100%", padding:"12px", marginBottom:16, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(56,189,248,0.3)", borderRadius:6, color:"#fff", fontFamily:"'Inter',sans-serif"}}/>
          <input type="email" placeholder="Your Email" style={{width:"100%", padding:"12px", marginBottom:16, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(56,189,248,0.3)", borderRadius:6, color:"#fff", fontFamily:"'Inter',sans-serif"}}/>
          <textarea placeholder="Your Message" rows={5} style={{width:"100%", padding:"12px", marginBottom:16, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(56,189,248,0.3)", borderRadius:6, color:"#fff", fontFamily:"'Inter',sans-serif", resize:"vertical"}}/>
          <button className="btn-primary" style={{width:"100%"}}>Send Message →</button>
        </div>
      </div>
    </div>
  );
}