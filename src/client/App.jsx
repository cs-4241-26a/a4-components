import {useEffect, useState} from "react";
import Form from './Form.jsx'
import Results from './Results.jsx'

function App() {
    //logged in users shows
    const [show, setShow] = useState([]);
    const [username, setUsername] = useState("");
    //load their shows
    useEffect(() => {
        fetch('/user').then(response => response.json()).then(user=>{setUsername(user.username)});
        fetch('/results').then(response => response.json()).then(arr=>{setShow(arr)})
    }, [])

    //submit new show
    const submit = async function( json ) {
        const body = JSON.stringify(json)
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:body
        })

        const arr = await response.json()
        setShow(arr)
    }
    //deletes a specific show
    const deleteShow = async function( id ) {
        const json = {
            _id: id
        }
        const body = JSON.stringify( json )
        //sends info to server
        const response = await fetch( '/delete', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })
        //display updated data
        const arr = await response.json()
        setShow(arr)

    }
    //modify a show
    const modifyShow = async function(json){
        const body = JSON.stringify(json)

        const response = await fetch( '/modify', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        })
        const arr = await response.json()
        setShow(arr)
    }
    return (
        //ui with no form or results
        <main>
            <h1>TV Show Progress Tracker: {username}</h1>

            <Form
                shows={show}
                submit={submit}
                modifyShow={modifyShow}/>

            <hr/>
            <Results
                shows={show}
                deleteShow={deleteShow}/>
            <form action="/logout" method="POST" className="logout-button">
                <button type="submit">Logout</button>
            </form>


        </main>
    );
}

export default App;
