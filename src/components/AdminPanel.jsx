import { useState } from "react";
import { newRound, closeRound, storeResults } from "../services/api.js";

export default function AdminPanel({ token }) {
  const [numbers, setNumbers] = useState("");

  const handleNewRound = async () => await newRound(token);
  const handleCloseRound = async () => await closeRound(token);
  const handleStoreResults = async () => {
    const numsArray = numbers.split(",").map(n => parseInt(n.trim()));
    await storeResults(token, numsArray);
  };

  return (
    <div>
      <h2>Admin panel</h2>
      <button onClick={handleNewRound}>Pokreni novo kolo</button>
      <button onClick={handleCloseRound}>Zatvori kolo</button>
      <div>
        <input
          type="text"
          placeholder="Izvučeni brojevi (6-10, zarez)"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
        />
        <button onClick={handleStoreResults}>Spremi izvučene brojeve</button>
      </div>
    </div>
  );
}
