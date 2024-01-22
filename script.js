const container = document.querySelector(".container");
const generateBtn = document.querySelector("#generate");
const eraserBtn = document.querySelector("#eraser");
const markerBtn = document.querySelector("#marker");
const gridSize = document.querySelector("#grid-size");
//const squares = document.querySelectorAll(".grid-square");
let marker = true;


generateBtn.addEventListener('click', generateGrid);

eraserBtn.addEventListener('click', () => {
    if (marker) {
        const squares = document.querySelectorAll(".grid-square");
        marker = false;
        squares.forEach(square => {
            square.removeEventListener('mouseover', color)
            square.addEventListener('mouseover', erase);
        })
    };
});

markerBtn.addEventListener('click', () => {
    if (!marker) {
        const squares = document.querySelectorAll(".grid-square");
        marker = true;
        console.log('marking')
        squares.forEach(square => {
            square.removeEventListener('mouseover', erase)
            square.addEventListener('mouseover', color);
        })
    };
});

function removeAllChildNodes(parent) {
    // Use loop instead of innerHTML = '' to ensure event handlers are removed
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Input border turns red if value is invalid, otherwise goes back to normal
gridSize.oninput = () => {
    if (gridSize.value < 1 || gridSize.value > 100) {
        gridSize.style.border = "1px solid red";
    }
    else {
        gridSize.style.border = "1px solid";
        gridSize.style.borderBottom = "none";
    }

};

function color() {
    this.style.backgroundColor = 'black';
}

function erase() {
    this.style.backgroundColor = 'white';
}

// Generate a new grid based on dimensions in input box
function generateGrid() {
    const dimensions = gridSize.value;
    if (dimensions > 0 && dimensions < 101) {
        removeAllChildNodes(container);
        for (let i = 0; i < dimensions; i++) {
            for (let i = 0; i < dimensions; i++) {
                const square = document.createElement('div');
                square.classList.add('grid-square');
                square.style.width = `${960 / dimensions}px`;
                square.style.height = `${960 / dimensions}px`;

                square.addEventListener('mouseover', color);

                container.appendChild(square);
            }
        }
    }
}

generateGrid();

