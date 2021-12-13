const FIRST_OPERAND_INPUT_STATE = 1;
const OPERATOR_INPUT_STATE = 2;
const SECOND_OPERAND_INPUT_STATE = 3;
let state = FIRST_OPERAND_INPUT_STATE;

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

function adjustState() {
    if (secondOperand !== "") {
        state = SECOND_OPERAND_INPUT_STATE;
    } else if (operator !== "") {
        state = OPERATOR_INPUT_STATE;
    } else {
        state = FIRST_OPERAND_INPUT_STATE
    }
}

function isDecimalClickedReassignment() {
    if (state === FIRST_OPERAND_INPUT_STATE) {
        isDecimalClicked = firstOperand.includes(".");
    } else {
        isDecimalClicked = secondOperand.includes(".");
    }
}

function resetCalculator() {
    firstOperand = "";
    operator = "";
    secondOperand = "";
    isDecimalClicked = false;
    adjustState();
    display();
}

function handleBackspaceButtonClick() {
    if (state === SECOND_OPERAND_INPUT_STATE) {
        secondOperand = secondOperand.slice(0, -1);
    } else if (state === OPERATOR_INPUT_STATE) {
        operator = "";
    } else {
        firstOperand = firstOperand.slice(0, -1);
    }

    adjustState();
    isDecimalClickedReassignment();
    display();
}

function display() {
    if (state === FIRST_OPERAND_INPUT_STATE) {
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

    if (state === FIRST_OPERAND_INPUT_STATE) {
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

    adjustState();
    display();
    isDecimalClicked = true;
}

function handleNumberButtonClick(element) {
    if (state === FIRST_OPERAND_INPUT_STATE) {
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

    adjustState();
    display();
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

    if (state !== SECOND_OPERAND_INPUT_STATE) {
        operator = element.textContent.replace(/\s/g, "");
    } else {
        calculate();
        if (state !== FIRST_OPERAND_INPUT_STATE) {
            return;
        }
        operator = element.textContent.replace(/\s/g, "");
    }

    isDecimalClicked = false;
    adjustState();
    display();
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
    if (y === 0) {
        throw new Error("Can't Divide by 0");
    }
    return Math.round(x / y * 100000) / 100000;
}

function calculate() {
    if (operator === "+") {
        firstOperand = `${add(+firstOperand, +secondOperand)}`;
    } else if (operator === "-") {
        firstOperand = `${subtract(+firstOperand, +secondOperand)}`;
    } else if (operator === "x") {
        firstOperand = `${multiply(+firstOperand, +secondOperand)}`;
    } else {
        try {
            firstOperand = `${divide(+firstOperand, +secondOperand)}`;
        }
        catch (err) {
            alert(err.message);
            return;
        }
    }

    secondOperand = "";
    operator = "";
    adjustState();
    isDecimalClickedReassignment();
    display();
}

function handleEqualButtonClick() {
    if (state !== SECOND_OPERAND_INPUT_STATE) {
        return;
    }
    calculate();
}
