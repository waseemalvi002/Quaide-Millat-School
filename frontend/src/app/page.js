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
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="contact-info">
            <span><Mail size={14} /> info@qmpbhs.edu.pk</span>
            <span><Phone size={14} /> +92 301 6031213</span>
          </div>
          <div className="portal-links">
            <Link href="/login" className="portal-link"><ShieldCheck size={14} /> Admin Panel</Link>
            <Link href="/login" className="portal-link"><User size={14} /> Student</Link>
            <Link href="/login" className="portal-link"><User size={14} /> Teacher</Link>
            <Link href="/login" className="portal-link"><User size={14} /> Staff</Link>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <Link href="/" className="logo">
            <div className="logo-icon"><GraduationCap size={28} /></div>
            <div className="logo-text">
              <h1>Quaid-e-Millat</h1>
              <p>PUBLIC BOYS HIGH SCHOOL</p>
            </div>
          </Link>

          <div className={`nav-links ${mobileMenu ? 'active' : ''}`}>
            <Link href="/">Home</Link>
            <Link href="#about">About Us</Link>
            <Link href="#academics">Academics</Link>
            <Link href="/admission">Admission</Link>
            <Link href="/login">Portal</Link>
            <Link href="#contact">Contact Us</Link>
            <Link href="/admission" className="fee-btn">Online Fee Payment</Link>
          </div>

          <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay" style={{ background: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.6))', zIndex: 1 }}></div>
        <div className="hero-image" style={{ backgroundImage: 'url("/homepage-hero.jpg")', backgroundPosition: 'center 20%', zIndex: 0 }}></div>
        <div className="container hero-content" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-badge">WELCOME TO</div>
          <h2 className="hero-title">
            Quaid-e-Millat <br />
            <span>Public Boys High School</span>
          </h2>
          <p className="hero-desc">
            Building a strong foundation for a brighter future. <br />
            Quality Education, Discipline and Excellence.
          </p>
          <div className="hero-btns">
            <Link href="#about" className="btn btn-primary btn-lg">About Our School</Link>
            <Link href="/admission" className="btn btn-outline btn-lg">Admission Open</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-info">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="news-events">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Latest News & Events</h2>
              <div className="section-line"></div>
            </div>
            <Link href="#" className="view-all">View All <ChevronRight size={18} /></Link>
          </div>

          <div className="news-grid">
            {news.map((n, i) => (
              <div key={i} className="news-card">
                <div className="news-img" style={{ backgroundImage: `url(${n.image})` }}></div>
                <div className="news-content">
                  <span className="news-date">{n.date}</span>
                  <h3>{n.title}</h3>
                  <p>Check out our latest activities and upcoming programs at QMPBHS.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notices Section */}
      <section className="notices-stats">
        <div className="container">
          <div className="notices-stats-grid">
            {/* Notices */}
            <div className="notices-card">
              <div className="section-header">
                <h2 className="section-title">Important Notices</h2>
                <Link href="#" className="view-all">View All</Link>
              </div>
              <div className="notices-list">
                {notices.map((n, i) => (
                  <div key={i} className="notice-item">
                    <div className="notice-icon"><Bell size={20} /></div>
                    <div className="notice-info">
                      <span className="notice-date">{n.date}</span>
                      <h4>{n.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="stats-card">
              <div className="stats-grid">
                {stats.map((s, i) => (
                  <div key={i} className="stat-item">
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-info">
                      <h3>{s.count}</h3>
                      <p>{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="logo inverted">
                <div className="logo-icon"><GraduationCap size={28} /></div>
                <div className="logo-text">
                  <h1>Quaid-e-Millat</h1>
                  <p>PUBLIC BOYS HIGH SCHOOL</p>
                </div>
              </Link>
              <p className="footer-desc">
                Quality education, strong values and a brighter future.
              </p>
              <div className="social-links">
                <Link href="#"><Facebook size={20} /></Link>
                <Link href="#"><Twitter size={20} /></Link>
                <Link href="#"><Youtube size={20} /></Link>
                <Link href="#"><Instagram size={20} /></Link>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Academics</Link></li>
                <li><Link href="/admission">Admission</Link></li>
                <li><Link href="#">Gallery</Link></li>
                <li><Link href="#">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Portals</h4>
              <ul>
                <li><Link href="/login">Student Portal</Link></li>
                <li><Link href="/login">Parent Portal</Link></li>
                <li><Link href="/login">Staff Login</Link></li>
                <li><Link href="/admission">Online Fee Payment</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact Info</h4>
              <p><MapPin size={18} /> 123 School Road, Your City, Pakistan</p>
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

        /* Top Bar */
        .top-bar {
          background: #0f172a;
          color: rgba(255,255,255,0.7);
          padding: 8px 0;
          font-size: 0.8rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .top-bar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .contact-info { display: flex; gap: 20px; }
        .contact-info span { display: flex; alignItems: center; gap: 6px; }
        .portal-links { display: flex; gap: 15px; }
        .portal-link { 
          display: flex; alignItems: center; gap: 4px; 
          color: rgba(255,255,255,0.8); transition: color 0.3s;
        }
        .portal-link:hover { color: #3b82f6; }

        /* Navbar */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #fff;
          padding: 15px 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.3s;
        }
        .navbar.scrolled { padding: 10px 0; }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo { display: flex; alignItems: center; gap: 12px; color: #1e3a8a; }
        .logo-icon { 
          width: 45px; height: 45px; background: #1e3a8a; 
          border-radius: 10px; display: flex; alignItems: center; 
          justify-content: center; color: #fff;
        }
        .logo-text h1 { font-size: 1.4rem; margin: 0; line-height: 1; letter-spacing: -1px; }
        .logo-text p { font-size: 0.6rem; margin: 0; font-weight: 800; letter-spacing: 1px; color: #64748b; }

        .nav-links { display: flex; alignItems: center; gap: 25px; }
        .nav-links a { 
          color: #1e293b; font-weight: 600; font-size: 0.95rem; 
          transition: color 0.3s;
        }
        .nav-links a:hover { color: #3b82f6; }
        .fee-btn { 
          background: #1e3a8a; color: #fff !important; 
          padding: 10px 20px; borderRadius: 8px; font-weight: 700 !important;
        }

        /* Hero */
        .hero {
          position: relative;
          height: 600px;
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

        /* Footer */
        .footer { background: #0f172a; color: #fff; padding: 100px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.5fr; gap: 50px; margin-bottom: 80px; }
        .footer-brand .logo { margin-bottom: 25px; }
        .logo.inverted { color: #fff; }
        .logo.inverted .logo-icon { background: #3b82f6; }
        .footer-desc { color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 30px; }
        .social-links { display: flex; gap: 15px; }
        .social-links a { 
          width: 40px; height: 40px; background: rgba(255,255,255,0.05); 
          border-radius: 10px; display: flex; alignItems: center; 
          justify-content: center; transition: all 0.3s;
        }
        .social-links a:hover { background: #3b82f6; transform: translateY(-3px); }

        .footer-links h4, .footer-contact h4 { font-size: 1.2rem; margin-bottom: 30px; position: relative; }
        .footer-links h4::after, .footer-contact h4::after {
          content: ''; position: absolute; left: 0; bottom: -10px; 
          width: 40px; height: 3px; background: #3b82f6;
        }
        .footer-links ul { list-style: none; padding: 0; }
        .footer-links li { margin-bottom: 15px; }
        .footer-links a { color: rgba(255,255,255,0.6); transition: color 0.3s; }
        .footer-links a:hover { color: #fff; padding-left: 5px; }

        .footer-contact p { 
          display: flex; gap: 15px; color: rgba(255,255,255,0.6); 
          margin-bottom: 20px; align-items: center;
        }

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
          .nav-links { 
            position: fixed; top: 75px; left: -100%; width: 100%; 
            height: calc(100vh - 75px); background: #fff; 
            flex-direction: column; padding: 40px; transition: 0.3s;
          }
          .nav-links.active { left: 0; }
          .hero-title { font-size: 2.5rem; }
          .hero-btns { flex-direction: column; }
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}