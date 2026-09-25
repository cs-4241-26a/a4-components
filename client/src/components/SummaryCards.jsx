import { formatCurrency } from '../utils.js'

function SummaryCard({ title, value, className }) {
  return (
    <div className="col-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h2 className="h6 text-muted mb-1">{title}</h2>
          <p className={`h4 mb-0 ${className}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

export default function SummaryCards({ transactions }) {
  let totalIncome = 0
  let totalExpenses = 0
  for (const t of transactions) {
    if (t.type === 'income') totalIncome += t.amount
    else totalExpenses += t.amount
  }
  const net = totalIncome - totalExpenses

  return (
    <div className="row g-3 mb-3">
      <SummaryCard title="Total Income" value={formatCurrency(totalIncome)} className="text-success" />
      <SummaryCard title="Total Expenses" value={formatCurrency(totalExpenses)} className="text-danger" />
      <SummaryCard
        title="Net Balance"
        value={(net < 0 ? '-' : '') + formatCurrency(Math.abs(net))}
        className={net < 0 ? 'text-danger' : 'text-success'}
      />
    </div>
  )
}
