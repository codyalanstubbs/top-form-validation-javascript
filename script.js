const allInputs = document.querySelectorAll("input");
const instructions = document.querySelector(".instructions");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputsEmpty(allInputs)
});

function checkInputsEmpty(inputNodeList) {
    let result = false; 
    inputNodeList.forEach(input => {
        if (checkValueEmpty(input)) {
            result = checkValueEmpty(input)
            input.classList.add("empty")
            
            const inputIcon = document.querySelector(`.icon.${input.id}`);
            inputIcon.textContent = "⚠️";
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