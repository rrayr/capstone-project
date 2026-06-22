function TransactionRow({
  transaction,
  onEdit,
  onDelete
}) {

  return (

    <tr>

      <td>
        {new Date(
          transaction.transaction_date
        ).toLocaleDateString()}
      </td>

      <td>
        {transaction.category}
      </td>

      <td>
        {transaction.type}
      </td>

      <td>

        {transaction.type === "income"
          ? "+"
          : "-"}

        $
        {Number(
          transaction.amount
        ).toFixed(2)}

      </td>

      <td>
        <div className="btn-group">
        <button
        className="btn btn-primary"
    onClick={() => onEdit(transaction)}>
          Edit
        </button>

<button
  className="btn btn-danger"
  onClick={() => {
  const confirmDelete =
    window.confirm(
      "Delete this transaction?"
    );

  if (confirmDelete) {
    onDelete(transaction.id);
  }
}}
>
    Delete
</button>
  </div>
      </td>

    </tr>

  );

}

export default TransactionRow;