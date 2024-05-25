class Board {
    constructor() {
        this.pieces = new Array(8).fill(null).map(() => new Array(8).fill(null));
        this.currentPlayer = 'white';
    }

    // Helper method to find the king piece by team color
    findKingByTeamColor(teamColor) {
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                const piece = this.pieces[row][column];
                if (piece && piece.constructor.name.toLowerCase() === 'king' && piece.teamColor === teamColor) {
                    console.log(piece);
                    return piece;
                }
            }
        }
        return null;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }

    addPiece(pieceType, position, teamColor) {
        let piece;
        const { row, column } = position;
        switch (pieceType) {
            case 'pawn':
                piece = new Pawn(position, teamColor);
                break;
            // Add cases for other piece types here
            case 'rook':
                piece = new Rook(position, teamColor);
                break;
            case 'knight':
                piece = new Knight(position, teamColor);
                break;
            case 'bishop':
                piece = new Bishop(position, teamColor);
                break;
            case 'queen':
                piece = new Queen(position, teamColor);
                break;
            case 'king':
                piece = new King(position, teamColor);
                break;
            default:
                throw new Error('Invalid piece type');
        }
        this.pieces[row - 1][column - 1] = piece;
    }

    removePiece(position) {
        const { row, column } = position;
        this.pieces[row - 1][column - 1] = null;
        console.log(`Removed piece at ${column}${row}`);
    }

    movePiece(piecePosition, newPosition) {
        const { row: oldRow, column: oldColumn } = piecePosition;
        const { row: newRow, column: newColumn } = newPosition;

        const piece = this.pieces[oldRow - 1][oldColumn - 1];
        if (!piece) {
            console.log("Piece not found on the board.");
            return false;
        }
        if (!piece.isValidMove(newPosition)) {
            console.log("Invalid move for the piece.");
            return false;
        }
        if (piece.teamColor !== this.currentPlayer) {
            console.log("Piece does not belong to the current player.");
            return false;
        }
        if (this.pieces[newRow - 1][newColumn - 1] && this.pieces[newRow - 1][newColumn - 1].teamColor === this.currentPlayer) {
            console.log("Cannot capture your own piece.");
            return false;
        }

        // if any square in the path you are moving ALONG TO REACH THE DISTINATION is blocked by a piece, return false
        if (!piece.getPath(piecePosition, newPosition, this.pieces)) {
            console.log("Path is not clear.");
            return false;
        }

        // Check for capturing
        const capturingPiece = this.pieces[newRow - 1][newColumn - 1];
        if (capturingPiece) {
            console.log(`Captured ${capturingPiece.constructor.name} at ${newColumn}${newRow}`);
            this.removePiece(newPosition);
        }

        this.removePiece(piecePosition);

        // add piece with name of piece, new position, team color
        this.addPiece(piece.constructor.name.toLowerCase(), newPosition, piece.teamColor);

        console.log(`Moved ${piece.constructor.name} to ${newColumn}${newRow}`);
        return true;
    }

    initializeBoard () {
        this.addPiece('rook', { row: 1, column: 1 }, 'black');
        this.addPiece('knight', { row: 1, column: 2 }, 'black');
        this.addPiece('bishop', { row: 1, column: 3 }, 'black');
        this.addPiece('queen', { row: 1, column: 4 }, 'black');
        this.addPiece('king', { row: 1, column: 5 }, 'black');
        this.addPiece('bishop', { row: 1, column: 6 }, 'black');
        this.addPiece('knight', { row: 1, column: 7 }, 'black');
        this.addPiece('rook', { row: 1, column: 8 }, 'black');
        for (let i = 1; i <= 8; i++) {
            this.addPiece('pawn', { row: 2, column: i }, 'black');
            this.addPiece('pawn', { row: 7, column: i }, 'white');
        }
        this.addPiece('rook', { row: 8, column: 1 }, 'white');
        this.addPiece('knight', { row: 8, column: 2 }, 'white');
        this.addPiece('bishop', { row: 8, column: 3 }, 'white');
        this.addPiece('queen', { row: 8, column: 4 }, 'white');
        this.addPiece('king', { row: 8, column: 5 }, 'white');
        this.addPiece('bishop', { row: 8, column: 6 }, 'white');
        this.addPiece('knight', { row: 8, column: 7 }, 'white');
        this.addPiece('rook', { row: 8, column: 8 }, 'white');
    }

    printBoard() {
        console.log(this.pieces);
    }
}
