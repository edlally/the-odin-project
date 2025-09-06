
const container = document.querySelector('#container');
const calcBody = document.querySelector('#body');
const display = document.querySelector('#screen');
const btns = document.querySelector('#btns');
const btnList = document.getElementsByName("btn")
const dark = document.querySelector('#dark');
const footer = document.querySelector('footer');
const stored = document.querySelector('#storedValue');
const plus = document.querySelector('#plus');
const minus = document.querySelector('#minus');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const slider = document.querySelector('#slider');
const root = document.documentElement;

slider.addEventListener("input", () => {
    root.style.setProperty('--btn-size', `${slider.value}px`);
    console.log(slider.value)
})

// initialise state variable
let state = {
    currentValue: "",
    storedValue: "",
    pendingOperator: "",
    waitingForNextValue: false,
    memoryValue: 0,
};

function revertToGrey () {
    plus.style.color = "var(--font-grey)";
    minus.style.color = "var(--font-grey)";
    multiply.style.color = "var(--font-grey)";
    divide.style.color = "var(--font-grey)";
    plus.style.textShadow = "none";
    minus.style.textShadow = "none";
    multiply.style.textShadow = "none";
    divide.style.textShadow = "none";
}

function resizeText() {
    if (display.innerHTML.length > 15) {
        if (Number(display.style.fontSize[0]) >= 1) {
            display.style.fontSize = `${2 - display.innerHTML.length / 30}rem`;
        }
    } else {
        display.style.fontSize = "2rem";

    }
}

function highlightPendingOperator (op) {
    switch (op) {
        case "+":
            plus.style.color = "rgba(255, 153, 0, 1)";
            plus.style.textShadow = "0 0 10px rgba(255, 136, 0, .5)"
            break;
        case "-":
            minus.style.color = "rgba(255, 153, 0, 1)";
            minus.style.textShadow = "0 0 10px rgba(255, 136, 0, .5)"
            break;
        case "x":
            multiply.style.color = "rgba(255, 153, 0, 1)";
            multiply.style.textShadow = "0 0 10px rgba(255, 136, 0, .5)"
            break;
        case "/":
            divide.style.color = "rgba(255, 153, 0, 1)";
            divide.style.textShadow = "0 0 10px rgba(255, 136, 0, .5)"
            break;
    };
}

// logic to add numbers to screen and update state variable
function inputNumber(num) {
    if (state.waitingForNextValue) {
        display.innerHTML = "";
    }
    state.currentValue += num;
    display.innerHTML = state.currentValue;
    console.table(state);
    state.waitingForNextValue = false;


    revertToGrey();

    resizeText();
}

// reset state
function allClear () {
    state.currentValue = "";
    state.storedValue = "";
    state.pendingOperator = "";
    state.waitingForNextValue = false;
    display.innerHTML = "";
    revertToGrey();
}

function operate (op) {
    if (state.storedValue === "") {
        // if there is no stored value then add curr to store, clear screen
        state.storedValue = state.currentValue;
        state.currentValue = "";
        state.pendingOperator = `${op}`;
        state.waitingForNextValue = true;

    } else {
        // there is a stored value
        switch (state.pendingOperator) {
            case "+":
                state.storedValue = Number(state.storedValue) + Number(state.currentValue);
                state.currentValue = "";
                display.innerHTML = state.storedValue;
                state.pendingOperator = `+`;
                state.waitingForNextValue = true;
                break;
            case "-":
                state.storedValue = Number(state.storedValue) - Number(state.currentValue);
                state.currentValue = "";
                display.innerHTML = state.storedValue;
                state.pendingOperator = `-`;
                state.waitingForNextValue = true;
                break;
            case "x":
                if (state.currentValue.length > 0) {
                    state.storedValue = Number(state.storedValue) * Number(state.currentValue);
                    state.currentValue = "";
                    display.innerHTML = state.storedValue;
                    state.pendingOperator = `x`;
                    state.waitingForNextValue = true;
                }
                break;
            case "/":
                if (state.currentValue.length > 0 && state.currentValue != 0) {
                    state.storedValue = Number(state.storedValue) / Number(state.currentValue);
                    state.currentValue = "";
                    display.innerHTML = state.storedValue;
                    state.pendingOperator = `/`;
                    state.waitingForNextValue = true;
                } else {
                    allClear();
                    display.innerHTML = "ERROR!";
                }
                break;
        }
    }
    console.table(state);
    if (op !== "=") {
        state.pendingOperator = `${op}`;
    }

    if (state.waitingForNextValue) {
        highlightPendingOperator(op);
    }

    revertToGrey()

    resizeText();
}

