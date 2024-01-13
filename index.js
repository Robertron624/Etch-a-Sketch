function mainFunction() {
  // DOM elements
  const colorPicker = document.querySelector("#color-picker");

  const normalModeButton = document.querySelector("button#normalMode");
  const rainbowButton = document.querySelector("button#rainbow");
  const eraserButton = document.querySelector("button#eraser");
  const clearButton = document.querySelector("button#clear");

  const sizeInput = document.querySelector("input#size-control");
  const sizeDisplay = document.querySelector(".size-control label #size-value");

  const grid = document.querySelector("#grid");

  // app variables
  let color = "#000000";
  let size = 16;
  let mode = "normalMode";
  let isDrawing = false;

  // initial run
  drawGrid();

  // event listeners
  colorPicker.addEventListener("change", function (e) {
    color = e.target.value;
  });

  normalModeButton.addEventListener("click", changeMode);

  rainbowButton.addEventListener("click", changeMode);

  eraserButton.addEventListener("click", changeMode);

  function changeMode(e) {
    mode = e.target.id;

    // change button style
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    e.target.classList.add("active");
  }

  clearButton.addEventListener("click", clearGrid);

  sizeInput.addEventListener("change", function (e) {
    size = e.target.value;
    sizeDisplay.textContent = `${size} x ${size}`;
    clearGrid();
    drawGrid();
  });

  grid.addEventListener("mousedown", startDrawing);
  grid.addEventListener("mousemove", draw);
  grid.addEventListener("mouseup", stopDrawing);
  grid.addEventListener("mouseleave", stopDrawing);

  function startDrawing(e) {
    if (e.button === 0) { // left click
      isDrawing = true;
      draw(e); // Draw initial cell when starting to click and drag
    }
  }

  function draw(e) {
    if (isDrawing) {
      paintCell(e);
    }
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function clearGrid() {
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    drawGrid();
  }

  function drawGrid() {
    // create "size" * "size" divs
    for (let i = 0; i < size * size; i++) {
      let gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");

      grid.appendChild(gridItem);
    }
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  }

  function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
  }

  function paintCell(e) {
    let cell = e.target;
    if (mode === "normalMode") {
      cell.style.backgroundColor = color;
    } else if (mode === "rainbow") {
      cell.style.backgroundColor = getRandomColor();
    } else if (mode === "eraser") {
      cell.style.backgroundColor = "#ffffff";
    }
  }
}

window.onload = mainFunction;
