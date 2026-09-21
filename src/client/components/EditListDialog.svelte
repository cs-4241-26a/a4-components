<script>
    let { hide, list } = $props()

    let formError = $state("");
    let loading = $state(false);
    // svelte-ignore state_referenced_locally
    let title = $state(list?.title || "");
    // svelte-ignore state_referenced_locally
    let options = $state(list?.options || []);
</script>

<dialog open>
    <article>
        <header>
            <button aria-label="Close" rel="prev" onclick={hide}></button>
            <h2>Edit List</h2>
        </header>
        <form onsubmit={async e => {
            e.preventDefault();
            loading = true;
            const data = await fetch(list ? "/api/list/" + list.id : "/api/list", {
                method: list ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    options
                })
            }).then(r => r.json());
            loading = false;

            if (data.success) {
                hide();
            } else {
                formError = data.error;
            }
        }}>
            <label>
                Title: <input type="text" name="title" bind:value={title} required pattern={`[\\x20-\\x7e]{4,100}`}>
            </label>
            <p>
                <button onclick={e => {
                    e.preventDefault();
                    options.push("");
                }}>Add Option</button>
            </p>
            <ul>
                {#each options as item, index}
                    <li role="group">
                        <input pattern={`[\\x20-\\x7e]{1,100}`} required type="text" name={index} bind:value={options[index]}>
                        <button class="danger" onclick={e => {
                            e.preventDefault();
                            options = options.toSpliced(index, 1);
                        }}>
                            Delete
                        </button>
                    </li>
                {/each}
            </ul>
            <button name="submit" aria-busy={loading}>Save</button>
            <p class="danger">{formError}</p>
        </form>
    </article>
</dialog>