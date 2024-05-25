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
}
