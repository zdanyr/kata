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

  n = 3; //dimension of the matrix
  game = new Array(this.n);
  keepPlaying = true;
  player = 'player 1'

  constructor() {
    for (let z = 0; z < this.n; z++) {
      this.game[z] = new Array(this.n);
    }

    for (let x = 0; x < this.n; x++) {
      for (let y = 0; y < this.n; y++) {
        this.game[x][y] = "."
      }
    }
  }

  playGame() {
    let i = 0
    let inputXOrO

    this.printMessage('startGame')
    this.drawingGame()
    while (this.keepPlaying) {
      (i % 2 === 0) ? inputXOrO = "X" : inputXOrO = "O"
      this.takeInput(inputXOrO)
      i++
    }
  }

  takeInput(inputXOrO) {
    let message
    let input
    let validInput = false

    while (validInput === false) {
      inputXOrO === "X" ? this.player = 'Player 1' : this.player = 'Player 2'
      message = `${this.player} enter a coord x,y to place your ${inputXOrO} or enter 'q' to give up`
      input = prompt(message)

      if (this.isValidInput(input)) {
        this.manageInput(input, inputXOrO)
        break
      }

      if (input === "q") {
        this.keepPlaying = false
        console.log("Game terminated. Thank you for playing :)")
        break
      }

      console.log(`
        Invalid input format. Please try again.
        ${message}`)
    }
  }

  manageInput(input, inputXOrO) {
    var x = input.substring(0, 1) - 1;
    var y = input.substring(2, 3) - 1;

    if (this.validateIfOnePositionIsAvailable(this.game[x][y])) {
      this.game[x][y] = inputXOrO
      this.drawingAndCheckWinDraw(inputXOrO)
      return
    }

    console.log(`Oh no, a piece is already at this place! Try again...`)
    this.takeInput(inputXOrO)

  }

  drawingAndCheckWinDraw(inputXOrO) {
    let winOrDraw = ''
    if (this.rulesConditionsToWin(inputXOrO)) {
      this.keepPlaying = false
      winOrDraw = 'win'
    }

    if (this.rulesConditionsToDraw()) {
      this.keepPlaying = false
      winOrDraw = 'draw'
    }

    this.printMessage(winOrDraw)
    this.drawingGame()
  }

  printMessage(a) {
    if (a === 'startGame') {
      console.log(`
    Welcome to Tic Tac Toe!
    Here's the current board:`)
      return
    }
    if (a === 'win') {
      console.log(`
    Move accepted, well done ${this.player} you've won the game!`)
      return
    }
    if (a === 'draw') {
      console.log(`
    Draw! No winner this time.`)
      return
    }
    console.log(`
    Move accepted, here's the current board:`)
  }

  drawingGame() {
    let a = ""
    for (let x = 0; x < this.n; x++) {
      for (let y = 0; y < this.n; y++) {
        a = `${a}${this.game[x][y]} `
      }
      a = `${a}\n`
    }
    console.log(a)
  }

  isValidInput(input) {
    let coordinatesXY = new RegExp(`^[1-${this.n}],[1-${this.n}]$`)
    return input.match(coordinatesXY)
  }

  validateIfOnePositionIsAvailable(t) { return (t === ".") }

  rulesConditionsToWin(inputXOrO) {
    return (this.allInARow(inputXOrO) || this.allInAColumn(inputXOrO) || this.allInADiagonal(inputXOrO))
  }

  allInARow(inputXOrO) {

    // for (let z = 0; z < this.n; z++) {
    //   if(this.game[z] !=inputXOrO) {
    //     break
    //   }
    //   return true
    // }

    for (let x = 0; x < this.n; x++) {
      for (let y = 0; y < this.n; y++) {
        if (this.game[x][y] != inputXOrO) {
          break
        }
        if (y === (this.n - 1)) { return true }
      }
    }
  }

  allInAColumn(inputXOrO) {

    for (let y = 0; y < this.n; y++) {
      for (let x = 0; x < this.n; x++) {
        if (this.game[x][y] != inputXOrO) {
          break
        }
        if (x === this.n - 1) { return true }
      }
    }
  }

  allInDirectDiagonal(inputXOrO) {
    let i = 0
    for (let x = 0; x < this.n; x++) {
      if (this.game[x][x] === inputXOrO) {
        i++
      }
      if (i === this.n) { return true }
    }
    return false
  }

  allInInverseDiagonal(inputXOrO) {
    let i = 0

    for (let y = 0; y < this.n; y++) {
      for (let x = 0; x < this.n; x++) {
        if (this.game[x][y] === this.game[y][x] && this.game[y][x] === inputXOrO && (x + y === this.n - 1)) {
          i++
        }
        if (i === this.n) { return true }
      }
    }

    return false
  }

  allInADiagonal(inputXOrO) {
    return (this.allInDirectDiagonal(inputXOrO) || this.allInInverseDiagonal(inputXOrO))
  }

  thereAreFreePositions() {
    for (let x = 0; x < this.n; x++) {
      if (this.game[x].some(this.validateIfOnePositionIsAvailable)) { return true }
    }
    return false
  }

  rulesConditionsToDraw() {
    return (!this.thereAreFreePositions() && !this.rulesConditionsToWin("X") && !this.rulesConditionsToWin("O"))
  }

  resetMockTicTacToeObject = () => {
    for (let x = 0; x < this.n; x++) {
      for (let y = 0; y < this.n; y++) {
        this.game[x][y] = "."
      }
    }
  }

}

