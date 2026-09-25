## Expense Tracker (React)

https://a4-ryan-ginn.onrender.com

This is my A3 Expense Tracker with its client side rebuilt in **React** (bundled with **Vite**). The Express + MongoDB backend, session auth, and the login page are unchanged from A3. The main app page, which was plain HTML plus about 450 lines of DOM-manipulation JavaScript (`public/app.html` + `public/js/app.js`), is now a set of React components in `client/src/`:

- `App` owns the state (the transaction list, the logged-in user, the alert, and the transaction being edited) and makes the API calls.
- `Navbar`, `AlertBox`, and `SummaryCards` display the user, messages, and income/expense/net totals.
- `TransactionForm` is a controlled add/edit form. `RecurrencePicker` and a reusable `DayPicker` handle the weekly and monthly day selection.
- `TransactionTable` / `TransactionRow` show the results, with Edit and Delete buttons.

`npm run build` compiles the client into `dist/`. Express serves `dist/index.html` at `/app.html`, still behind the server-side login check. I also fixed an A3 bug where dates showed one day early in US time zones.

**Did React help or hurt?** Overall it improved development. In A3, every change (like starting an edit or toggling the recurring panel) meant manually syncing radio buttons, hidden panels, button classes, and summary text, and it was easy to miss one. In React the UI is just a function of state, so edit mode is simply "set `editing`", and totals, labels, and day pickers update themselves. The costs were adding a build step (Vite, plus a build command on Render) and rethinking the form as controlled inputs, but the final code is shorter and much easier to follow.

### Running locally
```
npm install
npm run build   # build the React client into dist/
npm start       # http://localhost:3000
```
For live-reload development, run `npm start` and `npm run dev:client` together, then open http://localhost:5173/ (Vite forwards `/api` to Express).

**Render:** set the Build Command to `npm install && npm run build` and the Start Command to `npm start`.

## Technical Achievements (from A3)
- 100% Lighthouse
