// Game configuration and state variables
const GOAL_CANS = 20;        // Total items needed to collect
let currentCans = 0;         // Current number of items collected
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;          // Holds the interval for spawning items
let timeLeft = 30;          // Time left in seconds
let timerInterval;         // Holds the interval for the countdown timer
const scoreDisplay = document.getElementById('current-cans');

// Array of potential victory messages
const VICTORY_MESSAGES = [
  "Victory! Let's go!",
  "Awesome! You did it!",
  "Congratulations, Water Hero!",
  "You reached the goal! Well done!",
  "Fantastic! You saved the day!"
];

// Array of potential try again messages
const TRY_AGAIN_MESSAGES = [
  "Try again! You can do it!",
  "Don't give up! Give it another shot!",
  "Almost there! Try once more!",
  "Keep going! Try again!",
  "So close! Try again!"
];


// Creates the 3x3 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; // Each cell represents a grid square
    grid.appendChild(cell);
  }
}

// Ensure the grid is created when the page loads
createGrid();

// Spawns a new item in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return; // Stop if the game is not active
  const cells = document.querySelectorAll('.grid-cell');
  
  // Clear all cells before spawning a new water can
  cells.forEach(cell => (cell.innerHTML = ''));

  // Select a random cell from the grid to place the water can
  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // Use a template literal to create the wrapper and water-can element
  randomCell.innerHTML = `
    <div class="water-can-wrapper">
      <div class="water-can"></div>
    </div>
  `;

  // Add click event to the water can
  const waterCan = randomCell.querySelector('.water-can');
  if (waterCan) {
    waterCan.addEventListener('click', function handleCanClick(e) {
      currentCans++;
      console.log(`Water cans collected: ${currentCans}/${GOAL_CANS}`);
      scoreDisplay.textContent = currentCans; // Update the score display
      // Remove the can after click to prevent multiple increments
      waterCan.removeEventListener('click', handleCanClick);
      waterCan.parentElement.remove();

      if (currentCans >= GOAL_CANS) {
      
        showVictoryMessage();
        endGame();
      }
    });
  }
}

// Show a Victory message below the game instructions
function showVictoryMessage() {
  let victoryMsg = document.getElementById('victory-message');
  if (!victoryMsg) {
    const instructions = document.querySelector('.game-instructions');
    victoryMsg = document.createElement('div');
    victoryMsg.id = 'victory-message';
    victoryMsg.textContent = VICTORY_MESSAGES[Math.floor(Math.random() * VICTORY_MESSAGES.length)] + ` You collected ${currentCans} water cans in ${30 - timeLeft} seconds!`;
    victoryMsg.style.marginBottom = '15px';
    victoryMsg.style.fontWeight = 'bold';
    victoryMsg.style.padding = '10px';
    victoryMsg.style.borderRadius = '8px';
    victoryMsg.style.color = '#FFC907';
    victoryMsg.style.backgroundColor = '#000000ff';
    victoryMsg.style.textAlign = 'center';
    victoryMsg.style.fontSize = '1.2em';
    instructions.insertAdjacentElement('afterend', victoryMsg);
      if (typeof launchConfetti === 'function') {
        launchConfetti();
      }
  }
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) (
    endGame()
  );

  // Hide victory or try again message if present
  const victoryMsg = document.getElementById('victory-message');
  if (victoryMsg) victoryMsg.remove();
  const tryAgainMsg = document.getElementById('try-again-message');
  if (tryAgainMsg) tryAgainMsg.remove();

  const startButton = document.getElementById('start-game');
  startButton.textContent = 'Reset Game'; // Change button text to "Reset Game"

  gameActive = true;
  createGrid(); // Set up the game grid
  spawnInterval = setInterval(spawnWaterCan, 1000); // Spawn water cans every second
  timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
}

function updateTimer() {
  timeLeft--;
  document.getElementById('timer').textContent = timeLeft; // Update the timer display
  if (timeLeft <= 0) {
    showTryAgainMessage();
    clearInterval(timerInterval);
    endGame();
  }
}

// Show a Try Again message below the game instructions
function showTryAgainMessage() {
  let tryAgainMsg = document.getElementById('try-again-message');
  if (!tryAgainMsg) {
    const instructions = document.querySelector('.game-instructions');
    tryAgainMsg = document.createElement('div');
    tryAgainMsg.id = 'try-again-message';
    tryAgainMsg.textContent = TRY_AGAIN_MESSAGES[Math.floor(Math.random() * TRY_AGAIN_MESSAGES.length)] + ` You collected ${currentCans} / ${GOAL_CANS} water cans.`;
    tryAgainMsg.style.marginBottom = '15px';
    tryAgainMsg.style.fontWeight = 'bold';
    tryAgainMsg.style.color = '#e74c3c';
    tryAgainMsg.style.textAlign = 'center';
    tryAgainMsg.style.fontSize = '1.2em';
    instructions.insertAdjacentElement('afterend', tryAgainMsg);
  }
}

function endGame() {
  gameActive = false; // Mark the game as inactive
  clearInterval(spawnInterval); // Stop spawning water cans
  // Remove any clickable jerry can from the grid
  const cells = document.querySelectorAll('.grid-cell');
  cells.forEach(cell => (cell.innerHTML = ''));
  clearInterval(timerInterval); // Stop the timer
  currentCans = 0; // Reset the collected cans count
  scoreDisplay.textContent = currentCans; // Update the score display
  timeLeft = 30; // Reset the timer
  document.getElementById('timer').textContent = timeLeft; // Reset timer display
}

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);


