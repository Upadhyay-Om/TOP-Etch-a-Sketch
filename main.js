let currentMode = "black";
let currentSize = 16;
window.onload = () => {
    createDivs(currentSize);
};

function setMode(mode){
    currentMode = mode;
    document.getElementById("modeIndicator").textContent = `Mode: ${mode}`
}


function createDivs(size) {
    let grid = document.querySelector(".grid");
    grid.innerHTML = ""; 
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;


    for (let i = 0; i < size * size; i++) {
        let square = document.createElement("div");
        square.classList.add('grid-cell');
        grid.appendChild(square);
        square.addEventListener("mouseover",colorSquare);
    }
    
}

function resizeGrid() {
    let input = document.getElementById("gridSize").value;
    input = parseInt(input); 

    if (input >= 2 && input <= 100) {
        createDivs(input);
    } else {
        alert("Enter a valid number between 2 and 100");
    }
}
function colorSquare() {
    if (currentMode === "black") {
        this.style.backgroundColor = "black";
    }else if (currentMode === "color") {
        // this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        const color1 = `hsl(${Math.random() * 360}, 100%, 50%)`; //ai
        const color2 = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.style.backgroundImage = `linear-gradient(135deg, ${color1}, ${color2})`;
    }else if (currentMode === "shadow"){
        let currentOpacity = parseFloat(this.getAttribute("data-opacity")) || 0;
        if (currentOpacity < 1) {
            currentOpacity += 0.1; 
        }
        this.setAttribute("data-opacity", currentOpacity);
        this.style.backgroundColor = `rgba(0,0,0,${currentOpacity})`;  
    }else if (currentMode === "eraser"){
        this.style.backgroundColor = "white";
        this.setAttribute("data-opacity", 0)
    }
}
function clearGrid(){
    let squares = document.querySelectorAll(".grid-cell")
    squares.forEach(square => {
        square.style.backgroundColor = "white";   
        square.setAttribute("data-opacity", 0);   
    });
}
