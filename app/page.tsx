"use client";

import { useState, useEffect } from "react";
import "./globals.css";
import {
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  BadgeIndianRupee,
  Copy,
  Check,
  QrCode,
  BookOpen,
  Calendar,
} from "lucide-react";

const initialArticles = [
  {
    id: 1,
    title: "Ghar-Ghar se Cockroach Bhagane ka Maha-Abhiyan",
    date: "Nov 08, 2026",
    content: "Dosto, jaise ki aap sabhi jante hain, modern internet duniya me gyan batne wale log toh hazaron hain, lekin asli safai karne wala koi nahi. Yeh article hamare pehle milestone par adharit hai jahan humne digital cockroach ko expose kiya hai...",
  },
  {
    id: 2,
    title: "The Rise of Energetic Employed: Ek Nayi Kranti",
    date: "Nov 02, 2026",
    content: "Subah subah office ki cab pakadne se lekar raat ko laptop screen ke samne baith kar bug fix karne tak — ek energetic employee ki life aasan nahi hoti. Is article mein humne unke struggle aur entertainment par baat ki hai.",
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [articles, setArticles] = useState(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState(initialArticles[0]);
  const upiId = "7522809451@axl";

  useEffect(() => {
    const saved = localStorage.getItem("cmjp_articles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          const merged = [...parsed, ...initialArticles];
          setArticles(merged);
          setSelectedArticle(merged[0]);
        }
      } catch (err) {
        console.error("Storage parse error:", err);
      }
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="main">
      {/* NAVBAR */}
      <header className="navbar">
        <div>
          <h1 className="logo">CMJP</h1>
          <p className="tagline">Cockroach Mukti Janta Party</p>
        </div>

        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#story">Story</a>
          <a href="#articles">Articles</a>
          <a href="#join">Join</a>
          <a href="#donate">Donate</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO SECTION (Clean Image, No overlapping text/yellow box) */}
      <section className="hero">
        <img src="/hero.jpg" alt="hero" className="hero-img" />
        <div className="overlay"></div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-img-container">
          <img src="/poster.jpg" alt="poster" className="poster-img" />
        </div>

        <div>
          <h2 className="section-title">OUR MISSION</h2>
          <p className="about-text">
            Cockroach Mukti Janta Party is a cinematic parody movement focused
            on satire, entertainment, internet culture and energetic storytelling.
          </p>

          <div className="card-grid">
            <div className="card">
              <Shield size={40} className="icon" />
              <h3>Strong Vision</h3>
            </div>
            <div className="card">
              <Users size={40} className="icon" />
              <h3>Energetic Team</h3>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="story-section">
        <h2 className="section-title center">THE STORY</h2>

        <div className="story-box">
          <p>
            Dosto, internet par chal rahe bade-bade gyan ke capsule khane ke
            baad, ab market me aaya hai sabse bada revolution —{" "}
            <span className="orange">Cockroach Mukti Janta Party!</span>
          </p>
          <p>
            Pehle lagta tha ki bade creators desh ke bade muddo par video
            banate hain. Education system, media bias, political debates...
          </p>
          <p>Lekin asli mission toh kuch aur hi nikla — ghar-ghar se cockroach bhagana!</p>
          <p className="story-highlight">Voice of the energetic employed.</p>
        </div>
      </section>

      {/* ARTICLES & BLOG SECTION (READ-ONLY FOR VISITORS) */}
      <section id="articles" className="articles-section">
        <h2 className="section-title center">CAMPAIGN ARTICLES & BLOGS</h2>
        <p className="section-sub center">Padhiye hamare naye vichar aur purane itihas ke kisse.</p>

        <div className="blog-container">
          {/* Active Article Content Display */}
          <div className="blog-main-pane">
            <div className="article-meta">
              <span className="date-badge"><Calendar size={14} /> {selectedArticle.date}</span>
            </div>
            <h3 className="active-article-title">{selectedArticle.title}</h3>
            <p className="active-article-body">{selectedArticle.content}</p>
          </div>

          {/* Sidebar Headlines Links */}
          <div className="blog-sidebar">
            <h4 className="sidebar-heading"><BookOpen size={18} /> Recent & Archive Headlines</h4>
            <div className="headlines-list">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className={`headline-item ${selectedArticle.id === art.id ? "active-headline" : ""}`}
                  onClick={() => setSelectedArticle(art)}
                >
                  <span className="bullet-point">▶</span>
                  <span className="headline-text">{art.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="join-section">
        <div className="join-box">
          <h2 className="section-title center">JOIN THE MOVEMENT</h2>

          <form
            className="join-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Application Submitted Successfully!");
            }}
          >
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="tel" placeholder="Phone Number" required />
            <textarea
              rows={4}
              placeholder="Why do you want to join?"
              required
            ></textarea>

            <button type="submit" className="btn-primary">
              SUBMIT APPLICATION
            </button>
          </form>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="donate-section">
        <BadgeIndianRupee size={70} className="donate-icon" />

        <h2 className="section-title center">SUPPORT THE CAMPAIGN</h2>

        <p className="donate-text">
          Help us create more cinematic campaigns, graphics and parody content.
        </p>

        <div className="upi-box">
          <h3>DONATE VIA UPI</h3>
          <p className="upi-id">{upiId}</p>

          <div className="upi-actions">
            <button className="btn-primary donate-btn" onClick={handleCopy}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "COPIED!" : "COPY UPI ID"}
            </button>

            <button
              className="btn-secondary donate-btn"
              onClick={() => setShowQr(!showQr)}
            >
              <QrCode size={18} />
              {showQr ? "HIDE QR" : "SHOW QR"}
            </button>
          </div>

          {showQr && (
            <div style={{ marginTop: "20px" }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=${upiId}&pn=CockroachMuktiParty`}
                alt="UPI QR Code"
                style={{ margin: "0 auto", borderRadius: "8px", border: "2px solid #fff" }}
              />
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-card">
          <Phone size={40} className="icon" />
          <h3>Phone</h3>
          <p>+91 9876543210</p>
        </div>

        <div className="contact-card">
          <Mail size={40} className="icon" />
          <h3>Email</h3>
          <p>info@cockroachparty.in</p>
        </div>

        <div className="contact-card">
          <MapPin size={40} className="icon" />
          <h3>Location</h3>
          <p>India</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 COCKROACH MUKTI JANTA PARTY. All Rights Reserved.
      </footer>
    </main>
  );
}
