const container = document.querySelector(".container");
const generateBtn = document.querySelector("#generate");
const gridSize = document.querySelector("#grid-size");

function removeAllChildNodes(parent) {
    // Use loop instead of innerHTML = '' to ensure event handlers are removed
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

gridSize.oninput = () => {
    if (gridSize.value < 1 || gridSize.value > 100) {
        gridSize.style.border = "1px solid red";
    }
    else {
        gridSize.style.border = "1px solid";
        gridSize.style.borderBottom = "none";
    }

};

function getGridSize() {
    const size = gridSize.value;
}

function generateGrid() {
    const dimensions = gridSize.value;
    if (dimensions > 0 && dimensions < 101) {
        removeAllChildNodes(container);
        console.log(dimensions)
        for (let i = 0; i < dimensions; i++) {
            for (let i = 0; i < dimensions; i++) {
                const square = document.createElement('div');
                square.classList.add('grid-square');
                square.style.width = `${960 / dimensions}px`;
                square.style.height = `${960 / dimensions}px`;

                square.addEventListener('mouseover', () => {
                    square.style.backgroundColor = 'black';
                });

                container.appendChild(square);
            }
        }
    }
}

generateGrid();

generateBtn.addEventListener('click', generateGrid);

