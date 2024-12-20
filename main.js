let prevValue = 0;
let currOperator = "";
let lastInputOp = false;
let buttonIsLiteUp = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        if(buttonIsLiteUp) {    // For resetting the operator button light up after new input has been made
            document.querySelectorAll('.operator').forEach((button) => {    // Reset all operator buttons to default color
                button.style.backgroundColor = "rgb(224, 58, 62)";
            });
            buttonIsLiteUp = false;
        }
        
        if (event.target.classList.contains("operator")) {  // Case for if an operator button is clicked
            operate(event.target.getAttribute("data-operation"));   // Getting which operation was clicked and passing it to operate function
            event.target.style.backgroundColor = "rgb(250, 68, 71)";    // Light up the operator button
            buttonIsLiteUp = true;
        }

        if (event.target.classList.contains("number")) {    // Case for if a number button is clicked
            appendToDisplay(event.target.getAttribute("value"));
        }

        if(event.target.classList.contains("equals")) {    // Case for if the equals button is clicked
            equals();
        }

        if(event.target.classList.contains("clear")) {  // Case for if the clear button is clicked
            clearDisplay();
        }
    });
});


function appendToDisplay(input) {
    if(lastInputOp && prevValue !== 0) {    // Reset display if last input was an operator so that new number can be input
        clearDisplay();
    }
    lastInputOp = false;
    display.value += input; // Append the input to the display
}

function clearDisplay() {
    display.value = "";
}

function operate(input) {
    if(display.value === "") {  // If no number has been input, return
        return;
    }

    // Case for if operator is clicked instead of equals
    // Example: 5 + 5, divided button is clicked, 10 would appear in display and user can input what 
    // number they want to divide 10 to be divided by
    if(display.input !== "" && prevValue !== 0) {   
        equals();
        lastInputOp = false;
    }

    prevValue = Number(display.value);  // Store the current value in the display
    currOperator = input;   // Store the current operator
    lastInputOp = true;
}


function equals() {
    if(prevValue != "") {   // Makes sure that there is a previous value to operate on
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
        currOperator = "";  // Reset the operator
        prevValue = display.value; // Store the new output of operation 
        lastInputOp = false;
    }
}