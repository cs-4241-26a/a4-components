import { useEffect, useState } from "react";
import "./App.css";

const ApplicationRow = function({
  application,
  deleteApplication,
  updateApplication
}) {
  const [status, setStatus] = useState(application.status);

  return (
    <tr>
      <td>{application.company}</td>
      <td>{application.role}</td>
      <td>{application.dateApplied}</td>
      <td>{application.resume}</td>
      <td>
        <select
          value={status}
          onChange={event => setStatus(event.target.value)}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interviewing</option>
          <option value="rejected">Rejected</option>
          <option value="withdraw">Withdrawn</option>
          <option value="offer">Offer</option>
        </select>
      </td>
      <td>{application.applicationAge}</td>

      <td>
        <button
          className="update-button"
          onClick={() =>
            updateApplication(application.id, status)
          }
        >
          Update
        </button>

        <button
          className="delete-button"
          onClick={() =>
            deleteApplication(application.id)
          }
        >
          Delete
        </button>
      </td>

    </tr>
  );
};


const App = function() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApplications = async function() {
      const response = await fetch("/api/applications");
      const data = await response.json();
      setApplications(data);
    };
    loadApplications();

  }, []);


  // adding a new application
  const submit = async function(event) {
    event.preventDefault();

    const application = {
      company: document.querySelector("#company").value,
      role: document.querySelector("#role").value,
      dateApplied: document.querySelector("#date-applied").value,
      resume: document.querySelector("#resume").value,
      status: document.querySelector("#status").value
    };

    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(application)
    });

    const data = await response.json();

    setApplications(data);
  };


  // delete
  const deleteApplication = async function(id) {
    const response = await fetch("/api/applications", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });

    const data = await response.json();
    setApplications(data);
  };


  // update feature
  const updateApplication = async function(id, status) {
    const response = await fetch("/api/applications", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        status: status
      })
    });

    const data = await response.json();
    setApplications(data);
    alert("Application updated successfully!");
  };


  return (
    <div>
      <h1>Job Application Tracker</h1>
      <section className="form-section">
        <h2>Add a new application</h2>
        <p>Track & manage your job applications easily!</p>
        <form id="application-form" onSubmit={submit}>
          <label htmlFor="company">
            Company Name:
          </label>
          <input
            type="text"
            id="company"
            name="company"
          />
          <br />

          <label htmlFor="role">
            Role:
          </label>
          <input
            type="text"
            id="role"
            name="role"
          />

          <br />

          <label htmlFor="date-applied">
            Date Applied:
          </label>
          <input
            type="date"
            id="date-applied"
            name="date-applied"
          />

          <br />

          <label htmlFor="resume">
            Resume:
          </label>
          <input
            type="text"
            id="resume"
            name="resume"
          />

          <br />

          <label htmlFor="status">
            Current Status:
          </label>
          <select
            id="status"
            name="status"
          >
            <option value="applied">
              Applied
            </option>

            <option value="interview">
              Interviewing
            </option>

            <option value="rejected">
              Rejected
            </option>

            <option value="withdraw">
              Withdrawn
            </option>

            <option value="offer">
              Offer
            </option>
          </select>

          <br />

          <button type="submit">
            Add Application
          </button>
        </form>
      </section>

      <br />

      <section className="results-section">
        <h2>Your Applications</h2>
        {applications.length === 0 && (
          <p>No results to show</p>
        )}
        

          <table id="result-table">

            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Date Applied</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Application Age</th>
                <th>Actions</th>
              </tr>
            </thead>


            <tbody>

              {applications.map(function(application){
                return(
                <ApplicationRow
                  key={application.id}
                  application={application}
                  deleteApplication={deleteApplication}
                  updateApplication={updateApplication}
                />
                );
              })}
            </tbody>
          </table>

      </section>

    </div>
  );
};


export default App;