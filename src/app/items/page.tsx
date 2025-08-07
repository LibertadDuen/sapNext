"use client";

import { useState } from "react";

interface Item {
  ItemCode: string;
  ItemName: string;
  ItemType: string;
}

export default function CreateItemPage() {
  const [form, setForm] = useState<Item>({
    ItemCode: "",
    ItemName: "",
    ItemType: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) {
        setMessage("Error: " + data.error);
      } else {
        setMessage("Item created successfully!");
        setForm({ ItemCode: "", ItemName: "", ItemType: "" });
      }
    } catch {
      setMessage("Error creating item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "40px auto",
      padding: "32px",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      background: "#fff"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>Create Item</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Item Code:</label>
          <input
            type="text"
            name="ItemCode"
            value={form.ItemCode}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Item Name:</label>
          <input
            type="text"
            name="ItemName"
            value={form.ItemName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>Item Type:</label>
          <select
            name="ItemType"
            value={form.ItemType}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 6, border: "1px solid #ccc" }}
          >
            <option value="">Select Type</option>
            <option value="itItems">Product</option>
            <option value="itServices">Service</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            border: "2px solid #0070f3",
            borderRadius: "8px",
            background: loading ? "#e0f7fa" : "#fff",
            color: "#0070f3",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 8
          }}
        >
          {loading ? "Creating Item..." : "Create Item"}
        </button>
        {message && (
          <div style={{ marginTop: 12, color: message.startsWith("Error") ? "#d63031" : "#00b894" }}>
            {message}
          </div>
        )}
      </form>
          </div>
  );
}