const Navbar = function({ username, onLogout }) {
  return (
    <nav className='navbar is-primary' role='navigation' aria-label='main navigation'>
      <div className='navbar-brand'>
        <span className='navbar-item'>
          <strong>Car Fleet Tracker</strong>
        </span>
      </div>
      <div className='navbar-menu'>
        <div className='navbar-end'>
          <span className='navbar-item'>{ username }</span>
          <div className='navbar-item'>
            <button className='button is-light' onClick={ onLogout }>Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
