## Recipe Wiki version 3

James Ostermiller<br>
https://a4-jamesostermiller.onrender.com/index.html

For this project, I converted all parts of my a3 project to use Svelte components.

I appreciated that Svelte made writing and reusing html a lot easier. (In particular, being able to write my generated recipe cards directly in html with variables instead of needing to construct them one-piece-at-a-time in javascript using appendElement was a lot more convenient and easier to read.) However, I think that the end result is objectively a lot worse: every page now gets a "flash of unstyled content", and the reactive parts reload the entire list instead of only updating the single item affected as my previous custom javascript did.