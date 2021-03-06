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

class stringCalculator {

    isCommaOrBreakLineSeparatorFormat = `^[0-9]+(,[0-9]+)*(\n[0-9]+)*(,[0-9]+)*$` //Eg.123 or 1,2,3 or 3\n5\n3,9 or 1,2\n3
    isCustomSeparatorFormat = /^\/\/.\n/ //Eg. //;\n1;2;7  //-\n1-2   
    isManyCustomSeparatorsAnyLengthFormat = /^\/\/(\[.+\])+\n/ //Eg. //[a][b][c][d]\n1a2a3b3c4d5
    hasNegativeNumbersFormat = `^-{1}[0-9]+` //Eg. -1,2,-3
    commaAsDelimiter = ','
    inputAsArray = new Array
    inputBeforeBreakLineAsArray = new Array
    customDelimiter = new Array

    Add(userInput) {

        if (this.isInputEmpty(userInput)) {
            return this.returnZero()
        }

        if (this.hasNegativeNumbers(userInput)) {
            return this.handleNegativeNumbers(userInput)
        }

        if (this.hasValueGraterThan1000(userInput)) {
            this.removeValuesGraterThan1000()
            return this.getSumOfElements()
        }

        if (this.isCommaOrBreakLineSeparator(userInput)) {
            this.handleCommaOrBreakLineSeparator(userInput)
            return this.getSumOfElements()
        }

        if (this.isCustomDelimiter(userInput)) {
            this.handleCustomDelimiter(userInput)
            return this.getSumOfElements()
        }

        if (this.isOneOrManyCustomDelimitersAnyLength(userInput)) { // [a][b][c][d]\n1a2a3b3c4d5
            this.handleOneOrManyCustomDelimitersAnyLength(userInput)
            this.inputAsArray = this.inputAsArray.split(',')
            return this.getSumOfElements()
        }
    }

    handleCommaOrBreakLineSeparator(userInput) {
        let InputWithCommaDelimiter = this.replaceBreakLineWithComma(userInput)
        this.convertInputWithCustomSeparatorIntoArray(InputWithCommaDelimiter, this.commaAsDelimiter)
    }

    handleCustomDelimiter(userInput) {
        let userCustomDelimiter = this.findDelimiter(userInput)
        let inputToSum = this.splitInputReturnAfterBreakLine(userInput)
        this.convertInputWithCustomSeparatorIntoArray(inputToSum, userCustomDelimiter)
    }

    handleOneOrManyCustomDelimitersAnyLength(userInput) {
        this.handleInputBeforeBreakLine(userInput)
        this.handleInputAfterBreakLine(userInput)
    }

    handleInputBeforeBreakLine(userInput) {
        let inputBeforeBreakLine = this.splitInputReturnBeforeBreakLine(userInput) //[a][b][c][d]
        this.inputBeforeBreakLineAsArray = inputBeforeBreakLine.split('')
        this.findAllDelimitersFromInput()
    }

    handleInputAfterBreakLine(userInput) {
        this.inputAsArray = this.splitInputReturnAfterBreakLine(userInput)
        this.removeAllCustomDelimitersFromInput()
    }

    removeAllCustomDelimitersFromInput() {
        for (let i = 0; i < this.customDelimiter.length; i++) {
            this.inputAsArray = this.removeCustomDelimiterFromInput(this.inputAsArray, this.customDelimiter[i])
        }
    }

    findAllDelimitersFromInput() {
        for (let i = 0; i < this.inputBeforeBreakLineAsArray.length; i++) {
            this.customDelimiter[i] = this.findCustomDelimiter(this.inputBeforeBreakLineAsArray)
            this.replaceCustomDelimiterWithEmptySpace(this.inputBeforeBreakLineAsArray, this.customDelimiter[i])
        }
    }

    replaceCustomDelimiterWithEmptySpace(userInputArray, customDelimiter) {
        let userInputAsString = userInputArray.join('')
        let positionOfCustomDelimiter = userInputAsString.indexOf(customDelimiter)
        this.inputBeforeBreakLineAsArray = userInputAsString.slice(positionOfCustomDelimiter + customDelimiter.length + 1).split('')
    }

    hasValueGraterThan1000(userInput) {
        this.convertInputWithCustomSeparatorIntoArray(userInput, this.commaAsDelimiter)
        return this.inputAsArray.some(x => x >= 1000)
    }

