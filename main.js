let prevValue = 0;
let currOperator = "";
let lastInputOp = false;
let buttonIsLiteUp = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        if(buttonIsLiteUp) {
            document.querySelectorAll('.operator').forEach((button) => {
                button.style.backgroundColor = "rgb(224, 58, 62)";
            });
            buttonIsLiteUp = false;
        }
        
        if (event.target.classList.contains("operator")) {
            operate(event.target.getAttribute("data-operation"));
            event.target.style.backgroundColor = "rgb(250, 68, 71)";
            buttonIsLiteUp = true;
        }

        if (event.target.classList.contains("number")) {
            appendToDisplay(event.target.getAttribute("value"));
        }

        if(event.target.classList.contains("equals")) {
            equals();
        }

        if(event.target.classList.contains("clear")) {
            clearDisplay();
        }
    });
});


function appendToDisplay(input) {
    if(lastInputOp && prevValue !== 0) {
        clearDisplay();
    }
    lastInputOp = false;
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function operate(input) {
    if(display.value === "") {
        return;
    }

    if(display.input !== "" && prevValue !== 0) {
        equals();
        lastInputOp = false;
    }

    prevValue = Number(display.value);
    currOperator = input;
    lastInputOp = true;
}


function equals() {
    if(prevValue != "") {
        if(currOperator === "*") {
            display.value = prevValue *= Number(display.value);
        }

        if(currOperator === "/") {
            display.value = prevValue /= Number(display.value);
        }

        if(currOperator === "+") {
            display.value = prevValue += Number(display.value);
        }

        if(currOperator === "-") {
            display.value = prevValue -= Number(display.value);
        }
        currOperator = "";
        prevValue = display.value;
        lastInputOp = false;
    }
}