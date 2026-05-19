'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, BookOpen, Award, Users, Calendar, 
  MapPin, Phone, Mail, Facebook, Twitter, Youtube, 
  Instagram, ArrowRight, Menu, X, Info, ShieldCheck,
  User, CheckCircle2, ChevronRight, Bell
} from 'lucide-react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('seenSplash');
    if (!hasSeenSplash) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('seenSplash', 'true');
      }, 3500);
    }
  }, []);

  const stats = [
    { icon: <Users size={28} />, count: "850+", label: "Students Enrolled" },
    { icon: <User size={28} />, count: "45+", label: "Qualified Teachers" },
    { icon: <GraduationCap size={28} />, count: "20+", label: "Classes" },
    { icon: <Award size={28} />, count: "15+", label: "Years of Excellence" },
    { icon: <CheckCircle2 size={28} />, count: "98%", label: "Pass Percentage" }
  ];

  const features = [
    { 
      icon: <BookOpen size={32} />, 
      title: "Quality Education", 
      desc: "We provide high quality education to shape the future leaders." 
    },
    { 
      icon: <Users size={32} />, 
      title: "Experienced Faculty", 
      desc: "Our teachers are highly qualified and dedicated." 
    },
    { 
      icon: <MapPin size={32} />, 
      title: "Modern Facilities", 
      desc: "Well-equipped classrooms, labs, library and sports facilities." 
    },
    { 
      icon: <ShieldCheck size={32} />, 
      title: "Islamic Values", 
      desc: "We focus on moral values along with academic excellence." 
    }
  ];

  const news = [
    { 
      date: "10 May, 2024", 
      title: "Annual Sports Gala 2024", 
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop" 
    },
    { 
      date: "5 May, 2024", 
      title: "Science Exhibition", 
      image: "https://images.unsplash.com/photo-1564066341310-59d5dc334f47?w=400&h=250&fit=crop" 
    },
    { 
      date: "1 May, 2024", 
      title: "Admission Open", 
      image: "https://images.unsplash.com/photo-1523050853063-bd8012fec040?w=400&h=250&fit=crop" 
    }
  ];

  const notices = [
    { date: "05 May, 2024", title: "Fee Submission Deadline" },
    { date: "04 May, 2024", title: "Holiday Announcement" },
    { date: "03 May, 2024", title: "Parent Teacher Meeting" }
  ];

  return (
    <div className="landing-container">
      {/* Splash Screen */}
      <div className={`splash-screen ${!showSplash ? 'hide' : ''}`}>
        <div className="splash-content">
          <div className="splash-logo">
            <img src="/logo.png" alt="Logo" style={{ width: 120, height: 120, borderRadius: '50%' }} />
          </div>
          <h2>Welcome to</h2>
          <h1>Quaid-e-Millat</h1>
          <h3>Public Boys High School</h3>
          <p>Building a strong foundation for a brighter future.<br/>Quality Education, Discipline and Excellence.</p>
        </div>
      </div>

      {/* Custom Header removed to avoid overlap with image-based header */}

      {/* Hero Section - Cropped to hide the old footer from the background image */}
      <section className="hero" id="home">
        <div className="hero-image" style={{ 
          backgroundImage: 'url("/homepage-hero.jpg")', 
          backgroundPosition: 'top center', 
          backgroundSize: '100% auto', 
          aspectRatio: '1620 / 890',
          width: '100%',
          zIndex: 0 
        }}></div>
        <div className="container hero-content" style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
          {/* Main content area */}
        </div>
      </section>

      {/* Simplified layout: Features and News sections removed */}

      {/* Simplified layout: Mid-page redundant sections removed */}

      {/* Footer (Restored) */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="#home" className="logo inverted">
                <div className="logo-icon">
                  <img src="/logo.png" alt="Logo" />
                </div>
                <div className="logo-text">
                  <h1>Quaid-e-Millat</h1>
                  <p>PUBLIC BOYS HIGH SCHOOL</p>
                </div>
              </Link>
              <p className="footer-desc">
                Building a strong foundation for a brighter future through quality education and discipline.
              </p>
              <div className="social-links">
                <a href="#"><Facebook size={20} /></a>
                <a href="#"><Twitter size={20} /></a>
                <a href="#"><Youtube size={20} /></a>
                <a href="#"><Instagram size={20} /></a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="#about">About Us</Link></li>
                <li><Link href="#academics">Academics</Link></li>
                <li><Link href="#admission">Admission</Link></li>
                <li><Link href="#gallery">Gallery</Link></li>
                <li><Link href="#contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Portals</h4>
              <ul>
                <li><Link href="/student">Student Portal</Link></li>
                <li><Link href="/parent">Parent Portal</Link></li>
                <li><Link href="/staff">Staff Login</Link></li>
                <li><Link href="/admission">Online Fee Payment</Link></li>
                <li><Link href="/result">Result Card</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact Info</h4>
              <p><MapPin size={18} /> Khanbella Road Jalal PurPir Wala District (Multan)</p>
              <p><Mail size={18} /> info@qmpbhs.edu.pk</p>
              <p><Phone size={18} /> +92 301 6031213</p>
              <p><Calendar size={18} /> Mon - Sat: 8:00 AM - 2:00 PM</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Quaid-e-Millat Public Boys High School. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          background: #f8fafc;
          color: #1e293b;
          font-family: 'Inter', sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Splash Screen */
        .splash-screen {
          position: fixed; inset: 0; background: #0f172a; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          color: white; text-align: center;
          transition: opacity 0.8s ease-in-out, visibility 0.8s;
        }
        .splash-screen.hide { opacity: 0; visibility: hidden; }
        .splash-content { animation: scaleUp 1s ease-out forwards; padding: 20px; }
        .splash-content h2 { color: #facc15; font-size: 1.5rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 10px; }
        .splash-content h1 { font-size: 4rem; font-weight: 900; margin: 0; background: linear-gradient(90deg, #fff, #93c5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .splash-content h3 { font-size: 1.8rem; margin: 10px 0 20px; font-weight: 300; }
        .splash-content p { font-size: 1.1rem; color: #94a3b8; line-height: 1.6; max-width: 600px; margin: 0 auto; }
        .splash-logo { margin-bottom: 30px; animation: pulseLogo 2s infinite; }
        @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes pulseLogo { 
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0.4); border-radius: 50%; } 
          70% { transform: scale(1.05); box-shadow: 0 0 0 30px rgba(59,130,246,0); border-radius: 50%; } 
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59,130,246,0); border-radius: 50%; } 
        }

        /* Restored Portal Links 3D */
        .top-bar {
          background: linear-gradient(-45deg, #0f172a, #064e3b, #1e3a8a, #052e16);
          background-size: 400% 400%;
          animation: waterFlow 15s ease infinite;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        @keyframes waterFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .top-bar-content { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
        
        .logo-premium { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .logo-crest-premium img { width: 45px; height: auto; border-radius: 8px; }
        .logo-text-premium h1 { font-size: 1.4rem; font-weight: 900; color: #fff; margin: 0; line-height: 1; }
        .logo-text-premium p { font-size: 0.6rem; color: #94a3b8; font-weight: 800; margin: 3px 0 0; text-transform: uppercase; letter-spacing: 1px; }

        .portal-links { display: flex; gap: 8px; flex-wrap: nowrap; }
        .portal-link-3d {
          display: flex; align-items: center; gap: 6px; padding: 7px 14px;
          background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);
          border: 1px solid rgba(255,255,255,0.2); border-radius: 8px;
          color: #fff; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 0 rgba(0,0,0,0.4); white-space: nowrap;
        }
        .portal-link-3d:hover {
          background: #fff; color: #1e3a8a; transform: translateY(-5px) scale(1.05);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .portal-link-3d:active { transform: translateY(2px); box-shadow: 0 2px 0 #1e3a8a; }

        .contact-info-compact { color: rgba(255,255,255,0.7); font-size: 0.8rem; font-weight: 700; }
        .news-card-horizontal {
          background: #fff; border-radius: 20px; overflow: hidden;
          display: flex; gap: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          transition: transform 0.3s; padding: 15px;
        }
        .news-card-horizontal:hover { transform: translateX(10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
        .news-img-small { 
          width: 180px; height: 130px; border-radius: 18px;
          background-size: cover; background-position: center; flex-shrink: 0;
        }
        .news-info-small h3 { font-size: 1.3rem; margin: 8px 0; color: #1e3a8a; font-weight: 800; }
        .news-info-small p { font-size: 0.95rem; color: #64748b; line-height: 1.6; }
        .news-date { font-size: 0.75rem; color: #3b82f6; font-weight: 700; }

        .notices-column { display: flex; flexDirection: column; gap: 30px; }
        .stats-summary-card { 
          background: #1e3a8a; border-radius: 25px; padding: 25px; color: #fff;
          box-shadow: 0 15px 35px rgba(30, 58, 138, 0.3);
        }
        .stats-mini-grid { display: flex; flexDirection: column; gap: 15px; }
        .stat-mini { display: flex; gap: 15px; align-items: center; }
        .stat-mini-icon { color: #facc15; }
        .stat-mini-info h4 { margin: 0; font-size: 1.2rem; font-weight: 800; }
        .stat-mini-info p { margin: 0; font-size: 0.75rem; opacity: 0.8; }

        /* Hero */
        .hero {
          position: relative;
          aspect-ratio: 1620 / 890;
          display: flex;
          align-items: center;
          color: #fff;
          overflow: hidden;
          background: #0f172a; /* Fallback dark background */
          z-index: 1;
        }
        .hero-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
        }
        .hero-badge {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          padding: 5px 15px;
          border-radius: 20px;
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }
        .hero-title { font-size: 4rem; font-weight: 900; line-height: 1.1; margin-bottom: 25px; letter-spacing: -2px; }
        .hero-title span { color: #fff; opacity: 0.9; }
        .hero-desc { font-size: 1.2rem; color: rgba(255,255,255,0.8); margin-bottom: 40px; max-width: 600px; }
        .hero-btns { display: flex; gap: 20px; }
        .btn-outline { 
          border: 2px solid #fff; color: #fff; 
          padding: 12px 30px; borderRadius: 10px; font-weight: 700;
        }
        .btn-outline:hover { background: #fff; color: #1e3a8a; }

        /* Features */
        .features { margin-top: -60px; position: relative; z-index: 10; }
        .features-grid { 
          display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
          gap: 24px;
        }
        .feature-card {
          background: #fff; padding: 30px; border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; gap: 20px;
          transition: transform 0.3s;
        }
        .feature-card:hover { transform: translateY(-5px); }
        .feature-icon { color: #1e3a8a; }
        .feature-info h3 { font-size: 1.1rem; margin-bottom: 8px; }
        .feature-info p { font-size: 0.9rem; color: #64748b; line-height: 1.5; }

        /* News */
        .news-events { padding: 100px 0; }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .section-title { font-size: 2rem; font-weight: 800; color: #1e3a8a; margin: 0; }
        .section-line { width: 60px; height: 4px; background: #facc15; margin-top: 10px; }
        .view-all { color: #3b82f6; font-weight: 700; display: flex; alignItems: center; gap: 5px; }

        .news-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .news-card { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .news-img { height: 200px; background-size: cover; background-position: center; }
        .news-content { padding: 25px; }
        .news-date { color: #3b82f6; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
        .news-content h3 { margin: 10px 0; font-size: 1.25rem; }
        .news-content p { color: #64748b; font-size: 0.95rem; line-height: 1.6; }

        /* Notices & Stats */
        .notices-stats { padding: 60px 0 100px; background: #f1f5f9; }
        .notices-stats-grid { display: grid; grid-template-columns: 1.2fr 1.8fr; gap: 40px; }
        .notices-card { background: #fff; padding: 40px; border-radius: 30px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .notices-list { display: flex; flexDirection: column; gap: 20px; margin-top: 30px; }
        .notice-item { display: flex; gap: 20px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; }
        .notice-item:last-child { border: none; }
        .notice-icon { width: 45px; height: 45px; background: #f1f5f9; border-radius: 12px; display: flex; alignItems: center; justifyContent: center; color: #1e3a8a; }
        .notice-info h4 { margin: 0; font-size: 1rem; }
        .notice-date { font-size: 0.75rem; color: #64748b; font-weight: 700; }

        .stats-card { background: #1e3a8a; border-radius: 30px; padding: 40px; color: #fff; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 40px; }
        .stat-item { display: flex; gap: 20px; align-items: center; }
        .stat-icon { color: #facc15; }
        .stat-info h3 { font-size: 2.2rem; margin: 0; font-weight: 900; }
        .stat-info p { margin: 0; font-size: 0.9rem; opacity: 0.8; font-weight: 600; }

        /* Restored 4-Column Footer - Pulled up to cover the fake blue bar in the image */
        .footer { background: #0f172a; color: #fff; padding: 80px 0 30px; position: relative; z-index: 20; margin-top: 0px; }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.5fr; gap: 50px; margin-bottom: 80px; }
        .footer-brand .logo { margin-bottom: 25px; display: flex; align-items: center; gap: 15px; text-decoration: none; }
        .logo-icon { width: 50px; height: 50px; background: #fff; border-radius: 10px; padding: 5px; }
        .logo-icon img { width: 100%; height: auto; }
        .logo-text h1 { font-size: 1.5rem; font-weight: 900; color: #fff; margin: 0; }
        .logo-text p { font-size: 0.6rem; color: #94a3b8; font-weight: 700; margin: 0; letter-spacing: 1px; }
        .footer-desc { color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 30px; font-size: 0.9rem; }
        .social-links { display: flex; gap: 15px; }
        .social-links a { 
          width: 38px; height: 38px; background: rgba(255,255,255,0.05); 
          border-radius: 10px; display: flex; align-items: center; 
          justify-content: center; color: #fff; transition: all 0.3s;
        }
        .social-links a:hover { background: #3b82f6; transform: translateY(-3px); }

        .footer-links h4, .footer-contact h4 { font-size: 1.1rem; margin-bottom: 25px; color: #fff; font-weight: 800; }
        .footer-links ul { list-style: none; padding: 0; }
        .footer-links li { margin-bottom: 12px; }
        .footer-links a { color: rgba(255,255,255,0.6); transition: color 0.3s; font-size: 0.9rem; text-decoration: none; }
        .footer-links a:hover { color: #fff; }

        .footer-contact p { 
          display: flex; gap: 12px; color: rgba(255,255,255,0.6); 
          margin-bottom: 15px; align-items: flex-start; font-size: 0.9rem;
        }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 25px; text-align: center; color: rgba(255,255,255,0.4); font-size: 0.85rem; }

        .footer-bottom { 
          border-top: 1px solid rgba(255,255,255,0.05); 
          padding-top: 30px; text-align: center; color: rgba(255,255,255,0.4); 
          font-size: 0.9rem;
        }

        @media (max-width: 992px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr); }
          .notices-stats-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 3rem; }
        }

        @media (max-width: 768px) {
          .top-bar { display: none; }
          .nav-menu { 
            position: fixed; top: 75px; left: -100%; width: 100%; 
            height: calc(100vh - 75px); background: #fff; 
            flex-direction: column; padding: 40px; transition: 0.3s;
          }
          .nav-menu.active { left: 0; }
          .menu-toggle { display: block; }
          .updates-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 2.5rem; }
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}