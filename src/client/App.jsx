import { useState, useEffect } from "react";
import "./App.css";
import strawberry from "./assets/strawberry.png";

const Row = (props) => (
  <tr>
    <td>{props.title}</td>
    <td>{props.message}</td>
    <td>{props.status}</td>
    <td>{props.due}</td>
    <td>{props.important}</td>
    <td>
      <button class="delete" onClick={() => props.onDelete(props.title)}>
        Delete
      </button>
    </td>
  </tr>
);

const App = () => {
  const [notes, setNotes] = useState([]);

  function submit() {
    const title = document.querySelector("#title").value;
    const message = document.querySelector("#message").value;
    const status = document.querySelector("#status").value;
    const due = document.querySelector("#due").value;

    const currentDate = new Date();
    const dueDate = new Date(due);
    const days = Math.round((dueDate - currentDate) / (1000 * 60 * 60 * 24));
    let important = "no";

    if (status === "incomplete" && days < 3) important = "yes";

    fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, message, status, due, important }),
    })
      .then((response) => response.json())
      .then((json) => {
        setNotes(json);
      });
  }

  useEffect(() => {
    fetch("/data")
      .then((response) => response.json())
      .then((json) => {
        setNotes(json);
      });
  }, []);

  useEffect(() => {
    document.title = `${notes.length} note(s)`;
  });

  function onDelete(title) {
    fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((json) => {
        setNotes(json);
      });
  }

  return (
    <div className="App">
      <div id="container">
        <div class="col1">
          <form id="submitForm" method="POST">
            <span>leave a new note...</span>
            <p>
              <label for="title">title:</label>
              <input type="text" id="title" defaultValue="title" />
            </p>

            <p>
              <label for="message">message:</label>
              <textarea id="message"></textarea>
            </p>

            <p>
              <label for="status">status:</label>
              <select id="status">
                <option value="incomplete">incomplete</option>
                <option value="complete">complete</option>
              </select>
            </p>

            <p>
              <label for="due">due:</label>
              <input type="date" id="due" />
            </p>

            <button id="submit" type="button" onClick={submit}>
              submit
            </button>
          </form>
        </div>

        <div class="col1">
          <table class="table">
            <thead>
              <tr>
                <th>title</th>
                <th class="wideButton">message</th>
                <th>status</th>
                <th class="wideButton">due</th>
                <th>important?</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <Row key={note.title} {...note} onDelete={onDelete} />
              ))}
            </tbody>
          </table>
        </div>

        <div id="melody">
          <img src={strawberry} alt="MyMelody holding a strawberry" />
        </div>
      </div>
    </div>
  );
};

export default App;
