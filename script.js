"use strict"

let numbers = [];
let tempNums = [];
let operations = '';
let tempOperations = '';
let result = 0;


let number = document.querySelectorAll('.numbers');
number.forEach(button => {
	button.addEventListener('click', event => {
		if (numbers.length < 12 && operations === '' && numbers.indexOf(result) === -1) {
			numbers.push(event.srcElement.value);
			if (numbers[0] === '0' && numbers[1] !== '.') {
				numbers.shift();
			}
		} else if (tempNums.length < 12 && operations !== '' && (numbers.length > 0 || result !== 0)) {
			tempNums.push(event.srcElement.value);
			operations = operations || tempOperations;
			tempOperations = '';
			calculate(numbers, operations, tempNums);
		} else {
			return;
		}
	});
});

let operation = document.querySelectorAll('.operations');
operation.forEach(button => {
	button.addEventListener('click', event => {
		if (numbers.length < 1) {
			return;
		} else if (operations === '') {
			operations = event.srcElement.value;

		} else if ((operations === 'r' || operations === 'log') && numbers.length > 0) {
			calculate(numbers, operations, tempNums);
			numbers = [];
			numbers.push(result);
			operations = '';

		} else if (operations !== '' && tempNums.length > 0) {
			tempOperations = event.srcElement.value;
			calculate(numbers, operations, tempNums);
			numbers = [];
			numbers.push(result);
			operations = tempOperations;
			tempOperations = '';
			tempNums = [];


		} else {
			return;
		}
	})
});

function calculate(firstValue, operations, secondValue) {

	let first = parseFloat(firstValue.join(''), 10);
	let second = parseFloat(secondValue.join(''), 10);

	switch (operations) {
		case '+':
			result = first + second;
			break;

		case '-':
			result = first - second;
			break;

		case '*':
			result = first * second;
			break;

		case '/':
			result = first / second;
			break;
		case 'sq':
			result = first ** second;
			break;
		case '%':
			result = (first / 100) * second;
			break;
		case 'r':
			result = Math.sqrt(first);
			break;
		case 'log':
			result = 1 / first;
			break;
		case 'l':
			result = 1 / first;
			break;
		default:
			return;

	}
	if (Number.isInteger(result)) {
		result;
	} else {
		result = result.toFixed(10);
	}
	return document.getElementById('result').innerHTML = result;
}

function cls() {
	result = 0;
	operations = '';
	numbers = [];
	tempNums = [];

	return document.getElementById('result').innerHTML = 0;
}

function correct() {

	if (tempNums.length > 0) {
		tempNums.pop();
		return document.getElementById('result').innerHTML = numbers.join('') + operations + tempNums.join('');
	} else if (operations !== '') {
		operations = '';
		return document.getElementById('result').innerHTML = numbers.join('') + operations + tempNums.join('');
	} else if (numbers.length > 1) {
		numbers.pop();
		return document.getElementById('result').innerHTML = numbers.join('') + operations + tempNums.join('');
	} else {
		return;
	}
}
window.addEventListener('keydown', (e) => {
	console.log(e.key);
	if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) !== -1) {
		if (numbers.length < 12 && operations === '' && numbers.indexOf(result) === -1) {
			numbers.push(e.key);
		} else if (tempNums.length < 12 && operations !== '' && (numbers.length > 0 || result !== 0)) {
			tempNums.push(e.key);
			operations = operations || tempOperations;
			tempOperations = '';
			calculate(numbers, operations, tempNums);
		} else {
			return;
		}


	} else if (['+', '-', '*', '/', '%', 'r', 'l'].indexOf(e.key) !== -1) {
		if (numbers.length < 1) {
			return;
		} else if (operations === '') {
			operations = e.key;
			document.getElementById('result').innerHTML = numbers.join('') + operations;
		} else if ((operations === 'r' || operations === 'l') && numbers.length > 0) {
			calculate(numbers, operations, tempNums);
			numbers = [];
			numbers.push(result);
			operations = '';
		} else if (operations !== '' && tempNums.length > 0) {
			tempOperations = e.key;
			document.getElementById('result').innerHTML = numbers.join('') + operations + tempNums.join('');
			calculate(numbers, operations, tempNums);
			numbers = [];
			numbers.push(result);
			operations = tempOperations;
			tempOperations = '';
			tempNums = [];


		} else {
			return;
		}
	} else if (e.key === 'Backspace') {
		correct();
	} else if (e.key === 'Escape') {
		cls();
	}
})
window.addEventListener('click', (n) => {
	document.getElementById('result').innerHTML = numbers.join('') + operations + tempNums.join('');

})
window.addEventListener('keypress', (f) => {
	document.getElementById('result').innerHTML = numbers.join('') + operations + tempNums.join('');
})

function point() {
	document.getElementById('dot').disabled = true;

}
let specials = document.querySelectorAll('.special');
specials.forEach(button => {
	button.addEventListener('click', event => {
		console.log(numbers);
		if (event.srcElement.value === '-' && numbers.indexOf('-') === -1 ) {
			console.log('passed');
			numbers.unshift('-');
		}else{
			console.log('failed');
			numbers[0]=parseInt(numbers[0]);
		}
	})
})
/*
for tommorow
try with more true false statements
check big numbers
figure out the dot
*/
