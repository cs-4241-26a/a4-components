<script>
    import {melodyInfo, interfaceInfo, playNote} from "../shared.svelte.js";

    let {index} = $props()
</script>

<input
        bind:value={melodyInfo.melody[index]}
        id="note-input-{index}"
        class="note-input"
        aria-label="note {index}"
        type="number"
        min="0"
        max="8"
        onchange={() => playNote(melodyInfo.melody[index], null)}
        disabled={interfaceInfo.currentlyPlaying || !melodyInfo.modifiable}
/>