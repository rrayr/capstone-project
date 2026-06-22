import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from "recharts";

import SummaryCard from "../components/SummaryCard";

const INITIAL_STATE = {
  currentHourlyWage: "",
  currentHoursPerWeek: "",
  currentMonthlyExpenses: "",

  futureHourlyWage: "",
  futureHoursPerWeek: "",
  futureMonthlyExpenses: "",

  otherIncome: "",
  savingsGoal: ""
};

function SimulatorPage() {

  const [formData, setFormData] =
    useState(INITIAL_STATE);

  const [budgets, setBudgets] =
    useState({});

  const [results, setResults] =
    useState(null);

  useEffect(() => {

    const saved =
      localStorage.getItem("budgets");

    if (saved) {
      setBudgets(JSON.parse(saved));
    }

  }, []);

  function handleChange(evt) {

    const { name, value } = evt.target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));

  }

  function calculateScenario(
    wage,
    hours,
    expenses,
    otherIncome = 0
  ) {

    const monthlyIncome =
      ((wage * hours * 52) / 12) +
      otherIncome;

    const monthlySavings =
      monthlyIncome - expenses;

    return {
      monthlyIncome,
      monthlyExpenses: expenses,
      monthlySavings,
      annualSavings:
        monthlySavings * 12
    };

}

function handleSubmit(evt) {

  evt.preventDefault();

  // Total all budget categories
  const totalBudgetedExpenses =
    Object.values(budgets).reduce(
      (sum, amount) => sum + Number(amount),
      0
    );

  const current =
    calculateScenario(

      Number(formData.currentHourlyWage),

      Number(formData.currentHoursPerWeek),

      Number(formData.currentMonthlyExpenses)

    );

  const future =
    calculateScenario(

      Number(formData.futureHourlyWage),

      Number(formData.futureHoursPerWeek),

      Math.min(

        Number(formData.futureMonthlyExpenses),

        totalBudgetedExpenses || Number(formData.futureMonthlyExpenses)

      ),

      Number(formData.otherIncome)

    );

  const goal =
    Number(formData.savingsGoal);

  const currentMonths =
    current.monthlySavings > 0
      ? goal / current.monthlySavings
      : null;

  const futureMonths =
    future.monthlySavings > 0
      ? goal / future.monthlySavings
      : null;

  const chartData = [];

  for (let month = 1; month <= 24; month++) {

    chartData.push({

      month,

      current:
        current.monthlySavings * month,

      future:
        future.monthlySavings * month

    });

  }

  setResults({
  current,
  future,
  goal,
  currentMonths,
  futureMonths,
  chartData,
  incomeDifference:
    future.monthlyIncome - current.monthlyIncome,
  savingsDifference:
    future.monthlySavings - current.monthlySavings,
  yearlyDifference:
    future.annualSavings - current.annualSavings,
  budgetPressure:
    totalBudgetedExpenses - Number(formData.futureMonthlyExpenses)
});

}

  return (

  <div className="page">

    <h1 className="page-header">Scenario Simulator</h1>

    <form onSubmit={handleSubmit}>

      <div className="two-column-grid">

        <div className="card">

  <h2>Current Situation</h2>

  <label>Hourly Wage</label>

  <input
    className="input"
    name="currentHourlyWage"
    type="number"
    value={formData.currentHourlyWage}
    onChange={handleChange}
  />

  <label>Hours Per Week</label>

  <input
    className="input"
    name="currentHoursPerWeek"
    type="number"
    value={formData.currentHoursPerWeek}
    onChange={handleChange}
  />

  <label>Monthly Expenses</label>

  <input
    className="input"
    name="currentMonthlyExpenses"
    type="number"
    value={formData.currentMonthlyExpenses}
    onChange={handleChange}
  />

</div>

<div className="card">

  <h2 className="mini-header">Future Scenario</h2>

  <label>Hourly Wage</label>

  <input
    className="input"
    name="futureHourlyWage"
    type="number"
    value={formData.futureHourlyWage}
    onChange={handleChange}
  />

  <label>Hours Per Week</label>

  <input
    className="input"
    name="futureHoursPerWeek"
    type="number"
    value={formData.futureHoursPerWeek}
    onChange={handleChange}
  />

  <label>Monthly Expenses</label>

  <input
    className="input"
    name="futureMonthlyExpenses"
    type="number"
    value={formData.futureMonthlyExpenses}
    onChange={handleChange}
  />

  <label>Additional Monthly Income</label>

  <input
    className="input"
    name="otherIncome"
    type="number"
    value={formData.otherIncome}
    onChange={handleChange}
  />

  <label>Savings Goal</label>

  <input
    className="input"
    name="savingsGoal"
    type="number"
    value={formData.savingsGoal}
    onChange={handleChange}
  />

</div>

</div>

<button
  className="btn btn-primary"
  type="submit"
>
  Compare Scenarios
</button>

</form>

      {results && (

        <>

          <h2 className="mini-header">Current Situation</h2>

          <div className="dashboard-grid">

            <SummaryCard
              title="Monthly Income"
              amount={results.current.monthlyIncome}
            />

            <SummaryCard
              title="Monthly Savings"
              amount={results.current.monthlySavings}
            />

          </div>

          <h2>Future Scenario</h2>

          <div className="dashboard-grid">

            <SummaryCard
              title="Monthly Income"
              amount={results.future.monthlyIncome}
            />

            <SummaryCard
              title="Monthly Savings"
              amount={results.future.monthlySavings}
            />

          </div>

          <h2>Comparison</h2>

          <div className="dashboard-grid">

            <SummaryCard
              title="Income Change"
              amount={results.incomeDifference}
            />

            <SummaryCard
              title="Savings Change"
              amount={results.savingsDifference}
            />

            <SummaryCard
              title="Yearly Difference"
              amount={results.yearlyDifference}
            />

          </div>

          <div className="card">

            <h2>Efficiency Comparison</h2>

            {results.currentMonths && results.futureMonths ? (

              <>

                <p>
                  Your current plan achieves your goal in{" "}
                  <strong>
                    {Math.ceil(results.currentMonths)} months
                  </strong>.
                </p>

                <p>
                  Your future plan achieves your goal in{" "}
                  <strong>
                    {Math.ceil(results.futureMonths)} months
                  </strong>.
                </p>

                <p>
                  You'll reach your goal about{" "}
                  <strong>
                    {Math.ceil(
                      results.currentMonths -
                      results.futureMonths
                    )}{" "}
                    months sooner.
                  </strong>
                </p>

              </>

            ) : (

              <p>
                Increase savings or reduce expenses to achieve your goal.
              </p>

            )}

          </div>

          <div
            className="card"
            style={{ marginTop: "24px" }}
          >

            <h2>Savings Projection</h2>

            <p className="muted">
              Projected savings over the next 24 months.
            </p>

            <div
              style={{
                width: "100%",
                height: 350
              }}
            >

              <ResponsiveContainer>

                <LineChart
                  data={results.chartData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <ReferenceLine
                    y={Number(results.goal)}
                    stroke="red"
                    strokeDasharray="5 5"
                    label={{ value: "Goal", position: "right", fill: "red" }}
                  />

                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="#8884d8"
                    name="Current"
                  />

                  <Line
                    type="monotone"
                    dataKey="future"
                    stroke="#82ca9d"
                    name="Future"
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </>
      )}

    </div>
  );
}

export default SimulatorPage;