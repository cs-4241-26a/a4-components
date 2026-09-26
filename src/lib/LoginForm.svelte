<script>
    let {action, heading, title, description} = $props()
</script>

<svelte:head>
    <title>{title} - Recipe Wiki</title>
    <meta name="description" content={description} />
</svelte:head>

<main class='pure-g form-wrapper'>
    <h2 class='pure-u-1'>{heading}</h2>
    <section id='login-form' class='pure-u-1'>
        <form {action} method='POST' class='pure-form pure-form-aligned centered'>
            <div class='pure-control-group'>
                <label for='username'>*Username:</label>
                <input type='text' id='username' name='username' required>
            </div>

            <div class='pure-control-group'>
                <label for='password'>*Password:</label>
                <input type='password' id='password' name='password' required>
            </div>

            <div class='pure-controls'>
                <input type='submit' value='Submit' class='pure-button pure-button-primary'>
            </div>
        </form>
    </section>
</main>