<script>
    import { createEventDispatcher } from 'svelte';

    export let editingNote = null;
    const dispatch = createEventDispatcher();

    // Initialize fields. If editingNote exists, populate them; otherwise, blank.
    let title = editingNote ? editingNote.title : '';
    let content = editingNote ? editingNote.content : '';
    let urgency = editingNote ? editingNote.urgency : 'high';

    function handleSubmit() {
        dispatch('save', {
            note: { title, content, urgency }
        });
    }
</script>

<div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 1000; display: flex; justify-content: center; align-items: center;">
    <div class="card" style="width: 90%; max-width: 500px; background: white;">
        <div class="card-body">
            <h2 class="card-title" style="font-size: 1.5rem">
                {editingNote ? 'Edit Note' : 'Note Details'}
            </h2>

            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-group">
                    <label for="noteTitle" style="font-family: 'Montserrat', sans-serif; font-weight: bold;">Note Title</label>
                    <input class="input-block" id="noteTitle" type="text" bind:value={title} placeholder="e.g., Grocery List" required>
                </div>

                <div class="form-group">
                    <label for="noteContent" style="font-family: 'Montserrat', sans-serif; font-weight: bold;">Note Details</label>
                    <textarea class="input-block" id="noteContent" bind:value={content} placeholder="What do you need to remember?" required></textarea>
                </div>

                <div class="form-group">
                    <label for="noteUrgency" style="font-family: 'Montserrat', sans-serif; font-weight: bold;">Urgency Level</label>
                    <select class="input-block" id="noteUrgency" bind:value={urgency}>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div class="row flex-spaces" style="margin-top: 20px;">
                    <button type="button" class="paper-btn btn-danger" on:click={() => dispatch('close')}>Cancel</button>
                    <button type="submit" class="paper-btn btn-success">
                        {editingNote ? 'Update Note' : 'Save Note'}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>