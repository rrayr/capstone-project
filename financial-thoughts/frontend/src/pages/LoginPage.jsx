import { useNavigate } from "react-router-dom";
import FinancialApi from "../api/FinancialApi";
import LoginForm from "../features/auth/LoginForm";

function LoginPage({ setToken }) {
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    const token = await FinancialApi.login(formData);

    setToken(token);
    navigate("/");
  }

  return (
    <div className="page">

      <h1 className="page-header">
        Welcome Back!
      </h1>

      <p className="welcome-text">
        Sign back in to manage your finances.
      </p>

      <p className="subtext">
        Don't have an account? Register one for free!
      </p>

      <LoginForm onSubmit={handleSubmit} />

    </div>
  );
}

export default LoginPage;