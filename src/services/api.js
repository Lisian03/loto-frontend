import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const newRound = (token) =>
  axios.post(`${API_URL}/new-round`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const closeRound = (token) =>
  axios.post(`${API_URL}/close`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const storeResults = (token, numbers) =>
  axios.post(`${API_URL}/store-results`, { numbers }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const submitTicket = (personal_id, numbers) =>
  axios.post(`${API_URL}/ticket`, { personal_id, numbers }, {
    responseType: "blob" // za QR kod kao PNG
  });

export const getTicket = (id) =>
  axios.get(`${API_URL}/ticket/${id}`);
