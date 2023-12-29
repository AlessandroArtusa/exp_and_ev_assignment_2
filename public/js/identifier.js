function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let testValues = JSON.parse(localStorage.getItem('testValues'));
console.log('testValues = ', testValues);
let selectedSentence = localStorage.getItem('selectedSentence');
const currentSentenceObj = testValues.filter(x => x.sentence === selectedSentence)[0];
console.log('currentSentenceObj = ', currentSentenceObj);
let identifiersArray = [];

let startTime;

/**
 * Initialize the four identifiers on the page and start the timer.
 */
function startIdentifiers() {

    if (currentSentenceObj === null) {
        fetch('/error', {
            method: 'GET'
        });
    }

    identifiersArray.push(currentSentenceObj.correct);

    Array.prototype.push.apply(identifiersArray, currentSentenceObj.distractors);

    shuffleArray(identifiersArray);

    for (let i = 1; i <= 4; ++i) {
        document.querySelector(`main > :nth-child(${i})`).innerHTML = identifiersArray[i - 1];
    }

    console.log("identifiersArray", identifiersArray);

    // Start the timer
    startTime = new Date();
}

startIdentifiers();


let identifierButtons = document.querySelectorAll('.identifier-btn');

let trialsList = [];

identifierButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(button.textContent);

        //End timer and compute time elapsed 
        let endTime = new Date();
        let elapsedTime = endTime - startTime;

        console.log('Elapsed time (seconds) = ', elapsedTime / 1000);

        let correctChoice;
        if (button.textContent === currentSentenceObj.correct) {
            correctChoice = true;
        } else {
            correctChoice = false;
        }

        let trial = {
            correctChoice: correctChoice,
            elapsedTimeSeconds: elapsedTime / 1000,
            case: currentSentenceObj.case
        }

        // Retrieve trialsList from localStorage
        if (localStorage.getItem('trialsList') === null) {
            trialsList = [];
        } else {
            trialsList = JSON.parse(localStorage.getItem('trialsList'));
        }

        // Insert trial
        trialsList.push(trial);

        // Save new result on localStorage
        localStorage.setItem('trialsList', JSON.stringify(trialsList));

        console.log('trialsList = ', trialsList);

        // Update testValues
        testValues.forEach(value => {
            if (value.sentence === selectedSentence) {
                value.selected = true;
            }
        })

        localStorage.setItem("testValues", JSON.stringify(testValues));

        localStorage.removeItem("selectedSentence");

        console.log("trialsList = ", trialsList);

        if (trialsList.length === 6) {
            window.location.href = '/result'
        } else {
            window.location.href = '/sentence';
        }
    });
});