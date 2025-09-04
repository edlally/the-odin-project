
const container = document.querySelector('#container');
const calcBody = document.querySelector('#body');
const display = document.querySelector('#screen');
const btns = document.querySelector('#btns');
const btnList = document.getElementsByName("btn")
const dark = document.querySelector('#dark');
const footer = document.querySelector('footer');
const stored = document.querySelector('#storedValue');


// get display and display the numbers pressed on the display
// store in currentValue variable too
let currentValue = []
let storedValue;
let operatorState;

function addToScreen(num) {
    if (operatorState) {
        display.innerHTML = "";
        stored.innerHTML = storedValue;
    }
    display.innerHTML += num;
    currentValue.push(num);  
    operatorState = false;  
}

function allClear () {
    currentValue = [];
    storedValue = "";
    operatorState = false;
    display.innerHTML = "";
}

function add () {
    if (!storedValue) {
        storedValue = Number(currentValue.join(""));
        currentValue = [];
        operatorState = "+";
    } else {
        if (!operatorState) {
            console.log(currentValue)
            display.innerHTML = Number(currentValue.join("")) + storedValue;
            storedValue = Number(currentValue.join("")) + storedValue;
            currentValue = [];
        }
        operatorState = "+";
    };
}

function subtract () {
    if (!storedValue) {
        storedValue = Number(currentValue.join(""));
        currentValue = [];
    } else {
        if (!operatorState) {
            console.log(currentValue)
            display.innerHTML = storedValue - Number(currentValue.join(""));
            storedValue = storedValue - Number(currentValue.join(""));
            currentValue = [];
        }
        operatorState = "-";
    };
}

function calculate (operatorState) {
    let value;
    switch (operatorState) {
        case "+":
            value = storedValue + Number(currentValue.join(""));
            break;
        case "-":
            value = storedValue - Number(currentValue.join(""));
            break;
        case "*":
            value = storedValue * Number(currentValue.join(""));
            break;
        case "/":
            value = storedValue / Number(currentValue.join(""));
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
            addToScreen(1);
            break;
        case "two":
            addToScreen(2);
            break;
        case "three":
            addToScreen(3);
            break;
        case "four":
            addToScreen(4);
            break;
        case "five":
            addToScreen(5);
            break;
        case "six":
            addToScreen(6);
            break;
        case "seven":
            addToScreen(7);
            break;
        case "eight":
            addToScreen(8);
            break;
        case "nine":
            addToScreen(9);
            break;
        case "zero":
            addToScreen(0);
            break;
        case "point":
            if (!currentValue.includes(".")) {
                addToScreen(".");
            };
            break;
        case "plus":
            add();
            break;
        case "minus":
            subtract();
            break;
        case "equals":
            console.log("Equals");
            break;
        case "AC":
            allClear();
            break
        }
        console.log("current value: " + currentValue);
        console.log("stored value: " + storedValue);
        console.log("operator state: " + operatorState)
    })

dark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


// if an operator is pressed, add the value in display to a var and clear it
    
// if an operator is pressed again, calculate the value and clear display and save var again
    
