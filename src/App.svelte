<script>
    import {melodyInfo, interfaceInfo, collection, playMelody} from "./shared.svelte.js";
    import NoteInput from "./lib/NoteInput.svelte";
    import CollectionItem from "./lib/CollectionItem.svelte";

    /**
     * Retrieves the collection from the server.
     */
    async function getCollection() {
        collection.length = 0; // Clear the collection before repopulating it

        const response = await fetch(`https://${window.location.host}/collection`, {method: "GET"})
        let data = JSON.parse(await response.text()).reverse() // Reverse the data so the melodies appear in reverse chronological order
        for (let melody of data) {
            collection.push(melody)
        }
    }

    /**
     * Runs when the play button is clicked.
     */
    function playButton() {
        let melodyClone = $state.snapshot(melodyInfo.melody);
        playMelody(melodyClone);
    }

    /**
     * Runs when the clear button is clicked.
     */
    function clearButton() {
        melodyInfo.melody = [0, 0, 0, 0, 0, 0, 0, 0];
        melodyInfo.title = "";
        melodyInfo.composer = "";
        melodyInfo.modifiable = true;
    }

    /**
     * Runs when the submit button is clicked.
     * @param {any} event
     */
    async function submitButton(event) {
        event.preventDefault()

        const json = {
            title: melodyInfo.title,
            composer: melodyInfo.composer,
            melody: melodyInfo.melody
        }
        const body = JSON.stringify(json)

        await fetch(`https://${window.location.host}/submit`, {
            method:'POST',
            body: body
        })

        await getCollection()
    }


    // Run this code on page load
    getCollection()
</script>

<nav>
    <h1>𝅘𝅥𝅮 mini melodies</h1>
<!--    <div class="account-buttons">-->
<!--        <p id="logged-in-status">{userInfo.loggedIn ? "logged in as " + userInfo.username : "not logged in"}</p>-->
<!--        <a id="create-account" class="button" href="http://localhost:3000/create-account" style="visibility: {userInfo.loggedIn ? "collapse" : "visible"}">create account</a>-->
<!--        <a id="login" class="button" href="http://localhost:3000/login" style="visibility: {userInfo.loggedIn ? "collapse" : "visible"}">log in</a>-->
<!--        <a id="logout" class="button" href="http://localhost:3000/logout" style="visibility: {userInfo.loggedIn ? "visible" : "collapse"}">log out</a>-->
<!--    </div>-->
</nav>
<main>
    <h2>make a melody</h2>
    <div id="melody-maker">
        <div id="melody">
            <button id="play" onclick={playButton} disabled={interfaceInfo.currentlyPlaying}>▶</button>
            {#each {length: 8}, index}
                <NoteInput {index} />
            {/each}
        </div>
        <div id="instructions">
            1-8 are the notes of the major scale, 0 is silence.<br>
            write your melody, give it a title, and submit it to the collection.
        </div>
        <div id="details">
            <button id="clear" onclick={clearButton}>clear</button>
            <label for="title-input">melody title:</label> <input type="text" id="title-input" bind:value={melodyInfo.title} disabled={!melodyInfo.modifiable}>
            <label for="composer-input">composer:</label> <input type="text" id="composer-input" bind:value={melodyInfo.composer} disabled={!melodyInfo.modifiable}>
            <button id="submit" onclick={submitButton} disabled={!melodyInfo.modifiable}>submit</button>
        </div>
    </div>
    <h2>collection</h2>
<!--    <div id="show-user-collection-div">-->
<!--        <input type="checkbox" id="show-user-collection" disabled={!userInfo.loggedIn}> <label for="show-user-collection">only show your collection</label>-->
<!--    </div>-->
    <div id="collection">
        {#each collection as melody}
            <CollectionItem melody={melody} />
        {:else}
            <p>nothing here yet...</p>
        {/each}
    </div>
</main>