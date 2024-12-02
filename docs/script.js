/*const cells = document.querySelectorAll('.cell');
let currentPlayer = '1';
let gameActive = true; //Flag to track if the game is still active

  
let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

/// Add references to the GIF elements
const leftGif = document.getElementById('left-gif');
const rightGif = document.getElementById('right-gif');

// Function to check if a player has won
function checkWin() {
  if (
    (gameState[0] === 1 && gameState[1] === 1 && gameState[2] === 1) ||
    (gameState[3] === 1 && gameState[4] === 1 && gameState[5] === 1) ||
    (gameState[6] === 1 && gameState[7] === 1 && gameState[8] === 1) ||
    (gameState[0] === 1 && gameState[3] === 1 && gameState[6] === 1) ||
    (gameState[1] === 1 && gameState[4] === 1 && gameState[7] === 1) ||
    (gameState[2] === 1 && gameState[5] === 1 && gameState[8] === 1) ||
    (gameState[0] === 1 && gameState[4] === 1 && gameState[8] === 1) ||
    (gameState[6] === 1 && gameState[4] === 1 && gameState[2] === 1)
  ) {
    showWinningGifs('Player 1');
  } else if (
    (gameState[0] === 2 && gameState[1] === 2 && gameState[2] === 2) ||
    (gameState[3] === 2 && gameState[4] === 2 && gameState[5] === 2) ||
    (gameState[6] === 2 && gameState[7] === 2 && gameState[8] === 2) ||
    (gameState[0] === 2 && gameState[3] === 2 && gameState[6] === 2) ||
    (gameState[1] === 2 && gameState[4] === 2 && gameState[7] === 2) ||
    (gameState[2] === 2 && gameState[5] === 2 && gameState[8] === 2) ||
    (gameState[0] === 2 && gameState[4] === 2 && gameState[8] === 2) ||
    (gameState[6] === 2 && gameState[4] === 2 && gameState[2] === 2)
  ) {

}


// Function to display GIFs when a player wins
function showWinningGifs(winner) {
  console.log(winner + ' wins!');
  leftGif.style.display = 'block';
  rightGif.style.display = 'block';
  resetButton.style.display = 'block';
}

// Assuming the event listener code for cells remains the same
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.innerHTML === '') {
      if (currentPlayer === '1') {
        cell.innerHTML = '<img id=img src="https://cdn.glitch.global/839199cd-5ce5-4a95-b253-45f302e4be2e/X.svg?v=1731972065812" alt="X">';
        gameState[cell.dataset.index] = 1; // Set player X's move
      } else {
        cell.innerHTML = '<img id=img src="https://cdn.glitch.global/839199cd-5ce5-4a95-b253-45f302e4be2e/O.svg?v=1731972069071" alt="O">';
        gameState[cell.dataset.index] = 2; // Set player O's move
      }

      // Check if someone has won after the move
      checkWin();

      // Switch player
      currentPlayer = currentPlayer === '1' ? '2' : '1';
    }
  });
});

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame);

function resetGame() {
  gameActive = true;
  currentPlayer = '1';
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  cells.forEach(cell => (cell.innerHTML = ''));
  leftGif.style.display = 'none';
  rightGif.style.display = 'none';
  resetButton.style.display = 'none';
}} */ 


// Select all cells and initialize variables
const cells = document.querySelectorAll('.cell');
let currentPlayer = '1';
let gameActive = true;
let score1 = 0;
let score2 = 0;

let gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// Add references to the GIF elements
//const leftGif = document.getElementById('left-gif');
const rightGif = document.getElementById('right-gif');
const resetButton = document.getElementById('reset');
const currentTurnElement = document.getElementById('current-turn');


