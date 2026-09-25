<script>

    const serverAddress = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

    const readFields = () => {
        return [
            {
                // @ts-ignore
                userName: document.querySelector('#userName')?.value,
                // @ts-ignore
                oppName: document.querySelector('#oppName')?.value,
                // @ts-ignore
                userScore: parseInt(document.querySelector('#userScore')?.value) || 0,
                // @ts-ignore
                oppScore: parseInt(document.querySelector('#oppScore')?.value) || 0,
            },
            // @ts-ignore
            parseInt(document.querySelector('#modifying')?.value) || -1,
        ]
    }

    const getGames = () => {
        const p = fetch(`${serverAddress}/read`, {
            method:'GET' 
        })
        .then(response => response.json())
    
        return p
    }

    const submit = () => {
        const [game, modifying] = readFields()
        document.querySelector('form')?.reset() //clear form

        if(modifying == -1) {
            return addGame(game)
        }
        else {
            return modifyGame(game, modifying)
        }
    }

    const addGame = (game) => {
        promise = fetch(`${serverAddress}/add`, {
            method:'POST',
            body: JSON.stringify(game),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
    }

    const deleteGame = (id) => {
        promise = fetch(`${serverAddress}/delete`, {
            method: 'POST',
            body: JSON.stringify({id}),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
    }

    const modifyGame = (game, id) => {
        game.id = id
        promise = fetch(`${serverAddress}/modify`, {
            method:'POST',
            body: JSON.stringify(game),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
    }

    let promise = getGames()
</script>

<h1>Warhammer Score Tracker</h1>

<form on:submit|preventDefault={submit}>
    <label for="userName">Your Name</label>
    <input type="text" id="userName" />

    <label for="oppName">Opponent's Name</label>
    <input type="text" id="oppName" />

    <label for="userScore">Your Score</label>
    <input type="number" id="userScore" />
    
    <label for="oppScore">Opponent's Score</label>
    <input type="number" id="oppScore" />

    <div id="submitContainer">
        <input type="submit" id="submit" value="Submit" />
        <label for="modifying" id="modifyingLabel">Modifying:</label>
        <input type="number" id="modifying" />
    </div>
</form>

{#await promise then games}
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Your Name</th>
                <th>Opponent's Name</th>
                <th>Your Score</th>
                <th>Opponent's Score</th>
                <th>Result</th>
                <th>Del.</th>
            </tr>
        </thead>

        <tbody>
            {#each games as game}
                <tr>
                    <td>{game.id}</td>
                    <td>{game.userName}</td>
                    <td>{game.oppName}</td>
                    <td>{game.userScore}</td>
                    <td>{game.oppScore}</td>
                    <td>{game.result}</td>
                    <td><button on:click={() => {deleteGame(game.id)}}>
                        <img class="icon" src="icons/delete.png" alt="Delete"/>
                    </button></td>
                </tr>
            {/each}
        </tbody>
    </table>
{/await}

<p>
    To modify a game, enter the new details in the form fields,
    enter the ID of the game to modify in the modifying box,
    then press submit.

</p>