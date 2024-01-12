function mainFunction(){

    

    // DOM elements
    const colorPicker = document.querySelector("#color-picker");

    const normalColorButton = document.querySelector("button#normal-color");
    const rainbowButton = document.querySelector("button#rainbow");
    const eraserButton = document.querySelector("button#eraser");
    const clearButton = document.querySelector("button#clear");

    const sizeInput = document.querySelector("input#size-control");
    const sizeDisplay = document.querySelector(".size-control label #size-value");

    const grid = document.querySelector("#grid");

    // app variables
    let color = "#000000";
    let size = 16;
    let mode = "normalColor";

    drawGrid();

    // event listeners
    colorPicker.addEventListener("change", function(e){
        color = e.target.value;
    });

    normalColorButton.addEventListener("click", function(e){
        mode = "normalColor";
    });

    rainbowButton.addEventListener("click", function(e){
        mode = "rainbow";
    });

    eraserButton.addEventListener("click", function(e){
        mode = "eraser";
    });

    clearButton.addEventListener("click", function(e){
        clearCanvas();
    });

    sizeInput.addEventListener("change", function(e){
        size = e.target.value;
        sizeDisplay.textContent = size;
        clearCanvas();
        drawGrid();
    });

    // functions
    function clearCanvas(){
        while(grid.firstChild){
            grid.removeChild(grid.firstChild);
        }
    }

    function drawGrid(){
        // create "size" * "size" divs
        for(let i = 0; i < size*size; i++){
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            
            // add event listener
            gridItem.addEventListener("click", paintEvent);

            grid.appendChild(gridItem);
        }
        // set grid-template-columns and grid-template-rows
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    }


    function getRandomColor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);

        return `rgb(${r}, ${g}, ${b})`;
    }


    function paintCell(e){
        let cell = e.target;
        if(mode === "normalColor"){
            cell.style.backgroundColor = color;
        } else if(mode === "rainbow"){
            cell.style.backgroundColor = getRandomColor();
        } else if(mode === "eraser"){
            cell.style.backgroundColor = "#ffffff";
        }
    }

    function paintEvent(e){
        if(e.button === 0){// check if it's left click
            paintCell(e);
        }
    }
}

window.onload = mainFunction;