// Function to check if a player has won
function checkWin() {
  let winner = null;
  if (
    (gameState[0] === 1 && gameState[1] === 1 && gameState[2] === 1) ||
    (gameState[3] === 1 && gameState[4] === 1 && gameState[5] === 1) ||
    (gameState[6] === 1 && gameState[7] === 1 && gameState[8] === 1) ||
    (gameState[0] === 1 && gameState[3] === 1 && gameState[6] === 1) ||
    (gameState[1] === 1 && gameState[4] === 1 && gameState[7] === 1) ||
    (gameState[2] === 1 && gameState[5] === 1 && gameState[8] === 1) ||
    (gameState[0] === 1 && gameState[4] === 1 && gameState[8] === 1) ||
    (gameState[6] === 1 && gameState[4] === 1 && gameState[2] === 1)
  ) {
    winner = 'Player 1';
  } else if (
    (gameState[0] === 2 && gameState[1] === 2 && gameState[2] === 2) ||
    (gameState[3] === 2 && gameState[4] === 2 && gameState[5] === 2) ||
    (gameState[6] === 2 && gameState[7] === 2 && gameState[8] === 2) ||
    (gameState[0] === 2 && gameState[3] === 2 && gameState[6] === 2) ||
    (gameState[1] === 2 && gameState[4] === 2 && gameState[7] === 2) ||
    (gameState[2] === 2 && gameState[5] === 2 && gameState[8] === 2) ||
    (gameState[0] === 2 && gameState[4] === 2 && gameState[8] === 2) ||
    (gameState[6] === 2 && gameState[4] === 2 && gameState[2] === 2)
  ) {
    winner = 'Player 2';
  }

  if (winner) {
    showWinningGifs(winner);
    updateScoreboard(winner);
    alert(`${winner} wins!`);
    gameActive = false;
  }
}

// Function to display GIFs when a player wins
function showWinningGifs(winner) {
  console.log(winner + ' wins!');
 // leftGif.style.display = 'block';
  rightGif.style.display = 'block';
  resetButton.style.display = 'block';
}

// Function to update the scoreboard
function updateScoreboard(winner) {
  if (winner === 'Player 1') {
    score1++;
    document.getElementById('score1').textContent = score1;
  } else if (winner === 'Player 2') {
    score2++;
    document.getElementById('score2').textContent = score2;
  }
}

function updateTurnIndicator() {
  if (currentPlayer === '1') {
    document.getElementById('current-turn').textContent = 'Player 1';
  } else {
    document.getElementById('current-turn').textContent = 'Player 2';
  }
}

// Update the turn after each move
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.innerHTML === '' && gameActive) {
      if (currentPlayer === '1') {
        cell.innerHTML = '<img id="img" src="https://cdn.glitch.global/839199cd-5ce5-4a95-b253-45f302e4be2e/X.svg?v=1731972065812" alt="X">';
        gameState[index] = 1;
      } else {
        cell.innerHTML = '<img id="img" src="https://cdn.glitch.global/839199cd-5ce5-4a95-b253-45f302e4be2e/O.svg?v=1731972069071" alt="O">';
        gameState[index] = 2;
      }

      checkWin();

      // Switch the player
      currentPlayer = currentPlayer === '1' ? '2' : '1';
      updateTurnIndicator();
    }
  });
});

// Initialize the turn indicator
updateTurnIndicator();

// Event listener for each cell
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (cell.innerHTML === '' && gameActive) {
      if (currentPlayer === '1') {
        cell.innerHTML = '<img id="img" src="https://cdn.glitch.global/839199cd-5ce5-4a95-b253-45f302e4be2e/X.svg?v=1731972065812" alt="X">';
        gameState[index] = 1;
      } else {
        cell.innerHTML = '<img id="img" src="https://cdn.glitch.global/839199cd-5ce5-4a95-b253-45f302e4be2e/O.svg?v=1731972069071" alt="O">';
        gameState[index] = 2;
      }

      checkWin();

      currentPlayer = currentPlayer === '1' ? '2' : '1';
    }
  });
});

// Reset game logic
resetButton.addEventListener('click', () => {
  gameActive = true;
  currentPlayer = '1';
  gameState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  cells.forEach(cell => (cell.innerHTML = ''));
 // leftGif.style.display = 'none';
  rightGif.style.display = 'none';
  resetButton.style.display = 'block';
});