    removeValuesGraterThan1000() {
        let valuesToRemove = new Array
        let valuesToRemoveWithoutEmptyValues = new Array

        for (let i = 0; i < this.inputAsArray.length; i++) {
            if (this.inputAsArray[i] >= 1000) {
                valuesToRemove[i] = this.inputAsArray[i]
            }
        }
        valuesToRemoveWithoutEmptyValues = valuesToRemove.filter(rem => rem != '')

        for (let i = 0; i < valuesToRemoveWithoutEmptyValues.length; i++) {
            this.inputAsArray.splice(this.inputAsArray.indexOf(valuesToRemoveWithoutEmptyValues[i]), 1);
        }
        return this.inputAsArray
    }

    hasNegativeNumbers(userInput) {
        this.convertInputWithCustomSeparatorIntoArray(userInput, this.commaAsDelimiter)
        return this.inputAsArray.some(x => x.match(this.hasNegativeNumbersFormat))
    }

    handleNegativeNumbers(userInput) {
        return this.messageOfListOfNegativeNumbers(this.inputAsArray)
    }

    messageOfListOfNegativeNumbers(inputAsArray) {
        let negativeNumbers = ''
        for (let position = 0; position < inputAsArray.length; position++) {
            if (inputAsArray[position] < 0) {
                negativeNumbers = `${negativeNumbers} ${inputAsArray[position]}`
            }
        }
        negativeNumbers = negativeNumbers.replace(/^\s+/g, '')
        negativeNumbers = negativeNumbers.replace(/ /g, ", ")
        return `Negatives not allowed: ${negativeNumbers}`
    }

    getSumOfElements() {
        return this.sumNumbersInArray(this.inputAsArray)
    }

    splitInputReturnAfterBreakLine(userInput) {
        let positionOfSlashN = userInput.indexOf("\n")
        return userInput.substr(positionOfSlashN + 1)
    }

    splitInputReturnBeforeBreakLine(userInput) {
        let positionOfSlashN = userInput.indexOf("\n")
        return userInput.substr(0, positionOfSlashN + 1)
    }

    findDelimiter(userInput) {
        return userInput.substr(2, 1)
    }

    findCustomDelimiter(inputBeforeBreakAsArray) {
        let openBracket = inputBeforeBreakAsArray.indexOf('[')
        let closeBracket = inputBeforeBreakAsArray.indexOf(']')
        let customDelimiter = inputBeforeBreakAsArray.slice(openBracket + 1, (closeBracket))
        return customDelimiter.join('')
    }

    isCustomDelimiter(userInput) {
        return userInput.match(this.isCustomSeparatorFormat)
    }

    isOneOrManyCustomDelimitersAnyLength(userInput) {
        return userInput.match(this.isManyCustomSeparatorsAnyLengthFormat)
    }

    isInputEmpty(userInput) {
        return userInput === ""
    }

    returnZero() {
        return 0
    }

    convertInputWithCustomSeparatorIntoArray(toConvertIntoArray, usingDelimiter) {
        this.inputAsArray = toConvertIntoArray.split(usingDelimiter)
    }

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    removeCustomDelimiterFromInput(userInputWithManyDelimiters, usingDelimiter) {
        let delimiterWithoutSpecialCharacters = this.escapeRegExp(usingDelimiter)
        let delimiterWithoutSpecialCharactersAsREx = new RegExp(delimiterWithoutSpecialCharacters, 'gi');
        this.inputAsArray = userInputWithManyDelimiters.replace(delimiterWithoutSpecialCharactersAsREx, ',')
        return this.inputAsArray
    }

    removeBackSlashDelimiterFromInput(inputWithoutSpecialCharacters) {
        let doubleBackSlash = new RegExp(/\\/, 'gi')
        this.inputAsArray = inputWithoutSpecialCharacters.replace(doubleBackSlash, '')
        return this.inputAsArray
    }

    sumNumbersInArray(inputAsArray) {
        let sum = 0
        for (let position = 0; position < inputAsArray.length; position++) {
            sum = sum + parseInt(inputAsArray[position]);
        }
        return sum
    }

    isCommaOrBreakLineSeparator(userInput) {
        return userInput.match(this.isCommaOrBreakLineSeparatorFormat)
    }

    replaceBreakLineWithComma(userInput) {
        return userInput.replace(/\n/g, ',')
    }
}