function transform (op) {
    switch (op) {

        case "sqrt":
            if (state.currentValue.length > 0) {
                if (Number(state.currentValue) <= 0) {
                    allClear();
                    display.innerHTML = "ERROR!";
                } else {
                    state.currentValue = String(Math.sqrt(Number(state.currentValue)));
                    display.innerHTML = String(state.currentValue);
                }
            } else {
                if (Number(state.storedValue) <= 0) {
                    allClear();
                    display.innerHTML = "ERROR!";
                } else {
                    state.storedValue = String(Math.sqrt(Number(state.storedValue)));
                    display.innerHTML = String(state.storedValue);
                }
            }
            resizeText();
            break;

        case "plusMinus":
            if (state.currentValue.length != 0 && state.currentValue != -0) {
                state.currentValue = String(Number(state.currentValue) * -1);
                display.innerHTML = String(state.currentValue);
            } else {
                state.storedValue = String(Number(state.storedValue) * -1);
                display.innerHTML = String(state.storedValue);
            }
            resizeText();
            break;

        case "percent":
            if (state.currentValue.length != 0 && state.currentValue != -0) {
                state.currentValue = String(Number(state.currentValue) / 100);
                display.innerHTML = String(state.currentValue);
            } else {
                state.storedValue = String(Number(state.storedValue) / 100);
                display.innerHTML = String(state.storedValue);
            }
            resizeText();
            break;

        case "clear":
            if (state.currentValue.length != 0 && state.currentValue != -0) {
                state.currentValue = "";
                display.innerHTML = "";
            } else {
                state.storedValue = "";
                display.innerHTML = "";
            }
            console.table(state)
            break;

        case "mPlus":
            if (state.currentValue.length != 0 && state.currentValue != -0) {
                state.memoryValue = Number(state.currentValue) + Number(state.memoryValue);
            } else {
                state.memoryValue = Number(state.storedValue) + Number(state.memoryValue);
            }
            console.table(state)
            break;

        case "mMinus":
            if (state.currentValue.length != 0 && state.currentValue != -0) {
                state.memoryValue = Number(state.memoryValue) - Number(state.currentValue);
            } else {
                state.memoryValue = Number(state.memoryValue) - Number(state.storedValue);
            }
            console.table(state)
            break;

        case "MR":
            state.currentValue = state.memoryValue;
            display.innerHTML = state.memoryValue;
            break;
    }
}


btns.addEventListener("click", (e) => {
    const isButton = e.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    
    switch (e.target.id) {
        case "one":
            inputNumber(1);
            break;
        case "two":
            inputNumber(2);
            break;
        case "three":
            inputNumber(3);
            break;
        case "four":
            inputNumber(4);
            break;
        case "five":
            inputNumber(5);
            break;
        case "six":
            inputNumber(6);
            break;
        case "seven":
            inputNumber(7);
            break;
        case "eight":
            inputNumber(8);
            break;
        case "nine":
            inputNumber(9);
            break;
        case "zero":
            inputNumber(0);
            break;
        case "point":
            let val = state.currentValue;

            // Ensure it's a string
            let str = Array.isArray(val) ? val.join("") : String(val);

            if (!str.includes(".")) {
                inputNumber(".");
            }
            break;
        case "plus":
            operate("+");
            break;
        case "minus":
            operate("-");
            break;
        case "multiply":
            operate("x");
            break;
        case "divide":
            operate("/");
            break;
        case "equals":
            operate("=");
            break;
        case "AC":
            allClear();
            break
        case "C":
            transform("clear");
            break;
        case "sqrt":
            transform("sqrt");
            break;
        case "plusMinus":
            transform("plusMinus");
            break;
        case "percent":
            transform("percent");
            break;
        case "mPlus":
            transform("mPlus");
            break;
        case "mMinus":
            transform("mMinus");
            break
        case "MR": 
            transform("MR");
            break;
        };
    });



dark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

