"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

interface ContentItem {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string;
}

export default function AdminPage() {
  const [emailInput, setEmailInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = "service_default";
  const EMAILJS_TEMPLATE_ID = "template_otp";
  const EMAILJS_PUBLIC_KEY = "wlQr1jm59DeLR39Sb";

  // 🔒 AUTHORIZED ADMIN EMAIL LOCK
  const AUTHORIZED_ADMIN_EMAIL = "shivanand.ikmpharmacy@gmail.com";

  const [activeTab, setActiveTab] = useState<string>("articles");

  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [stories, setStories] = useState<ContentItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [itemTitle, setItemTitle] = useState("");
  const [itemContent, setItemContent] = useState("");
  const [itemImage, setItemImage] = useState("");

  const [aboutText, setAboutText] = useState("");
  const [visionTitle, setVisionTitle] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [upiId, setUpiId] = useState("");
  const [donateMessage, setDonateMessage] = useState("");
  const [qrImage, setQrImage] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const savedArticles = localStorage.getItem("cmjp_articles");
    if (savedArticles) try { setArticles(JSON.parse(savedArticles)); } catch (e) {}

    const savedStories = localStorage.getItem("cmjp_stories");
    if (savedStories) try { setStories(JSON.parse(savedStories)); } catch (e) {}

    setAboutText(localStorage.getItem("cmjp_about_text") || "Cockroach Mukti Janta Party is a cinematic parody movement.");
    setVisionTitle(localStorage.getItem("cmjp_vision_title") || "Strong Vision");
    setTeamTitle(localStorage.getItem("cmjp_team_title") || "Energetic Team");
    setUpiId(localStorage.getItem("cmjp_upi_id") || "7522809451@axl");
    setDonateMessage(localStorage.getItem("cmjp_donate_msg") || "Help us create more cinematic content.");
    setQrImage(localStorage.getItem("cmjp_qr_image") || "");
    setPhone(localStorage.getItem("cmjp_phone") || "+91 9876543210");
    setEmail(localStorage.getItem("cmjp_email") || "info@cockroachparty.in");
    setLocation(localStorage.getItem("cmjp_location") || "India");
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();

    // 🔒 Security Check
    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      alert("Access Denied! Yeh email address Admin Panel ke liye authorized nahi hai.");
      return;
    }

    setLoading(true);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: cleanEmail,
          otp_code: newOtp,
        },
        EMAILJS_PUBLIC_KEY
      );
      setIsOtpSent(true);
      alert(`OTP aapki registered email (${cleanEmail}) par bhej diya gaya hai!`);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert(`OTP Generated (Testing Mode): ${newOtp}`);
      setIsOtpSent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === generatedOtp) {
      setIsAuth(true);
      alert("Login Successful!");
    } else {
      alert("Galat OTP! Dobara koshish karein.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setItemTitle("");
    setItemContent("");
    setItemImage("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !itemContent.trim()) return;

    const list = activeTab === "articles" ? articles : stories;
    const key = activeTab === "articles" ? "cmjp_articles" : "cmjp_stories";
    const setter = activeTab === "articles" ? setArticles : setStories;

    if (editingId) {
      const updated = list.map((item) =>
        item.id === editingId ? { ...item, title: itemTitle.trim(), content: itemContent.trim(), image: itemImage } : item
      );
      setter(updated);
      localStorage.setItem(key, JSON.stringify(updated));
      alert("Updated successfully!");
    } else {
      const newItem: ContentItem = {
        id: Date.now(),
        title: itemTitle.trim(),
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        content: itemContent.trim(),
        image: itemImage,
      };
      const updated = [newItem, ...list];
      setter(updated);
      localStorage.setItem(key, JSON.stringify(updated));
      alert("Published successfully!");
    }
    resetForm();
  };

  const handleEditClick = (item: ContentItem) => {
    setEditingId(item.id);
    setItemTitle(item.title);
    setItemContent(item.content);
    setItemImage(item.image || "");
  };

  const handleDeleteClick = (id: number) => {
    if (confirm("Delete karna chahte hain?")) {
      const list = activeTab === "articles" ? articles : stories;
      const key = activeTab === "articles" ? "cmjp_articles" : "cmjp_stories";
      const setter = activeTab === "articles" ? setArticles : setStories;

      const updated = list.filter((item) => item.id !== id);
      setter(updated);
      localStorage.setItem(key, JSON.stringify(updated));
      if (editingId === id) resetForm();
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("cmjp_about_text", aboutText);
    localStorage.setItem("cmjp_vision_title", visionTitle);
    localStorage.setItem("cmjp_team_title", teamTitle);
    localStorage.setItem("cmjp_upi_id", upiId);
    localStorage.setItem("cmjp_donate_msg", donateMessage);
    localStorage.setItem("cmjp_qr_image", qrImage);
    localStorage.setItem("cmjp_phone", phone);
    localStorage.setItem("cmjp_email", email);
    localStorage.setItem("cmjp_location", location);
    alert("Settings Saved!");
  };

  if (!isAuth) {
    return (
      <div style={{ minHeight: "100vh", background: "#050505", color: "white", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <div style={{ background: "#111", border: "2px solid orange", padding: "35px", borderRadius: "16px", width: "100%", maxWidth: "380px", textAlign: "center" }}>
          <h2 style={{ color: "orange", marginBottom: "8px" }}>CMJP Admin Login</h2>
          <p style={{ color: "#888", fontSize: "13px", marginBottom: "20px" }}>Authorized Admin OTP Access</p>

          {!isOtpSent ? (
            <form onSubmit={handleSendOtp}>
              <input
                type="email"
                placeholder="Enter Registered Admin Email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                style={{ width: "100%", padding: "12px", background: "#222", border: "1px solid #444", color: "white", borderRadius: "8px", marginBottom: "15px", outline: "none" }}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", padding: "12px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}
              >
                {loading ? "SENDING OTP..." : "SEND OTP TO EMAIL"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                placeholder="Enter 6-Digit OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                required
                style={{ width: "100%", padding: "12px", background: "#222", border: "1px solid #444", color: "white", borderRadius: "8px", marginBottom: "15px", outline: "none", letterSpacing: "4px", textAlign: "center", fontSize: "18px" }}
              />
              <button
                type="submit"
                style={{ width: "100%", padding: "12px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer", marginBottom: "10px" }}
              >
                VERIFY & LOGIN
              </button>
              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                style={{ background: "none", border: "none", color: "#888", fontSize: "12px", cursor: "pointer" }}
              >
                Change Email
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  const currentList = activeTab === "articles" ? articles : stories;

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "white", padding: "30px 20px" }}>
      <div style={{ maxWidth: "950px", margin: "0 auto", background: "#111", border: "2px solid orange", padding: "30px", borderRadius: "20px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #222", paddingBottom: "15px" }}>
          <h2 style={{ color: "orange" }}>Admin Dashboard</h2>
          <button onClick={() => setIsAuth(false)} style={{ background: "#333", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
            Logout
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "25px", flexWrap: "wrap" }}>
          {["articles", "stories", "about", "donate", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); resetForm(); }}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                textTransform: "capitalize",
                background: activeTab === tab ? "orange" : "#222",
                color: activeTab === tab ? "black" : "white",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {(activeTab === "articles" || activeTab === "stories") && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            <form onSubmit={handleSaveItem} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h3 style={{ color: "orange", fontSize: "16px" }}>{editingId ? "Edit" : "Add"} {activeTab}</h3>
              <input type="text" placeholder="Headline..." value={itemTitle} onChange={(e) => setItemTitle(e.target.value)} required style={{ padding: "10px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "6px" }} />
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setItemImage)} style={{ padding: "6px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "6px", fontSize: "12px" }} />
              {itemImage && <img src={itemImage} alt="" style={{ width: "70px", height: "45px", objectFit: "cover", borderRadius: "4px" }} />}
              <textarea rows={6} placeholder="Content..." value={itemContent} onChange={(e) => setItemContent(e.target.value)} required style={{ padding: "10px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "6px", resize: "none" }}></textarea>
              <button type="submit" style={{ padding: "10px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}>{editingId ? "Update" : "Publish"}</button>
            </form>

            <div>
              <h3 style={{ color: "#fff", fontSize: "16px", marginBottom: "12px" }}>Manage {activeTab}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "380px", overflowY: "auto" }}>
                {currentList.map((item) => (
                  <div key={item.id} style={{ background: "#181818", padding: "10px", borderRadius: "6px", border: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h4 style={{ color: "#fff", fontSize: "13px" }}>{item.title}</h4>
                      <p style={{ color: "#666", fontSize: "10px" }}>{item.date}</p>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button onClick={() => handleEditClick(item)} style={{ background: "#222", color: "orange", border: "1px solid orange", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDeleteClick(item.id)} style={{ background: "#300", color: "#f88", border: "1px solid #800", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>Del</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}>
            <h3 style={{ color: "orange" }}>Edit About</h3>
            <textarea rows={4} value={aboutText} onChange={(e) => setAboutText(e.target.value)} style={{ width: "100%", padding: "10px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "6px" }} />
            <button type="submit" style={{ padding: "10px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}>Save</button>
          </form>
        )}

        {activeTab === "donate" && (
          <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}>
            <h3 style={{ color: "orange" }}>Edit Donate / UPI</h3>
            <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} style={{ width: "100%", padding: "10px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "6px" }} />
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setQrImage)} style={{ width: "100%", padding: "6px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "6px" }} />
            {qrImage && <img src={qrImage} alt="QR" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }} />}
            <button type="submit" style={{ padding: "10px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}>Save</button>
          </form>
        )}

        {activeTab === "contact" && (
          <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}>
            <h3 style={{ color: "orange" }}>Edit Contact</h3>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "10px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "6px" }} />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "6px" }} />
            <button type="submit" style={{ padding: "10px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}>Save</button>
          </form>
        )}

        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <Link href="/" style={{ color: "orange", textDecoration: "none", fontSize: "13px" }}>← Main Website</Link>
        </div>

      </div>
    </div>
  );
}
