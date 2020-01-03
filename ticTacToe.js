/*
# Tic Tac Toe Challenge
Tic Tac Toe is one of the few games that transcends cultures and continents, it is easily understood and cost nothing to play.
## The rule of the game
### Game Play
* Two players are required for a game.
* Each player will assume wither an “X” or “O”.
* Players take turn to play till a player wins, or the end of the game (whichever happens first).
### Condition for a win
* A player wins when all fields in a column are taken by the player.
* A player wins when all fields in a row are taken by the player.
* A player wins when all fields in a diagonal are taken by the player.
### Conditions for a draw
The game is drawn when all fields are taken on the board.
------------------------------------------------------------------------------------------------------------
## Basic Tic Tac Toe
We are going old school.
You need to implement a console based version of Tic Tac Toe that allows two human players to play the game on a 3 x 3 board.
It's really simple...  The first player will be the X, the second player will be the O. You keep playing the game until there is a winner, a draw, or someone gives up.
An example run through of a game console would be...
~~~
Welcome to Tic Tac Toe!
Here's the current board:
. . .
. . .
. . .
Player 1 enter a coord x,y to place your X or enter 'q' to give up: 1,1
Move accepted, here's the current board:
X . .
. . .
. . .
Player 2 enter a coord x,y to place your O or enter 'q' to give up: 1,1
Oh no, a piece is already at this place! Try again...
Player 2 enter a coord x,y to place your O or enter 'q' to give up: 1,3
Move accepted, here's the current board:
X . O
. . .
. . .
Player 1 enter a coord x,y to place your X or enter 'q' to give up: 2,1
Move accepted, here's the current board:
X . O
X . .
. . .
Player 2 enter a coord x,y to place your O or enter 'q' to give up: 2,2
Move accepted, here's the current board:
X . O
X O .
. . .
Player 1 enter a coord x,y to place your X or enter 'q' to give up: 3,1
Move accepted, well done you've won the game!
X . O
X O .
X . .
~~~
The system should display appropriate messages for incorrect coordinates and a draw.
*/

class ticTacToeGame {

  game = new Array(3);
  constructor() {
    this.game[0] = new Array(3);
    this.game[1] = new Array(3);
    this.game[2] = new Array(3);

    this.game[0][0] = ".";
    this.game[0][1] = ".";
    this.game[0][2] = ".";
    this.game[1][0] = ".";
    this.game[1][1] = ".";
    this.game[1][2] = ".";
    this.game[2][0] = ".";
    this.game[2][1] = ".";
    this.game[2][2] = ".";

  }

  keepPlaying = true;

  playGame() {
    let i = 0
    let player
    console.log(`
      Welcome to Tic Tac Toe!
      Here's the current board:`)
    this.drawingGame()
    while (this.keepPlaying) {
      (i % 2 === 0) ? player = "X" : player = "O"
      this.takeInput(player)
      i++
    }
  }

  takeInput(player) {

    let message
    let input
    player === "X" ?
      message = "Player 1 enter a coord x,y to place your X or enter 'q' to give up" :
      message = "Player 2 enter a coord x,y to place your O or enter 'q' to give up"
    input = prompt(message)

    if (this.validateIfValidInput(input)) {
      this.manageInput(input, player)
      return
    }

    if (input === "q") {
      this.keepPlaying = false
      console.log("Game terminated. Thank you for playing :)")
      return
    }

    console.log(`
        Invalid input format. Please try again.
        ${message}`)
    this.takeInput(player)
  }

  manageInput(input, player) {
    var x = input.substring(0, 1) - 1;
    var y = input.substring(2, 3) - 1;

    if (this.validateIfOnePositionIsAvailable(this.game[x][y])) {
      this.game[x][y] = player
      this.drawAndCheckWinDraw(player)
      return
    }

    console.log(`Oh no, a piece is already at this place! Try again...`)
    this.takeInput(player)

  }

  drawAndCheckWinDraw(player) {
    if (this.rulesConditionsToWin(player)) {
      let winner
      player === "X" ? winner = "player 1" : winner = "player 2"
      this.keepPlaying = false
      console.log(`Move accepted, well done ${winner} you've won the game!`)
      this.drawingGame()
      return
    }

    if (this.rulesConditionsToDraw()) {
      this.keepPlaying = false
      console.log("Draw! No winner this time.")
      this.drawingGame()
      return
    }

    console.log(`Move accepted, here's the current board:`)
    this.drawingGame()
  }

