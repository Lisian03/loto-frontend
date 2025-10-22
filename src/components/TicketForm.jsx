import { useState } from "react";
import { submitTicket } from "../services/api.js";
import QRCode from "qrcode.react";

export default function TicketForm() {
  const [personalId, setPersonalId] = useState("");
  const [numbers, setNumbers] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const numsArray = numbers.split(",").map(n => parseInt(n.trim()));
      if (numsArray.length < 6 || numsArray.length > 10) {
        setError("Brojevi moraju biti 6-10.");
        return;
      }
      const res = await submitTicket(personalId, numsArray);
      const blob = new Blob([res.data], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setQrCode(url);
    } catch (err) {
      console.error(err);
      setError("Greška pri slanju listića.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Osobna iskaznica / putovnica:</label>
          <input
            type="text"
            value={personalId}
            onChange={(e) => setPersonalId(e.target.value)}
            maxLength={20}
            required
          />
        </div>
        <div>
          <label>Brojevi (6-10, odvojeni zarezom):</label>
          <input type="text" value={numbers} onChange={(e) => setNumbers(e.target.value)} required />
        </div>
        <button type="submit">Pošalji listić</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {qrCode && (
        <div style={{ marginTop: "1rem" }}>
          <h2>QR kod tvog listića:</h2>
          <img src={qrCode} alt="QR code" />
        </div>
      )}
    </div>
  );
}
