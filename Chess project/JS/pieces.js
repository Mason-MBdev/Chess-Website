class Piece {
    constructor(currentPosition, teamColor) {
        this.currentPosition = currentPosition;
        this.teamColor = teamColor;
    }

    isValidMove(newPosition) {
        // if the position the piece is trying to move to contains a piece of the same color, return false and log message with piece name
        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            console.log(`Cannot move to ${newColumn}${newRow} because it contains a piece of the same color`);
            return false;
        }
        return true;
    }

    // determine if there is a piece in the path of the piece moving
    getPath(piecePosition, newPosition, pieces) {
        const { row: oldRow, column: oldColumn } = piecePosition;
        const { row: newRow, column: newColumn } = newPosition;

        const rowDiff = newRow - oldRow;
        const colDiff = newColumn - oldColumn;

        // if the piece is moving vertically
        if (colDiff === 0) {
            for (let i = 1; i < Math.abs(rowDiff); i++) {
                const row = oldRow + i * Math.sign(rowDiff);
                if (board.pieces[row - 1][oldColumn - 1]) {
                    console.log(`Piece in the way at ${oldColumn}${row}`);
                    return false;
                }
            }
        }

        // if the piece is moving horizontally
        if (rowDiff === 0) {
            for (let i = 1; i < Math.abs(colDiff); i++) {
                const column = oldColumn + i * Math.sign(colDiff);
                if (board.pieces[oldRow - 1][column - 1]) {
                    console.log(`Piece in the way at ${column}${oldRow}`);
                    return false;
                }
            }
        }

        // if the piece is moving diagonally
        if (Math.abs(rowDiff) === Math.abs(colDiff)) {
            for (let i = 1; i < Math.abs(rowDiff); i++) {
                const testRow = this.currentPosition.row + i * Math.sign(rowDiff);
                const testColumn = this.currentPosition.column + i * Math.sign(colDiff);
                if (board.pieces[testRow - 1][testColumn - 1]) { // Subtract 1 from testRow and testColumn
                    return false;
                }
            }
        }
        return true;
    }
}

class Pawn extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        this.unicodeChar = this.teamColor === 'white' ? '\u2659' : '\u265F'; // Set unicodeChar for Pawn
    }

    isValidMove(newPosition) {
        console.log('Pawn isValidMove called');
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;
    
        // Determine direction based on team color
        const direction = this.teamColor === 'white'? -1 : 1;
    
        // Forward movement
        if (newColumn === currentColumn && newRow === currentRow + direction) {
            // Check if the destination square is empty
            if (board.pieces[newRow - 1][newColumn - 1]) {
                console.log('Pawn cannot capture when moving forward');
                return false;
            }
            console.log('Pawn moves forward');
            return true;
        }
    
        // Initial double move
        if ((this.teamColor === 'white' && currentRow === 7) || (this.teamColor === 'black' && currentRow === 2)) {
            if (newColumn === currentColumn && newRow === currentRow + 2 * direction) {
                console.log('Pawn moves forward 2');
                return true;
            }
        }
    
        // En passant capture
        if (Math.abs(newColumn - currentColumn) === 1 && newRow === currentRow + direction) {
            // Check if there is a piece to capture via en passant
            if (board.pieces[currentRow - 1][newColumn - 1] && board.pieces[currentRow - 1][newColumn - 1].justMovedTwoSquares) {
                console.log('Pawn captures en passant');
                return true;
            }
        }
    
        // Standard capturing move
        if (Math.abs(newColumn - currentColumn) === 1 && newRow === currentRow + direction) {
            // Ensure there is a piece to capture
            if (!board.pieces[newRow - 1][newColumn - 1]) {
                console.log('Pawn cannot capture empty square');
                return false;
            }
    
            console.log('Pawn captures');
            return true;
        }
    
        console.log('Invalid move for pawn');
        return false; // Default to false if no valid move
    }
}

class Rook extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        // Set unicodeChar for rook
        this.unicodeChar = this.teamColor === 'white' ? '\u2656' : '\u265C';

    }

    isValidMove(newPosition) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;

        // if any square in the path you are moving ALONG TO REACH THE DISTINATION is blocked by a piece, return false
        if (!this.getPath(this.currentPosition, newPosition, this.pieces)) {
            console.log("Path is not clear cannot reach king.");
            return false;
        }

        // if the position the piece is trying to move to contains a piece of the same color, return false and log message with piece name
        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            console.log(`Cannot move to ${newColumn}${newRow} because it contains a piece of the same color`);
            return false;
        }

        // Rooks can move horizontally or vertically
        if (newRow === currentRow || newColumn === currentColumn) {
            return true; // Valid move
        }

        return false; // Default to false if no valid move
    }
}

class Knight extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        // Set unicodeChar for knight
        this.unicodeChar = this.teamColor === 'white' ? '\u2658' : '\u265E';
    }

    isValidMove(newPosition) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;

        // Knights can move in an L shape
        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newColumn - currentColumn);

        // if the position the piece is trying to move to contains a piece of the same color, return false and log message with piece name
        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            console.log(`Cannot move to ${newColumn}${newRow} because it contains a piece of the same color`);
            return false;
        }

        if ((rowDiff === 1 && colDiff === 2) || (rowDiff === 2 && colDiff === 1)) {
            return true; // Valid move
        }

        return false; // Default to false if no valid move
    }
}

