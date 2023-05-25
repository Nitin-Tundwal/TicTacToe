const playerInfo = document.querySelector(".current-player");
const boxes = document.querySelectorAll(".grid");
const newGameBtn = document.querySelector(".new-game");

let currentPlayer;
let grid;

const winingPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initialise() {
  currentPlayer = "X";
  grid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    box.classList = `grid grid${index + 1}`;
  });
  playerInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

initialise();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  playerInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkWin() {
  let answer = "";
  winingPosition.forEach((position) => {
    if (
      (grid[position[0]] !== "" ||
        grid[position[1]] !== "" ||
        grid[position[2]] !== "") &&
      grid[position[0]] === grid[position[1]] &&
      grid[position[1]] === grid[position[2]]
    ) {
      if (grid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (answer !== "") {
    playerInfo.innerHTML = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  let fillCount = 0;
  grid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  if (fillCount === 9) {
    playerInfo.innerHTML = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function handleGame(index) {
  if (grid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    grid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // Swaping turns
    swapTurn();
    // check if someone wins
    checkWin();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleGame(index);
  });
});

newGameBtn.addEventListener("click", initialise);
