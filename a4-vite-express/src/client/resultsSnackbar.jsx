export function CorrectResultsSnackbar({ active }) {
    return (
        <div id="correct-result" className={active ? "snackbar primary bottom active" : "snackbar primary bottom"}>Correct!</div>
    )
}

export function IncorrectResultsSnackbar({ active }) {
    return (
        <div id="correct-result" className={active ? "snackbar error bottom active" : "snackbar error bottom"}>Incorrect!</div>
    )
}