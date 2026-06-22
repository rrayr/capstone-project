import { useEffect, useState } from "react";
import FinancialApi from "../api/FinancialApi";

function TransactionsHistoryPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await FinancialApi.getTransactionHistory()
      setTransactions(data.transactions);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Loading transactions...</p>;

const filteredTransactions = transactions.filter(t => {
  const matchType =
    filter === "all" || t.type === filter;

  const matchSearch =
    t.description?.toLowerCase().includes(search.toLowerCase()) ||
    t.category?.toLowerCase().includes(search.toLowerCase());

  return matchType && matchSearch;
});

const incomeTotal = transactions
  .filter(t => t.type === "income")
  .reduce((sum, t) => sum + Number(t.amount), 0);

const expenseTotal = transactions
  .filter(t => t.type === "expense")
  .reduce((sum, t) => sum + Number(t.amount), 0);

const net = incomeTotal - expenseTotal;

return (
  <div className="page">

    <h1 className="page-header">Transaction History</h1>

    {/* Filter buttons */}
    <div style={{ marginBottom: "16px" }}>
      <button onClick={() => setFilter("all")} className="btn">
        All
      </button>

      <button onClick={() => setFilter("income")} className="btn">
        Income
      </button>

      <button onClick={() => setFilter("expense")} className="btn">
        Expenses
      </button>
    </div>

    <div className="dashboard-grid">

  <div className="card">
    <h3>Total Income</h3>
    <p className="green">${incomeTotal.toFixed(2)}</p>
  </div>

  <div className="card">
    <h3>Total Expenses</h3>
    <p className="red">${expenseTotal.toFixed(2)}</p>
  </div>

  <div className="card">
    <h3>Net</h3>
    <p>${net.toFixed(2)}</p>
  </div>

</div>

<input
  className="input"
  placeholder="Search transactions..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

    {/* Table */}
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
  {filteredTransactions.map(t => (
    <tr key={t.id}>

      <td>
        {new Date(t.transaction_date).toLocaleDateString()}
      </td>

      <td>{t.category}</td>

      <td>
        <span className={t.type === "income" ? "green" : "red"}>
          {t.type}
        </span>
      </td>

      <td>
        ${Number(t.amount).toFixed(2)}
      </td>

      <td>
        {t.description || "-"}
      </td>

    </tr>
  ))}
</tbody>
    </table>
  </div>
);
}

export default TransactionsHistoryPage;