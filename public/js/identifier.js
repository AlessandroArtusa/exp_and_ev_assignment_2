function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Initialize the four identifiers on the page and start the timer.
 */
function startIdentifiers() {
    let testValues = JSON.parse(localStorage.getItem('testValues'));
    let selectedSentence = localStorage.getItem('selectedSentence');

    const currentSentenceObj = testValues.filter(x => x.sentence === selectedSentence)[0];

    if (currentSentenceObj === null) {
        fetch('/error', {
            method: 'GET'
        });
    }

    let identifiersArray = [];

    identifiersArray.push(currentSentenceObj.correct);

    Array.prototype.push.apply(identifiersArray, currentSentenceObj.distractors);

    shuffleArray(identifiersArray);

    for (i = 1; i <= 4; ++i) {
        document.querySelector(`main > :nth-child(${i})`).innerHTML = identifiersArray[i-1];
    }

    console.log("identifiersArray", identifiersArray);
}

startIdentifiers();