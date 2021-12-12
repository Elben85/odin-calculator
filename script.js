const numberButtons = document.getElementsByClassName("number");
const operatorButtons = document.getElementsByClassName("operator");
const decimalButton = document.getElementById("decimal");
const equalButton = document.getElementById("equal");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const displayPanelTop = document.getElementById("display1");
const displayPanelBottom = document.getElementById("display2");

Array.from(numberButtons).forEach(element => {
    element.addEventListener("click", () => handleNumberButtonClick(element));
});

Array.from(operatorButtons).forEach(element => {
    element.addEventListener("click", () => handleOperatorButtonClick(element));
});

decimalButton.addEventListener("click", handleDecimalButtonClick);
equalButton.addEventListener("click", handleEqualButtonClick);
clearButton.addEventListener("click", resetCalculator);
backspaceButton.addEventListener("click", handleBackspaceButtonClick);

let firstOperand = "";
let operator = "";
let secondOperand = "";
let isDecimalClicked = false;

function resetCalculator() {
    firstOperand = "";
    operator = "";
    secondOperand = "";
    isDecimalClicked = false;
    display();
}

function handleBackspaceButtonClick() {
    if (secondOperand !== "") {
        secondOperand = secondOperand.slice(0, -1);
    } else if (operator !== "") {
        operator = "";
    } else if (firstOperand !== "") {
        firstOperand = firstOperand.slice(0, -1);
    }
    display();
}

function display() {
    if (operator === "") {
        displayPanelTop.textContent = "";
        displayPanelBottom.textContent = `${firstOperand}`;
    } else {
        displayPanelTop.textContent = `${firstOperand} ${operator}`;
        displayPanelBottom.textContent = `${secondOperand}`;
    }
}

function handleDecimalButtonClick() {
    if (isDecimalClicked) {
        return;
    }

    if (operator === "") {
        if (firstOperand === "" || firstOperand === "-") {
            firstOperand += "0";
        }
        firstOperand += ".";
    } else {
        if (secondOperand === "") {
            secondOperand += "0";
        }
        secondOperand += ".";
    }

    display();
    isDecimalClicked = true;
    console.log(firstOperand);
    console.log(secondOperand);
}

function handleNumberButtonClick(element) {
    if (operator === "") {
        if (firstOperand === "0") {
            firstOperand = element.textContent.replace(/\s/g, "");
        } else if (firstOperand === "-0") {
            firstOperand = "-" + element.textContent.replace(/\s/g, "");
        } else {
            firstOperand += element.textContent.replace(/\s/g, "");
        }
    } else {
        if (secondOperand === "0") {
            secondOperand = element.textContent.replace(/\s/g, "");
        } else {
            secondOperand += element.textContent.replace(/\s/g, "");
        }
    }
    display();
    console.log(firstOperand);
    console.log(secondOperand);
}

function handleOperatorButtonClick(element) {
    if (firstOperand === "") {
        if (element.textContent.replace(/\s/g, "") !== "-") {
            return;
        }

        firstOperand = "-";
        display();
        return;
    }

    if (secondOperand === "") {
        isDecimalClicked = false;
        operator = element.textContent.replace(/\s/g, "");
    } else {
        if (calculate()) {
            return;
        }
        operator = element.textContent.replace(/\s/g, "");
    }

    display();

    console.log(operator);
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y !== 0) {
        return Math.round(x / y * 100000) / 100000;
    }

    alert("Can't Divide By 0");
}

function calculate() {
    if (operator === "+") {
        firstOperand = `${add(+firstOperand, +secondOperand)}`;
    } else if (operator === "-") {
        firstOperand = `${subtract(+firstOperand, +secondOperand)}`;
    } else if (operator === "x") {
        firstOperand = `${multiply(+firstOperand, +secondOperand)}`;
    } else {
        const result = divide(+firstOperand, +secondOperand);
        if (result === undefined) {
            return true;
        }
        firstOperand = `${result}`;
    }
    secondOperand = "";
    operator = "";
    isDecimalClicked = false;
    display();
}

function handleEqualButtonClick() {
    if (secondOperand === "") {
        return;
    }
    calculate();
}
