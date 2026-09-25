import { CATEGORY_ICONS, describeRecurrence, formatCurrency, formatDate } from '../utils.js'

function TransactionRow({ transaction: t, onEdit, onDelete }) {
  const isIncome = t.type === 'income'

  return (
    <tr>
      <td>{formatDate(t.date)}</td>
      <td>{t.description}</td>
      <td>
        <span className={`badge ${isIncome ? 'text-bg-success' : 'text-bg-danger'}`}>
          {isIncome ? 'Income' : 'Expense'}
        </span>
      </td>
      <td>{CATEGORY_ICONS[t.category] || ''} {t.category}</td>
      <td className={`${isIncome ? 'text-success' : 'text-danger'} fw-semibold`}>
        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
      </td>
      <td>{t.paymentMethod}</td>
      <td className="small">{t.recurring ? describeRecurrence(t.recurrence) : '—'}</td>
      <td>
        <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => onEdit(t)}>
          Edit
        </button>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(t._id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title">Your Transactions</h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle" id="transaction-table">
            <caption className="visually-hidden">List of your recorded income and expenses</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">Category</th>
                <th scope="col">Amount</th>
                <th scope="col">Method</th>
                <th scope="col">Recurrence</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <TransactionRow key={t._id} transaction={t} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <p className="text-muted">You haven't added any transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
