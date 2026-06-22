import { useEffect, useState } from "react";

import FinancialApi from "../api/FinancialApi";

import TransactionForm
  from "../features/transactions/TransactionForm";

import TransactionList
  from "../features/transactions/TransactionList";

function TransactionsPage() {

  const [transactions, setTransactions] = useState([]);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    async function loadTransactions() {
      const data = await FinancialApi.getTransactions();
      setTransactions(data.transactions);
    }

    loadTransactions();
  }, []);

  async function deleteTransaction(id) {

  await FinancialApi.deleteTransaction(id);

  setTransactions(t =>
    t.filter(transaction =>
      transaction.id !== id
    )
  );

  setSelectedTransaction(null);
}

  return (
    <div className="page">

      <h1 className="page-header">Transactions</h1>

      <TransactionForm
  initialData={selectedTransaction}
  onSubmit={saveTransaction}
  onCancel={() => setSelectedTransaction(null)}
    />

      <TransactionList
  transactions={transactions}
  onEdit={setSelectedTransaction}
  onDelete={deleteTransaction}
    />

    </div>
  );

async function saveTransaction(data) {
  if (selectedTransaction) {
    const updated = await FinancialApi.updateTransaction(
      selectedTransaction.id,
      data
    );

    setTransactions(t =>
      t.map(tr =>
        tr.id === selectedTransaction.id
          ? updated.transaction
          : tr
      )
    );

    setSelectedTransaction(null);

  } else {
    const res = await FinancialApi.createTransaction(data);

    setTransactions(t => [
      ...t,
      res.transaction
    ]);
  }
};

  setSelectedTransaction(null);

}

export default TransactionsPage;