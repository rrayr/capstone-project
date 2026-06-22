export function generateReminders({ transactions, budgets, simulatorResults }) {
  const reminders = [];

  const today = new Date();

  // -------------------------
  // 1. Upcoming transactions
  // -------------------------
  transactions.forEach(t => {
    if (!t.transaction_date) return;

    const due = new Date(t.transaction_date);
    const diffDays = (due - today) / (1000 * 60 * 60 * 24);

    if (diffDays >= 0 && diffDays <= 3 && t.type === "expense") {
      reminders.push({
        type: "due",
        title: `${t.category} payment due`,
        detail: `$${t.amount} due on ${due.toDateString()}`,
        severity: "warning"
      });
    }
  });

  // -------------------------
  // 2. Budget warnings
  // -------------------------
  Object.entries(budgets).forEach(([category, limit]) => {
    const spent = transactions
      .filter(t => t.category === category && t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const percent = (spent / limit) * 100;

    if (percent >= 90) {
      reminders.push({
        type: "budget",
        title: `${category} budget nearly exceeded`,
        detail: `${percent.toFixed(0)}% used`,
        severity: "danger"
      });
    }
  });

  // -------------------------
  // 3. Savings goal warning
  // -------------------------
  if (simulatorResults?.futureMonths) {
    if (simulatorResults.futureMonths > 24) {
      reminders.push({
        type: "goal",
        title: "Savings goal at risk",
        detail: `You may not reach your goal within 2 years`,
        severity: "warning"
      });
    }
  }

  return reminders;
}

function RemindersPanel({ reminders }) {
  if (!reminders.length) {
    return (
      <div className="card">
        <p>No alerts. Everything looks good.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Smart Alerts</h2>

      {reminders.map((r, i) => (
        <div key={i} className={`alert ${r.severity}`}>
          <strong>{r.title}</strong>
          <p>{r.detail}</p>
        </div>
      ))}
    </div>
  );
}

export default RemindersPanel;