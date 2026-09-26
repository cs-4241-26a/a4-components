## Griffin's To-Do List

Live site: [https://a4-griffin-munhall.onrender.com](https://a4-griffin-munhall.onrender.com)

For A4, I took my A3 code and re-implemented the client side in React. The app is still the same to-do list with three lists: an open list for new tasks, an in-progress list that only allows a maximum of three items, and a done list for finished tasks. You add a task with a name, notes, priority, and an important flag, and the server computes a derived deadline based on the priority. Buttons on each task let you move it between lists, edit it, or delete it. Users still log in with GitHub OAuth, and each user's tasks are stored separately in MongoDB.

Changed from A3: Previosly, main.js built each task with createElement and redrew the list by clearing out innerHTML. Now this replaced with React components built with Vite.
- App holds the state, loads the user and tasks, and sends the POST requests to the server.
- TodoForm is the add and edit form. The inputs are controlled with useState, and after Edit is clicked it fills in the task's info and the button changes.
- TodoList is one of three carsd, and Todoitem is one task with the buttons for that respective list.

Server-side is all the same as A3, except now it serves the Vite built in dist not public.

Did React improve or hinder the development experience? Overall, I think it was improved quite a bit. In A3, finding elements with querySelector and rebuilding lists by hand was quite annoying, but in React I just have to update state. Also, splitting the page into components made each shorter and more readable. There was more setup, however.
