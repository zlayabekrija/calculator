let numbers = [];
let tempNums = [];
let operations = '';
let tempOperations = '';
let result = 0;

let number = document.querySelectorAll('.numbers');
number.forEach(button => {
	button.addEventListener('click', event => {
		if (numbers.length < 12 && operations === '') {

			numbers.push(event.srcElement.innerHTML);
			document.getElementById('result').innerHTML = numbers.join('');


		} else if (tempNums.length < 12 && operations !== '' && tempOperations === '') {
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
		} else if (operations !== '' && tempNums.length > 0 && tempOperations === '') {
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

function calculate(firstValue, operations, secondValue) {

	let first = parseInt(firstValue.join(''), 10);
	let second = parseInt(secondValue.join(''), 10);
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

		default:
			return;

	}
	if (Number.isInteger(result)) {
		result;
	} else {
		result = result.toFixed(11);
	}
	return document.getElementById('result').innerHTML = result;
}
