import { useState } from "react"
import "./stats.css"

/**
 * Expects statInfo JSON with the fields: username, firstname, lastname, correct_guesses, total_guesses
 * @param {} param0 
 * @returns 
 */
export function StatsSection({ fullname, correctGuesses, totalGuesses }) {
    const decimalFormat = new Intl.NumberFormat('en-US', { style: 'percent' })
    console.log(document.body.offsetWidth)

    return (
        <div className="stats">
            <p id="full-name">{fullname}</p>
            <p id="correct-count">Correct Guesses: {correctGuesses}</p>
            <p id="total-count">Total Guesses: {totalGuesses}</p>
            <p id="accuracy">Accuracy: {decimalFormat.format(
                totalGuesses > 0 ? correctGuesses / totalGuesses : 0)}</p>
        </div>
    )
}

export function UsernameButton({ username }) {
    return (
        <button>{username}: Modify Profile</button>
    )
}

export function GameHeader({ fullname, correctGuesses, totalGuesses, username, setStatsActive }) {
    return (
        <header className="fill">
            <div className="wideScreen"><nav>
                <a href="changeInfo.html">
                    <UsernameButton username={username} />
                </a>
                <div className="max"></div>

                <StatsSection fullname={fullname} correctGuesses={correctGuesses} totalGuesses={totalGuesses} />
                <div className="max"></div>
                <button data-ui="#logout-dialog">Logout</button>
            </nav></div>
            <div className="narrowScreen">
                <nav>
                    <div className="max"></div>
                    <button onClick={() => setStatsActive(true)}>{username}</button>
                    <div className="max"></div>
                </nav>
            </div>
        </header>
    )
}

export function DialogStats({ fullname, correctGuesses, totalGuesses, active, setActive }) {
    const decimalFormat = new Intl.NumberFormat('en-US', { style: 'percent' })
    const centerText = { textAlign: "center" }
    return (
        <dialog className={active ? "top active" : "top"}>
            <article>
                <button className="center border" onClick={() => { setActive(false) }}>Close</button>
                <h5 style={centerText}>{fullname}</h5>
                <ul style={{ display: "table", margin: "0 auto" }} className="list no-space">
                    <li>Correct Guesses: {correctGuesses}</li>
                    <li>Total Guesses: {totalGuesses}</li>
                    <li>Accuracy: {decimalFormat.format(
                        totalGuesses > 0 ? correctGuesses / totalGuesses : 0)}</li>
                </ul>
                <nav class="bottom center">
                    <a href="changeInfo.html">
                        <button>Modify Profile</button>
                    </a>
                    <button data-ui="#logout-dialog">Logout</button>
                </nav>
            </article>
        </dialog>
    )
}