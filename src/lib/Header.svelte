<script>
  import HeaderLink from './HeaderLink.svelte'
  let {loggedin=false, currentpath} = $props()
</script>

<header class='pure-menu pure-menu-horizontal'>
  <h1 class='pure-menu-heading'>Recipe Wiki</h1>
  <ul class='pure-menu-list'>
    {#if loggedin}
      <HeaderLink path='/index.html' {currentpath} text='Browse recipes' />
      <HeaderLink path='/profile.html' {currentpath} text='My recipes' />
      <li class='pure-menu-item'>
        <form action='/logout' method='POST'>
          <button type='submit' class='pure-menu-link'>Log out</button>
        </form>
      </li>
    {:else}
      <HeaderLink path='/login.html' {currentpath} text='Log in' />
      <HeaderLink path='/createaccount.html' {currentpath} text='Create account' />
    {/if}
  </ul>
</header>