class Bishop extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        // Set unicodeChar for bishop
        this.unicodeChar = this.teamColor === 'white' ? '\u2657' : '\u265D';
    }

    isValidMove(newPosition) {
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;

        // if any square in the path you are moving ALONG TO REACH THE DISTINATION is blocked by a piece, return false
        if (!this.getPath(this.currentPosition, newPosition, this.pieces)) {
            console.log("Path is not clear cannot reach king.");
            return false;
        }

        // if the position the piece is trying to move to contains a piece of the same color, return false and log message with piece name
        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            console.log(`Cannot move to ${newColumn}${newRow} because it contains a piece of the same color`);
            return false;
        }

        // Bishops can move diagonally
        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newColumn - currentColumn);

        if (rowDiff === colDiff) {
            return true; // Valid move
        }

        return false; // Default to false if no valid move
    }
}

class Queen extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        // Set unicodeChar for queen
        this.unicodeChar = this.teamColor === 'white' ? '\u2655' : '\u265B';
    }

    isValidMove(newPosition) {
        // A queen's move combines the moves of a rook and bishop
        const rookMove = (new Rook(this.currentPosition, this.teamColor)).isValidMove(newPosition);
        const bishopMove = (new Bishop(this.currentPosition, this.teamColor)).isValidMove(newPosition);

        if (rookMove || bishopMove) {
            console.log('Path is clear for either Rook or Bishop move');
        } else {
            console.log('Path is blocked for either Rook or Bishop move');
            return false;
        }

        console.log(`Rook move: ${rookMove}, Bishop move: ${bishopMove}`);

        // log old position x and y
        console.log(`Old position: ${this.currentPosition.column}${this.currentPosition.row}`);

        // log new position x and y
        console.log(`New position: ${newPosition.column}${newPosition.row}`);

        // if the position the piece is trying to move to contains a piece of the same color, return false and log message with piece name
        if (board.pieces[newPosition.row - 1][newPosition.column - 1] && board.pieces[newPosition.row - 1][newPosition.column - 1].teamColor === this.teamColor) {
            console.log(`Cannot move to ${newPosition.column}${newPosition.row} because it contains a piece of the same color`);
            return false;
        }

        return rookMove || bishopMove;
    }
}

class King extends Piece {
    constructor(currentPosition, teamColor) {
        super(currentPosition, teamColor);
        this.unicodeChar = this.teamColor === 'white'? '\u2654' : '\u265A';
    }

    isValidMove(newPosition) {
        console.log('KING FLAG 4');
        console.log('newPosition: ', newPosition);
        const currentRow = this.currentPosition.row;
        const currentColumn = this.currentPosition.column;
        const newRow = newPosition.row;
        const newColumn = newPosition.column;

        if (board.pieces[newRow - 1][newColumn - 1] && board.pieces[newRow - 1][newColumn - 1].teamColor === this.teamColor) {
            console.log(`Cannot move to ${newColumn}${newRow} because it contains a piece of the same color`);
            return false;
        }

        const rowDiff = Math.abs(newRow - currentRow);
        const colDiff = Math.abs(newColumn - currentColumn);

        if (rowDiff <= 1 && colDiff <= 1) {
            return true; // Valid move
        }

        return false; // Default to false if no valid move
    }

    isInCheck() {
        for (let row = 1; row <= 8; row++) {
            for (let column = 1; column <= 8; column++) {
                const piece = board.pieces[row - 1][column - 1];
                if (piece && piece.teamColor!== this.teamColor) {
                    const newPosition = { row, column };
                    const kingPosition = this.currentPosition;

                    // log the piece name and position
                    console.log(`Checking ${piece.constructor.name} at ${column}${row} for attack on king`);

                    if (piece.isValidMove(kingPosition)) {
                        console.log(`King is in check by ${piece.constructor.name} at ${column}${row}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
                        return true;
                    }
                }
            }
        }
        console.log(`${this.teamColor} king is not in check`);
        return false;
    }

    // isInCheckParameters() {
    isInCheckParameters(kingPosition) {
        console.log('KING FLAG 5');
        console.log('kingPosition: ', kingPosition);
        // log the king position
        console.log(`King position: ${kingPosition.column}${kingPosition.row}`);
        for (let row = 1; row <= 8; row++) {
            for (let column = 1; column <= 8; column++) {
                const piece = board.pieces[row - 1][column - 1];
                if (piece && piece.teamColor!== this.teamColor) {
                    // log the piece name and position
                    console.log(`Checking ${piece.constructor.name} at ${column}${row} for attack on king`);
                    console.log(`King position: ${kingPosition.column}${kingPosition.row}`);

                    if (piece.isValidMove(kingPosition)) {
                        console.log(`King is in check by ${piece.constructor.name} at ${column}${row}!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);
                        return true;
                    }
                }
            }
        }
        console.log(`${this.teamColor} king is not in check`);
        return false;
    }

    canKingEscape(kingPosition) {
        console.log('KING FLAG 69');
        // Iterate through all possible moves for the king
        for (let row = 1; row <= 8; row++) {
            for (let column = 1; column <= 8; column++) {
                const newPosition = { row, column };
    
                // Check if the move is valid and would take the king out of check
                if (isValidMove(kingPosition)) {
                    console.log(`King can escape to ${column}${row}`);
                    return true; // Found a valid move that takes the king out of check
                }
            }
        } 
        // If no valid moves were found, the king cannot escape
        console.log('CHECKMATE GAMEOVER FLAG');
        gameOver();
        return false;
    }
}
