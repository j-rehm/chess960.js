/*
 * This file operates as the interface between the user and the game
 * It is the starting point of the application
 */

const { Chess } = require('chess.js');
// const Chess960 = require('./chess960.js');

const chess = Chess('');

console.log(chess.ascii());