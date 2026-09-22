<script>
  import { onMount } from 'svelte';
  export let user;

  let keyboards = [];
  let loadingData = true;
  let kbId = '';
  let kbName = '';
  let kbSize = '';
  let kbPrice = '';
  let switches = 'Linear';
  let kbRgb = false;
  let kbDetails = '';

  async function fetchKeyboards() {
    const res = await fetch('/api/keyboards');
    if (res.status === 401) {
      window.location.href = '/';
      return;
    }
    keyboards = await res.json();
    loadingData = false;
  }

  async function submitForm(e) {
    e.preventDefault();
    const data = {
      name: kbName,
      size: kbSize,
      price: kbPrice,
      switches,
      rgb: kbRgb,
      details: kbDetails
    };

    const method = kbId ? 'PUT' : 'POST';
    const url = kbId ? `/api/keyboards/${kbId}` : '/api/keyboards';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    resetForm();
    fetchKeyboards();
  }

  function editKb(kb) {
    kbId = kb._id;
    kbName = kb.name;
    kbSize = kb.size;
    kbPrice = kb.price;
    switches = kb.switches;
    kbRgb = kb.rgb;
    kbDetails = kb.details && kb.details !== 'undefined' ? kb.details : '';
  }

  async function deleteKb(id) {
    await fetch(`/api/keyboards/${id}`, { method: 'DELETE' });
    fetchKeyboards();
  }

  async function buyKb(id) {
    await fetch(`/api/buy/${id}`, { method: 'POST' });
    fetchKeyboards();
  }

  function resetForm() {
    kbId = '';
    kbName = '';
    kbSize = '';
    kbPrice = '';
    switches = 'Linear';
    kbRgb = false;
    kbDetails = '';
  }

  onMount(fetchKeyboards);

  $: availableItems = keyboards.filter(kb => kb.status === 'available');
  $: purchasedItems = keyboards.filter(kb => kb.status === 'sold' && kb.buyerId === user.githubId);$: soldItems = keyboards.filter(kb => kb.status === 'sold' && kb.sellerId === user.githubId);
</script>

