/*
# String Calculator Kata
## The Process
- Try not to read ahead.  
- Do one step at a time - work incrementally.  
- Make sure you only test for correct inputs - there is no need to test for invalid inputs
## The Steps 
### Step 1 
Create a simple string calculator with a method that takes a string and returns a number.  
~~~
Add("") > Returns 0
~~~
### Step 2 
A single number returns that number.  
~~~
Add("1") > Returns 1
Add("3") > Returns 3
~~~
### Step 3 
Two numbers return the sum of the numbers.  
~~~
Add("1,2") > Returns 3
Add("3,5") > Returns 8
~~~
### Step 4 
Any amount of numbers returns the sum of those numbers.  
~~~
Add("1,2,3") > Returns 6
Add("3,5,3,9") > Returns 20
~~~
### Step 5 
New line breaks and commas should be interchangeable between numbers.  
~~~
Add("1,2\n3") > Returns 6
Add("3\n5\n3,9") > Returns 20
~~~
The following is not ok, don't write a test but be aware... 
~~~
Add("1,\n")
~~~
### Step 6 
Support different delimiters - to change a delimiter, the beginning of the string will contain a separate line that looks like this:   
**"//[delimiter]\n[numbers...]"**  
~~~
Add("//;\n1;2") > Returns 3  
~~~
The first section up to the \n is optional. All existing steps should still be supported.  
### Step 7 
Calling add with a negative number will throw an exception "Negatives not allowed" and the negative number that was passed.  
~~~
Add("-1,2,-3") > Throws exception with Negatives not allowed: -1, -3  
~~~
### Step 8 
Numbers greater or equal to 1000 should be ignored.  
~~~
Add("1000,1001,2") > Returns 2  
~~~
### Step 9 
Delimiters can be of any length with the following format.  
**"//[delimiter]\n"**  
~~~
Add("//[***]\n1***2***3") > Returns 6  
~~~
### Step 10 
Allow multiple delimiters each one character long in length...  
**"//[delim1][delim2]\n"**
~~~
Add("//[*][%]\n1*2%3") > Returns 6  
Add("//[a][b][c][d]\n1a2a3b3c4d5") > Returns 18  
~~~
### Step 11 
Handle multiple delimiters with a length longer than one character.  
~~~
Add("//[***][#][%]\n1***2#3%4") > Returns 10  
~~~
### Step 12 
Handle delimiters that have numbers as part of them, where the number cannot be on the edge of a delimiter.  
~~~
Add("//[*1*][%]\n1*1*2%3") > Returns 6  
~~~
Note, a delimiter of 1DD or DD1 is not valid as it has a number on the edge of it. D1D is a valid delimiter.
----------------------------------------------------------------------------------------------
## Quick Summary of the rules #
- Empty String Returns 0  
- Two Numbers returns Sum  
- X Numbers Returns Sum  
- Custom Delimiter "//;\n1;2" = 3  
- Handle new line as delimiter  
- Cannot add negative numbers  
- Number bigger than 1000 are ignored  
- Delimiter of any length "//[dd]\n|[dd]2"=3  
- Allow multiple delimiter "//[%][;]\n1%2;3"=6  
- Multiple delimiter of any length  
*/

//TODO: 
//1- add 2-3 test cases per case
//2- rename variables
//3- use methods same level of abstractions

class stringCalculator {

    isANumber = new RegExp(`^[0-9]+$`) //Eg. 123
    isCommaSeparatorNumber = new RegExp(`^[0-9]+(,[0-9]+)*$`) //Eg. 1,2,3
    isCommaOrBreakLineSeparator = new RegExp(`^[0-9]+(,[0-9]+)*(\\n[0-9]+)*(,[0-9]+)*$`) //Eg. 3\n5\n3,9 or 1,2\n3
    isUserInputSeparator = new RegExp(`^\/\/.\\n`) //Eg. //;\n1;2
    hasNegativeNumbers = new RegExp(`^-{1}[1-9]+`) //Eg. -1,2,-3
    sum = 0
    inputAsArray = ''
    input = ''

