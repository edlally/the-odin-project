const display = document.querySelector("#screen");
const grid = document.querySelector("#grid");
const knob1 = document.querySelector("#knob1");
const knob2 = document.querySelector("#knob2");
const slider = document.querySelector("#gridSlider")


// rotate the knobs based on cursor pos
display.addEventListener("mousemove", (e) => {
    knob1.style.transform = `rotate(${e.clientX}deg)`;
    knob2.style.transform = `rotate(${e.clientY}deg)`;
});

// add grid based on slider value
slider.addEventListener("click", addGrid())

function addGrid () {
    display.innerHTML = '';
    for (let i=0; i < slider.value ** 2; i++) {
        const box = document.createElement("div");
        box.style.width = `calc(100% / ${slider.value}`;
        box.style.height = `calc(100% / ${slider.value}`;
        box.className = `box`;
        display.append(box);
    };
};

// add grid based on slider value
slider.addEventListener("click", addGrid)
    

// on mousedown change target element to color
