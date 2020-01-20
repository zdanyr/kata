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
    /*
### Step 7 
Calling add with a negative number will throw an exception "Negatives not allowed" and the negative number that was passed.  
~~~
Add("-1,2,-3") > Throws exception with Negatives not allowed: -1, -3  
~~~
*/
    Add(input) {
        let step2Rex = new RegExp(`^[1-9]+$`) //Eg. 123
        let step3Rex = new RegExp(`^[1-9]+(,[1-9]+)*$`) //Eg. 1,2,3
        let step5Rex = new RegExp(`^[1-9]+(,[1-9]+)*(\\n[1-9]+)*(,[1-9]+)*$`) //Eg. 3\n5\n3,9 or 1,2\n3
        let step6Rex = new RegExp(`^\/\/.\\n`) //Eg. //;\n1;2
        let step7Rex = new RegExp(`^-{1}[1-9]+`) //Eg. -1,2,-3
        let sum = 0
        let inputAsArray = ''


        if (input === "") { return 0 }

        if (input.match(step2Rex)) {
            return parseInt(input)
        }

        if (input.match(step3Rex)) {
            inputAsArray = input.split(',')
        }

        if (input.match(step5Rex)) {
            let replaceBreakWithComma = input.replace(/\n/g, ',')
            inputAsArray = replaceBreakWithComma.split(',')
        }

        if (input.match(step6Rex)) {
            let delimiter = input.substr(2, 1)
            let positionOfSlashN = input.indexOf("\n")
            let inputToWorkWith = input.substr(positionOfSlashN)
            inputAsArray = inputToWorkWith.split(delimiter)
        }

        if (input.match(step7Rex)) {  //Eg. -1,2,-3
            let negativeNumbers = ''
            inputAsArray = input.split(',')

            for (let i = 0; i < inputAsArray.length; i++) {
                if (inputAsArray[i] < 0) { 
                    negativeNumbers = `${negativeNumbers} ${inputAsArray[i]}` 
                }
            }
            negativeNumbers = negativeNumbers.replace(/^\s+/g, '')
            negativeNumbers = negativeNumbers.replace(/ /gi, ", ")
            return `Negatives not allowed: ${negativeNumbers}`
        }

        for (let i = 0; i < inputAsArray.length; i++) {
            sum = sum + parseInt(inputAsArray[i]);
        }

        return sum
    }

}


var tests = new Array()
const testerAdd = () => {
    toTestStringCalculator.Add("") === 0 ? tests[0] = "Step 1 empty string returns cero test case succeeded" : tests[0] = "Step 1 empty string returns cero test case failed";
    toTestStringCalculator.Add("1") === 1 ? tests[1] = "Step 2 string 1 returns 1 test case succeeded" : tests[1] = "Step 2 string 1 returns 1 test case failed";
    toTestStringCalculator.Add("3") === 3 ? tests[2] = "Step 2 string 3 returns integer 3 test case succeeded" : tests[2] = "Step 2 string 3 returns integer 3 test case failed";
    toTestStringCalculator.Add("1,2") === 3 ? tests[3] = "Step 3 string 1,2 returns 3 test case succeeded" : tests[3] = "Step 3 string 1,2 returns 3 test case failed";
    toTestStringCalculator.Add("3,5") === 8 ? tests[4] = "Step 3 string 3,5 returns integer 8 test case succeeded" : tests[4] = "Step 3 string 3,5 returns integer 8 test case failed";
    toTestStringCalculator.Add("1,2,3") === 6 ? tests[5] = "Step 4 string 1,2,3 returns 6 test case succeeded" : tests[5] = "Step 4 string 1,2,3 returns 6 test case failed";
    toTestStringCalculator.Add("3,5,3,9") === 20 ? tests[6] = "Step 4 string 3,5,3,9 returns integer 20 test case succeeded" : tests[6] = "Step 4 string 3,5,3,9 returns integer 20 test case failed";
    toTestStringCalculator.Add("1,2\n3") === 6 ? tests[7] = "Step 5 string 1,2\\n3 returns 6 test case succeeded" : tests[7] = "Step 5 string 1,2\\n3 returns 6 test case failed";
    toTestStringCalculator.Add("3\n5\n3,9") === 20 ? tests[8] = "Step 5 string 3\\n5\\n3,9 returns integer 20 test case succeeded" : tests[8] = "Step 5 string 3\\n5\\n3,9 returns integer 20 test case failed";
    toTestStringCalculator.Add("//;\n1;2") === 3 ? tests[9] = "Step 6 string //;\\n1;2 returns integer 3 test case succeeded" : tests[9] = "Step 6 string //;\\n1;2 returns integer 3 test case failed";
    toTestStringCalculator.Add("//-\n1-44") === 45 ? tests[10] = "Step 6 string //-\\n1-2 returns integer 45 test case succeeded" : tests[10] = "Step 6 string //-\\n1-2 returns integer 45 test case failed";
    toTestStringCalculator.Add("-1,2,-3") === 'Negatives not allowed: -1, -3' ? tests[11] = "Step 7 Negatives not allowed: -1, -3 test cases succeeded" : tests[10] = "Step 7 Negatives not allowed: -1, -3 test cases failed";

    for (let i = 0; i < tests.length; i++) {
        console.log(tests[i])
    }
}

let toTestStringCalculator = new stringCalculator()
testerAdd()

//console.log(`toTestStringCalculator.Add("-1,2,-3"): ${toTestStringCalculator.Add("-1,2,-3")}`)
