const body = document.querySelector("#body")
const display = document.querySelector("#screen");
const knob1 = document.querySelector("#knob1");
const knob2 = document.querySelector("#knob2");
const slider = document.querySelector("#gridSlider");
const sliderVal = document.querySelector("#sliderRange");
const clearBtn = document.querySelector("#clear");
const colorBtn = document.querySelector("#color");
const colorPicker = document.querySelector("#colorPicker");
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
            box.style.backgroundColor = `${colorPicker.value}`;
            box.style.boxShadow = `10px 10px 5px #e7e7e7ff`;
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


// color picker 
colorPicker.click();
colorBtn.addEventListener("click", () => colorPicker.click());




    


