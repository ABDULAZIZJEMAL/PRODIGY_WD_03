const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const X_CLASS = 'x';
const O_CLASS = 'o';
let oTurn;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  oTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.textContent = ''; // Clear the cell content
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase(); // Display X or O
}

function swapTurns() {
  oTurn = !oTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    alert('Draw!');
  } else {
    alert(`${oTurn ? "O's" : "X's"} Wins!`);
  }
  startGame();
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}
