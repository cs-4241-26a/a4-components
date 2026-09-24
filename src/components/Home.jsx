export default function Home({ onStart, onViewScoreboard }) {
  return (
    <div id="home" className="d-flex flex-column align-items-center justify-content-center gap-3 min-vh-100">
      <h1 className="mb-3">Circle Clicker</h1>
      <button className="btn btn-success btn-lg" style={{ minWidth: '220px' }} onClick={onStart}>Start game</button>
      <button className="btn btn-outline-primary btn-lg" style={{ minWidth: '220px' }} onClick={onViewScoreboard}>View scoreboard</button>
    </div>
  )
}
