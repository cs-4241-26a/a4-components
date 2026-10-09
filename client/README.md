# Aishwarya Silam - Assignment 4
# Track 'Em - Habit Tracker

## Render: https://a4-aishwaryasilam.onrender.com

A modern, full-stack Single-Page Application (SPA) habit tracker built with **React**, **Express**, **Node.js**, and **MongoDB**. This assignment refactors the server-rendered application created in assignment 3 into a decoupled client-server architecture that supports complete CRUD functionality and user session authentication.


## Features
* **React Frontend**: Dynamic client-side rendering using modular components (`App.jsx`, `HabitForm.jsx`, `HabitTable.jsx`) allowing for webpage updates without haveing to reload the full page.
* **RESTful API Backend**: Express server configured with JSON-based REST endpoints supporting GET, POST, PUT, and DELETE operations.
* **Database Integration**: MongoDB persistence using Mongoose to manage user-specific habit data and habit reminder date data.
* **User Authentication**: Secure session management for user-isolated data views.

## Tech Stack
* **Frontend**: React, Vite, CSS
* **Backend**: Node.js, Express, Express-Session
* **Database**: MongoDB / Mongoose
* **Hosting**: Render

## Reflection
Moving from EJS to a React Single-Page Application definitely improved the user experience. Not only is the UI much more responsive, but it eliminates the potential of full page reloads as data intake increases.However, implementing this did have some complexity. I had to build a decoupled build pipeline and figure out how ot manage asynchronous state between the client and API backend. Overall, in terms of scaling this application, moving from EJS to React is a better move and more effective.