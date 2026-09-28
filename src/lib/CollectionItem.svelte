<script>
    import {interfaceInfo, loadMelody, getVibesAdjective} from "../shared.svelte.js";
    let { melody } = $props();
    let melodyString = ""
    for (let note of melody.melody) {
        melodyString += (note + " ")
    }
</script>

<div class="coll-item">
    <div class="coll-item-info">
        <p class="coll-item-description">{melody.title} - by {melody.composer}</p>
        <p class="coll-item-melody">{melodyString}</p>
        <p class="coll-item-vibes">vibes: {getVibesAdjective(melody.vibes)} ({melody.vibes})</p>
    </div>
    <button class="coll-item-load" onclick={() => loadMelody(melody._id.toString())} disabled={interfaceInfo.currentlyPlaying} >load</button>
</div>