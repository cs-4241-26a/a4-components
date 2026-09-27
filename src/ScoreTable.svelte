<script>
  let { scoresStore, onEdit, onDelete } = $props();

  let scores = $state([]);

  $effect(() => {

    const unsubscribe = scoresStore.subscribe(val => {

      scores = val;
    });
    return unsubscribe;
  });

  function escapeHtml(str) {

    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
</script>

<section class="card shadow-sm">
  <div class="card-body">
    <h2 class="card-title h4 mb-3">Your Records</h2>
    <div class="table-responsive">
      <table class="table table-hover align-middle mb-0">
        <thead class="table-secondary">
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Score</th>
            <th scope="col">Survival Time (S)</th>
            <th scope="col">Points per Second</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Ranking</th>
            <th scope="col">Notes</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#if scores.length === 0}
            <tr>
              <td colspan="8" class="text-center text-muted py-3">
                No records logged yet. Play a game or submit a score above!
              </td>
            </tr>
          {:else}
            {#each scores as item (item._id)}
              <tr>
                <td>{escapeHtml(item.username)}</td>
                <td>{item.score}</td>
                <td>{item.duration}</td>
                <td>{item.pps}</td>
                <td><span class="badge bg-secondary">{escapeHtml(item.difficulty || 'Normal')}</span></td>
                <td><span class="badge bg-primary">{item.rankTier}</span></td>
                <td>{escapeHtml(item.notes || '—')}</td>
                <td style="white-space: nowrap;">
                  <button class="btn btn-sm btn-info me-1" onclick={() => onEdit(item)}>Edit</button>
                  <button class="btn btn-sm btn-danger" onclick={() => onDelete(item._id)}>Delete</button>
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>