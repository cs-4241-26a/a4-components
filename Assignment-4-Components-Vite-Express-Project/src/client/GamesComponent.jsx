import "./App.css";
import { Fragment } from "react";

//component to return
function GamesComponent({setFunction, onSubmitFunction}) {

    const updateForm = setFunction
    const updateGameScore = onSubmitFunction

    return (
        <Fragment>
            <label htmlFor="option"> Select Add/Modify/Delete Score: </label>
            <select id='option'>
                <option>Add Score</option>
                <option>Modify Score</option>
                <option>Delete Score</option>
            </select>
            <label htmlFor="game"> Enter Name of Game: </label>
            <input type='text' id='game' defaultValue=''placeholder='enter what game this score is htmlFor'/>
            <label htmlFor="highscore"> Enter your Highscore: </label>
            <input type='text' id='highscore' defaultValue='' placeholder='enter your score here'/>
            <button className="pure-button pure-button-secondary" type="button" onClick={() => updateForm(true)} >back</button>
            <button className="pure-button pure-button-primary" type="button" onClick={updateGameScore} >submit</button>
        </Fragment>
    )
}

export default GamesComponent;