import "./App.css";
import { Fragment } from "react";


//component to return
function ProfilePictureComponent({setFunction, onSubmitFunction}) {
    const updateForm = setFunction
    const updateProfilePicture = onSubmitFunction
    
    return (
        <Fragment>
            <h2>Select a New Profile Picture</h2>
            <section className="pure-g">
                <label htmlFor="pfp1" className="pure-u-1-3">
                    <input id = "pfp1" name = "pfp" defaultValue="images/Black Elephant.png" width="50" height="50" type="radio"/>
                    <img src="images/Black Elephant.png" alt="Picture of a Black Elephant"></img>
                    <p> Black Elephant </p>
                </label>
                <label htmlFor="pfp2" className="pure-u-1-3">
                    <input id = "pfp2" name = "pfp" defaultValue="images/Brown Dog.png" width="50" height="50" type="radio"/>
                    <img src="images/Brown Dog.png" alt="Picture of a Brown Dog"></img>
                    <p> Brown Dog </p>
                </label>
                <label htmlFor="pfp3" className="pure-u-1-3">
                    <input id = "pfp3" name = "pfp" defaultValue="images/Green Frog.png" width="50" height="50" type="radio"/>
                    <img src="images/Green Frog.png" alt="Picture of a Green Frog"></img>
                    <p> Green Frog </p>
                </label>
                <label htmlFor="pfp4" className="pure-u-1-3">
                    <input id = "pfp4" name = "pfp" defaultValue="images/Grey Panda.png" width="50" height="50" type="radio"/>
                    <img src="images/Grey Panda.png" alt="Picture of a Grey Panda"></img>
                    <p> Grey Panda </p>
                </label>
                <label htmlFor="pfp5" className="pure-u-1-3">
                    <input id = "pfp5" name = "pfp" defaultValue="images/Orange Monkey.png" width="50" height="50" type="radio"/>
                    <img src="images/Orange Monkey.png" alt="Picture of a Orange Monkey"></img>
                    <p> Orange Monkey </p>
                </label>
                <label htmlFor="pfp6" className="pure-u-1-3">
                    <input id = "pfp6" name = "pfp" defaultValue="images/Pink Pig.png" width="50" height="50" type="radio"/>
                    <img src="images/Pink Pig.png" alt="Picture of a Pink Pig"></img>
                    <p> Pink Pig </p>
                </label>
                <label htmlFor="pfp7" className="pure-u-1-3">
                    <input id = "pfp7" name = "pfp" defaultValue="images/Purple Bunny.png" width="50" height="50" type="radio"/>
                    <img src="images/Purple Bunny.png" alt="Picture of a Purple Bunny"></img>
                    <p> Purple Bunny </p>
                </label>
                <label htmlFor="pfp8" className="pure-u-1-3">
                    <input id = "pfp8" name = "pfp" defaultValue="images/Red Fox.png" width="50" height="50" type="radio"/>
                    <img src="images/Red Fox.png" alt="Picture of a Red Fox"></img>
                    <p> Red Fox </p>
                </label>
                <label htmlFor="pfp9" className="pure-u-1-3">
                    <input id = "pfp9" name = "pfp" defaultValue="images/White Cow.png" width="50" height="50" type="radio"/>
                    <img src="images/White Cow.png" alt="Picture of a White Cow"></img>
                    <p> White Cow </p>
                </label>
            </section>
            <button className="pure-button pure-button-secondary" type="button" onClick={() => updateForm(true)} >back</button>
            <button className="pure-button pure-button-primary" type="submit" onClick={updateProfilePicture} >submit</button>
        </Fragment>
    )
}

export default ProfilePictureComponent;
