const express = require("express");

const {
  ensureLoggedIn
} = require("../middleware/auth");

const router = new express.Router();

// Create
router.post(
  "/",
  ensureLoggedIn,
  async function (req, res, next) {

    try {

      const {
        currentHourlyWage,
        futureHourlyWage,
        hoursPerWeek,
        monthlyExpenses
      } = req.body;

      const currentMonthlyIncome =
        currentHourlyWage *
        hoursPerWeek *
        52 / 12;

      const futureMonthlyIncome =
        futureHourlyWage *
        hoursPerWeek *
        52 / 12;

      const currentMonthlySavings =
        currentMonthlyIncome -
        monthlyExpenses;

      const futureMonthlySavings =
        futureMonthlyIncome -
        monthlyExpenses;

      const currentYearlySavings =
        currentMonthlySavings * 12;

      const futureYearlySavings =
        futureMonthlySavings * 12;

      return res.json({

        current: {
          monthlyIncome:
            Number(currentMonthlyIncome.toFixed(2)),
          monthlySavings:
            Number(currentMonthlySavings.toFixed(2)),
          yearlySavings:
            Number(currentYearlySavings.toFixed(2))
        },

        future: {
          monthlyIncome:
            Number(futureMonthlyIncome.toFixed(2)),
          monthlySavings:
            Number(futureMonthlySavings.toFixed(2)),
          yearlySavings:
            Number(futureYearlySavings.toFixed(2))
        },

        difference: {
          monthlyIncome:
            Number(
              (futureMonthlyIncome - currentMonthlyIncome)
                .toFixed(2)
            ),

          monthlySavings:
            Number(
              (futureMonthlySavings - currentMonthlySavings)
                .toFixed(2)
            ),

          yearlySavings:
            Number(
              (futureYearlySavings - currentYearlySavings)
                .toFixed(2)
            )
        }

      });

    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;