    /*
### Step 8 
Numbers greater or equal to 1000 should be ignored.  
~~~
Add("1000,1001,2") > Returns 2 
*/
    Add(userInput) {
    
        this.input = userInput
        this.inputAsArray = this.input.split(',')

        if (this.input === "") { return 0 }

        if (this.input.match(this.isANumber)) {
            return parseInt(this.input)
        }

        if (this.input.match(this.isCommaSeparatorNumber)) {
            this.commaSeparator(this.input,this.inputAsArray)

        }

        


        if (this.input.match(this.isCommaOrBreakLineSeparator)) {
            let replaceBreakWithComma = this.input.replace(/\n/g, ',')
            this.inputAsArray = replaceBreakWithComma.split(',')
        }

        if (this.input.match(this.isUserInputSeparator)) {
            let delimiter = input.substr(2, 1)
            let positionOfSlashN = input.indexOf("\n")
            let inputToWorkWith = input.substr(positionOfSlashN)
            this.inputAsArray = inputToWorkWith.split(delimiter)
        }

        if (this.input.match(this.hasNegativeNumbers)) {  //Eg. -1,2,-3
            let negativeNumbers = ''
            this.inputAsArray = input.split(',')

            for (let i = 0; i < this.inputAsArray.length; i++) {
                if (this.inputAsArray[i] < 0) {
                    negativeNumbers = `${negativeNumbers} ${this.inputAsArray[i]}`
                }
            }
            negativeNumbers = negativeNumbers.replace(/^\s+/g, '')
            negativeNumbers = negativeNumbers.replace(/ /gi, ", ")
            return `Negatives not allowed: ${negativeNumbers}`
        }

       

        

        for (let i = 0; i < this.inputAsArray.length; i++) {
            this.sum = this.sum + parseInt(this.inputAsArray[i]);
        }

        return this.sum
    }

    commaSeparator(userInput,inputAsArray){
        let remove = new Array

        for (let i = 0; i < inputAsArray.length; i++) {
            if (inputAsArray[i] >= 1000) {
                remove[i] = inputAsArray[i]
            }
        }
        for (let i = 0; i < remove.length; i++) {
            inputAsArray.splice(inputAsArray.indexOf(remove[i]), 1);
        }

        this.inputAsArray = inputAsArray
        //console.log(`inputAsArray: ${inputAsArray}`)
    }

}


var tests = new Array()
const testerAdd = () => {
    toTestStringCalculator.Add("") === 0 ? tests.push("Step 1 empty string returns cero test case succeeded") : tests.push("Step 1 empty string returns cero test case failed");
    toTestStringCalculator.Add("1") === 1 ? tests.push("Step 2 string 1 returns 1 test case succeeded") : tests.push("Step 2 string 1 returns 1 test case failed");
    // toTestStringCalculator.Add("3") === 3 ? tests.push("Step 2 string 3 returns integer 3 test case succeeded") : tests.push("Step 2 string 3 returns integer 3 test case failed");
    // toTestStringCalculator.Add("1,2") === 3 ? tests.push("Step 3 string 1,2 returns 3 test case succeeded") : tests.push("Step 3 string 1,2 returns 3 test case failed");
    // toTestStringCalculator.Add("3,5") === 8 ? tests.push("Step 3 string 3,5 returns integer 8 test case succeeded") : tests.push("Step 3 string 3,5 returns integer 8 test case failed");
    // toTestStringCalculator.Add("1,2,3") === 6 ? tests.push("Step 4 string 1,2,3 returns 6 test case succeeded") : tests.push("Step 4 string 1,2,3 returns 6 test case failed");
    // toTestStringCalculator.Add("3,5,3,9") === 20 ? tests.push("Step 4 string 3,5,3,9 returns integer 20 test case succeeded") : tests.push("Step 4 string 3,5,3,9 returns integer 20 test case failed");
    // toTestStringCalculator.Add("1,2\n3") === 6 ? tests.push("Step 5 string 1,2\\n3 returns 6 test case succeeded") : tests.push("Step 5 string 1,2\\n3 returns 6 test case failed");
    // toTestStringCalculator.Add("3\n5\n3,9") === 20 ? tests.push("Step 5 string 3\\n5\\n3,9 returns integer 20 test case succeeded") : tests.push("Step 5 string 3\\n5\\n3,9 returns integer 20 test case failed");
    // toTestStringCalculator.Add("//;\n1;2") === 3 ? tests.push("Step 6 string //;\\n1;2 returns integer 3 test case succeeded") : tests.push("Step 6 string //;\\n1;2 returns integer 3 test case failed");
    // toTestStringCalculator.Add("//-\n1-44") === 45 ? tests.push("Step 6 string //-\\n1-2 returns integer 45 test case succeeded") : tests.push("Step 6 string //-\\n1-2 returns integer 45 test case failed");
    // toTestStringCalculator.Add("-1,2,-3") === 'Negatives not allowed: -1, -3' ? tests.push("Step 7 Negatives not allowed: -1, -3 test cases succeeded") : tests.push("Step 7 Negatives not allowed: -1, -3 test cases failed");
    // toTestStringCalculator.Add("1000,1001,2") === 2 ? tests.push("Step 8 numbers grater than 1000 are ignored test cases succeeded") : tests.push("Step 8 numbers grater than 1000 are ignored test cases failed");

    for (let i = 0; i < tests.length; i++) {
        console.log(tests[i])
    }
}

let toTestStringCalculator = new stringCalculator()
testerAdd()

console.log(` toTestStringCalculator.Add("3,5"): ${ toTestStringCalculator.Add("3,5")}`)
