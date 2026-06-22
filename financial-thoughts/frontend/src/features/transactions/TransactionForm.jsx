import { useEffect, useState } from "react";

function TransactionForm({
  initialData,
  onSubmit,
  onCancel
}) {

  const INITIAL_STATE = {
    amount: "",
    category: "",
    type: "expense",
    description: "",
    transactionDate: ""
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {

  if (initialData) {

    setFormData({

      amount: initialData.amount,

      category: initialData.category,

      type: initialData.type,

      description: initialData.description,

      transactionDate:
        initialData.transaction_date
          ?.split("T")[0]

    });

  }

}, [initialData]);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(f => ({
      ...f,
      [name]: value
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit(formData);

    setFormData(INITIAL_STATE);
  }

  return (
    <form onSubmit={handleSubmit} className="Card">

      <input className="input"
        type="number"
        step="0.01"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />

      <input className="input"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <select
        className="input-secondary"
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input className="input"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input className="input"
        type="date"
        name="transactionDate"
        value={formData.transactionDate}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn btn-secondary">
  {initialData ? "Update Transaction" : "Save Transaction"}
</button>

{initialData && (
  <button
    type="button"
    className="btn"
    onClick={() => {
      setFormData(INITIAL_STATE);
      onCancel();
    }}
  >
    Cancel
  </button>
)}

    </form>
  );
}

export default TransactionForm;