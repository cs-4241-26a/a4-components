export default function Navbar({ username, onLogout }) {
  return (
    <nav className="navbar navbar-dark bg-dark" aria-label="Main navigation">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Max's Auto Dealership</span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white-50 small" aria-live="polite">
            {username && `Signed in as ${username}`}
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}
