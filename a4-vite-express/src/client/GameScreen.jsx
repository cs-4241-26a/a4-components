import { useState, useEffect } from 'react'
import './stats'
import { DialogStats, GameHeader } from './stats'
import { CorrectResultsSnackbar, IncorrectResultsSnackbar } from './resultsSnackbar'
import parse from 'html-react-parser'

export default function GameScreen() {
    let transitionTimer
    const [currentProblem, setCurrentProblem] = useState('???')
    const [username, setUsername] = useState('???')
    const [fullname, setFullname] = useState('')
    const [correctGuesses, setCorrectGuesses] = useState(0)
    const [totalGuesses, setTotalGuesses] = useState(0)
    const [correctActive, setCorrectActive] = useState(false)
    const [incorrectActive, setIncorrectActive] = useState(false)
    const [progressHidden, setProgressHidden] = useState(true)
    const [dialogStatsActive, setDialogStatsActive] = useState(false)


    // Get User Data and Problem on load
    useEffect(() => {

        async function PopulateDisplays() {
            const response = await fetch('/startgame', { method: 'GET' })
            const gameStartData = await response.json()
            console.log(gameStartData)

            setCurrentProblem(gameStartData.newProblem)

            setUsername(gameStartData.userData.username)
            setCorrectGuesses(gameStartData.userData.correct_guesses)
            setTotalGuesses(gameStartData.userData.total_guesses)

            let buildFullname = ''
            if (gameStartData.userData.firstname !== undefined) {
                buildFullname += gameStartData.userData.firstname
            }
            if (gameStartData.userData.lastname !== undefined) {
                buildFullname += ' ' + gameStartData.userData.lastname
            }

            setFullname(buildFullname)
        }

        PopulateDisplays()
    }, [])

    async function submit(event) {

        //Prevent Reloading
        event.preventDefault()

        // Hide Correct/Incorrect Snackbars if they aren't hidden
        setCorrectActive(false)
        setIncorrectActive(false)
        clearTimeout(transitionTimer)

        // Display progress wheel
        setProgressHidden(true)

        // Get answer and send it to server
        const input = document.querySelector('#answer'),
            json = {
                problem: currentProblem,
                answer: input.value
            },
            body = JSON.stringify(json)
        const response = await fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })

        input.value = ""

        //Recieve JSON data from the server
        const data = await response.json();
        console.log('text:', data);

        //Hide Progress Wheel
        setProgressHidden(true)

        if (data.is_correct === "correct") {
            //Show "Correct" element for 2.5 seconds
            setCorrectActive(true)
            transitionTimer = setTimeout(function () {
                setCorrectActive(false)
            }, 4000)
        }
        else {
            // Show "incorrect" element for 2.5 seconds
            setIncorrectActive(true)
            transitionTimer = setTimeout(function () {
                setIncorrectActive(false)
            }, 2500)
        }

        // Update React Element Attributes (problem, correct guesses, total guesses)
        setCurrentProblem(data.problem)
        setCorrectGuesses(data.user_data.correct_guesses)
        setTotalGuesses(data.user_data.total_guesses)
    }

    return (
        <div>
            <main class="surface-bright">
                <article class="padding border responsive">
                    <div class="padding center-align">
                        <h1 >Solve The Problem</h1>
                        <form style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "600px" }}>
                            <p id="problem" class="inverse-surface padding"
                                style={{ 'font-family': 'Times New Roman, Times, serif', 'font-size': '64px', textWrapMode: "wrap", lineHeight: "64px" }}>
                                {parse(currentProblem)}
                            </p>
                            <div class="field border prefix">
                                <progress id="answer-waiting" class="circle indeterminate " value="50" max="100" hidden={progressHidden}></progress>
                                <input id="answer" type="number" aria-label="Answer Here" />
                                <output>Answer Here</output>
                            </div>
                            <button id='submit' onClick={submit}>Submit</button>
                        </form>
                    </div>
                </article>
                <CorrectResultsSnackbar active={correctActive} />
                <IncorrectResultsSnackbar active={incorrectActive} />
            </main>
            {/* <header class="fill">
                <nav>
                    <a href="changeInfo.html">
                        <UsernameButton username={username} />
                    </a>
                    <div class="max"></div>

                    <StatsSection fullname={fullname} correctGuesses={correctGuesses} totalGuesses={totalGuesses} />
                    <div class="max"></div>
                    <button data-ui="#logout-dialog">Logout</button>
                </nav>
            </header> */}
            <GameHeader fullname={fullname} correctGuesses={correctGuesses} totalGuesses={totalGuesses} username={username} setStatsActive={setDialogStatsActive} />
            <DialogStats active={dialogStatsActive} setActive={setDialogStatsActive} fullname={fullname} correctGuesses={correctGuesses} totalGuesses={totalGuesses} />
            <dialog id="logout-dialog">
                <h5>Log Out</h5>
                <div>Are you sure you want to log out?
                </div>
                <nav class="right-align no-space">
                    <button class="transparent link" data-ui="#logout-dialog">Cancel</button>
                    <a href="logout">
                        <button class="transparent link">Logout</button>
                    </a>
                </nav>
            </dialog>

        </div>
    )
}