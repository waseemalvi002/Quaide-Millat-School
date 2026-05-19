'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Facebook, Twitter, Youtube, Instagram, 
  MapPin, Mail, Phone, Calendar, ArrowRight, Bell,
  Menu, X, GraduationCap, BookOpen, Award, Users, ShieldCheck, CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { count: "850+", label: "Students Enrolled" },
    { count: "45+", label: "Qualified Teachers" },
    { count: "20+", label: "Classes" },
    { count: "15+", label: "Years of Excellence" },
    { count: "98%", label: "Pass Percentage" }
  ];

  const features = [
    { 
      icon: <BookOpen size={28} />, 
      title: "Quality Education", 
      desc: "We provide high quality education to shape the future leaders." 
    },
    { 
      icon: <Users size={28} />, 
      title: "Experienced Faculty", 
      desc: "Our teachers are highly qualified and dedicated." 
    },
    { 
      icon: <MapPin size={28} />, 
      title: "Modern Facilities", 
      desc: "Well-equipped classrooms, labs, library and sports facilities." 
    },
    { 
      icon: <ShieldCheck size={28} />, 
      title: "Islamic Values", 
      desc: "We focus on moral values along with academic excellence." 
    }
  ];

  const news = [
    { 
      date: "10 May, 2024", 
      title: "Annual Sports Gala 2024", 
      desc: "Our annual sports gala was successfully held with great enthusiasm and athletic spirit." 
    },
    { 
      date: "5 May, 2024", 
      title: "Science Exhibition", 
      desc: "Students showcased amazing innovative projects in our grand annual science exhibition." 
    },
    { 
      date: "1 May, 2024", 
      title: "Admission Open", 
      desc: "Admissions are open for class 6th to 10th. Enroll your child today for a brighter future!" 
    }
  ];

  const notices = [
    { date: "06 May, 2024", title: "Fee Submission Deadline", desc: "Please submit the school fee before 10th May 2024." },
    { date: "03 May, 2024", title: "Holiday Announcement", desc: "School will remain closed on 15th May 2024 on account of holiday." },
    { date: "01 May, 2024", title: "Parent Teacher Meeting", desc: "PTM will be held on 20th May 2024 starting from 8:00 AM." }
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      backgroundColor: '#001a35',
      margin: 0,
      padding: 0,
      overflowX: 'hidden'
    }}>
      
      {/* 
        ====================================================
        DESKTOP MOCKUP VIEW (Screen sizes 1024px and above)
        ====================================================
      */}
      <div className="desktop-mockup">
        <section style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1620 / 920', 
          backgroundImage: "url('/images/home-bg.jpg')",
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          zIndex: 2,
          backgroundColor: '#001a35'
        }}>
          {/* --- Top Bar Overlays --- */}
          <Link href="/login?role=admin" title="Admin Panel" style={{ position: 'absolute', top: '6.5%', left: '26%', width: '8%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/login?role=admin" title="Admin" style={{ position: 'absolute', top: '6.5%', left: '35%', width: '4%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/login?tab=register" title="Register" style={{ position: 'absolute', top: '6.5%', left: '40%', width: '6%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/login" title="Login" style={{ position: 'absolute', top: '6.5%', left: '47%', width: '5%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/login?role=student" title="Student" style={{ position: 'absolute', top: '6.5%', left: '53%', width: '6%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/login?role=teacher" title="Teacher" style={{ position: 'absolute', top: '6.5%', left: '60%', width: '6%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/login?role=staff" title="Staff" style={{ position: 'absolute', top: '6.5%', left: '67%', width: '5%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/login?role=parent" title="Parents" style={{ position: 'absolute', top: '6.5%', left: '73%', width: '6%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/feedback" title="Feedback" style={{ position: 'absolute', top: '6.5%', left: '80%', width: '6%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/payments" title="Online Fee Payment" style={{ position: 'absolute', top: '6.5%', left: '87%', width: '10%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          
          {/* Floating Notification Bell for Admin Awareness - Perfectly Responsive */}
          <Link href="/admin/notifications" className="admin-floating-bell">
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell color="#f87171" strokeWidth={2.5} className="bell-icon" />
              <span className="bell-badge-inner">1</span>
            </div>
          </Link>

          {/* --- Main Navbar Overlays --- */}
          <Link href="/" title="Home" style={{ position: 'absolute', top: '14.5%', left: '29%', width: '4%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/about" title="About Us" style={{ position: 'absolute', top: '14.5%', left: '34%', width: '6%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/academics" title="Academics" style={{ position: 'absolute', top: '14.5%', left: '41%', width: '7%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/admission" title="Admission" style={{ position: 'absolute', top: '14.5%', left: '50%', width: '7%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/login?role=student" title="Students" style={{ position: 'absolute', top: '14.5%', left: '57%', width: '6%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/admin/gallery" title="Gallery" style={{ position: 'absolute', top: '14.5%', left: '64%', width: '5%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/admission" title="News & Events" style={{ position: 'absolute', top: '14.5%', left: '70%', width: '9%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
          <Link href="/admission" title="Contact Us" style={{ position: 'absolute', top: '14.5%', left: '80%', width: '7%', height: '5.5%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>

          {/* --- Hero CTA Buttons (FINAL POSITIONING) --- */}
          <Link href="/about" title="About Our School" style={{ position: 'absolute', top: '48%', left: '4.5%', width: '12%', height: '5%', cursor: 'pointer', zIndex: 30, display: 'block' }}></Link>
          <Link href="/admission" title="Admission Open" style={{ position: 'absolute', top: '48%', left: '17.2%', width: '11%', height: '5%', cursor: 'pointer', zIndex: 30, display: 'block' }}></Link>

          {/* --- News Section Overlay --- */}
          <Link href="/admission" title="View News" style={{ position: 'absolute', top: '75%', left: '5%', width: '90%', height: '22%', cursor: 'pointer', zIndex: 20, display: 'block' }}></Link>
        </section>
      </div>

      {/* 
        ====================================================
        MOBILE & TABLET RESPONSIVE VIEW (Screen sizes < 1024px)
        ====================================================
      */}
      <div className="mobile-responsive">
        {/* Mobile Header Bar */}
        <header className="mobile-header">
          <Link href="/" className="mobile-brand">
            <img src="/images/logo.png" alt="Logo" className="mobile-logo-img" />
            <div className="mobile-brand-text">
              <h2>Quaid-e-Millat</h2>
              <p>PUBLIC BOYS HIGH SCHOOL</p>
            </div>
          </Link>
          
          <div className="mobile-header-actions">
            <Link href="/admin/notifications" className="mobile-bell" title="Notifications">
              <Bell size={22} color="#fb7185" strokeWidth={2.5} />
              <span className="bell-badge">1</span>
            </Link>
            
            <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              {menuOpen ? <X size={26} color="white" /> : <Menu size={26} color="white" />}
            </button>
          </div>
        </header>

        {/* Mobile Hamburger Drawer Menu */}
        <div className={`mobile-drawer ${menuOpen ? 'active' : ''}`}>
          <div className="drawer-section">
            <h3>Navigation</h3>
            <nav className="drawer-nav">
              <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link href="/academics" onClick={() => setMenuOpen(false)}>Academics</Link>
              <Link href="/admission" onClick={() => setMenuOpen(false)}>Admission</Link>
              <Link href="/admin/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
              <Link href="/admission" onClick={() => setMenuOpen(false)}>News & Events</Link>
              <Link href="/admission" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            </nav>
          </div>

          <div className="drawer-divider"></div>

          <div className="drawer-section">
            <h3>Portals</h3>
            <div className="drawer-portals">
              <Link href="/login?role=admin" className="portal-btn btn-admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
              <Link href="/login?role=student" className="portal-btn" onClick={() => setMenuOpen(false)}>Student Portal</Link>
              <Link href="/login?role=teacher" className="portal-btn" onClick={() => setMenuOpen(false)}>Teacher Portal</Link>
              <Link href="/login?role=staff" className="portal-btn" onClick={() => setMenuOpen(false)}>Staff Login</Link>
              <Link href="/login?role=parent" className="portal-btn" onClick={() => setMenuOpen(false)}>Parent Portal</Link>
              <Link href="/login?tab=register" className="portal-btn btn-register" onClick={() => setMenuOpen(false)}>Online Registration</Link>
              <Link href="/payments" className="portal-btn btn-payment" onClick={() => setMenuOpen(false)}>Online Fee Payment</Link>
              <Link href="/results" className="portal-btn" onClick={() => setMenuOpen(false)}>Result Cards</Link>
              <Link href="/feedback" className="portal-btn" onClick={() => setMenuOpen(false)}>Submit Feedback</Link>
            </div>
          </div>
        </div>

        {/* Mobile Hero Section */}
        <section className="mobile-hero">
          <div className="hero-dark-overlay"></div>
          <div className="mobile-hero-content">
            <span className="hero-welcome">WELCOME TO</span>
            <h1 className="hero-title-main">Quaid-e-Millat</h1>
            <p className="hero-title-sub">PUBLIC BOYS HIGH SCHOOL</p>
            <p className="hero-tagline">Quality Education, Discipline and Excellence.</p>
            <p className="hero-desc-text">Building a strong foundation for a brighter future.</p>
            
            <div className="hero-ctas">
              <Link href="/about" className="hero-cta-btn btn-about">About Our School</Link>
              <Link href="/admission" className="hero-cta-btn btn-admission">Admission Open</Link>
            </div>
          </div>
        </section>

        {/* Mobile Features Section */}
        <section className="mobile-features">
          <div className="section-title-wrap">
            <h2>Why Choose Us</h2>
            <div className="section-title-underline"></div>
          </div>
          
          <div className="features-container">
            {features.map((feat, index) => (
              <div key={index} className="mobile-feat-card">
                <div className="feat-card-icon">{feat.icon}</div>
                <div className="feat-card-text">
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Stats Counters Section */}
        <section className="mobile-stats">
          <div className="stats-container">
            {stats.map((st, index) => (
              <div key={index} className="mobile-stat-card">
                <span className="stat-card-number">{st.count}</span>
                <span className="stat-card-label">{st.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile News Section */}
        <section className="mobile-news">
          <div className="section-title-wrap">
            <h2>Latest News & Events</h2>
            <div className="section-title-underline"></div>
          </div>
          
          <div className="news-container">
            {news.map((item, index) => (
              <Link href="/admission" key={index} className="mobile-news-card">
                <span className="news-card-date"><Calendar size={14} style={{ marginRight: '6px' }} /> {item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="news-card-more">Read More <ArrowRight size={14} style={{ marginLeft: '4px' }} /></span>
              </Link>
            ))}
          </div>
        </section>

        {/* Mobile Notices Section */}
        <section className="mobile-notices">
          <div className="section-title-wrap">
            <h2>Important Notices</h2>
            <div className="section-title-underline"></div>
          </div>
          
          <div className="notices-container">
            {notices.map((note, index) => (
              <div key={index} className="mobile-notice-item">
                <div className="notice-item-header">
                  <span className="notice-item-date"><Calendar size={14} style={{ marginRight: '6px' }} /> {note.date}</span>
                  <h3>{note.title}</h3>
                </div>
                <p>{note.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 
        ====================================================
        CLEAN PROFESSIONAL FOOTER (Shared between views)
        ====================================================
      */}
      <footer style={{
        backgroundColor: '#001a35',
        color: 'white',
        padding: '80px 5% 60px',
        fontFamily: "'Inter', sans-serif",
        borderTop: '5px solid #facc15',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr',
          gap: '40px',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <img src="/images/logo.png" alt="Logo" style={{ height: '70px' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 900 }}>Quaid-e-Millat</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '2px', opacity: 0.7 }}>PUBLIC BOYS HIGH SCHOOL</p>
              </div>
            </div>
            <p style={{ lineHeight: 1.8, opacity: 0.6, fontSize: '1rem', marginBottom: '30px' }}>
              Building a strong foundation for a brighter future through quality education, discipline, and excellence.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[
                { Icon: Facebook, color: '#1877F2', href: 'https://facebook.com' },
                { Icon: Twitter, color: '#1DA1F2', href: 'https://twitter.com' },
                { Icon: Youtube, color: '#FF0000', href: 'https://youtube.com' },
                { Icon: Instagram, color: '#E4405F', href: 'https://instagram.com' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-link"
                  style={{ 
                    '--hover-color': social.color,
                    color: 'white', 
                    opacity: 0.6, 
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <social.Icon size={28} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '35px', fontWeight: 800, color: '#60a5fa' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Academics', href: '/academics' },
                { name: 'Admission', href: '/admission' },
                { name: 'Gallery', href: '/admin/gallery' },
                { name: 'Contact Us', href: '/admission' }
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '18px' }}>
                  <Link href={link.href} style={{ color: 'white', textDecoration: 'none', opacity: 0.6, fontSize: '1.1rem', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ArrowRight size={16} /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals Column */}
          <div>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '35px', fontWeight: 800, color: '#facc15' }}>Portals</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { name: 'Student Portal', href: '/login?role=student' },
                { name: 'Parent Portal', href: '/login?role=parent' },
                { name: 'Staff Login', href: '/login?role=staff' },
                { name: 'Online Fee Payment', href: '/payments' },
                { name: 'Result Card', href: '/results' }
              ].map((link) => (
                <li key={link.name} style={{ marginBottom: '18px' }}>
                  <Link href={link.href} style={{ color: 'white', textDecoration: 'none', opacity: 0.6, fontSize: '1.1rem', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ArrowRight size={16} /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '35px', fontWeight: 800, color: '#fb7185' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', gap: '15px', opacity: 0.6, fontSize: '1rem' }}>
                <MapPin size={24} style={{ color: '#fb7185' }} />
                <span>Khanbella Road Jalal PurPir Wala District (Multan)</span>
              </div>
              <div style={{ display: 'flex', gap: '15px', opacity: 0.6, fontSize: '1rem' }}>
                <Mail size={22} style={{ color: '#fb7185' }} />
                <span>info@qmpbhs.edu.pk</span>
              </div>
              <div style={{ display: 'flex', gap: '15px', opacity: 0.6, fontSize: '1rem' }}>
                <Phone size={22} style={{ color: '#fb7185' }} />
                <span>+92 301 6031213</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '80px', paddingTop: '35px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', opacity: 0.4 }}>
          &copy; {new Date().getFullYear()} Quaid-e-Millat Public Boys High School. All Rights Reserved.
        </div>
      </footer>

      {/* 
        ====================================================
        STUNNING RESPONSIVE MOBILE CSS + HOVERS
        ====================================================
      */}
      <style jsx>{`
        /* Desktop Mockup Section Default styles */
        .desktop-mockup {
          display: block;
          width: 100%;
        }

        .admin-floating-bell {
          position: absolute;
          top: 5.8%;
          left: 21.8%;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(239, 68, 68, 0.15);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(239, 68, 68, 0.4);
          cursor: pointer;
          animation: pulse 2s infinite;
          transition: all 0.3s ease;
        }

        .admin-floating-bell :global(.bell-icon) {
          width: 22px;
          height: 22px;
        }

        .admin-floating-bell .bell-badge-inner {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }

        @media (max-width: 1024px) {
          .admin-floating-bell {
            width: 26px !important;
            height: 26px !important;
            left: 20% !important;
            top: 5.8% !important;
          }
          .admin-floating-bell :global(.bell-icon) {
            width: 14px !important;
            height: 14px !important;
          }
          .admin-floating-bell .bell-badge-inner {
            width: 12px !important;
            height: 12px !important;
            font-size: 7px !important;
            top: -4px !important;
            right: -4px !important;
          }
        }

        @media (max-width: 768px) {
          .admin-floating-bell {
            width: 18px !important;
            height: 18px !important;
            left: 19.5% !important;
            top: 5.8% !important;
          }
          .admin-floating-bell :global(.bell-icon) {
            width: 10px !important;
            height: 10px !important;
          }
          .admin-floating-bell .bell-badge-inner {
            width: 9px !important;
            height: 9px !important;
            font-size: 5px !important;
            top: -3px !important;
            right: -3px !important;
          }
        }

        @media (max-width: 480px) {
          .admin-floating-bell {
            width: 14px !important;
            height: 14px !important;
            left: 19% !important;
            top: 5.8% !important;
          }
          .admin-floating-bell :global(.bell-icon) {
            width: 8px !important;
            height: 8px !important;
          }
          .admin-floating-bell .bell-badge-inner {
            width: 7px !important;
            height: 7px !important;
            font-size: 4px !important;
            top: -2px !important;
            right: -2px !important;
          }
        }

        .mobile-responsive {
          display: none;
          width: 100%;
          background-color: #001a35;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        /* Mobile Header */
        .mobile-header {
          position: sticky;
          top: 0;
          height: 75px;
          background: rgba(0, 26, 53, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 2px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          z-index: 100;
        }

        .mobile-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .mobile-logo-img {
          height: 45px;
          width: auto;
          border-radius: 50%;
        }

        .mobile-brand-text h2 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
        }

        .mobile-brand-text p {
          margin: 0;
          font-size: 0.55rem;
          letter-spacing: 1px;
          color: #facc15;
          font-weight: 800;
        }

        .mobile-header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .mobile-bell {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(251, 113, 133, 0.1);
          border: 1px solid rgba(251, 113, 133, 0.3);
          cursor: pointer;
        }

        .bell-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          font-size: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
        }

        .mobile-menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        /* Mobile Hamburger Drawer Menu */
        .mobile-drawer {
          display: block;
          max-height: 0;
          overflow: hidden;
          background: #001124;
          border-bottom: 0 solid #facc15;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          z-index: 99;
          position: relative;
        }

        .mobile-drawer.active {
          max-height: 90vh;
          overflow-y: auto;
          border-bottom: 4px solid #facc15;
          padding: 25px 5%;
        }

        .drawer-section h3 {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #94a3b8;
          margin-top: 0;
          margin-bottom: 15px;
          font-weight: 800;
        }

        .drawer-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .drawer-nav a {
          color: #e2e8f0;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .drawer-nav a:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #60a5fa;
          padding-left: 18px;
        }

        .drawer-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 20px 0;
        }

        .drawer-portals {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .portal-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 12px 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #cbd5e1;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.3s;
        }

        .portal-btn:hover {
          background: #fff;
          color: #001a35;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
        }

        .btn-admin {
          background: linear-gradient(135deg, #059669, #10b981) !important;
          border: none !important;
          color: white !important;
        }

        .btn-admin:hover {
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4) !important;
          transform: translateY(-2px) !important;
        }

        .btn-register {
          background: linear-gradient(135deg, #2563eb, #3b82f6) !important;
          border: none !important;
          color: white !important;
        }

        .btn-register:hover {
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4) !important;
          transform: translateY(-2px) !important;
        }

        .btn-payment {
          background: linear-gradient(135deg, #d97706, #f59e0b) !important;
          border: none !important;
          color: white !important;
        }

        .btn-payment:hover {
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4) !important;
          transform: translateY(-2px) !important;
        }

        /* Mobile Hero */
        .mobile-hero {
          position: relative;
          min-height: 390px;
          background-image: url('/images/home-bg.jpg');
          background-size: 360% auto;
          background-position: 88% 14%;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          padding: 50px 5%;
          overflow: hidden;
        }

        .hero-dark-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 26, 53, 0.9) 0%, rgba(0, 26, 53, 0.7) 60%, #001a35 100%);
          z-index: 1;
        }

        .mobile-hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 600px;
        }

        .hero-welcome {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 3px;
          color: #fb7185;
          margin-bottom: 12px;
          border-bottom: 2px solid #fb7185;
          padding-bottom: 4px;
        }

        .hero-title-main {
          font-size: 3.2rem;
          font-weight: 900;
          margin: 0;
          line-height: 1;
          letter-spacing: -1.5px;
          color: white;
        }

        .hero-title-sub {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #60a5fa;
          margin: 6px 0 20px 0;
          text-transform: uppercase;
        }

        .hero-tagline {
          font-size: 1.4rem;
          font-weight: 700;
          color: #facc15;
          line-height: 1.3;
          margin: 0 0 15px 0;
        }

        .hero-desc-text {
          font-size: 1rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0 0 35px 0;
          font-weight: 500;
        }

        .hero-ctas {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .hero-cta-btn {
          padding: 14px 28px;
          font-size: 0.95rem;
          font-weight: 800;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.3s;
          text-align: center;
        }

        .btn-about {
          background: transparent;
          border: 2px solid #fff;
          color: #fff;
        }

        .btn-about:hover {
          background: #fff;
          color: #001a35;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }

        .btn-admission {
          background: #facc15;
          border: 2px solid #facc15;
          color: #001a35;
          box-shadow: 0 4px 15px rgba(250, 204, 21, 0.3);
        }

        .btn-admission:hover {
          background: #fff;
          border-color: #fff;
          color: #001a35;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(250, 204, 21, 0.5);
        }

        /* Mobile Sections Common */
        .section-title-wrap {
          text-align: center;
          margin-bottom: 35px;
        }

        .section-title-wrap h2 {
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .section-title-underline {
          width: 60px;
          height: 4px;
          background: #facc15;
          margin: 10px auto 0;
          border-radius: 2px;
        }

        /* Features Section */
        .mobile-features {
          padding: 60px 5%;
          background: #001e3d;
        }

        .features-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .mobile-feat-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px;
          border-radius: 20px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          transition: all 0.3s;
        }

        .mobile-feat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(96, 165, 250, 0.3);
        }

        .feat-card-icon {
          color: #60a5fa;
          background: rgba(96, 165, 250, 0.1);
          padding: 12px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feat-card-text h3 {
          margin: 0 0 6px 0;
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
        }

        .feat-card-text p {
          margin: 0;
          font-size: 0.95rem;
          color: #94a3b8;
          line-height: 1.5;
        }

        /* Mobile Stats */
        .mobile-stats {
          padding: 50px 5%;
          background: linear-gradient(135deg, #00162e 0%, #002247 100%);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .mobile-stat-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.03);
          padding: 20px 15px;
          border-radius: 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .mobile-stat-card:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(250, 204, 21, 0.2);
        }

        .stat-card-number {
          font-size: 2rem;
          font-weight: 900;
          color: #facc15;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-card-label {
          font-size: 0.8rem;
          color: #cbd5e1;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* News Section */
        .mobile-news {
          padding: 60px 5%;
          background: #001a35;
        }

        .news-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .mobile-news-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px;
          border-radius: 20px;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: all 0.3s;
        }

        .mobile-news-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(96, 165, 250, 0.3);
        }

        .news-card-date {
          font-size: 0.8rem;
          color: #60a5fa;
          font-weight: 700;
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .mobile-news-card h3 {
          margin: 0 0 10px 0;
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.3;
        }

        .mobile-news-card p {
          margin: 0 0 20px 0;
          font-size: 0.95rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        .news-card-more {
          font-size: 0.85rem;
          color: #facc15;
          font-weight: 800;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          margin-top: auto;
          transition: all 0.3s;
        }

        .mobile-news-card:hover .news-card-more {
          color: #fff;
        }

        /* Notices Section */
        .mobile-notices {
          padding: 60px 5%;
          background: #001e3d;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .notices-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-notice-item {
          background: rgba(0, 0, 0, 0.15);
          border-left: 4px solid #fb7185;
          padding: 20px;
          border-radius: 0 16px 16px 0;
        }

        .notice-item-header {
          margin-bottom: 8px;
        }

        .notice-item-date {
          font-size: 0.75rem;
          color: #fb7185;
          font-weight: 700;
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }

        .notice-item-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 800;
          color: #fff;
        }

        .mobile-notice-item p {
          margin: 0;
          font-size: 0.9rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        /* 
          ====================================================
          RESPONSIVE BREAKPOINTS (MEDIA QUERIES)
          ====================================================
        */
        /* Always show the beautiful original desktop homepage mockup on all devices */
        .desktop-mockup {
          display: block !important;
        }
        .mobile-responsive {
          display: none !important;
        }

        @media (max-width: 600px) {
          .mobile-brand-text h2 {
            font-size: 1.05rem;
          }
          .hero-title-main {
            font-size: 2.5rem;
          }
          .hero-title-sub {
            font-size: 0.9rem;
            letter-spacing: 1.5px;
          }
          .hero-tagline {
            font-size: 1.15rem;
          }
          .hero-desc-text {
            font-size: 0.9rem;
          }
          .hero-cta-btn {
            width: 100%;
            padding: 12px;
          }
          .stats-container {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .drawer-portals {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 601px) and (max-width: 767px) {
          .stats-container {
            grid-template-columns: repeat(3, 1fr);
          }
          .news-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .notices-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }

        @media (min-width: 601px) {
          .mobile-hero {
            min-height: 420px !important;
            background-size: 260% auto !important;
            background-position: 100% 14% !important;
          }
          .hero-dark-overlay {
            background: linear-gradient(90deg, #001a35 35%, rgba(0, 26, 53, 0.7) 70%, rgba(0, 26, 53, 0.3) 100%) !important;
          }
        }
      `}</style>
      
      <style jsx global>{`
        body { margin: 0; padding: 0; background: #001a35; }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        footer a:hover { opacity: 1 !important; color: #fff !important; transform: translateX(5px); }
        .social-icon-link:hover { 
          opacity: 1 !important; 
          color: var(--hover-color) !important; 
          transform: scale(1.2) translateY(-5px) !important; 
        }
        section a:hover { background: rgba(255, 255, 255, 0.05); }
        @media (max-width: 900px) {
          footer > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          footer > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}