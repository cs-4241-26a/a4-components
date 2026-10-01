## Car Fleet Tracker (React)

Link: https://a4-brandoncontardi-1.onrender.com 

This is my Assignment 3 Car Fleet Tracker with the client side of the fleet page re-implemented using React
components (built with Vite). The Express server, MongoDB/Mongoose models, session-based login, and the login page
itself are unchanged from A3. The old `views/app.html` + `public/js/main.js` (which manually built table rows with
`document.createElement` and read/wrote form fields with `querySelector`) was replaced by a React app in `client/`:

- `App.jsx` owns the state (the user's car list, the car currently being edited, and any error message) and calls the API.
- `Navbar.jsx` shows the logged-in username and the Log Out button.
- `CarForm.jsx` is a controlled form used for both adding and editing; it reloads its fields whenever the car being edited changes.
- `CarTable.jsx` / `CarRow.jsx` render the fleet table (with an empty-state row, and the row being edited highlighted).
- `api.js` wraps the `fetch` calls and redirects to the login page on a 401.

The server builds the React app into `dist/` and serves it at `/app` only to logged-in users. Styling is still Bulma plus the small `public/css/main.css`.

**Did the new technology improve or hinder the development experience?** Overall it improved it. In A3, every change to
the data meant manually clearing and rebuilding the table and keeping the form, the "editing" state, and the button
labels in sync by hand; with React, the UI is just a function of state, so after the server returns the updated car list
I only call `setCars` and everything re-renders correctly. The main cost was extra setup: adding a Vite build step,
configuring the dev proxy to the Express server, and making the build output work with the existing authenticated
`/app` route and Helmet's Content Security Policy.

### Running locally

Create a `.env` with `MONGODB_URI` and `SESSION_SECRET`, then:

```bash
npm install
npm run build
npm start
```

Visit http://localhost:3000.

## AI Usage
AI was used to help convert the A3 client-side JavaScript into React components and to draft this README. I checked the
code and README for accuracy before submission.