  drawingGame() {
    console.log(`
          ${this.game[0][0]} ${this.game[0][1]} ${this.game[0][2]}
          ${this.game[1][0]} ${this.game[1][1]} ${this.game[1][2]}
          ${this.game[2][0]} ${this.game[2][1]} ${this.game[2][2]}
          `
    )
  }

  validateIfValidInput(input) {
    let regex = new RegExp('^[1-3](,[1-3])+$')
    return input.match(regex)
  }

  validateIfOnePositionIsAvailable(t) { return (t === ".") }

  rulesConditionsToWin(player) {
    return (this.allInARow(player) || this.allInAColumn(player) || this.allInADiagonal(player))
  }

  allInARow(player) {

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.game[x][y] != player) {
          break
        }
        if (y === 2) {
          return true
        }
      }
    }

    //return (
    // (this.game[0][0] === player & this.game[0][1] === player & this.game[0][2] === player) ||
    // (this.game[1][0] === player & this.game[1][1] === player & this.game[1][2] === player) ||
    // (this.game[2][0] === player & this.game[2][1] === player & this.game[2][2] === player))

  }
  allInAColumn(player) {
    return (
      (this.game[0][0] === player & this.game[1][0] === player & this.game[2][0] === player) ||
      (this.game[0][1] === player & this.game[1][1] === player & this.game[2][1] === player) ||
      (this.game[0][2] === player & this.game[1][2] === player & this.game[2][2] === player)
    )
  }
  allInADiagonal(player) {
    return (
      (this.game[0][0] === player & this.game[1][1] === player & this.game[2][2] === player) ||
      (this.game[2][0] === player & this.game[1][1] === player & this.game[0][2] === player)
    )
  }

  thereAreFreePositions() {
    return !(this.game[0].find(this.validateIfOnePositionIsAvailable) || this.game[1].find(this.validateIfOnePositionIsAvailable) || this.game[2].find(this.validateIfOnePositionIsAvailable))
  }

  rulesConditionsToDraw() {
    return (this.thereAreFreePositions() & (!this.rulesConditionsToWin("X") || !this.rulesConditionsToWin("O")))
  }

}

let mockTicTacToeObject = new ticTacToeGame()
let input
let testT1, testT2, testT3, testT4

const resetMockTicTacToeObject = () => {
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[0][2] =
    mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[1][2] =
    mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][1] = mockTicTacToeObject.game[2][2] = "."
}

const testerValidateIfValidInput = (input) => {
  mockTicTacToeObject.validateIfValidInput("1,2") ? testT1 = '(1,2) test case Sucedded' : testT1 = '1,2 test case Failed'
  mockTicTacToeObject.validateIfValidInput("4,1") ? testT2 = '(4,1) test case Failed' : testT2 = '4,1 test case Sucedded'
  mockTicTacToeObject.validateIfValidInput("a") ? testT3 = '(a) test case Failed' : testT3 = 'a test case Sucedded'
  mockTicTacToeObject.validateIfValidInput("1 2") ? testT4 = '(1 2) test case Failed' : testT4 = '1 2 test case Sucedded'
  console.log(`testerValidateIfValidInput - Test cases Results:
        ${testT1}
        ${testT2}
        ${testT3}
        ${testT4}`)
}

const testerValidateIfItIsAvailable = (input) => {
  resetMockTicTacToeObject()
  mockTicTacToeObject.validateIfOnePositionIsAvailable(mockTicTacToeObject.game[1][1]) ? testT1 = 'is available test case Sucedded' : testT1 = 'is available test case Failed'
  mockTicTacToeObject.game[1][2] = "X"
  mockTicTacToeObject.validateIfOnePositionIsAvailable(mockTicTacToeObject.game[1][2]) ? testT2 = 'is not available x test case Failed' : testT2 = 'is not available x test case Sucedded'
  console.log(`validateIfItIsAvailable - Test cases Results:
          ${testT1}
          ${testT2}`)
}

const testerAllInARow = (player) => {
  resetMockTicTacToeObject()
  mockTicTacToeObject.allInARow(player) ? testT1 = 'no row winner test case Failed' : testT1 = 'no row winner test case Sucedded'
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[0][2] = "X"
  mockTicTacToeObject.allInARow(player) ? testT2 = 'X row winner test case Sucedded' : testT2 = 'X row winner test case Failed'
  resetMockTicTacToeObject()
  mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[1][2] = "X"
  mockTicTacToeObject.allInARow(player) ? testT3 = 'X row winner test case Sucedded' : testT3 = 'X row winner test case Failed'
  resetMockTicTacToeObject()
  mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][1] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.allInARow(player) ? testT4 = 'X row winner test case Sucedded' : testT4 = 'X row winner test case Failed'
  console.log(`testerAllInARow - Test cases Results:
            ${testT1}
            ${testT2}
            ${testT3}
            ${testT4}`)
}

