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
### Step 5 
New line breaks and commas should be interchangeable between numbers.  
Add("1,2\n3") > Returns 6
Add("3\n5\n3,9") > Returns 20
~~~
The following is not ok, don't write a test but be aware... 
~~~
Add("1,\n")
*/
    Add(input) {
        let sum = 0
        let inputAsArray = input.split(',')
        if (input === "") { return 0 }

        for (let i = 0; i < inputAsArray.length; i++) {
            sum = sum + parseInt(inputAsArray[i]);
        }
        return sum;
    }

}



var test1, test2, test3, test4, test5, test6, test7, test8, test9
const testerAdd = () => {
    toTestStringCalculator.Add("") === 0 ? test1 = "empty string returns cero test case succeeded" : test1 = "empty string returns cero test case failed";
    toTestStringCalculator.Add("1") === 1 ? test2 = "string 1 returns 1 test case succeeded" : test2 = "string 1 returns 1 test case failed";
    toTestStringCalculator.Add("3") === 3 ? test3 = "string 3 returns integer 3 test case succeeded" : test3 = "string 3 returns integer 3 test case failed";
    toTestStringCalculator.Add("1,2") === 3 ? test4 = "string 1,2 returns 3 test case succeeded" : test4 = "string 1,2 returns 3 test case failed";
    toTestStringCalculator.Add("3,5") === 8 ? test5 = "string 3,5 returns integer 8 test case succeeded" : test5 = "string 3,5 returns integer 8 test case failed";
    toTestStringCalculator.Add("1,2,3") === 6 ? test6 = "string 1,2,3 returns 6 test case succeeded" : test6 = "string 1,2,3 returns 6 test case failed";
    toTestStringCalculator.Add("3,5,3,9") === 20 ? test7 = "string 3,5,3,9 returns integer 20 test case succeeded" : test7 = "string 3,5,3,9 returns integer 20 test case failed";
    toTestStringCalculator.Add("1,2\n3") === 6 ? test8 = "string 1,2\\n3 returns 6 test case succeeded" : test8 = "string 1,2\\n3 returns 6 test case failed";
    toTestStringCalculator.Add("3\n5\n3,9") === 20 ? test9 = "string 3\\n5\\n3,9 returns integer 20 test case succeeded" : test9 = "string 3\\n5\\n3,9 returns integer 20 test case failed";
    console.log(`testerAdd test cases results:
    Test1: ${test1}
    Test2: ${test2}
    Test3: ${test3}
    Test4: ${test4}
    Test5: ${test5}
    Test6: ${test6}
    Test7: ${test7}
    Test8: ${test8}
    Test9: ${test9}
    `)
}

let toTestStringCalculator = new stringCalculator()
testerAdd()