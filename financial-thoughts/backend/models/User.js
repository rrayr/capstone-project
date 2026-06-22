const db = require("../db");
const bcrypt = require("bcrypt");

const BCRYPT_WORK_FACTOR = 12;

class User {
  static async register({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(
      password,
      BCRYPT_WORK_FACTOR
    );

    const result = await db.query(
      `
      INSERT INTO users
        (username, email, password_hash)
      VALUES
        ($1, $2, $3)
      RETURNING id, username, email
      `,
      [username, email, hashedPassword]
    );

    return result.rows[0];
  }

  static async authenticate(username, password) {
    const result = await db.query(
      `
      SELECT id,
             username,
             email,
             password_hash
      FROM users
      WHERE username = $1
      `,
      [username]
    );

    const user = result.rows[0];

    if (!user) return false;

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) return false;

    return {
      id: user.id,
      username: user.username,
      email: user.email
    };
  }
}

module.exports = User;