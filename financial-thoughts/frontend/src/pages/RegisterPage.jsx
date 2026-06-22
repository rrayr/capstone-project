import { useNavigate } from "react-router-dom";
import FinancialApi from "../api/FinancialApi";
import RegisterForm from "../features/auth/RegisterForm";

function RegisterPage({ setToken }) {
  const navigate = useNavigate();

  function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleSubmit(formData) {
  if (!isValidEmail(formData.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const token = await FinancialApi.register(formData);
  setToken(token);
  navigate("/");
}

  return (
    <div className="page">

      <h1 className="page-header">
        What is Financial Thoughts?
      </h1>

      <p className="welcome-text">
        Financial Thoughts is a free finance managing software designed with a user-friendly experience in mind.
        Document and organize your transactions, set budgets and reminders, and plan ahead with a scenario simulator!
        View all the essentials right from your home page, and edit your finances at any time to adjust to your needs.
      </p>

      <p className="register-subtext">
        Experience it for free!
      </p>

      <RegisterForm onSubmit={handleSubmit} />

    </div>
  );
}

export default RegisterPage;