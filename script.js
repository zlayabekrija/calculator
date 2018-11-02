let numbers = [];
let tempNums = [];
let operations = '';
let tempOperations = '';
let result = 0;
let history = [];

let number = document.querySelectorAll('.numbers');
number.forEach(button => {
	button.addEventListener('click', event => {
		if (numbers.length < 12 && operations === '' && numbers.indexOf(result) === -1) {

			numbers.push(event.srcElement.innerHTML);
			document.getElementById('result').innerHTML = numbers.join('');


		} else if (tempNums.length < 12 && operations !== '' && numbers.length > 0) {
			tempNums.push(event.srcElement.innerHTML);
			document.getElementById('result').innerHTML = numbers.join('') + operations + tempNums.join('');
		} else {
			return;
		}


	});
});

let operation = document.querySelectorAll('.operations');
operation.forEach(button => {
	button.addEventListener('click', event => {
		if (operations === '') {
			operations = event.srcElement.value;
			document.getElementById('result').innerHTML = numbers.join('') + operations;
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
			operations = '';
			tempNums = [];

		} else {
			return;
		}
	})
});

function calculate(firstValue, operations, secondValue = [] ,tempOperations) {

	let first = parseInt(firstValue.join(''), 10);
	let second = parseInt(secondValue.join(''), 10);
	if (result !== 0) {
		history.push(first, operations, second);
		document.getElementById('temporary').innerHTML = history.join('');
	}	
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
		default:
			return;

	}
	if (Number.isInteger(result)) {
		result;
	} else {
		result = result.toFixed(2);
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
	} else {
		numbers.pop();
		return document.getElementById('result').innerHTML = numbers.join('') + operations + tempNums.join('');
	}
}
/* 
for tommorow :
##write the rest of functions
##prepare for more functionality
## add keyboard events
*/
