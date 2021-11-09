const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const grid = document.querySelector(".grid");
const colorBtn = document.querySelector(".colorBtn");
const rainbowBtn = document.querySelector(".rainbowBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const clearBtn = document.querySelector(".clearBtn");
const sizeValue = document.querySelector(".sizeValue");
const sizeSlider = document.querySelector(".sizeSlider");
const colorPicker = document.querySelector(".colorPicker");

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function updateSizeValue(newSize) {
    sizeValue.innerHTML = `${newSize} x ${newSize}`;
}

function changeSize(newSize) {
    setCurrentSize(newSize);
    updateSizeValue(newSize);
    reloadGrid(newSize);
}

function reloadGrid(){
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

function setupGrid(gridSize) {
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridElement = document.createElement('div');
        gridElement.addEventListener('mouseover', changeColor);
        grid.appendChild(gridElement);
    }
}

function clearGrid() {
    grid.innerHTML = '';
}

function changeColor(e) {
    if (currentMode == 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode == 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode == 'eraser') {
        e.target.style.backgroundColor = 'white';
    }
}

function activateButton(newMode) {
    if (currentMode == 'rainbow') {
        rainbowBtn.classList.remove('active')
    } else if (currentMode == 'color') {
        colorBtn.classList.remove('active')
    } else if (currentMode == 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode == 'rainbow') {
        rainbowBtn.classList.add('active')
    } else if (newMode == 'color') {
        colorBtn.classList.add('active')
    } else if (newMode == 'eraser') {
        eraserBtn.classList.add('active')
    }
}