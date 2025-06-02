const board = document.getElementById('game-board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const modeSelect = document.getElementById('mode');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");
let mode = 'human'; // default

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  board.innerHTML = '';
  gameState.fill('');
  currentPlayer = 'X';
  gameActive = true;
  mode = modeSelect.value;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || gameState[index]) return;

  makeMove(index, currentPlayer);

  if (mode === 'ai' && gameActive && currentPlayer === 'O') {
    setTimeout(aiMove, 300); // AI "thinks"
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  document.querySelector(`.cell[data-index="${index}"]`).textContent = player;

  if (checkWinner()) {
    statusText.textContent = `Player ${player} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = player === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function aiMove() {
  const emptyIndices = gameState
    .map((val, i) => val === "" ? i : null)
    .filter(i => i !== null);

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, 'O');
}

function checkWinner() {
  return winningConditions.some(([a, b, c]) => {
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

restartBtn.addEventListener('click', createBoard);
modeSelect.addEventListener('change', createBoard);

createBoard();
