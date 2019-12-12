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

//input
//dibujar
//loop for input
//validation -- done
//rules to win -- done
//rules to draw -- done

class ticTacToeGame {
    constructor(){
         this.t1 = "."
         this.t2 = "."
         this.t3 = "."
         this.t4 = "."
         this.t5 = "."
         this.t6 = "."
         this.t7 = "."
         this.t8 = "."
         this.t9 = "."
    }

    drawingGame(){
        console.log(
            `
            Welcome to Tic Tac Toe!
            Here's the current board:
            ${this.t1} ${this.t2} ${this.t3}
            ${this.t4} ${this.t5} ${this.t6}
            ${this.t7} ${this.t8} ${this.t9}
            `
        )
    }

    takeInput(){
      let input = prompt("Player 1 enter a coord x,y to place your X or enter 'q' to give up:")
      this.manageInput(input,"X")
    }

    manageInput (input, player) {
      let redo = false
      if (validateIfValidImput(input)){
        switch (input) {
          case "1,1":
            if(this.validateIfAlreadyTaken(this.t1)){
               this.t1 = player
               this.drawingGame()
               break;
            }else{
              redo = true
            }
          default: redo = true
        }
        if(redo){
          console.log(`Oh no, a piece is already at this place! Try again...`)
          this.takeInput()
        }
      }else{
        console.log(`invalid input format. Try again.`)
      }
      }

    validateIfValidImput(input){
      let regex = new RegExp('^[1-8](,[1-8])+$')
      return input.match(regex)
    }

    validateIfItIsAvailable(ti){
      return ti === "."
    }

    rulesConditionsToWin(ticTacToeGame, player){
     return (this.allInARow(ticTacToeGame, player) || this.allInAColumn(ticTacToeGame, player) || this.allInADiagonal(ticTacToeGame, player)) ? true : false
    }

    allInARow(ticTacToeGame, player){
      return ((ticTacToeGame.t1 == player & ticTacToeGame.t2 == player & ticTacToeGame.t3 == player) ||
         (ticTacToeGame.t4 == player & ticTacToeGame.t5 == player & ticTacToeGame.t6 == player) ||
         (ticTacToeGame.t7 == player & ticTacToeGame.t8 == player & ticTacToeGame.t9 == player)) ? true : false
    }
    allInAColumn(ticTacToeGame, player){
      return ((ticTacToeGame.t1 == player & ticTacToeGame.t4 == player & ticTacToeGame.t7 == player) ||
         (ticTacToeGame.t2 == player & ticTacToeGame.t5 == player & ticTacToeGame.t8 == player) ||
         (ticTacToeGame.t3 == player & ticTacToeGame.t6 == player & ticTacToeGame.t9 == player)) ? true : false
    }
    allInADiagonal(ticTacToeGame, player){
      return ((ticTacToeGame.t1 == player & ticTacToeGame.t5 == player & ticTacToeGame.t9 == player) ||
         (ticTacToeGame.t3 == player & ticTacToeGame.t5 == player & ticTacToeGame.t7 == player)) ? true : false
    }

    isGameFinished(ticTacToeGame){
      let ticTacToeGameAsArray = Object.values(ticTacToeGame)
      return !(ticTacToeGameAsArray.find(this.isNotTaken))
    }

    isNotTaken(a) {
      return (a === ".") ? true : false
    }

    rulesConditionsToDraw(ticTacToeGame, player){
       return (this.isGameFinished(ticTacToeGame) & !this.rulesConditionsToWin(ticTacToeGame,player))
    }

}


let ticTac = new ticTacToeGame ()
const mockTicTacToeObject = {
  t1: ".",
  t2: "O",
  t3: "O",
  t4: "X",
  t5: "X",
  t6: "X",
  t7: ".",
  t8: ".",
  t9: "."
}
const mockTicTacToeObjectColumn = {
  t1: "X",
  t2: "O",
  t3: "O",
  t4: "X",
  t5: ".",
  t6: "O",
  t7: "X",
  t8: ".",
  t9: "."
}
const mockTicTacToeObjectDiagonal = {
  t1: "X",
  t2: "O",
  t3: "O",
  t4: "X",
  t5: "X",
  t6: "O",
  t7: "X",
  t8: ".",
  t9: "X"
}
const mockTicTacToeObjectNoWinnerDraw = {
  t1: "X",
  t2: "O",
  t3: "X",
  t4: "X",
  t5: "O",
  t6: "O",
  t7: "O",
  t8: "X",
  t9: "X"
}
const mockTicTacToeObjectWithWinnerDraw = {
  t1: "X",
  t2: "X",
  t3: "X",
  t4: "X",
  t5: "O",
  t6: "O",
  t7: "O",
  t8: "X",
  t9: "X"
}
const mockTicTacToeObjectNoWinnerNoDraw = {
  t1: "X",
  t2: ".",
  t3: ".",
  t4: "X",
  t5: "O",
  t6: ".",
  t7: "O",
  t8: ".",
  t9: "X"
}

