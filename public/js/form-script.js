const { response } = require("express");

const form = document.getElementById("myForm");
const submitButton = document.getElementById("submitBtn");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
        const formData = new FormData(form);

        fetch('/submit-form', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error: ', error)
            });
    } else {
        // If the form is not valid, show validation messages
        form.reportValidity();
    }
});