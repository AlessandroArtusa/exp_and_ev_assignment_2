const testValues = [
    {
        case: "kebab-case",
        sentence: "acquire antidote",
        correct: "acquire-antidote",
        distractors: ["acoir-antidote", "acquire-antidose", "acquite-antidote"],
        selected: false
    },
    {
        case: "camelCase",
        sentence: "pretty cool",
        correct: "prettyCool",
        distractors: ["pettyCool", "prettyPool", "prettyCoul"],
        selected: false
    },
    {
        case: "kebab-case",
        sentence: "hail the thief",
        correct: "hail-the-thief",
        distractors: ["hall-the-thief", "hail-the-thiaf", "heil-the-thief"],
        selected: false
    },
    {
        case: "camelCase",
        sentence: "on christmas eve",
        correct: "onChristmasEve",
        distractors: ["onChristmasEva", "onCristmasEve", "onChristmesEve"],
        selected: false
    },
    {
        case: "kebab-case",
        sentence: "hydrogen peroxide",
        correct: "hydrogen-peroxide",
        distractors: ["hydrogen-peruxide", "hydrgen-peroxide", "hydrogen-peroxider"],
        selected: false
    },
    {
        case: "camelCase",
        sentence: "funny monkey",
        correct: "funnyMonkey",
        distractors: ["funkyMonkey", "funnyMoney", "funnyMonky"],
        selected: false
    }
]
let trialsList = [];

/**
 * Function that loads testValues to localStorage.
 */
function saveToLocalStorageTestValues() {
    localStorage.setItem("testValues", JSON.stringify(testValues));
}
saveToLocalStorageTestValues();

/**
 * Function to choose the sentence to be displayed for the current trial.
 */
function chooseSentence() {
    const remainingValues = testValues.filter(x => !x.selected);
    /* Control case if it this page is reached when trials are complete. */
    if (remainingValues === null) {
        fetch('/result', {
            method: 'GET'
        });
    }

    const randomElement = remainingValues[Math.floor(Math.random() * remainingValues.length)];

    localStorage.setItem("selectedSentence", randomElement.sentence);

    document.getElementById('sentence-h2').innerHTML = randomElement.sentence;

}

let sentence = localStorage.getItem('selectedSentence');
if (sentence == null) {
    chooseSentence();
} else {
    document.getElementById('sentence-h2').innerHTML = `<i>${sentence}</i>`;
}