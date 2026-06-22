const db = require("../db");

// Create
class Transaction {
  static async create({
    userId,
    amount,
    category,
    type,
    description,
    transactionDate
  }) {
    const result = await db.query(
      `
      INSERT INTO transactions
      (
        user_id,
        amount,
        category,
        type,
        description,
        transaction_date
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        userId,
        amount,
        category,
        type,
        description,
        transactionDate
      ]
    );

    return result.rows[0];
  }

  // Get All
  static async findAll(userId) {
    const result = await db.query(
      `
      SELECT *
      FROM transactions
      WHERE user_id = $1
      ORDER BY transaction_date DESC
      `,
      [userId]
    );

    return result.rows;
  }

  // Get One
  static async get(id, userId) {
    const result = await db.query(
      `
      SELECT *
      FROM transactions
      WHERE id = $1
      AND user_id = $2
      `,
      [id, userId]
    );

    return result.rows[0];
  }

  // Update
  static async update(
  id,
  userId,
  {
    amount,
    category,
    type,
    description,
    transactionDate
  }
) {

  const result = await db.query(
    `
    UPDATE transactions
    SET
      amount = $1,
      category = $2,
      type = $3,
      description = $4,
      transaction_date = $5
    WHERE
      id = $6
      AND user_id = $7
    RETURNING *
    `,
    [
      amount,
      category,
      type,
      description,
      transactionDate,
      id,
      userId
    ]
  );

if (!result.rows[0]) {
  throw new Error("Transaction not found");
}

return result.rows[0];
}

  // Delete
  static async remove(id, userId) {
    await db.query(
      `
      DELETE
      FROM transactions
      WHERE id = $1
      AND user_id = $2
      `,
      [id, userId]
    );
  }

  // Summary (Dashboard)
  static async getSummary(userId) {

  const result = await db.query(
    `
    SELECT
      COALESCE(
        SUM(
          CASE
            WHEN type = 'income'
            THEN amount
            ELSE 0
          END
        ),
        0
      ) AS total_income,

      COALESCE(
        SUM(
          CASE
            WHEN type = 'expense'
            THEN amount
            ELSE 0
          END
        ),
        0
      ) AS total_expenses

    FROM transactions

    WHERE user_id = $1
    `,
    [userId]
  );

  const row = result.rows[0];

  return {
    totalIncome: Number(row.total_income),
    totalExpenses: Number(row.total_expenses),
    balance:
      Number(row.total_income) -
      Number(row.total_expenses)
  };
 }
}

module.exports = Transaction;