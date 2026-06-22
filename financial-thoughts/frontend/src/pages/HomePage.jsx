import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FinancialApi from "../api/FinancialApi";
import SummaryCard from "../components/SummaryCard";

function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const location = useLocation();

  function getBudgetColor(percent) {
  if (percent < 50) return "low";
  if (percent < 100) return "mid";
  return "high";
}

  useEffect(() => {
  async function load() {
    const data = await FinancialApi.getTransactions();
    setTransactions(data.transactions);

    const savedBudgets = localStorage.getItem("budgets");
    if (savedBudgets) {
      setBudgets(JSON.parse(savedBudgets));
    }

    const reminderData = await FinancialApi.getReminders();
    setReminders(reminderData.reminders);

    const now = new Date();

    const computedAlerts = reminderData.reminders
      .filter(r => !r.completed)
      .map(r => {
        const due = new Date(r.due_date);
        const diffHours = (due - now) / (1000 * 60 * 60);

        if (due < now) {
          return {
            type: "overdue",
            message: `${r.title} is overdue`
          };
        }

        if (diffHours <= 48) {
          return {
            type: "warning",
            message: `${r.title} is due soon`
          };
        }

        return null;
      })
      .filter(Boolean);

    setAlerts(computedAlerts);

    setLoading(false);
  }

  load();
}, [location]);

  if (loading) return <p>Loading dashboard...</p>;

  const upcoming = reminders
  .sort(
    (a, b) =>
      new Date(a.due_date) - new Date(b.due_date)
  )
  .slice(0, 5);

  const income = transactions
  .filter(t => t.type === "income")
  .reduce((sum, t) => sum + Number(t.amount), 0);

const expenses = transactions
  .filter(t => t.type === "expense")
  .reduce((sum, t) => sum + Number(t.amount), 0);

const balance = income - expenses;

return (
  <div className="page">

    <h1 className="page-header">Financial Dashboard</h1>

    {/* SUMMARY */}
    <div className="dashboard-grid">
      <SummaryCard title="Total Income" amount={income} />
      <SummaryCard title="Total Expenses" amount={expenses} />
      <SummaryCard title="Net Balance" amount={balance} />
    </div>

    {/* BUDGET */}
    <h2>Budget Overview</h2>

    <div className="dashboard-grid">
      {Object.entries(budgets).map(([cat, limit]) => {

        const spent = transactions
  .filter(
    t =>
      t.type === "expense" &&
      t.category.trim().toLowerCase() ===
      cat.trim().toLowerCase()
  )
  .reduce((sum, t) => sum + Number(t.amount), 0);

        const percent = (spent / limit) * 100;

        return (
          <div className="card" key={cat}>
            <h3>{cat.toUpperCase()}</h3>

            <p>{percent.toFixed(0)}% used</p>

            <div className="budget-bar">
              <div
                className={`budget-fill ${getBudgetColor(percent)}`}
                style={{ width: `${Math.min(percent, 100)}%` }}
              />
            </div>

            <p>${spent} / ${limit}</p>
          </div>
        );
      })}
    </div>

    <h2>Smart Alerts</h2>

<div className="card">
  {alerts.length === 0 ? (
    <p>No alerts right now.</p>
  ) : (
    alerts.map((a, i) => (
      <p
        key={i}
        className={
          a.type === "overdue"
            ? "status overdue"
            : "status upcoming"
        }
      >
        {a.message}
      </p>
    ))
  )}
</div>

  </div>
);
}

export default HomePage;