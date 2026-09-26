Owen Matthews

## Todo List App, now with React

https://a4-owen-matthews.onrender.com

This is a React rewrite of the client side from Assignment 2. The server logic and derived-field calculation stayed the same, and now runs on Express. The biggest change was on the client because instead of manually clearing and rebuilding the table's HTML and re-wiring button click handlers after every update, the UI is now broken into components that automatically re-render when state changes. Overall, React improved the development experience.

Before, keeping track of which row was being edited meant manually comparing IDs and rebuilding HTML by hand, which was easy to mess up. In React, that's just one piece of state, and the UI updates on its own. The downside was more setup at the start for the components, props, and a build step. It took a bit to get used to when to use props versus state. In the end, the code was shorter and easier to follow than the plain JavaScript version.
