<script>
    import { getAuthStatus } from "../auth"

    let ghSignIn = "https://github.com/login/oauth/authorize?client_id=Ov23liXjxJVqJW9S5dNU&redirect_uri=" + location.origin + "/api/gh-authorize";

    let { hide } = $props()
    let formError = $state("");
    let loading = $state(false);
    let authStatus = getAuthStatus();
</script>

<dialog open>
    <article>
        <header>
            <button aria-label="Close" rel="prev" onclick={hide}></button>
            <h2>Sign In</h2>
        </header>
        <p>You can also <a href={ghSignIn}>sign in with your GitHub account</a>.</p>
        <form onsubmit={async e => {
            e.preventDefault();
            loading = true;
            const data = await fetch("/api/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: e.target.elements["username"].value,
                    password: e.target.elements["password"].value
                })
            }).then(r => r.json());

            if (data.success) {
                authStatus.loggedIn = true;
                authStatus.user = e.target.elements["username"].value;
                hide();
            } else {
                formError = data.error;
            }
            loading = false;
        }}>
            <label>
                Username: <input type="text" name="username" required pattern={`[a-zA-Z0-9\\-_]{4,20}`} autocomplete="username">
            </label>
            <label>
                Password: <input type="password" name="password" required pattern={`[\\x20-\\x7e]{8,24}`} autocomplete="current-password">
            </label>
            <button name="submit" aria-busy={loading}>Sign In</button>
            <p class="danger">{formError}</p>
        </form>
    </article>
</dialog>