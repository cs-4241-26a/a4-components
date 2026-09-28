mini svelte-odies - Assignment 4
===

### Lex Johnson

[https://a4-lexjohnson.onrender.com/](https://a4-lexjohnson.onrender.com/)

For this assignment, I adapted my assignment 3 "mini melodies"
project to render the frontend using Svelte. My previous code was a
bit of a hodgepodge and involved a lot of directly modifying the
content of HTML elements, which would have been a huge headache to
maintain if I ever decided to add more features. Using a reactive
frontend framework like Svelte helped a lot with this, since it
allowed all the interdependencies on the page to update on their own
with very little effort on my part. I chose Svelte because my project
team is using React for the final project, so this gave me the
opportunity to learn both frameworks and choose which one I prefer
for my future work.

The downside was that introducing Vite to the project (and therefore
running the frontend and backend on seperate servers) caused a *lot*
of headaches when adapting my old code. In fact, due to time
constraints, I had to strip the account system out of this version
of the project after struggling for a while to make cross-origin
cookies work. I think I would have had a much better time if my
project had been Vite-based from the beginning, but having to
reassemble an existing project on top of a new framwork was mostly
just a hassle.