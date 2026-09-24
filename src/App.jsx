import { useEffect, useState } from 'react'
import { ROUND } from './constants.js'
import * as api from './api.js'
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import Game from './components/Game.jsx'
import NameEntry from './components/NameEntry.jsx'
import Scoreboard from './components/Scoreboard.jsx'

export default function App() {
  const [ screen, setScreen ]       = useState( 'home' )
  const [ me, setMe ]               = useState( null )
  const [ finalHits, setFinalHits ] = useState( 0 )
  const [ scores, setScores ]       = useState( [] )

  useEffect( function() {
    api.getMe().then( setMe )
  }, [] )

  function handleStart() {
    setScreen( 'game' )
  }

  function handleGameEnd( hits ) {
    setFinalHits( hits )
    setScreen( 'nameEntry' )
  }

  function handleViewScoreboard() {
    api.getScores().then( function( rows ) {
      setScores( rows )
      setScreen( 'scoreboard' )
    })
  }

  function handleSkip() {
    setScreen( 'home' )
  }

  function handleSaveScore( name ) {
    api.postScore({ name, hits: finalHits, durationSeconds: ROUND }).then( function( rows ) {
      setScores( rows )
      setScreen( 'scoreboard' )
    })
  }

  function handleRename( id, name ) {
    api.patchScore( id, { name } ).then( setScores )
  }

  function handleDelete( id ) {
    api.deleteScore( id ).then( setScores )
  }

  function handleBack() {
    setScreen( 'home' )
  }

  function handleLogout() {
    api.logout().then( function() { window.location.href = '/login' })
  }

  return (
    <>
      <Nav displayName={ me && me.displayName } onLogout={handleLogout} />

      { screen === 'home'       && <Home onStart={handleStart} onViewScoreboard={handleViewScoreboard} /> }
      { screen === 'game'       && <Game round={ROUND} onEnd={handleGameEnd} /> }
      { screen === 'nameEntry'  && <NameEntry finalHits={finalHits} onSave={handleSaveScore} onSkip={handleSkip} /> }
      { screen === 'scoreboard' && <Scoreboard rows={scores} myId={ me && me.id } onRename={handleRename} onDelete={handleDelete} onBack={handleBack} /> }
    </>
  )
}
