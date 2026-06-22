import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransactionsHistoryPage from "./pages/TransactionsHistoryPage";
import TransactionsPage from "./pages/TransactionsPage";
import SimulatorPage from "./pages/SimulatorPage";
import BudgetsPage from "./pages/BudgetsPage";
import HomePage from "./pages/HomePage";
import RemindersPage from "./pages/RemindersPage";

function AppRoutes() {
  return (
    <Routes>

      <Route 
        path="/" 
        element={<HomePage />} 
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
  path="/dashboard"
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
  path="/history"
  element={
    token
      ? <TransactionsHistoryPage />
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
  path="/budget"
  element={
    token
      ? <BudgetPage />
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

    </Routes>
  );
}

export default AppRoutes;