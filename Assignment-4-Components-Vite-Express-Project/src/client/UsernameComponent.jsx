import "./App.css";
import { Fragment } from "react";

//component to return
function UsernameComponent({setFunction, onSubmitFunction}) {
    const updateForm = setFunction
    const updateUsername = onSubmitFunction
    return (
        <Fragment>
            <label htmlFor="username1"> Enter a Nickname: </label>
            <input type='text' id='username1' defaultValue=''placeholder='Please enter a new username'/>
            <label htmlFor="username2"> Confirm your Nickname: </label>
            <input type='text' id='username2' defaultValue='' placeholder='Please retype your username'/>
            <button className="pure-button pure-button-secondary" type="button" onClick={() => updateForm(true)} >back</button>
            <button className="pure-button pure-button-primary" type="submit" onClick={updateUsername} >submit</button>
        </Fragment>
    )
}

export default UsernameComponent;
