Assignment 4 - Components
===

## Math Maker - A Simple Math Quiz App

Hosted at: https://a4-brody-graham.onrender.com

**Login Credentials:** (or you can register your own account!)
- Username: BigPapi34
- No Password

--- 

For assignment 4, I ported my math maker app from assignment 3 to have the main game page use React with a few components. The Login, Register, and Modify Profile pages are still static HTML, but the main game page uses react for displaying the player's stats, updating the displayed problem, and displaying the "Correct/Incorrect" Banners. The React components I created are in the .jsx files in `src/client`.

While I enjoy using react and I think it could be very helpful for designing front end web apps, trying to integrate it into an existing project with an existing HTML/JS front ended up being diffifcult. I needed to refactor all of my Front End JS to modify react state variables instead of storing elements with `getelementbyID`. I also found it difficult to get the production build of the app working with Vite-Express as it mixed both static HTML pages with react pages.
