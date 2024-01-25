const container = document.querySelector(".container");
const generateBtn = document.querySelector("#generate");
const eraserBtn = document.querySelector("#eraser-btn");
const markerBtn = document.querySelector("#marker-btn");
const markerColor = document.querySelector("#marker-color");
const gridSize = document.querySelector("#grid-size");
const check = document.querySelector("#check");
let marker = true;


generateBtn.addEventListener('click', generateGrid);

check.addEventListener('click', () => {
    check.getAttribute('src') === "./images/checkbox-off.png" ? 
        check.setAttribute('src', './images/checkbox.png')    :
        check.setAttribute('src', './images/checkbox-off.png') ;

    toggleShowGrid();
})

eraserBtn.addEventListener('click', () => {
    if (marker) {
        eraserBtn.style.borderColor = "#f77f00";
        markerBtn.style.borderColor = "#cb997e";
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
        markerBtn.style.borderColor = "#f77f00";
        eraserBtn.style.borderColor = "#cb997e";
        const squares = document.querySelectorAll(".grid-square");
        marker = true;
        squares.forEach(square => {
            square.removeEventListener('mouseover', erase)
            square.addEventListener('mouseover', color);
        })
    };
});

function toggleShowGrid() {
    const grid = document.querySelectorAll(".grid-square");
    if (check.getAttribute('src') === "./images/checkbox-off.png") {
        grid.forEach(square => {
            square.style.outline = 'none';
        });
    }
    else {
        grid.forEach(square => {
            square.style.outline = '1px dashed #f0efeb';
        });
    }
}

// Called when generating grid. Removes all squares so new ones can be placed
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
        gridSize.style.border = "1px solid #cb991e";
        gridSize.style.borderBottom = "none";
    }

};

function color() {
    this.style.backgroundColor = markerColor.value;
}

function erase() {
    this.style.backgroundColor = '#FFFFFF';
}

// Generate a new grid based on dimensions in input box
function generateGrid() {
    const dimensions = gridSize.value;
    if (dimensions > 0 && dimensions < 101 && dimensions % 1 === 0) {
        removeAllChildNodes(container);
        for (let x = 0; x < dimensions; x++) {
            for (let y = 0; y < dimensions; y++) {
                // Create a square "pixel" for the grid
                const el = document.createElement('div');
                el.classList.add('grid-square');
                // Canvas size is 960 x 960 so 960 / dimensions is the length of a side
                el.style.width = `${960 / dimensions}px`;
                el.style.height = `${960 / dimensions}px`;

                el.addEventListener('mouseover', color);

                container.appendChild(el);
            }
        }
    }
}

generateGrid();

