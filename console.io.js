/*
 * This file deals with user input needed for chess.js to operate.
 * All functions are recursive and asynchronous, and rely on callbacks to return valid input
 */

/**
 * TODO DEPRECATED
 * TODO Chris says I don't need this. :( I'm gonna cry
 */

// readline is a module built into node.js
const readline = require("readline");

exports.promptForInput = (prompt, callback) => {
    // Tell readline where to get input and where to put output
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const call = (prompt, callback) => {
        // Get the input from readline
        rl.question(prompt, input => {
            // call the callback funtion and return the data
            if (input) {
                callback(input);
                return rl.close(); // exit function and kill rl
            }
            call(prompt, callback);
        });
    }
    call(prompt, callback);
}

exports.promptForNumber = (prompt, min, max, callback) => {
    // Get input from neighboring function
    this.promptForInput(prompt, input => {
        // Convert to number if applicable
        let number = isNaN(input)? null : +input;
        // Callback valid number or rec urse
        if (typeof(number) === 'number' && (number >= min && number <= max)) {
            callback(number);
            return;
        }
        this.promptForNumber(prompt, min, max, callback);
    });
}

exports.promptForBoolean = (prompt, trueString, falseString) => {
    // Make true/falseString lowercase
    trueString = trueString.trim().toLowerCase();
    falseString = falseString.trim().toLowerCase();
    // Get input from neighbor function
    promptForInput(prompt, input => {
        // Make input lowercase
        input = input.trim().toLowerCase();
        // Callback results
        if (input == trueString) callback(true);
        else if (input == falseString) callback(false);
        else callback(null);
    });
}

exports.promptForMenuSelection = (menu, prompt, exit = false) => {
    // Prepend the menu options to prompt, including exit
    let menuPrompt = "";
    if (exit) menuPrompt += '0) Exit\n';
    for (let i = 0; i < menu.length; i++) {
        menuPrompt += `${i + 1}) ${menu[i]}\n`;
    }
    prompt = `${menuPrompt}\n${prompt}`;
    // Get number from neighboring function
    promptForNumber(prompt, exit? 0 : 1, menu.length, number => {
        // If number, return number - 1. Otherwise null
        callback(number? number - 1 : null);
    });
}