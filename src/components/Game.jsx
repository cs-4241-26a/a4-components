import { useGame } from '../hooks/useGame.js'

export default function Game({ round, onEnd }) {
  const { hits, time, targetStyle, playRef, handleTargetClick, endRound } = useGame( round, onEnd )

  return (
    <div id="game">
      <nav id="gameBar" className="navbar bg-white border-bottom px-3 d-flex justify-content-between align-items-center">
        <span className="navbar-text text-dark">Time left: <span id="time">{time}</span> | Hits: <span id="hits">{hits}</span></span>
        <button type="button" className="btn btn-danger btn-sm" onClick={endRound}>End game</button>
      </nav>
      <div id="play" ref={playRef}>
        <button id="target" style={targetStyle} onClick={handleTargetClick}></button>
      </div>
    </div>
  )
}
