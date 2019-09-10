const width = 25;
const height = 20;
const cells = [];

const gameOfLife = new GameOfLife(width, height);

const table = document.createElement("tbody");
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    td.dataset.row = h;
    td.dataset.col = w;
    cells.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

const paint = () => {
  cells.forEach(td => {
    const cellValue = gameOfLife.getCell(td.dataset.row, td.dataset.col);
    (cellValue === 1) ?
      td.classList.add("alive") :
      td.classList.remove("alive");
  });
}

document.getElementById("board").addEventListener("click", (event) => {
  gameOfLife.toggleCell(event.target.dataset.row, event.target.dataset.col);
  paint();
});

document.getElementById("step_btn").addEventListener("click", () => {
  gameOfLife.tick();
  paint();
});

let interval = null;
document.getElementById("play_btn").addEventListener("click", () => {
  if (!interval) {
    interval = setInterval(() => {
      gameOfLife.tick();
      paint();
    }, 100);
  } else {
    clearInterval(interval);
    interval = null;
  }
});

document.getElementById("reset_btn").addEventListener("click", () => {
  gameOfLife.forEachCell((row, col) => {
    gameOfLife.setCell(Math.round(Math.random()), row, col);
  })
  paint();
});

document.getElementById("clear_btn").addEventListener("click", () => {
  gameOfLife.forEachCell((row, col) => {
    gameOfLife.setCell(0, row, col);
  })
  paint();
});
