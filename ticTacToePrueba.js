
class ticTacToeGame {
    constructor(){
         this.t1 = "."
         this.t2 = "X"
    }
  allInARow = (player) => this.t1 === "." & this.t2 === "."
}

let mockTicTacToeAllDots = new ticTacToeGame()
const testerAllInARow = (player) => {
  let testT1 = mockTicTacToeAllDots.allInARow(player)
console.log(`${testT1}`)
}
testerAllInARow("X")
