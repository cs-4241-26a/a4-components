<script>
    import { createEventDispatcher } from 'svelte';

    export let note;
    const dispatch = createEventDispatcher();
</script>

<div class ="card text-left" style="background-color: #F0CF65; width: 250px; cursor: pointer; transitionL transform 0.3 ease; border: 2px solid #333;">
    <div class="card-body">
        <h2 class="card-title" style="font-size: 1.5rem; font-family: 'Montserrat', sans-serif; color: #111; margin-bottom: 0;">
            {note.title}
        </h2>
        <p style="font-size: 12px; color: #444; font-weight: bold; text-transform: uppercase; margin-top: 5px; margin-bottom: 15px;">
            {note.urgency} | Due: {note.deadline}
        </p>

        <p class="card-text" style="font-family: 'Montserrat', sans-serif; color: #222; white-space: pre-wrap; margin-bottom: 25px;">
            {note.content}
        </p>

        <div class="row flex-right" style="gap: 10px;">
            <button class="btn-small btn-secondary" on:click={() => dispatch('edit', { note })}>Edit</button>
            <button class="btn-small btn-danger" on:click={() => dispatch('delete', { id: note._id })}>X</button>
        </div>
    </div>
</div>

<style>
    .card:hover {
        transform: scale(1.05);
    }
</style>