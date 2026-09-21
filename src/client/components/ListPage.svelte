<script>
    import { getAuthStatus } from "../auth"
    import CastVoteDialog from "./CastVoteDialog.svelte";

    let authStatus = getAuthStatus();
    let { page, changePage, showEditList, refreshLists } = $props()
    let list = $state({
        title: "",
        tiers: [],
        options: []
    })

    $effect(async () => {
        if (!refreshLists || !refresh) {
            return;
        }

        list = await fetch("/api/list" + page).then(r => r.json());

        if (!list.success) {
            changePage("not-found");
            return;
        }

        document.title = list.title + " - Tierable"
    })

    let loadingVote = $state(false);
    let loadingRemoveVote = $state(false);
    let loadingDelete = $state(false);

    let castVoteDialog = $state(false);
    let voteData = $state({});
    let refresh = $state(1);
</script>
{#if castVoteDialog}
    <CastVoteDialog hide={() => castVoteDialog = false} {list} votes={voteData} refreshList={() => {
        refresh += 1
    }} />
{/if}

<h1 id="list-title">{list.title}</h1>
<p role="group">
    {#if authStatus.loggedIn}
        <button onclick={async () => {
            voteData = {};
            loadingVote = true;
            if (list.hasVoted) {
                voteData = await fetch("/api/list/" + list.id + "/vote").then(r => r.json());
            }
            loadingVote = false;
            castVoteDialog = true;
        }} aria-busy={loadingVote}>Vote</button>
    {/if}
    {#if list.hasVoted}
        <button class="secondary" onclick={async () => {
            loadingRemoveVote = true;
            await fetch("/api/list/" + list.id + "/vote", { method: "DELETE" });
            loadingRemoveVote = false;
            list.hasVoted = false;
            refresh += 1
        }} aria-busy={loadingRemoveVote}>Remove Vote</button>
    {/if}
    {#if list.isOwn}
        <button class="secondary" onclick={() => {
            showEditList(list);
        }}>Edit</button>
        <button class="danger" onclick={async () => {
            loadingDelete = true;
            await fetch("/api/list/" + list.id, { method: "DELETE" });
            loadingDelete = false;
            changePage("/");
        }} aria-busy={loadingDelete}>Delete</button>
    {/if}
    {#if "share" in navigator}
        <button onclick={() => {
            navigator.share({
                title: "Vote on " + list.title,
                url: location.href
            })
        }}>Share</button>
    {/if}
</p>
{#if !authStatus.loggedIn}
    <p>You must be signed in to vote.</p>
{/if}
{#key refresh}
    <table>
        <tbody>
            {#each Object.entries(list.tiers) as tier, index (index)}
                <tr>
                    <th scope="row">{tier[0].toUpperCase()}</th>
                    <td>{tier[1].join(", ")}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/key}