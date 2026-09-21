<script>
    import { getAuthStatus } from "../auth.js"

    let { changePage, showSignIn, showSignUp, signOut } = $props()
    let authStatus = getAuthStatus();
    let signingOut = $state(false);
</script>

<nav>
    <ul style="margin-left: 0;">
        <li>
            <strong class="title">Tierable</strong>
        </li>
        <li>
            <button onclick={() => {
                changePage("/")
            }}>
                My Tier Lists
            </button>
        </li>
    </ul>
    <ul style="margin-right: 0;">
        {#if authStatus.loggedIn}
            <li>
                <span>Signed in as {authStatus.user}</span>
            </li>
            <li>
                <button onclick={async () => {
                    signingOut = true;
                    await signOut();
                    signingOut = false;
                }} aria-busy={signingOut}>
                    Sign Out
                </button>
            </li>
        {:else}
            <li>
                <button onclick={showSignIn}>
                    Sign In
                </button>
            </li>
            <li>
                <button onclick={showSignUp}>
                    Sign Up
                </button>
            </li>
        {/if}
    </ul>
</nav>