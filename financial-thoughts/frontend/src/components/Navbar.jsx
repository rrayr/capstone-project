import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

function NavBar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

return (
    <nav className="navbar">
      <div className="nav-brand">Financial Thoughts</div>

      <button className="nav-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/reminders">Reminders</Link>
      </div>
    </nav>
  );
}

export default NavBar;