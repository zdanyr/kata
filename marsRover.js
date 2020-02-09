/*
# Mars Rover Kata
​
Develop an api that moves a rover around on a grid.
​
You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
The rover receives a character array of commands.
* Implement commands that move the rover forward/backward (f,b).
* Implement commands that turn the rover left/right (l,r).
* Implement wrapping from one edge of the grid to another. (planets are spheres after all)
* Implement obstacle detection before each move to a new square. 
If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point and reports the obstacle.
*/

class marsRovers {
    constructor(initialPoint){
        this.initialPoint = initialPoint;
    }
}


const testerMarsRover = () => {
    let tests = new Array()
    testMarsRover.initialPoint === "(4,5)" ? tests.push("initialStartingPoint succeeded") : tests.push("initialStartingPoint failed"); 
    testMarsRover.initialPoint === "(4,4)" ? tests.push("initialStartingPoint failed") : tests.push("initialStartingPoint succeeded"); 

    for (let i = 0; i < tests.length; i++) {
        console.log(tests[i])
    }
}


const testMarsRover = new marsRovers("(4,5)");
testerMarsRover()
