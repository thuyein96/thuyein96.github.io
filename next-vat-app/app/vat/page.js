"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [rate, setRate] = useState(0);
  
  useEffect(() => {
    fetchVatRate();
  }, []);

  async function fetchVatRate() {
    const response = await fetch('/api/vat/rate');
    const data = await response.json();
    console.log('VAT Rate:', data.rate);
    setRate(data.rate);
  }

  return (
    <div>
      <h1>VAT Calculator</h1>
      <div>
        VAT RATE = {(rate * 100).toFixed(2)}%<br/>
        Price:
        <input type="number" placeholder="Enter price" />
        <br />
        VAT:
        <input type="number" placeholder="Enter VAT percentage" />
        <br />
        <button>Calculate</button>
      </div>
    </div>
  );
}
