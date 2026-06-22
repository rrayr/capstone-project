import { Link } from "react-router-dom";

function RecentTransactions({ transactions }) {

  return (

    <div className="card">

      <h2>Recent Transactions</h2>

      <table>

        <thead>

          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>

        </thead>

        <tbody>

          {transactions.map(transaction => (

            <tr key={transaction.id}>

              <td>
                {new Date(
                  transaction.transaction_date
                ).toLocaleDateString()}
              </td>

              <td>
                {transaction.category}
              </td>

              <td>

                {transaction.type === "income"
                  ? "+"
                  : "-"}

                $
                {Number(transaction.amount).toFixed(2)}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <Link
        to="/transactions"
        className="btn btn-primary"
      >
        View All Transactions
      </Link>

    </div>

  );

}

export default RecentTransactions;