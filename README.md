## Cookbook

Hosted on: https://a4-noah-gaskill.onrender.com/

Sample login info with 1 recipe already stored: username: noahggg password: 123

For this project, I took my Cookbook recipe manager website from A3, and rebuilt it using React. My app now uses a use state to conditionally display either the login or main page, so I had to change my login routes to send the login status from the session, rather than doing the redirects. I couldn't find another way with basic React to handle the Login page without at least integrating it somewhat, though I know we didn't need to use React for it. Otherwise, my website is structured similarly, though all the code is broken up into different componenets to organize it better. I also had to change how I displayed the background image as the React app seemed to overlap it one created.

I feel like the process of converting the assignment over to React does hinder things somewhat, with needing to decide how to break it into componenets, and getting use to useStates and whatnot. But once the conversion is done, I can see the benefit of doing future development in react. The component system is nice, especially to help organize the Javascript and not have a giant client .js file. And since my websites also constructs so much HTML in that code, the JSX does help to make that easier as well. The useStates also seem like a more clean way to pass things between multiple components over just directly editing parts of the html (ex. doing everything to make the add form become an edit form)