let mockTicTacToeObject = new ticTacToeGame()
let input
let testT1, testT2, testT3, testT4, testT5



const testerValidateIfValidInput = (input) => {
  mockTicTacToeObject.isValidInput("1,2") ? testT1 = '(1,2) test case succeeded' : testT1 = '1,2 test case Failed'
  mockTicTacToeObject.isValidInput("4,1") ? testT2 = '(4,1) test case Failed' : testT2 = '4,1 test case succeeded'
  mockTicTacToeObject.isValidInput("a") ? testT3 = '(a) test case Failed' : testT3 = 'a test case succeeded'
  mockTicTacToeObject.isValidInput("1 2") ? testT4 = '(1 2) test case Failed' : testT4 = '1 2 test case succeeded'
  console.log(`testerValidateIfValidInput - Test cases Results:
        ${testT1}
        ${testT2}
        ${testT3}
        ${testT4}`)
}

const testerValidateIfItIsAvailable = (input) => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.validateIfOnePositionIsAvailable(mockTicTacToeObject.game[1][1]) ? testT1 = 'is available test case succeeded' : testT1 = 'is available test case Failed'
  mockTicTacToeObject.game[1][2] = "X"
  mockTicTacToeObject.validateIfOnePositionIsAvailable(mockTicTacToeObject.game[1][2]) ? testT2 = 'is not available x test case Failed' : testT2 = 'is not available x test case succeeded'
  console.log(`validateIfItIsAvailable - Test cases Results:
          ${testT1}
          ${testT2}`)
}

const testerAllInARow = (inputXOrO) => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[2][0] = "X"
  mockTicTacToeObject.allInARow(inputXOrO) ? testT1 = 'no row winner test case Failed' : testT1 = 'no row winner test case succeeded'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[0][2] = "X"
  mockTicTacToeObject.allInARow(inputXOrO) ? testT2 = 'X row winner test case succeeded' : testT2 = 'X row winner test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[1][2] = "X"
  mockTicTacToeObject.allInARow(inputXOrO) ? testT3 = 'X row winner test case succeeded' : testT3 = 'X row winner test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][1] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.allInARow(inputXOrO) ? testT4 = 'X row winner test case succeeded' : testT4 = 'X row winner test case Failed'
  console.log(`testerAllInARow - Test cases Results:
            ${testT1}
            ${testT2}
            ${testT3}
            ${testT4}`)

}

const testerAllInAColumn = (inputXOrO) => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.allInAColumn(inputXOrO) ? testT1 = 'no column winner test case Failed' : testT1 = 'no column winner test case succeeded'
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[2][0] = "O"
  mockTicTacToeObject.allInAColumn(inputXOrO) ? testT2 = 'O column winner test case succeeded' : testT2 = 'O column winner test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][1] = "O"
  mockTicTacToeObject.allInAColumn(inputXOrO) ? testT3 = 'O column winner test case succeeded' : testT3 = 'O column winner test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.allInAColumn(inputXOrO) ? testT4 = 'O column winner test case succeeded' : testT4 = 'O column winner test case Failed'
  console.log(`testerAllInAColumn - Test cases Results:
              ${testT1}
              ${testT2}
              ${testT3}
              ${testT4}`)
}

const testerAllInADiagonal = (inputXOrO) => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.allInADiagonal(inputXOrO) ? testT1 = 'no diagonal winner test case Failed' : testT1 = 'no diagonal winner test case succeeded'
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][0] = "O"
  mockTicTacToeObject.allInADiagonal(inputXOrO) ? testT2 = 'Inverse diagonal winner test case succeeded' : testT2 = 'Inverse diagonal winner test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.allInADiagonal(inputXOrO) ? testT3 = 'Direct diagonal winner test case succeeded' : testT3 = 'Direct diagonal winner test case Failed'
  console.log(`testerAllInADiagonal - Test cases Results:
                ${testT1}
                ${testT2}
                ${testT3}`)
}

const testerAllInInverseDiagonal = (inputXOrO) => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.allInInverseDiagonal(inputXOrO) ? testT1 = 'no inverse winner test case Failed' : testT1 = 'no inverse winner test case succeeded'
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][0] = "O"
  mockTicTacToeObject.allInInverseDiagonal(inputXOrO) ? testT2 = 'Inverse diagonal winner test case succeeded' : testT2 = 'Inverse diagonal winner test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][2] = "O"
  mockTicTacToeObject.allInInverseDiagonal(inputXOrO) ? testT3 = 'Only 02 test case Failed' : testT3 = 'Only 02 test case succeeded'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[2][0] = "O"
  mockTicTacToeObject.allInInverseDiagonal(inputXOrO) ? testT4 = 'Only 20 test case Failed' : testT4 = 'Only 20 test case succeeded'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][1] = "X"
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.allInInverseDiagonal(inputXOrO) ? testT5 = 'Random test case Failed' : testT5 = 'Random test case succeeded'
  console.log(`testerAllInInverseDiagonal - Test cases Results:
                ${testT1}
                ${testT2}
                ${testT3}
                ${testT4}
                ${testT5}`)
}

