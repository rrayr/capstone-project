const db = require("../db");

class Reminder {

  static async create({
    userId,
    title,
    description,
    dueDate
  }) {

    const result = await db.query(
      `
      INSERT INTO reminders
      (
        user_id,
        title,
        description,
        due_date
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        userId,
        title,
        description,
        dueDate
      ]
    );

    return result.rows[0];
  }

  static async findAll(userId) {

    const result = await db.query(
      `
      SELECT *
      FROM reminders
      WHERE user_id = $1
      ORDER BY due_date
      `,
      [userId]
    );

    return result.rows;
  }

  static async update(id, userId, data) {

    const result = await db.query(
      `
      UPDATE reminders
      SET
        title=$1,
        description=$2,
        due_date=$3,
        completed=$4
      WHERE
        id=$5
        AND user_id=$6
      RETURNING *
      `,
      [
        data.title,
        data.description,
        data.dueDate,
        data.completed,
        id,
        userId
      ]
    );

    return result.rows[0];
  }

  static async remove(id, userId) {

    await db.query(
      `
      DELETE
      FROM reminders
      WHERE id=$1
      AND user_id=$2
      `,
      [id, userId]
    );
  }

}

module.exports = Reminder;