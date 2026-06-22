import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FinancialApi from "./api/FinancialApi";
import NavBar from "./components/NavBar";
import AppRoutes from "./AppRoutes";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import TransactionsPage from "./pages/TransactionsPage";
import RemindersPage from "./pages/RemindersPage";
import LoginPage from "./pages/LoginPage";
import BudgetsPage from "./pages/BudgetsPage";
import SimulatorPage from "./pages/SimulatorPage";
import TransactionsHistoryPage from "./pages/TransactionsHistoryPage";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <>
      <NavBar token={token} setToken={setToken} />

      <Routes>

  {/* public routes always exist */}
  <Route
    path="/login"
    element={<LoginPage setToken={setToken} />}
  />

  <Route
    path="/register"
    element={<RegisterPage setToken={setToken} />}
  />

  {/* protected routes */}
  <Route
    path="/"
    element={
      token
        ? <HomePage />
        : <Navigate to="/login" replace />
    }
  />

  <Route
    path="/transactions"
    element={
      token
        ? <TransactionsPage />
        : <Navigate to="/login" replace />
    }
  />

  <Route
    path="/reminders"
    element={
      token
        ? <RemindersPage />
        : <Navigate to="/login" replace />
    }
  />
  <Route
  path="/budget"
  element={
    token
      ? <BudgetsPage />
      : <Navigate to="/login" replace />
  }
/>

<Route
  path="/simulator"
  element={
    token
      ? <SimulatorPage />
      : <Navigate to="/login" replace />
  }
/>

<Route
  path="/history"
  element={
    token
      ? <TransactionsHistoryPage />
      : <Navigate to="/login" replace />
  }
/>

</Routes>
    </>
  );
}

export default App;