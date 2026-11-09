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

const defaultArticles: ContentItem[] = [
  {
    id: 1,
    title: "Ghar-Ghar se Cockroach Bhagane ka Maha-Abhiyan",
    date: "Nov 08, 2026",
    content: "Dosto, jaise ki aap sabhi jante hain, modern internet duniya me gyan batne wale log toh hazaron hain, lekin asli safai karne wala koi nahi...",
    image: "",
  },
];

const defaultStories: ContentItem[] = [
  {
    id: 1,
    title: "The Origin Story",
    date: "Nov 01, 2026",
    content: "Dosto, internet par chal rahe bade-bade gyan ke capsule khane ke baad, ab market me aaya hai sabse bada revolution...",
    image: "",
  },
];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const [activeTab, setActiveTab] = useState<"articles" | "stories" | "settings" | "password">("articles");

  const [articles, setArticles] = useState<ContentItem[]>([]);
  const [stories, setStories] = useState<ContentItem[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [itemTitle, setItemTitle] = useState("");
  const [itemContent, setItemContent] = useState("");
  const [itemImage, setItemImage] = useState("");

  const [aboutText, setAboutText] = useState("");
  const [upiId, setUpiId] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const getCurrentPassword = () => {
    return localStorage.getItem("cmjp_admin_pass") || "admin123";
  };

  useEffect(() => {
    const savedArticles = localStorage.getItem("cmjp_articles");
    if (savedArticles) {
      try { setArticles(JSON.parse(savedArticles)); } catch (e) { setArticles(defaultArticles); }
    } else {
      setArticles(defaultArticles);
      localStorage.setItem("cmjp_articles", JSON.stringify(defaultArticles));
    }

    const savedStories = localStorage.getItem("cmjp_stories");
    if (savedStories) {
      try { setStories(JSON.parse(savedStories)); } catch (e) { setStories(defaultStories); }
    } else {
      setStories(defaultStories);
      localStorage.setItem("cmjp_stories", JSON.stringify(defaultStories));
    }

    setAboutText(localStorage.getItem("cmjp_about_text") || "Cockroach Mukti Janta Party is a cinematic parody movement focused on satire, entertainment, internet culture and energetic storytelling.");
    setUpiId(localStorage.getItem("cmjp_upi_id") || "7522809451@axl");
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setItemTitle("");
    setItemContent("");
    setItemImage("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim() || !itemContent.trim()) return;

    const list = activeTab === "articles" ? articles : stories;
    const storageKey = activeTab === "articles" ? "cmjp_articles" : "cmjp_stories";
    const setter = activeTab === "articles" ? setArticles : setStories;

    if (editingId) {
      const updated = list.map((item) =>
        item.id === editingId ? { ...item, title: itemTitle.trim(), content: itemContent.trim(), image: itemImage } : item
      );
      setter(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      alert(`${activeTab === "articles" ? "Article" : "Story"} update ho gaya!`);
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
      localStorage.setItem(storageKey, JSON.stringify(updated));
      alert(`Naya ${activeTab === "articles" ? "Article" : "Story"} publish ho gaya!`);
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
      const storageKey = activeTab === "articles" ? "cmjp_articles" : "cmjp_stories";
      const setter = activeTab === "articles" ? setArticles : setStories;

      const updated = list.filter((item) => item.id !== id);
      setter(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
      if (editingId === id) resetForm();
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("cmjp_about_text", aboutText);
    localStorage.setItem("cmjp_upi_id", upiId);
    alert("Website details update ho gayi!");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (oldPass !== getCurrentPassword()) {
      alert("Purana password galat hai!");
      return;
    }
    if (!newPass || newPass.length < 4) {
      alert("Naya password kam se kam 4 aksharon ka hona chahiye!");
      return;
    }
    localStorage.setItem("cmjp_admin_pass", newPass);
    alert("Password update ho gaya! Dobara login karein.");
    setOldPass("");
    setNewPass("");
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div style={{ minHeight: "100vh", background: "#050505", color: "white", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <div style={{ background: "#111", border: "2px solid orange", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "380px", textAlign: "center" }}>
          <h2 style={{ color: "orange", marginBottom: "10px" }}>CMJP Admin Panel</h2>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>Website Owner Control Center</p>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", background: "#222", border: "1px solid #444", color: "white", borderRadius: "8px", marginBottom: "15px", outline: "none" }}
          />
          <button
            onClick={() => {
              if (password === getCurrentPassword()) {
                setIsAuth(true);
              } else {
                alert("Galat Password!");
              }
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
    <div style={{ minHeight: "100vh", background: "#050505", color: "white", padding: "30px 20px" }}>
      <div style={{ maxWidth: "950px", margin: "0 auto", background: "#111", border: "2px solid orange", padding: "30px", borderRadius: "20px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #222", paddingBottom: "15px" }}>
          <h2 style={{ color: "orange" }}>Admin Dashboard</h2>
          <button onClick={() => setIsAuth(false)} style={{ background: "#333", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
            Logout
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "25px", flexWrap: "wrap" }}>
          <button
            onClick={() => { setActiveTab("articles"); resetForm(); }}
            style={{ padding: "10px 18px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", background: activeTab === "articles" ? "orange" : "#222", color: activeTab === "articles" ? "black" : "white" }}
          >
            Articles ({articles.length})
          </button>
          <button
            onClick={() => { setActiveTab("stories"); resetForm(); }}
            style={{ padding: "10px 18px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", background: activeTab === "stories" ? "orange" : "#222", color: activeTab === "stories" ? "black" : "white" }}
          >
            Stories ({stories.length})
          </button>
          <button
            onClick={() => { setActiveTab("settings"); resetForm(); }}
            style={{ padding: "10px 18px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", background: activeTab === "settings" ? "orange" : "#222", color: activeTab === "settings" ? "black" : "white" }}
          >
            Website Settings
          </button>
          <button
            onClick={() => { setActiveTab("password"); resetForm(); }}
            style={{ padding: "10px 18px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer", background: activeTab === "password" ? "orange" : "#222", color: activeTab === "password" ? "black" : "white" }}
          >
            Change Password
          </button>
        </div>

        {(activeTab === "articles" || activeTab === "stories") && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
            <form onSubmit={handleSaveItem} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <h3 style={{ color: "orange", fontSize: "18px" }}>
                {editingId ? `Edit ${activeTab === "articles" ? "Article" : "Story"}` : `Add New ${activeTab === "articles" ? "Article" : "Story"}`}
              </h3>

              <div>
                <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "4px" }}>Title / Headline:</label>
                <input
                  type="text"
                  placeholder="Headline..."
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  required
                  style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "4px" }}>Upload Image (Optional):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ width: "100%", padding: "8px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", fontSize: "13px" }}
                />
                {itemImage && (
                  <div style={{ marginTop: "8px" }}>
                    <img src={itemImage} alt="Preview" style={{ width: "100px", height: "60px", objectFit: "cover", borderRadius: "4px", border: "1px solid orange" }} />
                    <button type="button" onClick={() => setItemImage("")} style={{ display: "block", background: "none", color: "#f88", border: "none", fontSize: "11px", cursor: "pointer", marginTop: "4px" }}>Remove Image</button>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "4px" }}>Content:</label>
                <textarea
                  rows={6}
                  placeholder="Content text..."
                  value={itemContent}
                  onChange={(e) => setItemContent(e.target.value)}
                  required
                  style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", resize: "none" }}
                ></textarea>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ flex: 1, padding: "12px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>
                  {editingId ? "UPDATE" : "PUBLISH"}
                </button>
                {editingId && (
                  <button type="button" onClick={resetForm} style={{ padding: "12px", background: "#333", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div>
              <h3 style={{ color: "#fff", fontSize: "18px", marginBottom: "15px" }}>
                Manage Published {activeTab === "articles" ? "Articles" : "Stories"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "400px", overflowY: "auto" }}>
                {currentList.map((item) => (
                  <div key={item.id} style={{ background: "#181818", padding: "12px", borderRadius: "8px", border: editingId === item.id ? "1px solid orange" : "1px solid #222", display: "flex", gap: "10px", alignItems: "center" }}>
                    {item.image && <img src={item.image} alt="" style={{ width: "50px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: "#fff", fontSize: "14px", marginBottom: "2px" }}>{item.title}</h4>
                      <p style={{ color: "#777", fontSize: "11px", marginBottom: "6px" }}>{item.date}</p>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => handleEditClick(item)} style={{ background: "#222", color: "orange", border: "1px solid orange", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteClick(item.id)} style={{ background: "#300", color: "#f88", border: "1px solid #800", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "550px" }}>
            <h3 style={{ color: "orange", fontSize: "18px" }}>Edit Website Info</h3>
            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "4px" }}>About / Mission Text:</label>
              <textarea
                rows={4}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }}
              ></textarea>
            </div>
            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "4px" }}>UPI ID (Donation):</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }}
              />
            </div>
            <button type="submit" style={{ padding: "12px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>
              SAVE SETTINGS
            </button>
          </form>
        )}

        {activeTab === "password" && (
          <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "400px" }}>
            <h3 style={{ color: "orange", fontSize: "18px" }}>Change Admin Password</h3>
            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "4px" }}>Purana Password:</label>
              <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} required style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "13px", marginBottom: "4px" }}>Naya Password:</label>
              <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} required style={{ width: "100%", padding: "12px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px" }} />
            </div>
            <button type="submit" style={{ padding: "12px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>
              UPDATE PASSWORD
            </button>
          </form>
        )}

        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <Link href="/" style={{ color: "orange", textDecoration: "none", fontSize: "14px" }}>
            ← Main Website Par Wapas Jayein
          </Link>
        </div>
      </div>
    </div>
  );
}
