import "./App.css";
import { Fragment } from "react";


//component to return
function PasswordComponent({setFunction, onSubmitFunction}) {

    const updateForm = setFunction
    const updatePassword = onSubmitFunction

    return (
        <Fragment>
            <label htmlFor="password1"> Enter a New Password: </label>
            <input type='password' id='password1' defaultValue=''placeholder='Please enter a new password'/>
            <label htmlFor="password2"> Confirm your Password: </label>
            <input type='password' id='password2' defaultValue='' placeholder='Please retype your password'/>
            <button className="pure-button pure-button-secondary" type="button" onClick={() => updateForm(true)} >back</button>
            <button className="pure-button pure-button-primary" type="submit" onClick={updatePassword} >submit</button>
        </Fragment>
    )
}

export default PasswordComponent;
