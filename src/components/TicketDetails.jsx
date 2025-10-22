import { useEffect, useState } from "react";
import { getTicket } from "../services/api.js";
import { useParams } from "react-router-dom";

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function fetchTicket() {
      const res = await getTicket(id);
      setTicket(res.data);
    }
    fetchTicket();
  }, [id]);

  if (!ticket) return <p>Učitavanje...</p>;

  return (
    <div>
      <h2>Podaci o listiću</h2>
      <p>Osobna: {ticket.personal_id}</p>
      <p>Brojevi: {ticket.numbers.join(", ")}</p>
      {ticket.drawn_numbers && <p>Izvučeni brojevi: {ticket.drawn_numbers.join(", ")}</p>}
    </div>
  );
}
