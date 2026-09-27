<script>
  let { editingStore, onScoreSaved } = $props();

  let difficulty = $state('Normal');
  let score = $state(0);
  let duration = $state(1);
  let notes = $state('');
  let currentEditingItem = $state(null);

  $effect(() => {

    const unsubscribe = editingStore.subscribe(item => {

      currentEditingItem = item;
      if (item) {

        score = item.score;
        duration = item.duration;
        difficulty = item.difficulty || 'Normal';
        notes = item.notes || '';
      }
    });

    function handleGameOver(e) {

      if (e.detail) {

        score = e.detail.score;
        duration = e.detail.duration;
      }
    }
    window.addEventListener('game-over', handleGameOver);

    return () => {

      unsubscribe();
      window.removeEventListener('game-over', handleGameOver);
    };
  });

  function resetForm() {

    editingStore.set(null);
    score = 0;
    duration = 1;
    difficulty = 'Normal';
    notes = '';
  }

  async function handleSubmit(e) {

    e.preventDefault();
    const endpoint = currentEditingItem ? '/edit' : '/submit';
    const payload = {
      id: currentEditingItem ? currentEditingItem._id : undefined,
      score: parseInt(score, 10) || 0,
      duration: Math.max(parseInt(duration, 10) || 1, 1),
      difficulty,
      notes
    };

    const res = await fetch(endpoint, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
        
      const updatedData = await res.json();
      onScoreSaved(updatedData);
      resetForm();
    }
  }
</script>

<section class="card shadow-sm h-100">
  <div class="card-body">
    <h2 class="card-title h4 mb-3">{currentEditingItem ? 'Edit Your Score' : 'Record Your Score'}</h2>
    <form onsubmit={handleSubmit}>
      <div class="mb-3">
        <span class="form-label d-block text-light-emphasis">Difficulty:</span>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="diff-normal" name="difficulty" value="Normal" bind:group={difficulty}>
          <label class="form-check-label" for="diff-normal">Normal</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" id="diff-hard" name="difficulty" value="Daredevil" bind:group={difficulty}>
          <label class="form-check-label" for="diff-hard">Daredevil</label>
        </div>
      </div>

      <div class="mb-3">
        <label for="score-field" class="form-label text-light-emphasis">Score:</label>
        <input type="number" id="score-field" class="form-control" required min="0" bind:value={score}>
      </div>

      <div class="mb-3">
        <label for="duration-field" class="form-label text-light-emphasis">Survival Time (Seconds):</label>
        <input type="number" id="duration-field" class="form-control" required min="1" bind:value={duration}>
      </div>

      <div class="mb-3">
        <label for="notes-field" class="form-label text-light-emphasis">Notes:</label>
        <textarea id="notes-field" class="form-control" rows="2" placeholder="Describe this run..." bind:value={notes}></textarea>
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-success flex-grow-1">
          {currentEditingItem ? 'Update Entry' : 'Submit Score'}
        </button>
        {#if currentEditingItem}
          <button type="button" class="btn btn-secondary" onclick={resetForm}>Cancel</button>
        {/if}
      </div>
    </form>
  </div>
</section>