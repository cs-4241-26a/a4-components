import "./App.css";
import { Fragment } from "react";
import { Dispatch, SetStateAction } from 'react';

//component
function MenuComponent({setFunction}) {
    
    const updateForm = setFunction

    return (
        <Fragment>
            <ul>
            <li>
                <label>
                    <input id = "whatToDo1" name="whatToDo" value="1" type = "radio"/>
                    Change your Nickname 
                </label>
            </li>
            <li>
                <label>
                    <input id = "whatToDo2" name="whatToDo" value="2" type = "radio"/>
                    Change your Password
                </label>
            </li>
            <li>
                <label>
                    <input id = "whatToDo3" name="whatToDo" value="3" type = "radio"/>
                    Change your Profile picture
                </label>
            </li>
            <li>
                <label>
                    <input id = "whatToDo4" name="whatToDo" value="4" type = "radio" defaultChecked/>
                    Add data about Games you have played
                </label>
            </li>
        </ul>
        <button className="pure-button pure-button-primary" type="button" onClick={() => updateForm(false)}> Get Started </button>    
    </Fragment>
)}

export default MenuComponent;
