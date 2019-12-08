// # Fizz Buzz Kata Write a program that prints the numbers from 1 to 100.
// But for multiples of three print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”."
// ## Example Output
// 1
// 2
// Fizz
// 4
// Buzz
// Fizz
// 7
// etc.

const fizzBuzz = (i) => {
	let toPrint
	if(i%3===0){
			if(i%5===0){
				toPrint = 'FizzBuzz'
			}else{
				toPrint = 'Fizz'
			}
		}else{
			if(i%5===0){
				toPrint = 'Buzz'
		}else{
			toPrint = i
		}
	}
	return toPrint
}

const printer = () => {
	let i = 1
	while(i<101){
		let print = fizzBuzz(i)
		console.log(print)
		i++
	}
}

const tester = () => {
	let testT1, testT2, testT3, testT4
	fizzBuzz(6) === 'Fizz' ?  testT1 = 'Fizz test case Succeded' :  testT1 = 'Fizz test case Failed'
	fizzBuzz(10) === 'Buzz' ?  testT2 = 'Buzz test case Succeded' :  testT2 = 'Buzz test case Failed'
	fizzBuzz(30) === 'FizzBuzz' ?  testT3 = 'FizzBuzz test case Succeded' :  testT3 = 'FizzBuzz test case Failed'
	fizzBuzz(1) === '1' ?  testT4 = 'No mult of 3 nor 5 test case Succeded' :  testT4 = 'No mult of 3 nor 5 test case Failed'
	console.log(`Test cases Results: ${testT1} - ${testT2} - ${testT3} - ${testT4}`)
}

tester()
printer()
