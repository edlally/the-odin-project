const body = document.querySelector("#body")
const display = document.querySelector("#screen");
const knob1 = document.querySelector("#knob1");
const knob2 = document.querySelector("#knob2");
const slider = document.querySelector("#gridSlider");
const sliderVal = document.querySelector("#sliderRange");
const clearBtn = document.querySelector("#clear");
const colorBtn = document.querySelector("#color");
const colorPicker = document.querySelector("#colorPicker");
const fillBtn = document.querySelector("#fill");
const eraser = document.querySelector("#eraser");


// disable drag behaviour
document.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

// rotate the knobs based on cursor pos
display.addEventListener("mousemove", (e) => {
    knob1.style.transform = `rotate(${e.clientX}deg)`;
    knob2.style.transform = `rotate(${e.clientY}deg)`;
});

// add grid based on slider value

function addGrid () {
    display.innerHTML = '';
    for (let i=0; i < slider.value ** 2; i++) {
        const box = document.createElement("div");
        box.style.width = `calc(100% / ${slider.value})`;
        box.style.height = `auto`;
        box.className = `box`;
        box.addEventListener("mouseover", () => {
            if (eraserState && clickState) {
                box.style.backgroundColor = `transparent`;
                box.style.boxShadow = `none`;
            } else if (colorState && clickState) {
                box.style.backgroundColor = `${colorPicker.value}`;   
                box.style.boxShadow = `10px 10px 8px #e7e7e7ff`;             
            } 


        })
        display.append(box);
    };
};

// add initial grid
addGrid();

// update the grid when the slider is set
slider.addEventListener("click", addGrid);

// update the slider value text
slider.oninput = function() {
    sliderVal.style.color = `rgba(0, 0, 0, 0.5)`;
    sliderVal.innerHTML = `${this.value}`;
    setTimeout(() => {
        sliderVal.style.color = `rgba(0, 0, 0, 0)`;
    }, 1000);
};


// clear function
clearBtn.addEventListener("click", addGrid);


// trigger a click event on the hidden color picker box
let colorState = true;

colorBtn.addEventListener("click", () => {
    colorPicker.click();
    colorState = true;
    eraserState = false;
    fillState = false;
});


// add eraser logic

let eraserState = false;
eraser.addEventListener("click", () => eraserState = true)

    


// add fill logic
let fillState = false;
fillBtn.addEventListener("click", () => {
    fillState = true;
    colorState = false;
    eraserState = false;
    let boxes = document.getElementsByClassName("box");
    
    for (let box of boxes) {
        box.addEventListener("click", (e) => {
            console.log(e.target);
            
            for (let box of boxes) {
                if (box.style.backgroundColor === e.target.style.backgroundColor) {
                    box.style.backgroundColor = `${colorPicker.value}`;
                } 
            }
        })
    };

    for (let k = 0; k < boxes.length; k++) {
        boxes[k].removeEventListener("click");
    };



    fillState = false;
    colorState = true;




    
});


// add clickstate logic

let clickState = false;

display.addEventListener("mouseleave", () => {
    clickState = false;
    console.log(clickState);
})

document.addEventListener("mousedown", (e) => {
    if (e.target.className === "box" && fillState === false && eraserState === false) {
        e.target.style.backgroundColor = `${colorPicker.value}`;        
        e.target.style.boxShadow = `10px 10px 8px #e7e7e7ff`;             
    }
     
    clickState = true;
    console.log(clickState);
});
document.addEventListener("mouseup", () => {
    clickState = false;
    console.log(clickState);
});
