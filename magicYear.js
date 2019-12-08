/*
# Magic Year Calculator
## Overview
We have the following rules:
* Magic Year = work start year + 65
* Monthly salary = annual salary / 12 (rounded up)
* All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar increment, otherwise round down.
For example, the following calculations would result with an annual salary of $60,050 starting work in the year 1980:​
* Monthly salary = 60,050 / 12 = 5,004.16666667 (round down) = 5,004
* Magic year = 1980 + 65 = 2045
### Your Task
Generate a magic year calculator. You should be able to enter a single persons details, the application will generate a result. Everything will be done via the console.
An example run through of of how this console would be...
Welcome to the magic year calculator!
Please input your name: John
Please input your surname: Doe
Please enter your annual salary: 60050
Please enter your work start year : 1980
Your magic age details are:
Name: John Doe
Monthly Salary: 5004
Magic Year: 2045
*/

class Person {
  constructor(name, lastName, salary, workStartYear){
    this.name = name
    this.lastName = lastName
    this.salary = salary
    this.workStartYear = workStartYear
  }

  montlySalary () {
    return Math.round(this.salary / 12)
  }

  magicYear () {
    return parseInt(this.workStartYear) + 65
  }

  responseMessage(){
    console.log(`Your magic age details are:
      Name: ${this.name} ${this.lastName}
      Monthly Salary: ${this.montlySalary()}
      Magic Year: ${this.magicYear()}
      `)
  }
}

const tester = () => {
  let luca = new Person('Luca', 'Rendon', 60050, 1980)
	let testT1, testT2
	luca.montlySalary() === 5004 ?  testT1 = 'montlySalary test case Succeded' :  testT1 = 'montlySalary test case Failed'
	luca.magicYear() === 2045 ?  testT2 = 'magicYear test case Succeded' :  testT2 = 'magicYear test case Failed'
	console.log(`Test cases Results: ${testT1} - ${testT2}`)
}

tester()

let name = prompt("Please input your name:")
let lastName = prompt("Please input your surname:")
let annualSalary = prompt("Please enter your annual salary:")
let workStartYear = prompt("Please enter your work start year:")
let persona = new Person(name, lastName, annualSalary, workStartYear)
persona.responseMessage()
//todo add validations for the input of the user
