const frequencies = {
    "0": 0, // 0 means a rest
    "1": 261.62,
    "2": 294.32,
    "3": 327.02,
    "4": 348.83,
    "5": 392.43,
    "6": 436.03,
    "7": 490.54,
    "8": 523.24
}

// Info about the current user
// export let userInfo = $state({
//     loggedIn: false,
//     userID: null,
//     username: null
// });

// The value to put in the "composer" box when no other composer's melody is loaded
// export let defaultComposer = userInfo.loggedIn ? userInfo.username : "log in to submit"

// Info about the currently loaded melody
export let melodyInfo = $state({
    melody: [0, 0, 0, 0, 0, 0, 0, 0],
    title: "",
    composer: "",
    modifiable: true
})

// List of melodies to display on the page
export let collection = $state([])

// Info that triggers changes to the user interface
export let interfaceInfo = $state({
    currentlyPlaying: false,
    showUserCollection: false
})


/**
 * Plays the specified note for 1 eighth note (0.25 seconds).
 * @param {number} note Number (as a string) representing the note to play
 * @param {((this: AudioScheduledSourceNode, ev: Event) => any) | null} callback Function to call once the note has finished playing
 */
export function playNote(note, callback) {
    const audioContext = new AudioContext();
    const oscNode = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscNode.frequency.value = frequencies[note];
    oscNode.type = 'triangle'
    oscNode.onended = callback // Used to play the next notes in the melody once this one's done

    // Make a nice envelope for each note to prevent popping at the end of notes
    gainNode.gain.value = 0
    gainNode.gain.linearRampToValueAtTime(0.3, 0.01)
    gainNode.gain.linearRampToValueAtTime(0, 0.25)

    oscNode.start()
    oscNode.stop(0.25)
}

/**
 * Plays all notes in the given melody. This is destructive, so the function should only be given snapshots of the melody.
 * @param {any[]} melody
 */
export function playMelody(melody) {
    if (melody.length > 0) {
        interfaceInfo.currentlyPlaying = true;
        // for (let loadButton of document.getElementsByClassName('coll-item-load')) {
        //     loadButton.disabled = true;
        // }

        let note = melody.shift()
        playNote(note, () => {playMelody(melody)})
    } else {
        interfaceInfo.currentlyPlaying = false;
        // for (let loadButton of document.getElementsByClassName('coll-item-load')) {
        //     loadButton.disabled = false;
        // }
    }
}

/**
 * Gets the specified melody from the server and loads it into the input fields.
 * @param {string} id
 */
export async function loadMelody(id) {
    const response = await fetch(`https://${window.location.host}/collection/${id}`, {
        method: "GET"
    })
    const collItem = JSON.parse(await response.text())

    melodyInfo.title = collItem.title
    melodyInfo.composer = collItem.composer
    melodyInfo.melody = collItem.melody

    // Enable editing and submitting if the melody is the current user's, disable if it's someone else's
    melodyInfo.modifiable = false;

    playMelody($state.snapshot(melodyInfo.melody))
}

/**
 * Returns the corresponding adjective for a given vibes value, on a scale of sleepy to flamin' hot.
 */
export function getVibesAdjective(vibes) {
    // |0| sleepy |4| chill |16| fresh |36| groovy |56| flamin' hot |64|
    if (vibes <= 4) {
        return "sleepy"
    } else if (vibes <= 16) {
        return "chill"
    } else if (vibes <= 36) {
        return "fresh"
    } else if (vibes <= 56) {
        return "groovy"
    } else {
        return "flamin' hot"
    }
}