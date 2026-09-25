export default function Navbar({ username, onLogout }) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="Main navigation">
      <div className="container">
        <span className="navbar-brand" aria-hidden="true">💵 Expense Tracker</span>
        <div className="d-flex align-items-center gap-3 ms-auto">
          {username && <span className="text-light small">Logged in as {username}</span>}
          <button className="btn btn-outline-light btn-sm" type="button" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  )
}
