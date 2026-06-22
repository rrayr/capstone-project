import TransactionRow from "./TransactionRow";

function TransactionList({
  transactions,
  onEdit,
  onDelete
}) {

  return (

    <table className="table">

      <thead>

        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>

      </thead>

      <tbody>

        {transactions.map(transaction => (

          <TransactionRow
  key={transaction.id}
  transaction={transaction}
  onEdit={onEdit}
  onDelete={onDelete}
        />

        ))}

      </tbody>

    </table>

  );

}

export default TransactionList;