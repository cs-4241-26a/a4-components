// The live region stays mounted so screen readers announce new messages.
export default function AlertBox({ alert }) {
  return (
    <div className={alert ? `alert alert-${alert.type}` : 'alert d-none'} role="alert" aria-live="polite">
      {alert?.message}
    </div>
  )
}
