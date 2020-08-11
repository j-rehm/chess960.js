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
            if (square.color == "w")      rank += square.type.toUpperCase();
            else if (square.color == "b") rank += square.type;
        }
    });
    return rank;
}

const findInRank = (rank, target) => {
    let positions = [];
    for (let i = 0; i < rank.length; i++) {
        if (rank.charAt(i) == target) positions.push(i);
    }
    return positions;
}

// ~~~~ UNIT TESTS ~~~~
const { Chess } = require('chess.js');
const { Chess960 } = require('./chess960.js');

const chessRank1Pos = () => {
    // Arrange
    const chess = Chess();
    console.log(chess.ascii());

    // Act
    let expected = 'RNBQKBNR';           // Standard rank 1 FEN (white)
    let actual =   getRankFEN(chess, 7); // Actual rank 1 FEN
    
    // Assert
    let result = expected === actual;
    return {expected, actual, result};
}

const chessRanksMatch = () => {
    // Arrange
    const chess = Chess();
    console.log(chess.ascii());

    // Act
    let expected = getRankFEN(chess, 0).toLowerCase(); // Rank 8 FEN (black)
    let actual =   getRankFEN(chess, 7).toLowerCase(); // Rank 1 FEN (white)
    
    // Assert
    let result = expected === actual;
    return {expected, actual, result};
}

const chess960RanksMatch = () => {
    // Arrange
    const chess960 = Chess960();
    console.log(chess960.ascii());

    // Act
    let expected = getRankFEN(chess960, 0).toLowerCase(); // Rank 8 FEN (black)
    let actual =   getRankFEN(chess960, 7).toLowerCase(); // Rank 1 FEN (white)

    // Assert
    let result = expected === actual;
    return {expected, actual, result};
}

const chess960BishopsAlternate = () => {
    // Arrange
    const chess960 = Chess960();
    console.log(chess960.ascii());

    // Act
    let rank = getRankFEN(chess960, 0);
    let bishopPositions = findInRank(rank, 'b');
    let b1Pos = bishopPositions[0];
    let b2Pos = bishopPositions[1];

    let expected = [0,2,4,6].includes(b1Pos); // true or false, depending on if the first bishop is on an even tile or not, so
    let actual =   [1,3,5,7].includes(b2Pos); // the second bishop must have the same result for being on an odd tile

    // Assert
    let result = expected === actual;
    return {expected, actual, result};
}

const chess960KingBetweenRooks = () => {
    // Arrange
    const chess960 = Chess960();
    console.log(chess960.ascii());

    // Act
    let rank = getRankFEN(chess960, 0);
    let rookPositions = findInRank(rank, 'r');
    let kingPosition =  findInRank(rank, 'k');
    let r1Pos = rookPositions[0];
    let r2Pos = rookPositions[1];
    let kPos =  kingPosition[0];

    let expected = true;
    let actual =   (r1Pos < kPos && kPos < r2Pos);

    // Assert
    let result = expected === actual;
    return {expected, actual, result};
}

// ~~~~ TESTING FRAMEWORK ~~~~

let passed = 0;
let failed = 0;

const Test = (message, test) => {
    console.log(message);
    
    let results = test();
    (results.result)? passed++ : failed++;
    
    console.log(`Expected: ${results.expected}`);
    console.log(`Actual: ${results.actual}`);
    console.log(`Result: ${(results.result)? 'PASS' : 'FAIL'}\n\n`);
}

Test('Asserting that the position of rank 1 (white) of the standard chess.js board is correct', chessRank1Pos);
Test('Asserting that the position of rank 1 (white) is equal to the position of rank 8 (black)', chessRanksMatch);
Test('(960) Asserting that the position of rank 1 (white) is equal to the position of rank 8 (black)', chess960RanksMatch);
Test('(960) Asserting that both bishops in rank 8 (black) are on different colors', chess960BishopsAlternate);
Test('(960) Asserting that the king is positioned between the two rooks', chess960KingBetweenRooks);

console.log(`Total Passed: ${passed}`);
console.log(`Total Failed: ${failed}`);
console.log(`Score: ${(100 / (passed + failed)) * passed}%`);