const allInputs = document.querySelectorAll("input");
const instructions = document.querySelector(".instructions");
const submitBtn = document.querySelector("#submit");
const email = document.getElementById("mail");

email.addEventListener("input", (e) => {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("Enter a valid email address like john@company.com");
        email.reportValidity();
    } else {
        email.setCustomValidity("");
    }
})

email.addEventListener("focusout", (e) => checkInputValidFocusOut(email))

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputsEmpty(allInputs);
});

function checkInputValidFocusOut(inputElement) {
    if (
        inputElement.validity.typeMismatch ||
        inputElement.validity.patternMismatch ||
        inputElement.value === ''
    ) {
        inputElement.classList.add("empty");
        addInputIcon(email, "⚠️");
    } else {
        console.log(email.validity);
        addInputIcon(email, "✔️");
    }
}

function addInputIcon(inputElement, icon) {
    const inputIcon = document.querySelector(`.icon.${inputElement.id}`);
    inputIcon.textContent = icon;
}

function removeInputIcon(inputElement) {
    const inputIcon = document.querySelector(`.icon.${inputElement.id}`);
    inputIcon.textContent = "";
}

function checkInputsEmpty(inputNodeList) {
    let result = false; 
    inputNodeList.forEach(input => {
        if (checkValueEmpty(input)) {
            result = checkValueEmpty(input);
            input.classList.add("empty");
            addInputIcon(input, "⚠️");
        }
    });

    if (result === true) {
        instructions.classList.add("empty");
    }
}

function checkValueEmpty(input) {
    if (input.value === '' || input.value === undefined) {
        return true;
    }
}