const testerAllInDirectDiagonal = (inputXOrO) => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.allInDirectDiagonal(inputXOrO) ? testT1 = 'No direct diagonal winner test case Failed' : testT1 = 'No direct diagonal winner test case succeeded'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.allInDirectDiagonal(inputXOrO) ? testT2 = '00 and 22 test case Failed' : testT2 = '00 and 22 test case succeeded'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.allInDirectDiagonal(inputXOrO) ? testT3 = 'Only 22 test case Failed' : testT3 = 'Only 22 test case succeeded'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][1] = "X"
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.allInDirectDiagonal() ? testT4 = 'Random test case Failed' : testT4 = 'Random test case succeeded'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.allInDirectDiagonal(inputXOrO) ? testT5 = 'Direct diagonal winner test case succeeded' : testT5 = 'Direct diagonal winner test case Failed'
  console.log(`testerAllInDirectDiagonal - Test cases Results:
                ${testT1}
                ${testT2}
                ${testT3}
                ${testT4}
                ${testT5}`)
}

const testerRulesConditionsToWin = (inputXOrO) => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.rulesConditionsToWin(inputXOrO) ? testT1 = 'no winner test case Failed' : testT1 = 'no winner test case succeeded'
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.rulesConditionsToWin(inputXOrO) ? testT2 = 'column winner test case succeeded' : testT2 = 'column winner test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[1][2] = "X"
  mockTicTacToeObject.rulesConditionsToWin(inputXOrO) ? testT3 = 'row winner test case succeeded' : testT3 = 'row winner test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.rulesConditionsToWin(inputXOrO) ? testT4 = 'diagonal winner test case succeeded' : testT4 = 'diagonal winner test case Failed'
  console.log(`testerRulesConditionsToWin - Test cases Results:
                  ${testT1}
                  ${testT2}
                  ${testT3}
                  ${testT4}`)
}

const testerThereAreFreePositions = (inputXOrO) => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.thereAreFreePositions() ? testT1 = 'All free positions test case succeeded' : testT1 = 'All free positions test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][1] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.thereAreFreePositions() ? testT2 = 'Last row filled - No free positions test case succeeded' : testT2 = 'Last row filled - No free positions test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = "X"
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[0][2] = "O"
  mockTicTacToeObject.thereAreFreePositions() ? testT3 = 'First row filled - free positions test case succeeded' : testT3 = 'First row filled - free positions test case Failed'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][1] = mockTicTacToeObject.game[2][2] = "X"
  mockTicTacToeObject.thereAreFreePositions() ? testT4 = 'No free positions test case Failed' : testT4 = 'No free positions test case succeeded'
  console.log(`testerThereAreFreePositions - Test cases Results:
                    ${testT1}
                    ${testT2}
                    ${testT3}
                    ${testT4}`)
}

const testerRulesConditionsToDraw = () => {
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.rulesConditionsToDraw() ? testT1 = 'game not finished test case Failed' : testT1 = 'game not finished test case succeeded'
  mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[2][2] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][1] = "X"
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[2][0] = "O"
  mockTicTacToeObject.rulesConditionsToDraw() ? testT2 = 'no empty with X winner test case Failed' : testT2 = 'no empty with X winner test case succeeded'
  mockTicTacToeObject.resetMockTicTacToeObject()
  mockTicTacToeObject.game[0][2] = mockTicTacToeObject.game[1][2] = mockTicTacToeObject.game[0][0] = mockTicTacToeObject.game[1][1] = mockTicTacToeObject.game[2][1] = "X"
  mockTicTacToeObject.game[0][1] = mockTicTacToeObject.game[1][0] = mockTicTacToeObject.game[2][0] = mockTicTacToeObject.game[2][2] = "O"
  mockTicTacToeObject.rulesConditionsToDraw() ? testT3 = 'draw with no winner test case succeeded' : testT3 = 'draw with no winner test case Failed'
  console.log(`testerRulesConditionsToDraw - Test cases Results:
                     ${testT1}
                     ${testT2}
                     ${testT3}
                      `)
}

const choseWhatToRun = () => {
  let run = prompt("Enter 1 to run the test cases or enter 2 to play TicTacToe game.")
  if (run === "1") {
    testerRulesConditionsToDraw()
    testerThereAreFreePositions()
    testerRulesConditionsToWin("X")
    testerAllInDirectDiagonal("O")
    testerAllInInverseDiagonal("O")
    testerAllInADiagonal("O")
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

let ticTacToe = new ticTacToeGame()
ticTacToe.playGame()

//testerAllInADiagonal("O")


