import { writable } from 'svelte/store';
import { mount } from 'svelte';
import ScoreForm from './ScoreForm.svelte';
import ScoreTable from './ScoreTable.svelte';

// Shared reactive stores for scores and the item being edited
export const scoresStore = writable([]);
export const editingItemStore = writable(null);

// Fetch initial data
async function loadData() {
  try {
    const res = await fetch('/data');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        scoresStore.set(data);
      }
    }
  } catch (err) {
    console.error('Failed to load data:', err);
  }
}

// Handlers passed into components
export function handleScoreSaved(updated) {
  scoresStore.set(updated);
  editingItemStore.set(null);
}

export function handleEdit(item) {
  editingItemStore.set(item);
  const el = document.getElementById('score-field');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export async function handleDelete(id) {
  try {
    const res = await fetch('/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      const updated = await res.json();
      scoresStore.set(updated);
    }
  } catch (err) {
    console.error('Delete failed:', err);
  }
}

// Mount Form into the top-right column
const formTarget = document.getElementById('svelte-form-target');
if (formTarget) {
  mount(ScoreForm, {
    target: formTarget,
    props: {
      editingStore: editingItemStore,
      onScoreSaved: handleScoreSaved
    }
  });
}

// Mount Table into the full-width bottom row
const tableTarget = document.getElementById('svelte-table-target');
if (tableTarget) {
  mount(ScoreTable, {
    target: tableTarget,
    props: {
      scoresStore: scoresStore,
      onEdit: handleEdit,
      onDelete: handleDelete
    }
  });
}

loadData();