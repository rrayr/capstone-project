function ProgressBar({ spent, budget }) {

  const percentage =
    budget > 0
      ? Math.min((spent / budget) * 100, 100)
      : 0;

  const isOverBudget = spent > budget;

  return (

    <div>

      <div className="progress-bar-container">

        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: isOverBudget
              ? "#e74c3c"
              : "#2ecc71"
          }}
        />

      </div>

      <small>
        ${spent.toFixed(2)} / ${budget.toFixed(2)}
      </small>

    </div>

  );

}

export default ProgressBar;