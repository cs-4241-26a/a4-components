<script>
    let { hide, list, votes, refreshList } = $props()
    let formError = $state("");
    let loading = $state(false);
</script>

<dialog open>
    <article>
        <header>
            <button aria-label="Close" rel="prev" onclick={hide}></button>
            <h2>Cast Vote</h2>
            <form onsubmit={async e => {
                e.preventDefault();
                loading = true;
                let options = [];
                Array.from(e.target.elements).forEach(elem => {
                    if (elem.tagName === "SELECT") {
                        options.push([elem.getAttribute("data-opt"), parseInt(elem.value)]);
                    }
                })
                const data = await fetch("/api/list/" + list.id + "/vote", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        votes: options
                    })
                }).then(r => r.json());
                loading = false;

                if (data.success) {
                    refreshList();
                    hide();
                } else {
                    formError = data.error;
                }
            }}>
                <div>
                    {#each list.options as option}
                        <label>
                            {option}:
                            <select name={Math.random().toString(36).slice(2)} data-opt={option}>
                                {#each ["S", "A", "B", "C", "D", "F"] as letter, index}
                                    <option value={5 - index} selected={votes?.votes && votes?.votes[option] === 5 - index}>{letter}</option>
                                {/each}
                            </select>
                        </label>
                    {/each}
                </div>
                <button name="submit" aria-busy={loading}>Cast Vote</button>
                <p class="danger">{formError}</p>
            </form>
        </header>
    </article>
</dialog>