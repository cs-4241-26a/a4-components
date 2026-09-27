## Poetry Entry System (React)

Render link: https://a4-mohammed-musawwir.onrender.com

This is my A3 poetry app with the front end redone in React. The server side (Express, MongoDB, GitHub login) is the same as A3. The part that shows and updates the poems is now made of React components instead of the plain JavaScript I had before.

Components I made:
- **App** - holds the poem list, the status message, and which poem is being edited, and does the fetch calls to the server
- **PoemForm** - the add/edit form, including the maqam checkboxes and the poem form radio buttons. It fills itself in when you click Edit on a poem
- **PoemTable** - the table of poems with the Edit and Delete buttons
- **LoginBox** - the "Log in with GitHub" box, which hides once you are logged in

The login UI is same as from A3.

I used Vite to build the React code. 

AI notice: ran into a bunch of issues and I AI to help me troubleshoot a lot of parts.
