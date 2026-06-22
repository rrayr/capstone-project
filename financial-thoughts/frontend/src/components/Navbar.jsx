import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar({ token, setToken }) {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar">

      <h2>Financial Thoughts</h2>

      <div className={`nav-links ${open ? "open" : ""}`}>
  {!token ? (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  ) : (
    <>
      <Link to="/">Home</Link>
      <Link to="/transactions">Transactions</Link>
      <Link to="/history">History</Link>
      <Link to="/simulator">Simulator</Link>
      <Link to="/budget">Budget</Link>
      <Link to="/reminders">Reminders</Link>

      <button
        onClick={() => {
          setToken(null);
          localStorage.removeItem("token");
        }}
      >
        Logout
      </button>
    </>
  )}
</div>

    </nav>
  );
}

export default NavBar;