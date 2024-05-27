// create a board and clock object
const board = new Board();
var timer = new ChessTimer(300,300);
const takenPieces = new TakenPieces();

// initlize the board 
board.initializeBoard();

// print the board for trouboeshooting
board.printBoard();

// display the board on the screen
displayBoard(board);

// Start menu ----------------------------------------------------------------------------
openMenuPopup();
showOverlay();

document.getElementById('start-button').addEventListener('click', () => {
    // Apply the .hidden class to the popup menu
    document.getElementById('popup-menu').classList.add('hidden');

    // Initialize clock to the time input by the user
    const playerTime = parseInt(document.getElementById('time-input').value) * 60;
    if (isNaN(playerTime)) {
        timer = new ChessTimer(0, 0, true);
        closeMenuPopup();
    } else if (playerTime < 1) {
        alert('Please enter a time greater than 0');
        return;
    } else if (playerTime > 3600) {
        alert('Please enter a time less than 60 minutes');
        return;
    } else {
        timer = new ChessTimer(playerTime, playerTime, false);

        // Replace 'timer1' and 'timer2' with the IDs of your HTML elements
        const timerElement1 = document.getElementById('black-timer');
        const timerElement2 = document.getElementById('white-timer');

        // Update the timer elements with the initial time
        timer.updateTimerElement(timerElement1, timerElement2);
        timer.start(timerElement1, timerElement2);
        closeMenuPopup();
    }
});
// ---------------------------------------------------------------------------------------

// function to handle the end of the game
function endGame() {
    alert('Game Over!');
    // Add code to reset the game

}