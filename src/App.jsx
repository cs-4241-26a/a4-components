import { useState } from 'react';

export default function Page() {
    const [results, setResults] = useState(Array());

        function submitResults(event) {
        event.preventDefault()

    const q0 = document.querySelector( '#q0' ),
            q1 = document.querySelector('#q1'),
            q2 = document.querySelector('#q2'),
            q3 = document.querySelector('#q3'),
            json = { 
            q0: q0.value,
            q1: q1.value,
            q2: q2.value,
            q3: q3.value, 
            q4: "nonduck"
            }
    if(json.q1 === 'y' && json.q2 === 'y' && json.q3 === 'y') {
        json.q4 = 'duck'
    }
    const newResults = [...results, json];
    setResults(newResults)
    console.log(results)
}

    return(
        <>
        <div>
            <h1>welcome to the Animal Identification Tool</h1>
            <p>the intended use of this tool is to identify an animal the user has observed. this works for all animals.</p>
            <p>right of the form are the results.</p>
        </div>
                <div>
        <form>
        <label htmlFor="q0">give the animal a placeholder name.</label>
        <input type="text" name="q0" id="q0" className="question"/>
        <label htmlFor="q1">does the animal look like a duck?</label>
        <select name="q1" id="q1" className="question">
          <option value="y">yes</option>
          <option value="n">no</option>
          </select>
        <label htmlFor="q2">does the animal swim like a duck?</label>
        <select name="q2" id="q2" className="question">
          <option value="y">yes</option>
          <option value="n">no</option>
          </select>
        <label htmlFor="q3">does the animal quack like a duck?</label>
        <select name="q3" id="q3" className="question">
          <option value="y">yes</option>
          <option value="n">no, it doesn't quack</option>
          <option value="n">no, it quacks like something else</option>
          </select>
        <button onClick={submitResults} id="submit">submit</button>
      </form>
      </div>
        <div id="div3">
        <table>
            <thead> 
            <tr>
                <td>Name</td>
                <td>Looks ducklike</td>
                <td>Swims ducklike</td>
                <td>Quacks ducklike</td>
                <td>Identity</td>
            </tr>
            </thead>
            <tbody>{
                results.map((entry) => {
                return (
                    <tr> 
                        <td>{entry.q0}</td> 
                        <td>{entry.q1}</td>
                        <td>{entry.q2}</td>
                        <td>{entry.q3}</td>
                        <td class="verdict">{entry.q4}</td>
                    </tr>
                )
                })
            }</tbody>
            </table>
        </div>
        </>
    )
}