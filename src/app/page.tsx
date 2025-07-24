"use client";

import { useState } from 'react';

interface BusinessPartner {
  CardCode: string;
  CardName: string;
  CardType: string;
}

interface Invoice {
  DocEntry: number;
  DocNum: number;
  CardCode: string;
  CardName: string;
  DocDate: string;
  DocTotal: number;
}

export default function Home() {
  const [businessPartners, setBusinessPartners] = useState<BusinessPartner[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      const res = await fetch("/api/login", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setLoggedIn(true);
        console.log("Logged in to SAP!");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchPartners() {
    setLoading(true);
    try {
      const res = await fetch("/api/businessPartners");
      const data = await res.json();
      setBusinessPartners(data.value || []);
      setInvoices([]); // Clear invoices when fetching partners
    } catch (error) {
      console.error('Error fetching business partners:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFetchInvoices() {
    setLoading(true);
    try {
      const res = await fetch("/api/invoices");
      const data = await res.json();
      setInvoices(data.value || []);
      setBusinessPartners([]); // Clear partners when fetching invoices
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      maxWidth: 500,
      margin: "40px auto",
      padding: "32px",
      borderRadius: "16px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      background: "#fff"
    }}>
      <h1 style={{ textAlign: "center", marginBottom: 8 }}>SAP Data Viewer</h1>
      <p style={{ textAlign: "center", marginBottom: 24, color: "#555" }}>
        Login and fetch your SAP Business Partners or Invoices below
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
        <button
          onClick={handleLogin}
          disabled={loading || loggedIn}
          style={{
            padding: "10px 24px",
            border: "2px solid #0070f3",
            borderRadius: "8px",
            background: loggedIn ? "#e0f7fa" : "#fff",
            color: "#0070f3",
            fontWeight: 600,
            cursor: loading || loggedIn ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          {loggedIn ? 'Logged In' : loading ? 'Logging in...' : 'Login to SAP'}
        </button>
        <button
          onClick={handleFetchPartners}
          disabled={loading || !loggedIn}
          style={{
            padding: "10px 24px",
            border: "2px solid #00b894",
            borderRadius: "8px",
            background: loading ? "#dff9fb" : "#fff",
            color: "#00b894",
            fontWeight: 600,
            cursor: loading || !loggedIn ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          {loading ? 'Loading...' : 'Fetch Business Partners'}
        </button>
        <button
          onClick={handleFetchInvoices}
          disabled={loading || !loggedIn}
          style={{
            padding: "10px 24px",
            border: "2px solid #fdcb6e",
            borderRadius: "8px",
            background: loading ? "#ffeaa7" : "#fff",
            color: "#fdcb6e",
            fontWeight: 600,
            cursor: loading || !loggedIn ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          {loading ? 'Loading...' : 'Fetch Invoices'}
        </button>
      </div>
      {businessPartners.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {businessPartners.map((partner: BusinessPartner) => (
            <li
              key={partner.CardCode}
              style={{
                padding: "12px 16px",
                marginBottom: "8px",
                border: "1px solid #eee",
                borderRadius: "6px",
                background: "#fafafa",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
              }}
            >
              <strong>{partner.CardName}</strong> <span style={{ color: "#888" }}>({partner.CardCode})</span>
            </li>
          ))}
        </ul>
      )}
      {invoices.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {invoices.map((invoice: Invoice) => (
            <li
              key={invoice.DocEntry}
              style={{
                padding: "12px 16px",
                marginBottom: "8px",
                border: "1px solid #ffeaa7",
                borderRadius: "6px",
                background: "#fffbe6",
                boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
              }}
            >
              <strong>Invoice #{invoice.DocNum}</strong> <br />
              <span style={{ color: "#888" }}>{invoice.CardName} ({invoice.CardCode})</span><br />
              <span>Date: {invoice.DocDate}</span><br />
              <span>Total: ${invoice.DocTotal}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}