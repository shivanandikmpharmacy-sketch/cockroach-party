"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ContentItem {
  id: number;
  title: string;
  date: string;
  content: string;
  image?: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  // Tabs: "articles" | "stories" | "about" | "donate" | "contact" | "password"
  const [activeTab, setActiveTab] = useState<string>("articles");

  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [stories, setStories] = useState<ContentItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [itemTitle, setItemTitle] = useState("");
  const [itemContent, setItemContent] = useState("");
  const [itemImage, setItemImage] = useState("");

  // About State
  const [aboutText, setAboutText] = useState("");
  const [visionTitle, setVisionTitle] = useState("");
  const [teamTitle, setTeamTitle] = useState("");

  // Donate State
  const [upiId, setUpiId] = useState("");
  const [donateMessage, setDonateMessage] = useState("");
  const [qrImage, setQrImage] = useState("");

  // Contact State
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  // Password State
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const getCurrentPassword = () => {
    return localStorage.getItem("cmjp_admin_pass") || "admin123";
  };

  useEffect(() => {
    const savedArticles = localStorage.getItem("cmjp_articles");
    if (savedArticles) try { setArticles(JSON.parse(savedArticles)); } catch (e) {}

    const savedStories = localStorage.getItem("cmjp_stories");
    if (savedStories) try { setStories(JSON.parse(savedStories)); } catch (e) {}

    setAboutText(localStorage.getItem("cmjp_about_text") || "Cockroach Mukti Janta Party is a cinematic parody movement focused on satire, entertainment, internet culture and energetic storytelling.");
    setVisionTitle(localStorage.getItem("cmjp_vision_title") || "Strong Vision");
    setTeamTitle(localStorage.getItem("cmjp_team_title") || "Energetic Team");
    setUpiId(localStorage.getItem("cmjp_upi_id") || "7522809451@axl");
    setDonateMessage(localStorage.getItem("cmjp_donate_msg") || "Help us create more cinematic campaigns, graphics and parody content.");
    setQrImage(localStorage.getItem("cmjp_qr_image") || "");
    setPhone(localStorage.getItem("cmjp_phone") || "+91 9876543210");
    setEmail(localStorage.getItem("cmjp_email") || "info@cockroachparty.in");
    setLocation(localStorage.getItem("cmjp_location") || "India");
  }, []);

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
      alert("Successfully Updated!");
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
      alert("Successfully Published!");
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
    if (confirm("Kya aap ise delete karna chahte hain?")) {
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
    alert("Website Settings Updated Successfully!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (oldPass !== getCurrentPassword()) {
      alert("Purana password galat hai!");
      return;
    }
    if (!newPass || newPass.length < 4) {
      alert("Naya password kam se kam 4 characters ka hona chahiye!");
      return;
    }
    localStorage.setItem("cmjp_admin_pass", newPass);
    alert("Password updated successfully! Ab naye password se login karein.");
    setOldPass("");
    setNewPass("");
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div style={{ minHeight: "100vh", background: "#050505", color: "white", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <div style={{ background: "#111", border: "2px solid orange", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", textAlign: "center" }}>
          <h2 style={{ color: "orange", marginBottom: "10px" }}>CMJP Admin Login</h2>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>Master Dashboard Access</p>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", background: "#222", border: "1px solid #444", color: "white", borderRadius: "8px", marginBottom: "15px", outline: "none" }}
          />
          <button
            onClick={() => {
              if (password === getCurrentPassword()) setIsAuth(true);
              else alert("Galat Password!");
            }}
            style={{ width: "100%", padding: "12px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}
          >
            LOGIN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  const currentList = activeTab === "articles" ? articles : stories;

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "white", padding: "40px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", background: "#111", border: "2px solid orange", padding: "35px", borderRadius: "20px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", borderBottom: "1px solid #222", paddingBottom: "15px" }}>
          <h2 style={{ color: "orange" }}>CMJP Control Panel</h2>
          <button onClick={() => setIsAuth(false)} style={{ background: "#333", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
            Logout
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" }}>
          {["articles", "stories", "about", "donate", "contact", "password"].map((tab) => (
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
              {tab === "password" ? "Change Password" : tab}
            </button>
          ))}
        </div>

        {/* ARTICLES & STORIES TAB */}
        {(activeTab === "articles" || activeTab === "stories") && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            <form onSubmit={handleSaveItem} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ color: "orange", fontSize: "18px" }}>
                {editingId ? "Edit" : "Create New"} {activeTab}
              </h3>
              <input
                type="text"
                placeholder="Headline Title..."
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                required
                style={{ padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }}
              />
              <div>
                <label style={{ fontSize: "12px", color: "#aaa", display: "block", marginBottom: "5px" }}>Article Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setItemImage)}
                  style={{ padding: "8px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", fontSize: "12px", width: "100%" }}
                />
                {itemImage && (
                  <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src={itemImage} alt="" style={{ width: "70px", height: "45px", objectFit: "cover", borderRadius: "4px" }} />
                    <button type="button" onClick={() => setItemImage("")} style={{ background: "#300", color: "#f88", border: "none", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>Remove Image</button>
                  </div>
                )}
              </div>
              <textarea
                rows={7}
                placeholder="Content text..."
                value={itemContent}
                onChange={(e) => setItemContent(e.target.value)}
                required
                style={{ padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", resize: "none" }}
              ></textarea>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ flex: 1, padding: "12px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>
                  {editingId ? "UPDATE ITEM" : "PUBLISH ITEM"}
                </button>
                {editingId && <button type="button" onClick={resetForm} style={{ padding: "12px", background: "#333", color: "white", border: "none", borderRadius: "8px" }}>Cancel</button>}
              </div>
            </form>

            <div>
              <h3 style={{ color: "#fff", fontSize: "18px", marginBottom: "15px" }}>Manage {activeTab}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "420px", overflowY: "auto" }}>
                {currentList.map((item) => (
                  <div key={item.id} style={{ background: "#181818", padding: "12px", borderRadius: "8px", border: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      {item.image && <img src={item.image} alt="" style={{ width: "45px", height: "35px", objectFit: "cover", borderRadius: "4px" }} />}
                      <div>
                        <h4 style={{ color: "#fff", fontSize: "14px" }}>{item.title}</h4>
                        <p style={{ color: "#777", fontSize: "11px" }}>{item.date}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={() => handleEditClick(item)} style={{ background: "#222", color: "orange", border: "1px solid orange", padding: "5px 10px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>Edit</button>
                      <button onClick={() => handleDeleteClick(item.id)} style={{ background: "#300", color: "#f88", border: "1px solid #800", padding: "5px 10px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>Del</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "550px" }}>
            <h3 style={{ color: "orange", fontSize: "18px" }}>Edit About & Mission</h3>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>Mission Description Text:</label>
              <textarea rows={5} value={aboutText} onChange={(e) => setAboutText(e.target.value)} style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>Card 1 Title:</label>
              <input type="text" value={visionTitle} onChange={(e) => setVisionTitle(e.target.value)} style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>Card 2 Title:</label>
              <input type="text" value={teamTitle} onChange={(e) => setTeamTitle(e.target.value)} style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <button type="submit" style={{ padding: "14px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>SAVE ABOUT SECTION</button>
          </form>
        )}

        {/* DONATE & UPI TAB */}
        {activeTab === "donate" && (
          <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "550px" }}>
            <h3 style={{ color: "orange", fontSize: "18px" }}>Edit Donation & UPI / QR Settings</h3>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>UPI ID:</label>
              <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>Donation Subtitle Text:</label>
              <textarea rows={3} value={donateMessage} onChange={(e) => setDonateMessage(e.target.value)} style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>Upload Custom QR Code Image (Optional - overrides auto QR):</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setQrImage)} style={{ width: "100%", padding: "8px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", fontSize: "13px" }} />
              {qrImage && (
                <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "15px" }}>
                  <img src={qrImage} alt="QR Preview" style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "8px", border: "1px solid orange" }} />
                  <button type="button" onClick={() => setQrImage("")} style={{ background: "#300", color: "#f88", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>Remove Custom QR</button>
                </div>
              )}
            </div>
            <button type="submit" style={{ padding: "14px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>SAVE DONATE SECTION</button>
          </form>
        )}

        {/* CONTACT TAB */}
        {activeTab === "contact" && (
          <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "550px" }}>
            <h3 style={{ color: "orange", fontSize: "18px" }}>Edit Contact Details</h3>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>Phone Number:</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>Email Address:</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#aaa", display: "block", marginBottom: "5px" }}>Location:</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <button type="submit" style={{ padding: "14px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>SAVE CONTACT DETAILS</button>
          </form>
        )}

        {/* PASSWORD TAB */}
        {activeTab === "password" && (
          <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "420px" }}>
            <h3 style={{ color: "orange", fontSize: "18px" }}>Change Admin Password</h3>
            <input type="password" placeholder="Purana Password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} required style={{ padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            <input type="password" placeholder="Naya Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} required style={{ padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            <button type="submit" style={{ padding: "14px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>UPDATE PASSWORD</button>
          </form>
        )}

        <div style={{ marginTop: "35px", textAlign: "center" }}>
          <Link href="/" style={{ color: "orange", textDecoration: "none", fontSize: "14px" }}>← Main Website Par Wapas Jayein</Link>
        </div>

      </div>
    </div>
  );
}
