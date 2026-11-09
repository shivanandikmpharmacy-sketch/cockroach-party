"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [showChangePass, setShowChangePass] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const getCurrentPassword = () => {
    return localStorage.getItem("cmjp_admin_pass") || "admin123";
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const existing = JSON.parse(localStorage.getItem("cmjp_articles") || "[]");
    const newArticle = {
      id: Date.now(),
      title: title.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      content: content.trim(),
    };

    const updatedArticles = [newArticle, ...existing];
    localStorage.setItem("cmjp_articles", JSON.stringify(updatedArticles));

    alert("Article successfully publish ho gaya!");
    setTitle("");
    setContent("");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPass = getCurrentPassword();

    if (oldPass !== currentPass) {
      alert("Purana password galat hai!");
      return;
    }

    if (!newPass || newPass.length < 4) {
      alert("Naya password kam se kam 4 aksharon ka hona chahiye!");
      return;
    }

    localStorage.setItem("cmjp_admin_pass", newPass);
    alert("Password successfully change ho gaya! Ab naye password se login karein.");
    setOldPass("");
    setNewPass("");
    setShowChangePass(false);
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div style={{ minHeight: "100vh", background: "#050505", color: "white", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
        <div style={{ background: "#111", border: "2px solid orange", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "380px", textAlign: "center" }}>
          <h2 style={{ color: "orange", marginBottom: "10px" }}>CMJP Admin Panel</h2>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>Sirf website owner ke liye</p>
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
                alert("Galat Password! (Default password: admin123)");
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

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "white", padding: "40px 20px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", background: "#111", border: "2px solid orange", padding: "35px", borderRadius: "20px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", borderBottom: "1px solid #222", paddingBottom: "15px", flexWrap: "wrap", gap: "10px" }}>
          <h2 style={{ color: "orange" }}>Admin Dashboard</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={() => setShowChangePass(!showChangePass)} 
              style={{ background: "#222", color: "orange", border: "1px solid orange", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
            >
              {showChangePass ? "Write Article View" : "Change Password"}
            </button>
            <button 
              onClick={() => setIsAuth(false)} 
              style={{ background: "#333", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
            >
              Logout
            </button>
          </div>
        </div>

        {!showChangePass ? (
          <form onSubmit={handlePublish} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <h3 style={{ color: "#fff", fontSize: "18px", marginBottom: "-5px" }}>Create New Article</h3>
            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "14px", marginBottom: "6px" }}>Article Title / Headline:</label>
              <input
                type="text"
                placeholder="Headline..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: "100%", padding: "14px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", fontSize: "15px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "14px", marginBottom: "6px" }}>Article Content:</label>
              <textarea
                rows={8}
                placeholder="Write content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ width: "100%", padding: "14px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", fontSize: "15px", resize: "none" }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{ padding: "14px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}
            >
              PUBLISH ARTICLE
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <h3 style={{ color: "orange", fontSize: "18px", marginBottom: "-5px" }}>Change Admin Password</h3>
            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "14px", marginBottom: "6px" }}>Purana Password (Current Password):</label>
              <input
                type="password"
                placeholder="Current password..."
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                required
                style={{ width: "100%", padding: "14px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", fontSize: "15px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#ccc", fontSize: "14px", marginBottom: "6px" }}>Naya Password (New Password):</label>
              <input
                type="password"
                placeholder="Naya strong password daalein..."
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
                style={{ width: "100%", padding: "14px", background: "#1c1c1c", border: "1px solid #333", color: "white", borderRadius: "8px", fontSize: "15px" }}
              />
            </div>

            <button
              type="submit"
              style={{ padding: "14px", background: "orange", color: "black", border: "none", fontWeight: "bold", borderRadius: "8px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}
            >
              UPDATE PASSWORD
            </button>
          </form>
        )}

        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <Link href="/" style={{ color: "orange", textDecoration: "none", fontSize: "14px" }}>
            ← Main Website Par Wapas Jayein
          </Link>
        </div>
      </div>
    </div>
  );
}
