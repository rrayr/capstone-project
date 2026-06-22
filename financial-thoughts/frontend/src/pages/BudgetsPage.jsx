import { useState, useEffect } from "react";
import FinancialApi from "../api/FinancialApi";
import ProgressBar from "../components/ProgressBar";

function BudgetsPage() {

  const [transactions, setTransactions] = useState([]);

  const [budgets, setBudgets] = useState({
    food: 500,
    rent: 1500,
    transport: 200,
    entertainment: 150
  });

  const [newCategory, setNewCategory] = useState("");
  const [newBudget, setNewBudget] = useState("");

  function addBudgetCategory() {

    if (!newCategory || !newBudget) return;

    setBudgets(prev => ({
      ...prev,
      [newCategory.toLowerCase()]: Number(newBudget)
    }));

    setNewCategory("");
    setNewBudget("");

  }

  function deleteCategory(category) {

    setBudgets(prev => {

      const copy = { ...prev };

      delete copy[category];

      return copy;

    });

  }

const [editingCategory, setEditingCategory] = useState(null);
const [editValue, setEditValue] = useState("");

function startEdit(category) {
  setEditingCategory(category);
  setEditValue(budgets[category]);
}

function saveEdit(category) {
  setBudgets(prev => ({
    ...prev,
    [category]: Number(editValue)
  }));

  setEditingCategory(null);
  setEditValue("");
}

function cancelEdit() {
  setEditingCategory(null);
  setEditValue("");
}

  useEffect(() => {

    const saved = localStorage.getItem("budgets");

    if (saved) {
      setBudgets(JSON.parse(saved));
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "budgets",
      JSON.stringify(budgets)
    );

  }, [budgets]);

  useEffect(() => {

    async function loadData() {

      try {

        const data =
          await FinancialApi.getTransactions();

        setTransactions(data.transactions);

      } catch (err) {

        console.error("Failed to load transactions:", err);

      }

    }

    loadData();

  }, []);

function calculateSpent(category) {
  return transactions
    .filter(
      t =>
        t.type === "expense" &&
        t.category.toLowerCase() === category.toLowerCase()
    )
    .reduce((sum, t) => sum + Number(t.amount), 0);
}

  return (

    <div className="page">

      <h1 className="page-header">Budgets</h1>

      {/* Add Category Form */}
      <div className="card">

        <h2>Add Budget Category</h2>

        <input
          className="input"
          placeholder="Category (e.g. food)"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Budget amount"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
        />

        <button
          className="btn"
          onClick={addBudgetCategory}
          type="button"
        >
          Add Category
        </button>

      </div>

      {/* Budget Cards */}
      <div className="dashboard-grid">

        {Object.keys(budgets).map(category => {

          const spent = calculateSpent(category);
          const budget = budgets[category];
          const remaining = budget - spent;
          const percentUsed = budget > 0 ? (spent / budget) * 100 : 0;
        const status =
        spent > budget ? "over" :
        percentUsed > 70 ? "warning" : "good";

          return (

            <div key={category} className="card">
  <h3>{category.toUpperCase()}</h3>

  {editingCategory === category ? (
    <>
      <input
        className="input"
        type="number"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />

      <button
        className="btn"
        onClick={() => saveEdit(category)}
      >
        Save
      </button>

      <button
        className="btn"
        onClick={cancelEdit}
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <ProgressBar
        spent={calculateSpent(category)}
        budget={budgets[category]}
      />

      <p>
    {remaining >= 0
      ? `+$${remaining.toFixed(2)} remaining`
      : `-$${Math.abs(remaining).toFixed(2)} over`}
  </p>

  <p>
    {percentUsed.toFixed(0)}% used
  </p>

  <p>
    Status: <strong>{status}</strong>
  </p>

      <p>
        {budgets[category]} budget
      </p>

      <button
        className="btn"
        onClick={() => startEdit(category)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger"
        onClick={() => deleteCategory(category)}
      >
        Delete
      </button>
    </>
  )}
</div>

          );

        })}

      </div>

    </div>

  );

}

export default BudgetsPage;