const testerValidateIfValidImput = () => {
	let testT1, testT2, testT3, testT4
	ticTac.validateIfValidImput("1,2") ? testT1 = '(1,2) test case sucedded' : testT1 = '1,2 test case Failed'
	!ticTac.validateIfValidImput("1") ? testT2 = '(1) test case Succeded' : testT2 = '1 test case Failed'
	!ticTac.validateIfValidImput("a") ? testT3 = '(a) test case Succeded' : testT3 = 'a test case Failed'
	!ticTac.validateIfValidImput("1 2") ? testT4 = '(1 2) test case Succeded' : testT4 = '1 2 test case Failed'
	console.log(`testerValidateIfValidImput - Test cases Results:
    ${testT1}
    ${testT2}
    ${testT3}
    ${testT4}`)
}
//testerValidateIfValidImput()
const testerValidateIfItIsAvailable = () => {
  let testT1, testT2, testT3
  ticTac.validateIfItIsAvailable(mockTicTacToeObject.t1) ? testT1 = 'is available test case sucedded' : testT1 = 'is available test case Failed'
  !ticTac.validateIfItIsAvailable(mockTicTacToeObject.t2) ? testT2 = 'is not available x test case sucedded' : testT2 = 'is not available x test case Failed'
  !ticTac.validateIfItIsAvailable(mockTicTacToeObject.t3) ? testT3 = 'is not available o test case sucedded' : testT3 = 'is not available o test case Failed'
  console.log(`validateIfAlreadyTaken - Test cases Results:
      ${testT1}
      ${testT2}
      ${testT3}`)
}
testerValidateIfItIsAvailable()
const testerAllInARow = (ticTacToeObject,player) => {
  let testT1, testT2
	ticTac.allInARow(ticTacToeObject,player) ? testT1 = 'X second row test case Sucedded' : testT1 = 'X second row test case Failed'
	ticTac.allInARow(mockTicTacToeObjectDiagonal,player) ? testT2 = 'no row winner test case Failed' : testT2 = 'no row winner test case Sucedded'
console.log(`testerAllInARow - Test cases Results:
  ${testT1}
  ${testT2}`)
}
//testerAllInARow(mockTicTacToeObject,"X")
const testerAllInAColumn = (ticTacToeObject,player) => {
  let testT1, testT2
	ticTac.allInAColumn(mockTicTacToeObjectColumn,player) ? testT1 = 'column test case Sucedded' : testT1 = 'column test case Failed'
	ticTac.allInAColumn(mockTicTacToeObject,player) ? testT2 = 'no column winner test case Failed' : testT2 = 'no column winner test case Succeded'
console.log(`testerAllInAColumn - Test cases Results:
  ${testT1}
  ${testT2}`)
}
//testerAllInAColumn(mockTicTacToeObjectColumn,"X")
const testerAllInADiagonal = (ticTacToeObject,player) => {
  let testT1, testT2
	ticTac.allInADiagonal(mockTicTacToeObjectDiagonal,player) ? testT1 = 'diagonal test case Sucedded' : testT1 = 'diagonal test case Failed'
	ticTac.allInADiagonal(mockTicTacToeObject,player) ? testT2 = 'no diagonal winner test case Failed' : testT2 = 'no diagonal winner test case Succeded'
console.log(`testerAllInADiagonal - Test cases Results:
  ${testT1}
  ${testT2}`)
}
//testerAllInADiagonal(mockTicTacToeObjectDiagonal,"X")
const testerRulesConditionsToWin = (ticTacToeGame, player) => {
  let testT1, testT2, testT3, testT4
  ticTac.rulesConditionsToWin(mockTicTacToeObject,player) ? testT1 = 'row test case Sucedded' : testT1 = 'row test case Failed'
  ticTac.rulesConditionsToWin(mockTicTacToeObjectColumn,player) ? testT2 = 'column test case Sucedded' : testT2 = 'column test case test case Succeded'
  ticTac.rulesConditionsToWin(mockTicTacToeObjectDiagonal,player) ? testT3 = 'digagonal test case Sucedded' : testT3 = 'digagonal test case Failed'
  ticTac.rulesConditionsToWin(mockTicTacToeObjectNoWinnerDraw,player) ? testT4 = 'no winner test case Failed' : testT4 = 'no winner test case Succeded'
console.log(`testerRulesConditionsToWin - Test cases Results:
  ${testT1}
  ${testT2}
  ${testT3}
  ${testT4}`)
}
//testerRulesConditionsToWin(mockTicTacToeObject,"X")
const testerIsGameFinished = (ticTacToeGame, player) => {
  let testT1, testT2
  ticTac.isGameFinished(mockTicTacToeObjectNoWinnerDraw) ? testT1 = 'game finished test case Sucedded' : testT1 = 'game finished test case test case Failed'
  ticTac.isGameFinished(mockTicTacToeObjectColumn) ? testT2 = 'game not finished test case Failed' : testT2 = 'game not finished test case test case Sucedded'
  console.log(`testertesterisGameFinished - Test cases Results:
   ${testT1}
   ${testT2}`)
}
//testerIsGameFinished(mockTicTacToeObject)
const testerRulesConditionsToDraw = (ticTacToeGame, player) => {
  let testT1, testT2, testT3, testT4
  ticTac.rulesConditionsToDraw(mockTicTacToeObjectNoWinnerDraw) ? testT1 = 'draw with no winner test case Sucedded' : testT1 = 'draw with no winner test case Failed'
  ticTac.rulesConditionsToDraw(mockTicTacToeObjectWithWinnerDraw) ? testT2 = 'draw with winner test case Sucedded' : testT2 = 'draw with winner test case test case Failed'
  ticTac.rulesConditionsToDraw(mockTicTacToeObjectColumn) ? testT3 = 'no draw with winner test case Failed' : testT3 = 'no draw with winner test case test case Sucedded'
  ticTac.rulesConditionsToDraw(mockTicTacToeObjectNoWinnerNoDraw) ? testT4 = 'no draw with no winner test case Failed' : testT4 = 'no draw with no winner test case test case Sucedded'
  console.log(`testerRulesConditionsToDraw - Test cases Results:
   ${testT1}
   ${testT2}
   ${testT3}
   ${testT4}`)
}
//testerRulesConditionsToDraw(mockTicTacToeObject)
//ticTac.drawingGame()
//ticTac.takeInput()
