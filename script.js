const allInputs = document.querySelectorAll("input");
const instructions = document.querySelector(".instructions");
const submitBtn = document.querySelector("#submit");
const email = document.getElementById("mail");
const zipcode = document.getElementById("zipcode");
const pwd = document.getElementById("pwd");
const pwdConfirm = document.getElementById("pwdConfirm");

const simpleInputs = [
    {element: email, message: "Please enter a valid email address like: john@email.com"},
    {element: zipcode, message: "Please only use numbers"}
]

simpleInputs.forEach((inputObject) => {
    const input = inputObject.element;
    const inputMessage = inputObject.message;

    input.addEventListener("input", (e) => {
        const message = document.querySelector(`.message.${input.id}`)

        if (checkInputInvalid(input)) {
            if (!message) {
                input.classList.add("empty");
                addInputIcon(input, "⚠️");
                insertInputInstructions(input, inputMessage)
            }
        } else {
            if (message) { 
                message.remove();
                addInputIcon(input, "✔️");
            }
        }
    })
})

pwd.addEventListener("input", (e) => {
    const pwdMessages = document.querySelectorAll(`.message.${pwd.id}`)
    pwdMessages.forEach((pwdMessage) => {pwdMessage.remove()})

    if (pwd.validity.tooShort) {
        pwd.classList.add("empty");
        addInputIcon(pwd, "⚠️");
        insertInputInstructions(pwd, "Use at least 8 characters");
    }

    if (!hasLowerCase(pwd.value)) {
        pwd.classList.add("empty");
        addInputIcon(pwd, "⚠️");
        insertInputInstructions(pwd, "Use at least 1 lower case letter");
    }

    if (!hasUpperCase(pwd.value)) {
        pwd.classList.add("empty");
        addInputIcon(pwd, "⚠️");
        insertInputInstructions(pwd, "Use at least 1 upper case letter");
    }

    if (!hasNumber(pwd.value)) {
        pwd.classList.add("empty");
        addInputIcon(pwd, "⚠️");
        insertInputInstructions(pwd, "Use at least 1 number");
    }

    if (!hasSpecialCharacters(pwd.value)) {
        pwd.classList.add("empty");
        addInputIcon(pwd, "⚠️");
        insertInputInstructions(pwd, "Use at least 1 special character");
    }

})

function hasLowerCase(str) {
    return str.toUpperCase() != str;
}

function hasUpperCase(str) {
    return str.toLowerCase() != str;
}

function hasNumber(str) {
    return /\d/.test(str);
}

function hasSpecialCharacters(str) {
    return /[~`!#$%?\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

function insertInputInstructions(inputElement, messageText) {
    const inputContainerMail = document.querySelector(`.inputContainer.${inputElement.id}`);
    
    const message = document.createElement("div");
    message.textContent = messageText;
    message.classList = `message ${inputElement.id}`;

    inputContainerMail.parentElement.insertBefore(message, inputContainerMail.nextElementSibling)
}

allInputs.forEach((inputElement) => {
    inputElement.addEventListener("focusout", (e) => {
        if (checkInputInvalid(inputElement)) {
            inputElement.classList.add("empty");
            addInputIcon(inputElement, "⚠️");
        } else {
            addInputIcon(inputElement, "✔️");
        }
    })
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputsEmpty(allInputs);
});

function checkInputInvalid(inputElement) {
    if (
        inputElement.validity.typeMismatch ||
        inputElement.validity.patternMismatch ||
        inputElement.value === ''
    ) {
        return true;
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