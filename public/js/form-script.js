const form = document.getElementById("myForm");
const submitButton = document.getElementById("submitBtn");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
        const formData = new FormData(form);

        // Convert FormData to JSON
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        let json = JSON.stringify(object);

        // Save JSON in localStorage
        localStorage.setItem('formData', json);

        fetch('/submit-form', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                console.log(response);
            })
            .then(() => {
                window.location.href = "/sentence";
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    } else {
        // If the form is not valid, show validation messages
        form.reportValidity();
    }
});