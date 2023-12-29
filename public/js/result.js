function cleanLocalStorage() {
    localStorage.removeItem("formData");
    localStorage.removeItem("testValues");
    localStorage.removeItem("trialsList");
}

const trialsList = JSON.parse(localStorage.getItem("trialsList"));

function sendDataToServer() {
    const formData = JSON.parse(localStorage.getItem("formData"));

    const data = {
        formData: formData,
        trialsList: trialsList
    };

    fetch('/save-data', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(respone => respone.json())
        .then(data => {
            console.log('Success sending data: ', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}
sendDataToServer();

function displayResult() {
    let count = 0;
    trialsList.forEach(t => {
        if (t.correctChoice === true) {
            count++;
        }
    })
    let p = document.getElementById('number-correct-answers');
    p.innerHTML = `<i>Number of correct answers given</i>: <b>${count}</b>!`
}
displayResult();

cleanLocalStorage();