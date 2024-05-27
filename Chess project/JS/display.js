function displayBoard(board) {
    const boardElement = document.getElementById('chessboard');
    boardElement.innerHTML = '';
    for (let row = 1; row <= 8; row++) {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let column = 1; column <= 8; column++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.x = column; // Add x coordinate
            cellElement.dataset.y = row; // Add y coordinate
            if ((row + column) % 2 === 0) {
                cellElement.classList.add('white');
            } else {
                cellElement.classList.add('black');
            }
            const piece = board.pieces[row - 1][column - 1];
            if (piece) {
                cellElement.textContent = piece.unicodeChar;
            }
            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
    addEventListenersToCells();

    // highlight the cell of a king that is in check
    const whiteKing = board.findKingByTeamColor('white');
    const blackKing = board.findKingByTeamColor('black');
    if (whiteKing && whiteKing.isInCheck()) {
        const cell = document.querySelector(`.cell[data-x="${whiteKing.currentPosition.column}"][data-y="${whiteKing.currentPosition.row}"]`);
        cell.classList.add('check');
    }
    if (blackKing && blackKing.isInCheck()) {
        const cell = document.querySelector(`.cell[data-x="${blackKing.currentPosition.column}"][data-y="${blackKing.currentPosition.row}"]`);
        cell.classList.add('check');
    }
}

function openMenuPopup() {
    document.getElementById('popup-menu').style.display = 'block';
    showOverlay();
}

function closeMenuPopup() {
    setTimeout(() => {
        document.getElementById('popup-menu').style.display = 'none';
        hideOverlay();
    }, 150);
}

function showOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
}

function hideOverlay() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';
}

class TakenPieces {
    constructor() {
        this.white = [];
        this.black = [];
    }

    increaseScoreCounter(teamColour, piece) {
        console.log('increasing score for ' + teamColour + ' team');
        if (teamColour === 'white') {
            let score = document.getElementById('white-score');
            score.textContent = parseInt(score.textContent) + 1;
            takenPieces.white.push(piece.unicodeChar);
        } else {
            let score = document.getElementById('black-score');
            score.textContent = parseInt(score.textContent) + 1;
            takenPieces.black.push(piece.unicodeChar);
        }
    }
    
    // render the taken pieces on the screen of both teams
    renderTakenPieces() {
        console.log('rendering taken pieces');
        let white = document.getElementById('piece-box-white');
        let black = document.getElementById('piece-box-black');
        white.innerHTML = '';
        black.innerHTML = '';
        for (let i = 0; i < takenPieces.white.length; i++) {
            let piece = document.createElement('div');
            piece.textContent = takenPieces.white[i];
            white.appendChild(piece);
        }
        for (let i = 0; i < takenPieces.black.length; i++) {
            let piece = document.createElement('div');
            piece.textContent = takenPieces.black[i];
            black.appendChild(piece);
        }
    }
}