{#if !loadingData}
  <main class="container">
    <nav>
      <ul>
        <li><h1>Keyboard Marketplace</h1></li>
      </ul>
      <ul>
        <li>
          <form action="/logout" method="post" style="margin-bottom: 0;">
            <button type="submit" class="danger">Log Out</button>
          </form>
        </li>
      </ul>
    </nav>

    <div class="grid">
      <div>
        <article>
          <h2>Post a Keyboard</h2>
          <form on:submit|preventDefault={submitForm}>
            <label for="kbName">Keyboard Name
              <input type="text" id="kbName" bind:value={kbName} required>
            </label>
            <label for="kbSize">Size (e.g. 60%, 100%)
              <input type="text" id="kbSize" bind:value={kbSize} required>
            </label>
            <label for="kbPrice">Price ($)
              <input type="number" id="kbPrice" step="0.01" bind:value={kbPrice} required>
            </label>

            <fieldset>
              <legend>Switch Type</legend>
              <label for="swLinear">
                <input type="radio" id="swLinear" value="Linear" bind:group={switches}> Linear
              </label>
              <label for="swTactile">
                <input type="radio" id="swTactile" value="Tactile" bind:group={switches}> Tactile
              </label>
              <label for="swClicky">
                <input type="radio" id="swClicky" value="Clicky" bind:group={switches}> Clicky
              </label>
            </fieldset>

            <label for="kbRgb">
              <input type="checkbox" id="kbRgb" bind:checked={kbRgb}> Has RGB Lighting
            </label>

            <label for="kbDetails">Details
              <textarea id="kbDetails" rows="2" bind:value={kbDetails}></textarea>
            </label>

            <button type="submit">{kbId ? 'Update Listing' : 'List Item'}</button>
            {#if kbId}
              <button type="button" class="secondary" style="margin-top: 1rem;" on:click={resetForm}>Cancel Edit</button>
            {/if}
          </form>
        </article>
      </div>

      <div>
        <h2>Available Keyboards</h2>
        <div id="marketItems">
          {#each availableItems as kb}
            <article style="margin-bottom: 1rem;">
              <header>
                <h3 style="margin-bottom: 0;">{kb.name}</h3>
                <small>Seller: {kb.sellerName}</small>
              </header>
              <p style="margin-bottom: 0;"><strong>Size:</strong> {kb.size} | <strong>Price:</strong> ${kb.price}</p>
              <p style="margin-bottom: 0;"><strong>Switches:</strong> {kb.switches} | <strong>RGB:</strong> {kb.rgb ? 'Yes' : 'No'}</p>
              <p><strong>Details:</strong> {kb.details || 'None'}</p>
              <footer>
                {#if kb.sellerId === user.githubId}
                  <div class="grid">
                    <button class="secondary" on:click={() => editKb(kb)}>Edit</button>
                    <button class="danger" on:click={() => deleteKb(kb._id)}>Remove</button>
                  </div>
                {:else}
                  <button class="success" on:click={() => buyKb(kb._id)}>Buy</button>
                {/if}
              </footer>
            </article>
          {/each}
        </div>

        <h2>Your Purchased Items</h2>
        <div id="purchasedItems">
          {#each purchasedItems as kb}
            <article style="margin-bottom: 1rem;">
              <header>
                <h3 style="margin-bottom: 0;">{kb.name}</h3>
                <small><strong>Purchased from: {kb.sellerName}</strong></small>
              </header>
              <p style="margin-bottom: 0;"><strong>Size:</strong> {kb.size} | <strong>Price:</strong> ${kb.price}</p>
              <p style="margin-bottom: 0;"><strong>Switches:</strong> {kb.switches} | <strong>RGB:</strong> {kb.rgb ? 'Yes' : 'No'}</p>
              <p style="margin-bottom: 0;"><strong>Details:</strong> {kb.details || 'None'}</p>
            </article>
          {/each}
        </div>

        <h2>Your Sold Items</h2>
        <div id="soldItems">
          {#each soldItems as kb}
            <article style="margin-bottom: 1rem;">
              <header>
                <h3 style="margin-bottom: 0;">{kb.name}</h3>
                <small><strong>Sold to: {kb.buyerName}</strong></small>
              </header>
              <p style="margin-bottom: 0;"><strong>Size:</strong> {kb.size} | <strong>Price:</strong> ${kb.price}</p>
              <p style="margin-bottom: 0;"><strong>Switches:</strong> {kb.switches} | <strong>RGB:</strong> {kb.rgb ? 'Yes' : 'No'}</p>
              <p style="margin-bottom: 0;"><strong>Details:</strong> {kb.details || 'None'}</p>
            </article>
          {/each}
        </div>
      </div>
    </div>
  </main>
{/if}

<style>
  button, input[type="submit"] {
    background-color: #004a99 !important;
    border-color: #004a99 !important;
    color: #ffffff !important;
  }
  button:hover, input[type="submit"]:hover {
    background-color: #003366 !important;
    border-color: #003366 !important;
  }
  button.secondary {
    background-color: #4b5563 !important;
    border-color: #4b5563 !important;
    color: #ffffff !important;
  }
  button.secondary:hover {
    background-color: #374151 !important;
    border-color: #374151 !important;
  }
  button.danger {
    background-color: #b91c1c !important;
    border-color: #b91c1c !important;
    color: #ffffff !important;
  }
  button.danger:hover {
    background-color: #991b1b !important;
    border-color: #991b1b !important;
  }
  button.success {
    background-color: #15803d !important;
    border-color: #15803d !important;
    color: #ffffff !important;
  }
  button.success:hover {
    background-color: #166534 !important;
    border-color: #166534 !important;
  }
  article {
    --block-spacing-vertical: 1rem;
    --block-spacing-horizontal: 1rem;
  }
  /* Stop da thingys from moving around. */
  main.container {
    min-height: 100vh;
  }
  #marketItems, #purchasedItems, #soldItems {
    min-height: 20vh;
  }
</style>