import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

// Drives one round of the game: the countdown timer, the hit count, and the
// target circle's random size/position. Mirrors the old main.js's move()/
// start()/end() logic, just expressed as component state instead of direct
// DOM writes.
export function useGame( round, onEnd ) {
  const [ hits, setHits ]             = useState( 0 )
  const [ time, setTime ]             = useState( round )
  const [ targetStyle, setTargetStyle ] = useState( {} )

  const playRef  = useRef( null )
  const hitsRef  = useRef( 0 )
  const timerRef = useRef( null )
  const endedRef = useRef( false )

  // Read through a ref so the interval effect below never needs onEnd in
  // its dependency array (onEnd is a fresh function identity every render).
  const onEndRef = useRef( onEnd )
  onEndRef.current = onEnd

  const move = useCallback( function() {
    const play = playRef.current
    if( !play ) return

    const size = 30 + Math.random() * 90 // 30-120 px wide

    setTargetStyle({
      width:  size + 'px',
      height: size + 'px',
      left:   Math.random() * ( play.clientWidth  - size ) + 'px',
      top:    Math.random() * ( play.clientHeight - size ) + 'px'
    })
  }, [] )

  const endRound = useCallback( function() {
    if( endedRef.current ) return
    endedRef.current = true
    clearInterval( timerRef.current )
    onEndRef.current( hitsRef.current )
  }, [] )

  // Runs after the play area has real layout (post-mount, pre-paint), so
  // the first move() isn't computed against a zero-width container.
  useLayoutEffect( function() {
    move()

    timerRef.current = setInterval( function() {
      setTime( function( t ) { return t - 1 })
    }, 1000 )

    return function() {
      clearInterval( timerRef.current )
    }
  }, [ move ] )

  // Side effects (ending the round) live here, not inside the setTime
  // updater above, since updater functions must stay pure.
  useEffect( function() {
    if( time <= 0 ) endRound()
  }, [ time, endRound ] )

  function handleTargetClick() {
    hitsRef.current += 1
    setHits( hitsRef.current )
    move()
  }

  return { hits, time: Math.max( time, 0 ), targetStyle, playRef, handleTargetClick, endRound }
}
