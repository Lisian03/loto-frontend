import Header from "../components/Header.jsx";
import AdminPanel from "../components/AdminPanel.jsx";
import { useAuth0 } from "@auth0/auth0-react";

export default function Admin() {
  const { getAccessTokenSilently } = useAuth0();

  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const t = await getAccessTokenSilently({ audience: import.meta.env.VITE_AUTH0_AUDIENCE });
      setToken(t);
    }
    fetchToken();
  }, []);

  if (!token) return <p>Učitavanje tokena...</p>;

  return (
    <div>
      <Header />
      <AdminPanel token={token} />
    </div>
  );
}
