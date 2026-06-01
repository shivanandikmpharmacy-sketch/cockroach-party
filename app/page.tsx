"use client";

import "./globals.css";

import Login from "../components/Login";

import { motion } from "framer-motion";

import {
  Shield,
  Users,
  Phone,
  Mail,
  MapPin,
  BadgeIndianRupee,
} from "lucide-react";

export default function Home() {

  return (

    <main className="main">

      {/* NAVBAR */}

      <header className="navbar">

        <div>

          <h1 className="logo">
            COCKROACH MUKTI JANTA PARTY
          </h1>

          <p className="tagline">
            Voice of the energetic employed.
          </p>

        </div>

        <nav className="nav-links">

          <a href="#about">About</a>

          <a href="#story">Story</a>

          <a href="#join">Join</a>

          <a href="#donate">Donate</a>

          <a href="#contact">Contact</a>

        </nav>

      </header>

      {/* HERO */}

      <section className="hero">

        <img
          src="/hero.jpg"
          alt="hero"
          className="hero-img"
        />

        <div className="overlay"></div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >

          <h1 className="hero-title">
            COCKROACH MUKTI
            <br />
            JANTA PARTY
          </h1>

          <p className="hero-subtitle">
            Voice of the energetic employed.
          </p>

          <div className="hero-buttons">

            <button className="btn-primary">
              JOIN THE FIGHT
            </button>

            <button className="btn-secondary">
              LEARN MORE
            </button>

          </div>

          {/* GOOGLE LOGIN */}

          <div className="login-box">

            <Login />

          </div>

        </motion.div>

      </section>

      {/* ABOUT */}

      <section
        id="about"
        className="about-section"
      >

        <div>

          <img
            src="/poster.jpg"
            alt="poster"
            className="poster-img"
          />

        </div>

        <div>

          <h2 className="section-title">
            OUR MISSION
          </h2>

          <p className="about-text">

            Cockroach Mukti Janta Party is a cinematic parody
            movement focused on satire, entertainment,
            internet culture and energetic storytelling.

          </p>

          <div className="card-grid">

            <div className="card">

              <Shield
                size={50}
                className="icon"
              />

              <h3>
                Strong Vision
              </h3>

            </div>

            <div className="card">

              <Users
                size={50}
                className="icon"
              />

              <h3>
                Energetic Team
              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* STORY */}

      <section
        id="story"
        className="story-section"
      >

        <h2 className="section-title center">
          THE STORY
        </h2>

        <div className="story-box">

          <p>

            Dosto, internet par chal rahe bade-bade gyan ke capsule
            khane ke baad, ab market me aaya hai sabse bada revolution —

            <span className="orange">
              {" "}Cockroach Mukti Janta Party!
            </span>

          </p>

          <p>

            Pehle lagta tha ki bade creators desh ke bade muddo par
            video banate hain. Education system, media bias,
            political debates...

          </p>

          <p>

            Lekin asli mission toh kuch aur hi nikla —
            ghar-ghar se cockroach bhagana!

          </p>

          <p>

            Internet ke naam par logon ko confuse karna,
            insan ko cockroach bolna,
            aur reality ko entertainment bana dena —
            yehi modern duniya ka naya circus hai.

          </p>

          <p>

            Cockroach Mukti Janta Party ek fictional cinematic parody
            movement hai jo satire aur energetic storytelling ke
            through internet culture ko present karta hai.

          </p>

          <p className="story-highlight">
            Voice of the energetic employed.
          </p>

        </div>

      </section>

      {/* JOIN */}

      <section
        id="join"
        className="join-section"
      >

        <div className="join-box">

          <h2 className="section-title center">
            JOIN THE MOVEMENT
          </h2>

          <form className="join-form">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <input
              type="tel"
              placeholder="Phone Number"
            />

            <textarea
              rows={5}
              placeholder="Why do you want to join?"
            ></textarea>

            <button className="btn-primary">
              SUBMIT APPLICATION
            </button>

          </form>

        </div>

      </section>

      {/* DONATE */}

      <section
        id="donate"
        className="donate-section"
      >

        <BadgeIndianRupee
          size={80}
          className="donate-icon"
        />

        <h2 className="section-title center">
          SUPPORT THE CAMPAIGN
        </h2>

        <p className="donate-text">

          Help us create more cinematic campaigns,
          graphics and parody content.

        </p>

        <div className="upi-box">

          <h3>
            DONATE VIA UPI
          </h3>

          <p className="upi-id">
            7522809451@axl
          </p>

          <button
            className="btn-primary donate-btn"
            onClick={() =>
              navigator.clipboard.writeText(
                "7522809451@axl"
              )
            }
          >

            COPY UPI ID

          </button>

        </div>

      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="contact-section"
      >

        <div className="contact-card">

          <Phone
            size={50}
            className="icon"
          />

          <h3>
            Phone
          </h3>

          <p>
            +91 9876543210
          </p>

        </div>

        <div className="contact-card">

          <Mail
            size={50}
            className="icon"
          />

          <h3>
            Email
          </h3>

          <p>
            info@cockroachparty.in
          </p>

        </div>

        <div className="contact-card">

          <MapPin
            size={50}
            className="icon"
          />

          <h3>
            Location
          </h3>

          <p>
            India
          </p>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="footer">

        © 2026 COCKROACH MUKTI JANTA PARTY

      </footer>

    </main>
  );
}