var tests = new Array()
const testerAdd = () => {
    toTestStringCalculator.Add("") === 0 ? tests.push("Step 1 empty string returns cero test case succeeded") : tests.push(`Step 1 empty string expected: cero - actual: ${toTestStringCalculator.Add("")}`);
    toTestStringCalculator.Add("1") === 1 ? tests.push("Step 2 string 1 returns 1 test case succeeded") : tests.push(`Step 2 string 1 returns 1 - actual: ${toTestStringCalculator.Add("1")}`);
    toTestStringCalculator.Add("3") === 3 ? tests.push("Step 2 string 3 returns integer 3 test case succeeded") : tests.push(`Step 2 string 3 returns integer 3 - actual: ${toTestStringCalculator.Add("3")}`);
    toTestStringCalculator.Add("10") === 10 ? tests.push("Step 2 string 10 returns integer 10 test case succeeded") : tests.push(`Step 2 string 10 returns integer 10 - actual: ${toTestStringCalculator.Add("10")}`);
    toTestStringCalculator.Add("1,2") === 3 ? tests.push("Step 3 string 1,2 returns 3 test case succeeded") : tests.push(`Step 3 string 1,2 returns 3 - actual: ${toTestStringCalculator.Add("1,2")}`);
    toTestStringCalculator.Add("3,50") === 53 ? tests.push("Step 3 string 3,50 returns integer 53 test case succeeded") : tests.push(`Step 3 string 3,50 returns integer 53 - actual: ${toTestStringCalculator.Add("3,50")}`);
    toTestStringCalculator.Add("1,2,3") === 6 ? tests.push("Step 4 string 1,2,3 returns 6 test case succeeded") : tests.push(`Step 4 string 1,2,3 returns 6 - actual: ${toTestStringCalculator.Add("1,2,3")}`);
    toTestStringCalculator.Add("3,5,3,9") === 20 ? tests.push("Step 4 string 3,5,3,9 returns integer 20 test case succeeded") : tests.push(`Step 4 string 3,5,3,9 returns integer 20 - actual: ${toTestStringCalculator.Add("3,5,3,9")}`);
    toTestStringCalculator.Add("1,2\n3") === 6 ? tests.push("Step 5 string 1,2\\n3 returns 6 test case succeeded") : tests.push(`Step 5 string 1,2\\n3 returns 6 - actual: ${toTestStringCalculator.Add("1,2\n3")}`);
    toTestStringCalculator.Add("3\n5\n30,9") === 47 ? tests.push("Step 5 string 3\\n5\\n30,9 returns integer 47 test case succeeded") : tests.push(`Step 5 string 3\\n5\\n30,9 returns integer 20 - actual: ${toTestStringCalculator.Add("3\n5\n30,9")}`);
    toTestStringCalculator.Add("//;\n1;20") === 21 ? tests.push("Step 6 string //;\\n1;20 returns integer 21 test case succeeded") : tests.push(`Step 6 string //;\\n1;20 returns integer 21 - actual: ${toTestStringCalculator.Add("//;\n1;20")}`);
    toTestStringCalculator.Add("//-\n1-44") === 45 ? tests.push("Step 6 string //-\\n1-2 returns integer 45 test case succeeded") : tests.push(`Step 6 string //-\\n1-2 returns integer 45 - actual: ${toTestStringCalculator.Add("//-\n1-2")}`);
    toTestStringCalculator.Add("//-\n1-44-100") === 145 ? tests.push("Step 6 string //-\\n1-2-100 returns integer 145 test case succeeded") : tests.push(`Step 6 string //-\\n1-2-100 returns integer 145 - actual: ${toTestStringCalculator.Add("//-\n1-2-100")}`);
    toTestStringCalculator.Add("-1,2,-3") === 'Negatives not allowed: -1, -3' ? tests.push("Step 7 Negatives not allowed: -1, -3 test cases succeeded") : tests.push(`Step 7 Negatives not allowed: -1, -3 - actual: ${toTestStringCalculator.Add("-1,2,-3")}`);
    toTestStringCalculator.Add("1,-20,-30,1") === 'Negatives not allowed: -20, -30' ? tests.push("Step 7 Negatives not allowed: -20, -30 test cases succeeded") : tests.push(`Step 7 Negatives not allowed: -20, -30 - actual: ${toTestStringCalculator.Add("1,-20,-30,1")}`);
    toTestStringCalculator.Add("1000,1001,2") === 2 ? tests.push("Step 8 numbers grater than 1000 are ignored test cases succeeded") : tests.push(`Step 8 numbers grater than 1000 are ignored - actual: ${toTestStringCalculator.Add("1000,1001,2")}`);
    toTestStringCalculator.Add("1000,1001,2,2000,1,5000") === 3 ? tests.push("Step 8 numbers grater than 1000 are ignored test cases succeeded") : tests.push(`Step 8 numbers grater than 1000 are ignored - actual: ${toTestStringCalculator.Add("1000,1001,2,2000,1,5000")}`);
    toTestStringCalculator.Add("2,2000,10") === 12 ? tests.push("Step 8 numbers grater than 1000 are ignored test cases succeeded") : tests.push(`Step 8 numbers grater than 1000 are ignored - actual: ${toTestStringCalculator.Add("2,2000,10")}`);
    toTestStringCalculator.Add("//[*]\n1*2") === 3 ? tests.push("Step 9 custom delimiter can have any size test cases succeeded - //[*]\\n1*2") : tests.push(`Step 9 custom delimiter can have any size //[*]\\n1*2 - actual: ${toTestStringCalculator.Add("//[*]\n1*2")}`);
    toTestStringCalculator.Add("//[+]\n1+2") === 3 ? tests.push("Step 9 custom delimiter can have any size test cases succeeded - //[+]\\n1+2") : tests.push(`Step 9 custom delimiter can have any size //[+]\\n1+2 - actual: ${toTestStringCalculator.Add("//[+]\n1+2")}`);
    toTestStringCalculator.Add("//[*]\n1*2") === 3 ? tests.push("Step 9 custom delimiter can have any size test cases succeeded - //[*]\\n1*2") : tests.push(`Step 9 custom delimiter can have any size //[*]\\n1*2 - actual: failed`);
    toTestStringCalculator.Add("//[***]\n1***2***3") === 6 ? tests.push("Step 9 custom delimiter can have any size test cases succeeded - //[***]\\n1***2***3") : tests.push(`Step 9 custom delimiter can have any size //[***]\\n1***2***3 - actual: ${toTestStringCalculator.Add("//[***]\n1***2***3")}`);
    toTestStringCalculator.Add("//[!*--*]\n1!*--*20!*--*3") === 24 ? tests.push("Step 9 custom delimiter can have any size test cases succeeded - //[!*--*]\\n1!*--*20!*--*3") : tests.push(`Step 9 custom delimiter can have any size //[!*--*]\\n1!*--*20!*--*3 - actual: failed`); // ${toTestStringCalculator.Add("//[!*--*]\\n1!*--*20!*--*3")}
    toTestStringCalculator.Add("//[*][%]\n1*2%3") === 6 ? tests.push("Step 10 many delimiters test cases succeeded - //[*][%]\\n1*2%3") : tests.push(`Step 10 many delimiters //[*][%]\\n1*2%3 - actual: ${toTestStringCalculator.Add("//[*][%]\\n1*2%3")}`);
    toTestStringCalculator.Add("//[a][b][c][d]\n1a2a3b3c4d5") === 18 ? tests.push("Step 10 many delimiters test cases succeeded - //[a][b][c][d]\\n1a2a3b3c4d5") : tests.push(`Step 10 many delimiters //[a][b][c][d]\\n1a2a3b3c4d5- actual: ${toTestStringCalculator.Add("//[a][b][c][d]\n1a2a3b3c4d5")}`);
    toTestStringCalculator.Add("//[***][#][%]\n10***2#3%4") === 19 ? tests.push("Step 11 many delimiters test cases succeeded - //[***][#][%]\\n10***2#3%4") : tests.push(`Step 11 many delimiters //[***][#][%]\\n10***2#3%4- actual: ${toTestStringCalculator.Add("//[***][#][%]\n10***2#3%4")}`);
    toTestStringCalculator.Add("//[///][*][#][%]\n1///2#3%4///5") === 15 ? tests.push("Step 11 many delimiters test cases succeeded - //[///][*][#][%]\\n1///2#3%4///5") : tests.push(`Step 11 many delimiters //[///][*][#][%]\\n1///2#3%4///5- actual: ${toTestStringCalculator.Add("//[///][*][#][%]\n1///2#3%4///5")}`);
    toTestStringCalculator.Add("//[*1*][%]\n1*1*2%3") === 6 ? tests.push("Step 12 delimiters with numbers test cases succeeded - //[*1*][%]\n1*1*2%3") : tests.push(`Step 12 delimiters with numbers //[*1*][%]\n1*1*2%3 - actual: ${toTestStringCalculator.Add("//[*1*][%]\n1*1*2%3")}`);
    toTestStringCalculator.Add("//[/1*][%]\n1/1*2%3") === 6 ? tests.push("Step 12 delimiters with numbers test cases succeeded - //[/1*][%]\n1/1*2%3") : tests.push(`Step 12 delimiters with numbers //[/1*][%]\n1/1*2%3 - actual: ${toTestStringCalculator.Add("//[/1*][%]\n1/1*2%3")}`);
    toTestStringCalculator.Add("//[**1*][%%]\n1**1*2%%3") === 6 ? tests.push("Step 12 delimiters with numbers test cases succeeded - //[**1*][%%]\n1**1*2%%3") : tests.push(`Step 12 delimiters with numbers //[**1*][%%]\n1**1*2%%3 - actual: ${toTestStringCalculator.Add("//[**1*][%%]\n1**1*2%%3")}`);


    for (let i = 0; i < tests.length; i++) {
        console.log(tests[i])
    }
}

let toTestStringCalculator = new stringCalculator()
testerAdd()
