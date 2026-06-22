const express = require("express");
const db = require("../db");

const Transaction =
  require("../models/Transaction");

const {
  ensureLoggedIn
} = require("../middleware/auth");

const router =
  new express.Router();


// History
router.get("/history", ensureLoggedIn, async (req, res, next) => {
  try {
    const results = await db.query(
      `
      SELECT *
      FROM transactions
      WHERE user_id = $1
      ORDER BY transaction_date DESC
      `,
      [req.user.id]
    );

    return res.json({ transactions: results.rows });
  } catch (err) {
    return next(err);
  }
});

// Create
router.post(
  "/",
  ensureLoggedIn,
  async function (req, res, next) {

    try {

      const transaction =
        await Transaction.create({

          userId: req.user.id,

          amount: req.body.amount,

          category: req.body.category,

          type: req.body.type,

          description:
            req.body.description,

          transactionDate:
            req.body.transactionDate
        });

      return res.status(201).json({
        transaction
      });

    } catch (err) {
      return next(err);
    }
  }
);

// Read All
router.get(
  "/",
  ensureLoggedIn,
  async function (req, res, next) {

    try {

      const transactions =
        await Transaction.findAll(
          req.user.id
        );

      return res.json({
        transactions
      });

    } catch (err) {
      return next(err);
    }
  }
);

// Summary (Dashboard)
router.get(
  "/summary",
  ensureLoggedIn,
  async function (req, res, next) {

    try {

      const summary =
        await Transaction.getSummary(
          req.user.id
        );

      return res.json(summary);

    } catch (err) {
      return next(err);
    }
  }
);

// Read One
router.get(
  "/:id",
  ensureLoggedIn,
  async function (req, res, next) {

    try {
      
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
        }

      const transaction =
        await Transaction.get(
          req.params.id,
          req.user.id
        );

      return res.json({
        transaction
      });

    } catch (err) {
      return next(err);
    }
  }
);

// Update
router.put(
  "/:id",
  ensureLoggedIn,
  async function (req, res, next) {

    try {

      const transaction =
        await Transaction.update(

          req.params.id,

          req.user.id,

          {
            amount: req.body.amount,
            category: req.body.category,
            type: req.body.type,
            description: req.body.description,
            transactionDate:
              req.body.transactionDate
          }

        );

      return res.json({
        transaction
      });

    } catch (err) {
      return next(err);
    }

  }
);

// Delete
router.delete(
  "/:id",
  ensureLoggedIn,
  async function (req, res, next) {

    try {

      await Transaction.remove(
        req.params.id,
        req.user.id
      );

      return res.json({
        deleted:
          Number(req.params.id)
      });

    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;