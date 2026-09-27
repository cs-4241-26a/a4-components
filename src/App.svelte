<script>
  import { onMount } from 'svelte';
  import ScoreForm from './ScoreForm.svelte';
  import ScoreTable from './ScoreTable.svelte';

  let scores = $state([]);
  let editingItem = $state(null);

  async function loadData() {

    try {

      const res = await fetch('/data');
      if (res.ok) {

        const data = await res.json();
        if (Array.isArray(data)) {

          scores = data;
        }
      }
    } 
    catch (err) {

      console.error('Failed to load data:', err);
    }
  }

  function handleScoreSaved(updatedList) {

    scores = updatedList;
    editingItem = null;
  }

  function handleEdit(item) {

    editingItem = item;
    const formElement = document.getElementById('score-field');
    if (formElement) {

      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async function handleDelete(id) {

    try {

      const res = await fetch('/delete', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {

        scores = await res.json();
      }
    } 
    catch (err) {

      console.error('Failed to delete entry:', err);
    }
  }

  onMount(() => {
    
    loadData();
  });
</script>

<div class="row g-4 justify-content-center">
  <div class="col-12">
    <ScoreForm {editingItem} onScoreSaved={handleScoreSaved} />
  </div>

  <div class="col-12">
    <ScoreTable {scores} onEdit={handleEdit} onDelete={handleDelete} />
  </div>
</div>