<script>
    import { onMount } from 'svelte';
    import Note from './Note.svelte';
    import NoteModal from './NoteModal.svelte';

    let notes = [];
    let isLoggedIn = false;
    let isModalOpen = false;
    let currentEditNote = null;

    // Fetch initial notes
    onMount(async () => {
        const response = await fetch('/notes');
        if (response.status === 401) {
            isLoggedIn = false;
            return;
        }
        notes = await response.json();
        isLoggedIn = true;
    });

    function openNewModal() {
        currentEditNote = null;
        isModalOpen = true;
    }

    function openEditModal(event) {
        currentEditNote = event.detail.note;
        isModalOpen = true;
    }

    async function deleteNote(event) {
        const noteID = event.detail.id;
        const response = await fetch('/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: noteID })
        });
        notes = await response.json();
    }

    async function saveNote(event) {
        const noteData = event.detail.note;
        const endpoint = currentEditNote ? '/update' : '/submit';

        // Attach the ID if we are updating an existing note
        if (currentEditNote) {
            noteData._id = currentEditNote._id;
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        });

        notes = await response.json();
        isModalOpen = false;
    }
</script>

{#if !isLoggedIn}
    <!-- The Login UI (No HTML file switching required!) -->
    <main class="container text-center" style="margin-top: 10rem;">
        <h1 style="font-family: 'Londrina Shadow', sans-serif; color: #DA4167; font-size: 100px;">A Sticky Place</h1>
        <p class="margin-bottom">Welcome! Please log in to view and create your sticky notes.</p>

        <a href="/auth/github" class="paper-btn btn-primary btn-large">Login with GitHub</a>
    </main>
    {:else}
    <!-- The Sticky Note App UI -->
    <main class="container" style="margin-top: 2rem;">
        <h1 class="text-center" style="font-family: 'Londrina Shadow', sans-serif; color: #DA4167; font-size: 80px;">A Sticky Place</h1>

        <div class="text-center">
            <a href="/logout" class="paper-btn btn-small" style="position: absolute; top:20px; right:20px;">Logout</a>
        </div>

        <div class="text-center margin-bottom">
            <button class="paper-btn btn-secondary" on:click={openNewModal}>Add Note</button>
        </div>

        <div class="row flex-center" style="gap: 20px;">
            {#each notes as note (note._id)}
                <Note {note} on:edit={openEditModal} on:delete={deleteNote} />
            {/each}
        </div>
    </main>

    {#if isModalOpen}
        <NoteModal
                editingNote={currentEditNote}
                on:save={saveNote}
                on:close={() => isModalOpen = false}
        />
    {/if}
{/if}