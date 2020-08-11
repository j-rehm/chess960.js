/*
 * This file modifies the chess.js prototype to add chess960 rules
 */
const { Chess } = require('chess.js');

class Chess960 extends Chess {
    constructor (fen) {
        super(fen);
    }
}

const chess960 = new Chess960();
console.log(chess960.ascii());