const testerAllInAColumn = (player) => {
  resetMockTicTacToeObject()
  mockTicTacToeObject.allInAColumn(player) ? testT1 = 'no column winner test case Failed' : testT1 = 'no column winner test case Sucedded'
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.allInAColumn(player) ? testT2 = 'O column winner test case Sucedded' : testT2 = 'O column winner test case Failed'
  console.log(`testerAllInAColumn - Test cases Results:
              ${testT1}
              ${testT2}`)
}

const testerAllInADiagonal = (player) => {
  resetMockTicTacToeObject()
  mockTicTacToeObject.allInADiagonal(player) ? testT1 = 'no diagonal winner test case Failed' : testT1 = 'no diagonal winner test case Sucedded'
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][0] = "M"
  mockTicTacToeObject.allInADiagonal(player) ? testT2 = 'M diagonal winner test case Sucedded' : testT2 = 'M diagonal winner test case Failed'
  console.log(`testerAllInADiagonal - Test cases Results:
                ${testT1}
                ${testT2}`)
}

const testerRulesConditionsToWin = (player) => {
  resetMockTicTacToeObject()
  mockTicTacToeObject.rulesConditionsToWin(player) ? testT1 = 'no winner test case Failed' : testT1 = 'no winner test case Sucedded'
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.rulesConditionsToWin(player) ? testT2 = 'column winner test case Sucedded' : testT2 = 'column winner test case Failed'
  resetMockTicTacToeObject()
  mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[1][2] = "X"
  mockTicTacToeObject.rulesConditionsToWin(player) ? testT3 = 'row winner test case Sucedded' : testT3 = 'row winner test case Failed'
  resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.rulesConditionsToWin(player) ? testT4 = 'diagonal winner test case Sucedded' : testT4 = 'diagonal winner test case Failed'
  console.log(`testerRulesConditionsToWin - Test cases Results:
                  ${testT1}
                  ${testT2}
                  ${testT3}
                  ${testT4}`)
}

const testerThereAreNotFreePositions = (player) => {
  resetMockTicTacToeObject()
  mockTicTacToeObject.thereAreFreePositions() ? testT1 = 'free positions test case Failed' : testT1 = 'free positions test case Sucedded'
  resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[0][2] =
    mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[1][2] =
    mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][1] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.thereAreFreePositions() ? testT2 = 'No free positions test case Sucedded' : testT2 = 'No free positions test case Failed'
  console.log(`testerIsGameFinished - Test cases Results:
                    ${testT1}
                    ${testT2}`)
}

const testerRulesConditionsToDraw = () => {
  resetMockTicTacToeObject()
  mockTicTacToeObject.rulesConditionsToDraw() ? testT1 = 'no draw no winner test case Failed - game not finished' : testT1 = 'no draw no winner test case Sucedded - game not finished'
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[2][2] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][2] = mockTicTacToeObject.game[2][1] = "X"
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[2][0] = "O"
  mockTicTacToeObject.rulesConditionsToDraw() ? testT2 = 'draw with X winner test case Failed' : testT2 = 'draw with X winner test case Sucedded'
  resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][1] = "X"
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.rulesConditionsToDraw() ? testT3 = 'draw with no winner test case Sucedded' : testT3 = 'draw with no winner test case Failed'
  console.log(`testerRulesConditionsToDraw - Test cases Results:
                      ${testT1}
                      ${testT2}
                      ${testT3}`)
}

const choseWhatToRun = () => {
  let run = prompt("Enter 1 to run the test cases or enter 2 to play TicTacToe game.")
  if (run === "1") {
    testerRulesConditionsToDraw()
    testerThereAreNotFreePositions()
    testerRulesConditionsToWin("X")
    testerAllInADiagonal("M")
    testerAllInAColumn("O")
    testerAllInARow("X")
    testerValidateIfItIsAvailable()
    testerValidateIfValidInput(input)
    return
  }
  if (run === "2") {
    let ticTacToe = new ticTacToeGame()
    ticTacToe.playGame()
    return
  }
}

//choseWhatToRun()
testerAllInARow("X")



