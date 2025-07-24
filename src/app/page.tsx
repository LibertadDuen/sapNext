"use client";

import { useState } from 'react';

interface BusinessPartner {
  CardCode: string;
  CardName: string;
  CardType: string;
}

export default function Home() {
  const [businessPartners, setBusinessPartners] = useState([]);
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

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/businessPartners");
      const data = await res.json();
      setBusinessPartners(data.value || []);
    } catch (error) {
      console.error('Error fetching business partners:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Business Partners</h1>
      <p>Click the button below to login and fetch Business Partners</p>
      <button onClick={handleLogin} disabled={loading || loggedIn}>
        {loggedIn ? 'Logged In' : loading ? 'Logging in...' : 'Login to SAP'}
      </button>
      <button onClick={handleClick} disabled={loading || !loggedIn}>
        {loading ? 'Loading...' : 'Fetch Business Partners'}
      </button>
      <ul>
        {businessPartners.map((partner:BusinessPartner) => (
          <li key={partner.CardCode}>
            {partner.CardName} ({partner.CardCode})
          </li>
        ))}
      </ul>
    </div>
  );
}