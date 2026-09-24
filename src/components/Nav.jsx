export default function Nav({ displayName, onLogout }) {
  return (
    <nav className="navbar bg-white border-bottom px-3 d-flex justify-content-between align-items-center">
      <span className="navbar-text text-dark">{ displayName ? 'Logged in as ' + displayName : '' }</span>
      <button type="button" className="btn btn-secondary btn-sm" onClick={onLogout}>Logout</button>
    </nav>
  )
}
