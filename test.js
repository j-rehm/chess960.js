/*
 * This file has the unit tests :)
 * And helper functions
 */

/*
     0  1  2  3  4  5  6  7   index
   +------------------------+
 8 | r  n  b  q  k  b  n  r | 0 black
 7 | p  p  p  p  p  p  p  p | 1
 6 | .  .  .  .  .  .  .  . | 2
 5 | .  .  .  .  .  .  .  . | 3
 4 | .  .  .  .  .  .  .  . | 4
 3 | .  .  .  .  .  .  .  . | 5
 2 | P  P  P  P  P  P  P  P | 6
 1 | R  N  B  Q  K  B  N  R | 7 WHITE
   +------------------------+
     a  b  c  d  e  f  g  h
*/

// ~~~~ HELPER METHODS ~~~~
const getRankFEN = (board, index) => {
    let rank = '';
    board.board()[index].forEach(square => {
        if (square) {
            if (square.color == "w") rank += square.type.toUpperCase();
            else if (square.color == "b") rank += square.type;
        }
    });
    return rank;
}

// ~~~~ UNIT TESTS ~~~~
const { Chess } = require('chess.js');
const { Chess960 } = require('./chess960.js');

const chessRank1Pos = () => {
    // Arrange
    const chess = Chess();
    console.log(chess.ascii());

    // Act
    let expected = 'RNBQKBNR';         // Standard rank 1 FEN (white)
    let actual = getRankFEN(chess, 7); // Actual rank 1 FEN
    
    // Assert
    let result = expected === actual;
    return {expected, actual, result};
}

const chessRanksMatch = () => {
    // Arrange
    const chess = Chess();
    console.log(chess.ascii());

    // Act
    let expected = getRankFEN(chess, 0); // Rank 8 FEN (black)
    let actual = getRankFEN(chess, 7);   // Rank 1 FEN (white)
    
    // Assert
    let result = expected === actual;
    return {expected, actual, result};
}

// ~~~~ TESTING FRAMEWORK ~~~~

const Test = (message, test) => {
    console.log(message);
    let results = test();
    console.log(`Expected: ${results.expected}`);
    console.log(`Actual: ${results.actual}`);
    console.log(`Result: ${results.result}\n\n`);
}

Test('Asserting that the position of rank 1 (white) of the standard chess.js board is correct', chessRank1Pos);
Test('Asserting that the position of rank 1 (white) is equal to the position of rank 8 (black)', chessRanksMatch);
