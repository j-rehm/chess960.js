/*
 * This class sits on top of chess.js and loads a 960 board into it
 */
const { Chess } = require('chess.js');

// Chess.prototype.get960 = this.get960 = () => {
//     // Initialize one rank in FEN
//     // Declare empty rank to hold black pieces
//     let black = '--------';

//     // Place bishops randomly in alternate square colors
//     black = this.sub(black, [0,2,4,6][this.between(0,4)], 'b');
//     black = this.sub(black, [1,3,5,7][this.between(0,4)], 'b');

//     // Place queen randomly in empty square
//     black = this.sub(black, this.getRandomEmpty(black), 'q')

//     // Place knights randomly on empty squares
//     black = this.sub(black, this.getRandomEmpty(black), 'n');
//     black = this.sub(black, this.getRandomEmpty(black), 'n');
    
//     // Place king in center of the three remaining squares
//     black = this.sub(black, this.getEmptySquares(black)[1], 'k');

//     // Place rooks in remaining two squares
//     black = this.sub(black, this.getEmptySquares(black)[0], 'r');
//     black = this.sub(black, this.getEmptySquares(black)[0], 'r');

//     // Convert pieces to white
//     let white = black.toUpperCase();

//     return `${black}/pppppppp/8/8/8/8/PPPPPPPP/${white} w - - 0 1`;
// }

exports.Chess960 = () => {
    this.chess = Chess();

    this.get960 = () => {
        // Initialize one rank in FEN
        // Declare empty rank to hold black pieces
        let black = '--------';

        // Place bishops randomly in alternate square colors
        black = this.sub(black, [0,2,4,6][this.between(0,4)], 'b');
        black = this.sub(black, [1,3,5,7][this.between(0,4)], 'b');

        // Place queen randomly in empty square
        black = this.sub(black, this.getRandomEmpty(black), 'q')

        // Place knights randomly on empty squares
        black = this.sub(black, this.getRandomEmpty(black), 'n');
        black = this.sub(black, this.getRandomEmpty(black), 'n');
        
        // Place king in center of the three remaining squares
        black = this.sub(black, this.getEmptySquares(black)[1], 'k');

        // Place rooks in remaining two squares
        black = this.sub(black, this.getEmptySquares(black)[0], 'r');
        black = this.sub(black, this.getEmptySquares(black)[0], 'r');

        // Convert pieces to white
        let white = black.toUpperCase();

        return `${black}/pppppppp/8/8/8/8/PPPPPPPP/${white} w - - 0 1`;
    }
    
    // Between min (inclusive) and max (exclusive)
    this.between = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Return a new string where the character at index is replaced by char
    this.sub = (string, index, char) => {
        return `${string.substr(0, index)}${char}${string.substr(index + 1, string.length)}`;
    }

    // Returns a list of empty squares in a rank
    this.getEmptySquares = string => {
        let squares = [];
        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) == '-') squares.push(i);
        }
        return squares;
    }

    // Selects a random empty square in a rank
    this.getRandomEmpty = string => {
        let squares = this.getEmptySquares(string);
        return squares[this.between(0, squares.length)];
    }

    // Load the new 960 board into the chess object
    this.chess.load(this.get960());
    // this.chess.load(Chess.prototype.get960());
    return this.chess;
}

const chess960 = this.Chess960();
// chess960.test();
console.log(chess960.ascii());