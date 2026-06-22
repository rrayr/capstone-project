import "./SummaryCard.css";

function SummaryCard({
  title,
  amount
}) {
    
    const valueColor =
  amount >= 0
    ? "var(--success)"
    : "var(--danger)";

    <h2 style={{ color: valueColor }}></h2>

  return (

    <div className="card summary-card">

      <h3>{title}</h3>

      <h2>
        $
        {Number(amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </h2>

    </div>

  );

}

export default SummaryCard;