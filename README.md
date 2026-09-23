Aidan Fisher
https://a4-aidan-fisher.onrender.com/

This is my A3 expense tracker, rebuilt using React components instead of plain JavaScript for the front end. The login page and backend (Express, MongoDB, sessions) are unchanged from A3 — only the expense form, table, editing, and deleting were rewritten as React components (App, ExpenseForm, ExpenseTable).

Did React help or hurt? Overall it felt a bit easier once it was set up. Not having to manually build HTML strings and manage which DOM elements to update made the add/edit/delete logic simpler to follow, and the edit-in-place row logic was cleaner using state instead of directly replacing HTML. The initial setup (Vite, connecting it to my existing Express server, getting the proxy configured) took some extra steps compared to just editing a plain JS file, but the end result looks and works better than my original vanilla JS version.

## What I changed from A3
- Replaced public/index.html and public/js/main.js with a React app (built with Vite) living in the client folder
- Split the UI into three components: App.jsx (main layout + state), ExpenseForm.jsx (add form), ExpenseTable.jsx (results table, inline editing, delete)
- server.js now serves the built React app (client/dist) instead of the old static HTML, but the API routes (/expenses, /add, /edit, /delete, /login, /logout) are unchanged
- Login page and backend logic were left exactly as they were in A3