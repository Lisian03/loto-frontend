import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      <h1>Loto App</h1>
      {isAuthenticated ? (
        <div>
          <span>{user.name}</span>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </header>
  );
}
