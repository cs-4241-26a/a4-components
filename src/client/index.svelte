<script>
    import { onMount } from "svelte";

    import HomePage from "./components/HomePage.svelte";
    import ListPage from "./components/ListPage.svelte";
    import Nav from "./components/Nav.svelte";
    import SignInDialog from "./components/SignInDialog.svelte";
    import SignUpDialog from "./components/SignUpDialog.svelte";
    import EditListDialog from "./components/EditListDialog.svelte";
    import { setAuthStatus } from "./auth";

    let page = $state(location.pathname);
    let authStatus = $state({
        loggedIn: false
    })

    setAuthStatus(authStatus);

    onMount(async () => {
        window.addEventListener("popstate", () => {
            page = location.pathname;
        });

        const authResp = await fetch("/api/status").then(r => r.json());
        authStatus.loggedIn = authResp.loggedIn;
        authStatus.user = authResp.user;
    })

    function changePage(newPage) {
        if (newPage !== "not-found") {
            history.pushState({}, "", newPage);
        }
        page = newPage;
    }

    let activeList = $state(null);
    let refreshLists = $state(1);
    let signInDialog = $state(false);
    let signUpDialog = $state(false);
    let editListDialog = $state(false);

    async function signOut() {
        await fetch("/api/sign-out", { method: "POST" }).then(r => r.json());
        authStatus.loggedIn = false;
        authStatus.user = null;
    }
</script>
<Nav {changePage} showSignIn={() => signInDialog = true} showSignUp={() => signUpDialog = true} {signOut} />
{#if signInDialog}
    <SignInDialog hide={() => signInDialog = false} />
{/if}
{#if signUpDialog}
    <SignUpDialog hide={() => signUpDialog = false} />
{/if}
{#if editListDialog}
    <EditListDialog hide={() => {
        editListDialog = false;
        refreshLists++;
        }} list={activeList} />
{/if}
<main class="container">
    {#if page === "/" || page === "/index.html"}
        <HomePage {changePage} {refreshLists} showCreateList={() => {
            activeList = null;
            editListDialog = true;
        }} showEditList={list => {
            activeList = list;
            editListDialog = true;
        }} />
    {:else if page === "not-found"}
        <h1>Not Found</h1>
    {:else}
        <ListPage {page} {changePage} {refreshLists} showEditList={list => {
            activeList = list;
            editListDialog = true;
        }} />
    {/if}
</main>