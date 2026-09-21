<script>
    import { getAuthStatus } from "../auth"

    let authStatus = getAuthStatus();
    let { showCreateList, showEditList, changePage, refreshLists } = $props();
    let lists = $state([])

    $effect(async () => {
        document.title = "Tierable";

        if (authStatus.loggedIn && refreshLists) {
            lists = await fetch("/api/list").then(r => r.json());
        } else {
            lists = []
        }
    })
</script>

<h1 class="title">Tierable</h1>
<p>Welcome to Tierable, the place for collaborative tier lists. Create lists of things to rank and then share and rank them with your friends.</p>
{#if !authStatus.loggedIn}
    <p>You must be signed in to create a list.</p>
{:else}
    <p>
        <button onclick={showCreateList}>
            Create a List
        </button>
    </p>
    <div id="lists">
        {#each lists.lists as list, index (list.id)}
            <div role="group" style="margin-bottom: 0.5em">
                <button onclick={() => {
                    changePage("/" + list.id)
                }}>{list.title}</button>
                <button class="secondary" style="max-width: 25%" onclick={() => {
                    showEditList(list)
                }}>Edit</button>
                <button class="danger" style="max-width: 25%" onclick={async () => {
                    list.loading = true;
                    await fetch("/api/list/" + list.id, { method: "DELETE" });
                    list.loading = false;
                    lists.lists = lists.lists.toSpliced(index, 1);
                }} aria-busy={list.loading}>Delete</button>
            </div>
        {/each}
    </div>
{/if}