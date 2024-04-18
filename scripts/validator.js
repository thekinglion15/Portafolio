// Get the input element for the name field in the form.
const nombreInput = document.getElementById("name");
// Add an 'input' event to the name field to restrict the allowed characters.
nombreInput.addEventListener("input", function () {
    // Use a regular expression to allow only letters, spaces, and accented letters.
    this.value = this.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
});


// Get the input element for the phone number field in the form.
const telefonoInput = document.getElementById("phone");
// Add an 'input' event to the phone number field to format the input.
telefonoInput.addEventListener("input", function () {
    // Remove all non-numeric characters from the input.
    this.value = this.value.replace(/\D/g, "");
    // Format the phone number as (###) ###-####.
    const formattedValue = this.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    // Update the input value with the formatted phone number, limiting to 14 characters.
    this.value = formattedValue.substring(0, 14);
});


// Selecting form elements.
const form = document.querySelector(".contact-form");
const submitBtn = document.getElementById("submitBtn");
const inputFields = form.querySelectorAll(".input-field");

/**
 * Enables or disables the submit button based on whether input fields are empty or not.
 */
function checkInputs() {
    let isEmpty = false;
    inputFields.forEach(input => {
        if (input.value.trim() === "") {
            isEmpty = true;
        }
    });
    submitBtn.disabled = isEmpty;

    // Change button and icon styles based on button state
    if (isEmpty) {
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
    } else {
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
}

// Event listener for input fields to trigger checkInputs function.
inputFields.forEach(input => {
    input.addEventListener("input", checkInputs);
});