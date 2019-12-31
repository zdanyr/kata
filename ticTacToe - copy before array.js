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
  constructor(){
    this.game[1,1] = ".";
    console.log(`this.game[1,1] - ${this.game[1,1]}`)
    // this.game[1,2] = ".";
    // this.game[1,3] = ".";
    // this.game[2,1] = ".";
    // this.game[2,2] = ".";
    // this.game[2,3] = ".";
    // this.game[3,1] = ".";
    // this.game[3,2] = ".";
    // this.game[3,3] = ".";
  }

  keepPlaying = true;
  // ticTacToeDictionary = {
  //   "1,1": "t1",
  //   "1,2": "t2",
  //   "1,3": "t3",
  //   "2,1": "t4",
  //   "2,2": "t5",
  //   "2,3": "t6",
  //   "3,1": "t7",
  //   "3,2": "t8",
  //   "3,3": "t9",
  // }

  playGame(){
    let i = 0
    let player
    console.log(`
      Welcome to Tic Tac Toe!
      Here's the current board:`)
      this.drawingGame()
      while(this.keepPlaying){
        (i % 2 === 0) ? player = "X" : player ="O"
        this.takeInput(player)
        i++
      }
    }

    takeInput(player){

      let message
      let input
      player === "X" ?
      message = "Player 1 enter a coord x,y to place your X or enter 'q' to give up" :
      message = "Player 2 enter a coord x,y to place your O or enter 'q' to give up"
      input = prompt(message)

      if (this.validateIfValidImput(input)){
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

      manageInput (input, player) {
        let redo = false
//let value = this.ticTacToeDictionary[input];
//let a = eval("this."+value)
//let b = eval("this."+this.ticTacToeDictionary[input]);

if(this.validateIfItIsAvailable(a)){
  console.log(` it is available - this.value: ${eval("this."+value)}`)
  this.value = player
  this.drawAndCheckWinDraw(player)
}else{
  console.log(` it is not available`)}


        // switch (input) {
        //   case "1,1":
        //   if(this.validateIfItIsAvailable(this.t1)){
        //     this.t1 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   case "1,2":
        //   if(this.validateIfItIsAvailable(this.t2)){
        //     this.t2 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   case "1,3":
        //   if(this.validateIfItIsAvailable(this.t3)){
        //     this.t3 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   case "2,1":
        //   if(this.validateIfItIsAvailable(this.t4)){
        //     this.t4 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   case "2,2":
        //   if(this.validateIfItIsAvailable(this.t5)){
        //     this.t5 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   case "2,3":
        //   if(this.validateIfItIsAvailable(this.t6)){
        //     this.t6 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   case "3,1":
        //   if(this.validateIfItIsAvailable(this.t7)){
        //     this.t7 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   case "3,2":
        //   if(this.validateIfItIsAvailable(this.t8)){
        //     this.t8 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   case "3,3":
        //   if(this.validateIfItIsAvailable(this.t9)){
        //     this.t9 = player
        //     this.drawAndCheckWinDraw(player)
        //   }else{
        //     redo = true
        //   }
        //   break;
        //   default: redo = true
        // }
        if(redo){
          console.log(`Oh no, a piece is already at this place! Try again...`)
          this.takeInput(player)
        }

      }

      drawAndCheckWinDraw(player){
        if(this.rulesConditionsToWin(player)){
          let winner
          player === "X" ? winner = "player 1" : winner = "player 2"
          this.keepPlaying = false
          console.log(`Move accepted, well done ${winner} you've won the game!`)
        }else if(this.rulesConditionsToDraw()){
          this.keepPlaying = false
          console.log("Draw! No winner this time.")
        }else {
          console.log(`Move accepted, here's the current board:`)
        }
        this.drawingGame()
      }

      drawingGame(){
        console.log(`
          ${this.t1} ${this.t2} ${this.t3}
          ${this.t4} ${this.t5} ${this.t6}
          ${this.t7} ${this.t8} ${this.t9}
          `
        )
      }

      validateIfValidImput(input){
        let regex = new RegExp('^[1-3](,[1-3])+$')
        return input.match(regex)
      }

      validateIfItIsAvailable(t){return (t === ".")}

      rulesConditionsToWin(player){
        return (this.allInARow(player) || this.allInAColumn(player) || this.allInADiagonal(player))
      }

      allInARow (player){
        return ((this.t1 === player & this.t2 === player & this.t3 === player) ||
        (this.t4 === player & this.t5 === player & this.t6 === player) ||
        (this.t7 === player & this.t8 === player & this.t9 === player))
      }
      allInAColumn(player){
        return ((this.t1 === player & this.t4 === player & this.t7 === player) ||
        (this.t2 === player & this.t5 === player & this.t8 === player) ||
        (this.t3 === player & this.t6 === player & this.t9 === player))
      }
      allInADiagonal(player){
        return ((this.t1 === player & this.t5 === player & this.t9 === player) ||
        (this.t3 === player & this.t5 === player & this.t7 === player))
      }

      isGameFinished(){
        let ticTacToeGameAsArray = Object.values(this)
        return !(ticTacToeGameAsArray.find(this.isNotTaken))
      }

      isNotTaken(a) {return (a === ".")}

      rulesConditionsToDraw(){
        return (this.isGameFinished() & (!this.rulesConditionsToWin("X") || !this.rulesConditionsToWin("O")))
      }

    }

    let ticTacToe = new ticTacToeGame ()
    //ticTacToe.playGame()

    let mockTicTacToeObject = new ticTacToeGame()
    let mockTicTacToeObjectColumn = new ticTacToeGame("X","O","O","X",".","O","X",".",".")
    let mockTicTacToeObjectDiagonal = new ticTacToeGame("X","O","O","X","X","O",".",".","X")
    let mockTicTacToeObjectNoWinnerDraw = new ticTacToeGame("X","O","X","X","O","O","O","X","X")
    let mockTicTacToeObjectWithWinnerDraw = new ticTacToeGame("X","X","X","X","O","O","O","X","X")
    let mockTicTacToeObjectNoWinnerNoDraw = new ticTacToeGame("X",".",".","X","O",".","O",".","X")
    let input
    const testerValidateIfValidImput = (input) => {
      let testT1, testT2, testT3, testT4
      mockTicTacToeObject.validateIfValidImput("1,2") ? testT1 = '(1,2) test case Sucedded' : testT1 = '1,2 test case Failed'
      mockTicTacToeObject.validateIfValidImput("4,1") ? testT2 = '(4,1) test case Failed' : testT2 = '4,1 test case Sucedded'
      mockTicTacToeObject.validateIfValidImput("a") ? testT3 = '(a) test case Failed' : testT3 = 'a test case Sucedded'
      mockTicTacToeObject.validateIfValidImput("1 2") ? testT4 = '(1 2) test case Failed' : testT4 = '1 2 test case Sucedded'
      console.log(`testerValidateIfValidImput - Test cases Results:
        ${testT1}
        ${testT2}
        ${testT3}
        ${testT4}`)
      }
      //testerValidateIfValidImput(input)
      const testerValidateIfItIsAvailable = (input) => {
        let testT1, testT2, testT3
        //mockTicTacToeObject.validateIfItIsAvailable(mockTicTacToeObject.this[1,1]) ? testT1 = 'is available test case Sucedded' : testT1 = 'is available test case Failed'
        //mockTicTacToeObject.validateIfItIsAvailable(mockTicTacToeObject.t4) ? testT2 = 'is not available x test case Failed' : testT2 = 'is not available x test case Sucedded'
      //  mockTicTacToeObject.validateIfItIsAvailable(mockTicTacToeObject.t2) ? testT3 = 'is not available o test case Failed' : testT3 = 'is not available o test case Sucedded'
        console.log(`validateIfItIsAvailable - Test cases Results:
          ${testT1}
          ${testT2}
          ${testT3}`)
        }
        //testerValidateIfItIsAvailable()
        const testerAllInARow = (player) => {
          let testT1, testT2
          mockTicTacToeObject.allInARow(player) ? testT1 = 'X second row test case Sucedded' : testT1 = 'X second row test case Failed'
          mockTicTacToeObjectNoWinnerDraw.allInARow(player) ? testT2 = 'no  winner test case Failed' : testT2 = 'no row winner test case Sucedded'
          console.log(`testerAllInARow - Test cases Results:
            ${testT1}
            ${testT2}`)
          }
          //testerAllInARow("X")
          const testerAllInAColumn = (player) => {
            let testT1, testT2
            mockTicTacToeObjectColumn.allInAColumn(player) ? testT1 = 'column test case Sucedded' : testT1 = 'column test case Failed'
            mockTicTacToeObject.allInAColumn(player) ? testT2 = 'no column winner test case Failed' : testT2 = 'no column winner test case Succeded'
            console.log(`testerAllInAColumn - Test cases Results:
              ${testT1}
              ${testT2}`)
            }
            //testerAllInAColumn("X")
            const testerAllInADiagonal = (player) => {
              let testT1, testT2
              mockTicTacToeObjectDiagonal.allInADiagonal(player) ? testT1 = 'diagonal test case Sucedded' : testT1 = 'diagonal test case Failed'
              mockTicTacToeObject.allInADiagonal(player) ? testT2 = 'no diagonal winner test case Failed' : testT2 = 'no diagonal winner test case Succeded'
              console.log(`testerAllInADiagonal - Test cases Results:
                ${testT1}
                ${testT2}`)
              }
              //testerAllInADiagonal("X")
              const testerRulesConditionsToWin = (player) => {
                let testT1, testT2, testT3, testT4
                mockTicTacToeObject.rulesConditionsToWin(player) ? testT1 = 'row test case Sucedded' : testT1 = 'row test case Failed'
                mockTicTacToeObjectColumn.rulesConditionsToWin(player) ? testT2 = 'column test case Sucedded' : testT2 = 'column test case test case Failed'
                mockTicTacToeObjectDiagonal.rulesConditionsToWin(player) ? testT3 = 'digagonal test case Sucedded' : testT3 = 'digagonal test case Failed'
                mockTicTacToeObjectNoWinnerDraw.rulesConditionsToWin(player) ? testT4 = 'no winner test case Failed' : testT4 = 'no winner test case Succeded'
                console.log(`testerRulesConditionsToWin - Test cases Results:
                  ${testT1}
                  ${testT2}
                  ${testT3}
                  ${testT4}`)
                }
                //testerRulesConditionsToWin("X")
                const testerIsGameFinished = (player) => {
                  let testT1, testT2
                  mockTicTacToeObjectNoWinnerDraw.isGameFinished() ? testT1 = 'game finished test case Sucedded' : testT1 = 'game finished test case test case Failed'
                  mockTicTacToeObjectColumn.isGameFinished() ? testT2 = 'game not finished test case Failed' : testT2 = 'game not finished test case test case Sucedded'
                  console.log(`testertesterisGameFinished - Test cases Results:
                    ${testT1}
                    ${testT2}`)
                  }
                  //testerIsGameFinished()
                  const testerRulesConditionsToDraw = () => {
                    let testT1, testT2, testT3, testT4
                    mockTicTacToeObjectNoWinnerDraw.rulesConditionsToDraw() ? testT1 = 'draw with no winner test case Sucedded' : testT1 = 'draw with no winner test case Failed'
                    mockTicTacToeObjectWithWinnerDraw.rulesConditionsToDraw() ? testT2 = 'draw with winner test case Sucedded' : testT2 = 'draw with winner test case test case Failed'
                    mockTicTacToeObjectColumn.rulesConditionsToDraw() ? testT3 = 'no draw with winner test case Failed' : testT3 = 'no draw with winner test case test case Sucedded'
                    mockTicTacToeObjectNoWinnerNoDraw.rulesConditionsToDraw() ? testT4 = 'no draw with no winner test case Failed' : testT4 = 'no draw with no winner test case test case Sucedded'
                    console.log(`testerRulesConditionsToDraw - Test cases Results:
                      ${testT1}
                      ${testT2}
                      ${testT3}
                      ${testT4}`)
                    }
                    //testerRulesConditionsToDraw()
