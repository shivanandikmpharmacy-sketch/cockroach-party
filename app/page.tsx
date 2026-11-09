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

interface ContentItem {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string;
}

const initialArticles: ContentItem[] = [
  {
    id: 1,
    title: "Ghar-Ghar se Cockroach Bhagane ka Maha-Abhiyan",
    date: "Nov 08, 2026",
    content: "Dosto, jaise ki aap sabhi jante hain, modern internet duniya me gyan batne wale log toh hazaron hain, lekin asli safai karne wala koi nahi...",
  },
];

const initialStories: ContentItem[] = [
  {
    id: 1,
    title: "THE STORY",
    date: "Nov 01, 2026",
    content: "Dosto, internet par chal rahe bade-bade gyan ke capsule khane ke baad, ab market me aaya hai sabse bada revolution — Cockroach Mukti Janta Party!",
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const [articles, setArticles] = useState<ContentItem[]>(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState<ContentItem>(initialArticles[0]);
  const [stories, setStories] = useState<ContentItem[]>(initialStories);

  // Dynamic Settings
  const [aboutText, setAboutText] = useState("Cockroach Mukti Janta Party is a cinematic parody movement focused on satire, entertainment, internet culture and energetic storytelling.");
  const [visionTitle, setVisionTitle] = useState("Strong Vision");
  const [teamTitle, setTeamTitle] = useState("Energetic Team");
  const [upiId, setUpiId] = useState("7522809451@axl");
  const [donateMsg, setDonateMsg] = useState("Help us create more cinematic campaigns, graphics and parody content.");
  const [qrImage, setQrImage] = useState("");
  const [phone, setPhone] = useState("+91 9876543210");
  const [email, setEmail] = useState("info@cockroachparty.in");
  const [location, setLocation] = useState("India");

  useEffect(() => {
    const savedArticles = localStorage.getItem("cmjp_articles");
    if (savedArticles) {
      try {
        const parsed = JSON.parse(savedArticles);
        if (parsed.length > 0) {
          setArticles(parsed);
          setSelectedArticle(parsed[0]);
        }
      } catch (e) {}
    }

    const savedStories = localStorage.getItem("cmjp_stories");
    if (savedStories) {
      try {
        const parsed = JSON.parse(savedStories);
        if (parsed.length > 0) setStories(parsed);
      } catch (e) {}
    }

    if (localStorage.getItem("cmjp_about_text")) setAboutText(localStorage.getItem("cmjp_about_text")!);
    if (localStorage.getItem("cmjp_vision_title")) setVisionTitle(localStorage.getItem("cmjp_vision_title")!);
    if (localStorage.getItem("cmjp_team_title")) setTeamTitle(localStorage.getItem("cmjp_team_title")!);
    if (localStorage.getItem("cmjp_upi_id")) setUpiId(localStorage.getItem("cmjp_upi_id")!);
    if (localStorage.getItem("cmjp_donate_msg")) setDonateMsg(localStorage.getItem("cmjp_donate_msg")!);
    if (localStorage.getItem("cmjp_qr_image")) setQrImage(localStorage.getItem("cmjp_qr_image")!);
    if (localStorage.getItem("cmjp_phone")) setPhone(localStorage.getItem("cmjp_phone")!);
    if (localStorage.getItem("cmjp_email")) setEmail(localStorage.getItem("cmjp_email")!);
    if (localStorage.getItem("cmjp_location")) setLocation(localStorage.getItem("cmjp_location")!);
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

      {/* HERO SECTION */}
      <section className="hero">
        <img src="/hero.jpg" alt="hero" className="hero-img" />
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div>
          <img src="/poster.jpg" alt="poster" className="poster-img" />
        </div>

        <div>
          <h2 className="section-title">OUR MISSION</h2>
          <p className="about-text">{aboutText}</p>

          <div className="card-grid">
            <div className="card">
              <Shield size={38} className="icon" />
              <h3>{visionTitle}</h3>
            </div>
            <div className="card">
              <Users size={38} className="icon" />
              <h3>{teamTitle}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="story-section">
        <h2 className="section-title center">CAMPAIGN STORIES</h2>
        {stories.map((story) => (
          <div key={story.id} className="story-box" style={{ marginBottom: "25px" }}>
            <h3 style={{ color: "orange", marginBottom: "15px" }}>{story.title}</h3>
            {story.image && (
              <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <img src={story.image} alt="" style={{ width: "100%", maxHeight: "380px", objectFit: "cover", borderRadius: "10px" }} />
              </div>
            )}
            <p>{story.content}</p>
            <p className="story-highlight">Voice of the energetic employed.</p>
          </div>
        ))}
      </section>

      {/* ARTICLES & BLOG (BOOK STYLE) */}
      <section id="articles" className="articles-section">
        <h2 className="section-title center">CAMPAIGN ARTICLES & BLOGS</h2>
        <p className="section-sub center">Padhiye hamare naye vichar aur purane itihas ke kisse.</p>

        <div className="blog-container">
          <div className="blog-main-pane">
            <div className="article-meta">
              <span className="date-badge"><Calendar size={14} /> {selectedArticle?.date}</span>
            </div>
            <h3 className="active-article-title">{selectedArticle?.title}</h3>

            {selectedArticle?.image && (
              <div style={{ marginBottom: "25px", textAlign: "center" }}>
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  style={{ width: "100%", maxHeight: "380px", objectFit: "cover", borderRadius: "10px", border: "1px solid #333" }}
                />
              </div>
            )}

            <p className="active-article-body">{selectedArticle?.content}</p>
          </div>

          <div className="blog-sidebar">
            <h4 className="sidebar-heading"><BookOpen size={18} /> Headlines & Archives</h4>
            <div className="headlines-list">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className={`headline-item ${selectedArticle?.id === art.id ? "active-headline" : ""}`}
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
          <form className="join-form" onSubmit={(e) => { e.preventDefault(); alert("Application Submitted Successfully!"); }}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="tel" placeholder="Phone Number" required />
            <textarea rows={4} placeholder="Why do you want to join?" required></textarea>
            <button type="submit" className="btn-primary">SUBMIT APPLICATION</button>
          </form>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="donate-section">
        <BadgeIndianRupee size={70} className="donate-icon" />
        <h2 className="section-title center">SUPPORT THE CAMPAIGN</h2>
        <p className="donate-text">{donateMsg}</p>

        <div className="upi-box">
          <h3>DONATE VIA UPI</h3>
          <p className="upi-id">{upiId}</p>
          <div className="upi-actions">
            <button className="btn-primary donate-btn" onClick={handleCopy}>
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "COPIED!" : "COPY UPI"}
            </button>
            <button className="btn-secondary donate-btn" onClick={() => setShowQr(!showQr)}>
              <QrCode size={16} /> {showQr ? "HIDE QR" : "SHOW QR"}
            </button>
          </div>
          {showQr && (
            <div style={{ marginTop: "20px" }}>
              <img
                src={qrImage || `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=${upiId}&pn=CockroachMuktiParty`}
                alt="UPI QR"
                style={{ width: "160px", height: "160px", margin: "0 auto", borderRadius: "8px", border: "2px solid #fff", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-card">
          <Phone size={38} className="icon" />
          <h3>Phone</h3>
          <p>{phone}</p>
        </div>
        <div className="contact-card">
          <Mail size={38} className="icon" />
          <h3>Email</h3>
          <p>{email}</p>
        </div>
        <div className="contact-card">
          <MapPin size={38} className="icon" />
          <h3>Location</h3>
          <p>{location}</p>
        </div>
      </section>

      <footer className="footer">
        © 2026 COCKROACH MUKTI JANTA PARTY. All Rights Reserved.
      </footer>
    </main>
  );
}
