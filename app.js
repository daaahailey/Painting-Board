const canvas = document.getElementById("jsCanvas");
const ctx= canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
// when do you start putting stuff in the variable like this?
// When you have to repeat it, then you should have variable here and reuse it.
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// setting the default background color of canvas as white. 
ctx.strokeStyle = INITIAL_COLOR; //start with this colour
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //size of brush 



let painting = false;
// false in default but when the mouse is.
// I want to make it true.

let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}


// this detects all the movement

function onMouseMove(event) { 
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) { //If I am not painting
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    //strokeStyle will be updated when we click the colour btn on palette.
    // when you click the colour, it sets for the colour for fill and paint
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}


function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
} // We need to have a variable that tells me if it's filling.
// if it's filling, I don't want to be detecting these drawings
// if it's filling, I just want to fill the whole canvas with colour
// so that's why we would like to know if it's filling or not.

function handleCanvasClick() {
    if(filling) { // if it's filling, do this
        ctx.fillRect(0, 0, canvas.width, canvas.height);  // we start from 0(x) to 0(y) and it should be as big as the canvas.
    } // else nothing
}



function handleContextMenu(event) {
    event.preventDefault(); // it prevent from event to be happening
    // so when you try to right click, it doesn't work.
}



// first, we need to get data of the canvas as an image

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a"); // create link
    link.href = image;
    link.download = "Your_Painting[🎨]";
    link.click()
}


if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}


Array.from(color).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if(range) {
  // in case of range isn't defined. (it's good to check)
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}