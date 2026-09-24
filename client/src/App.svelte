<svelte:options runes={false} />

<script>
  const getEntries = function() {
    const p = fetch( '/docs', {
      method:'GET' 
    })
    .then( response => response.json() )
    .then( json => {
      console.log(json)
      return json 
    })
 
    return p
  }

  let exercise = ''
  let sets = ''
  let reps = ''
  /** @type {string | null} */
  let editingID = null
  
  const addEntry = function() {
    const setsNum = Number(sets)
    const repsNum = Number(reps)

    if (editingID != null){
      promise = fetch( '/update', {
        method:'POST',
        body: JSON.stringify({_id: editingID, exercise, sets: setsNum, reps: repsNum}),
        headers: { 'Content-Type': 'application/json' }
      })
      .then( response => response.json() )
      editingID = null
    }else{
    promise = fetch( '/submit', {
      method:'POST',
      body: JSON.stringify({exercise, sets: setsNum, reps: repsNum}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
  }
  exercise = ''
  sets = ''
  reps = ''
  }
  
  const deleteEntry = function(/** @type {string} */ id) {
    promise = fetch( '/delete', {
      method:'POST',
      body: JSON.stringify({_id: id}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
  }

  const editEntry = function(/** @type {{_id: string, exercise: string, sets: number, reps: number}} */item) {
    exercise = item.exercise
    sets = String(item.sets)
    reps = String(item.reps)
    editingID = item._id
  }

  let promise = getEntries()
</script>

<input type='text' id='exercise' bind:value={exercise} placeholder='Exercise Name' class="form-control mb-3">
<input type='number' id='sets' bind:value={sets} placeholder='Number of Sets' class="form-control mb-3">
<input type='number' id='reps' bind:value={reps} placeholder='Number of reps' class="form-control mb-3">
<button type = 'button' class="btn btn-primary" on:click={addEntry}>submit</button>
  
{#await promise then entries}
  <ul class="list-group mt-4">
  {#each entries as item}
    <li class="list-group-item d-flex align-items-center">
      <span class="exercise-name">{item.exercise}</span> - {item.sets} x {item.reps}:
      Total reps {item.total_reps}, Total calories Burned:
      <span class="calories-burned">{item.calories_burned}</span>
      <button type='button' class="btn btn-danger btn-sm" style="margin-left:20px; margin-right:20px" on:click={() => deleteEntry(item._id)}>Delete</button>
      <button type='button' class="btn btn-secondary btn-sm" on:click={() => editEntry(item)}>Edit</button>
    </li>
  {/each}

  </ul>
{/await}  