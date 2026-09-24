## Circle Clicker

Link: https://a4-maxgingold.onrender.com/

A reaction game where a circle sits in the play area and moves around everytime the user presses it. The goal is to press it as  much as possible in 30 secconds. 
Players can save their score to a scoreboard that's visible to every logged-in user, though only the account that created a given score can rename or delete it.

I converted the main app (home screen, game screen, name-entry, and scoreboard) from vanilla JS DOM manipulation into React components. The webApp is now built with Vite and served through vite-express so the whole app runs as one Express process. The game's timer/hit-tracking logic now lives in a custom useGame hook, and screen switching is handled by conditionally rendering components based on state instead of manually toggling hidden attributes on four different divs. I also dropped GitHub OAuth and kept just the username/password login.

Switching to React overall improved the development experience. Although vanilla JS worked just fine for a web app of this scale, being able to use features React allowed like the conditionally rendered screen switching and hook based timer logic allowed for cleaner implementation over the old setInterval/querySelector approach I used in A3. 