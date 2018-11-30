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
			if (numbers[0] === '0') {
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
		case '\^':
			result = first ** second;
			break;
		default:
			return;

	}
	if (!Number.isFinite(result)) {
		result = result.toFixed(10);
	}


	return result;
}

function cls() {
	result = 0;
	operations = '';
	numbers = [];
	tempNums = [];
	document.getElementById('top').innerHTML = '';
	return document.getElementById('result').innerHTML = 0;
}


window.addEventListener('keydown', (e) => {
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


	} else if (['+', '-', '*', '/', '%', 'r', 'l', '\^'].indexOf(e.key) !== -1) {
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
		return correct();
	} else if (e.key === 'Escape') {
		cls();
	} else if (e.key === '.') {
		point(numbers, tempNums);
	} else if (e.key === '=') {
		calculate(numbers, operations, tempNums);
		numbers = [];
		numbers.push(result);
		operations = '';
		tempOperations = '';
		tempNums = [];
	}
})
window.addEventListener('click', (n) => {
	display(numbers, tempNums, operations);
})
window.addEventListener('keydown', (f) => {
	display(numbers, tempNums, operations);
})

function correct() {

	if (tempNums.length > 0) {
		return tempNums.pop();
	} else if (operations !== '') {
		return operations = '';

	} else if (numbers.length > 1) {
		return numbers.pop();

	} else if (numbers.lenght === 0){
		return numbers[0] = 1;
	}
	else {
		return;
	}
}

let specials = document.querySelectorAll('.special');
specials.forEach(button => {
	button.addEventListener('click', event => {

		if (event.srcElement.value === '-') {
			plusMinus(numbers, tempNums);
		} else if (event.srcElement.value === '.') {
			point(numbers, tempNums);
		} else if (event.srcElement.value === '=') {
			calculate(numbers, operations, tempNums);
			numbers = [];
			numbers.push(result);
			operations = '';
			tempOperations = '';
			tempNums = [];
		}
	})
})

function point(first, second) {
	if (second.length < 1 && first.indexOf('.') === -1) {
		return first.push('.');
	} else if (first.length > 0 && second.indexOf('.') === -1) {
		return second.push('.');
	} else {
		return;
	}
}

function plusMinus(first, second) {
	if (first.length === 0) {
		return;
	} else if (first.length > 0 && second.length < 1) {
		if (first.indexOf('-') === -1 && first.length > 1) {
			return first[0] = -first[0];
		} else if (first.length <= 1 && first[0] > 0) {
			return first[0] = -first[0];
		} else if (first.length > 1 && first[0] > 0) {
			return first[0] = Math.abs(first[0]);
		} else if (first.length <= 1 && first[0] < 0) {
			return first[0] = Math.abs(first[0]);
		}

	} else {
		if (second[0] > 0) {
			return second[0] = -second[0]
		} else {
			return second[0] = Math.abs(second[0]);
		}
	}
}


function display(first, second, ops) {
	if (ops === 'sq' || ops === '\^') {
		ops = '\^';
	} else if (ops === 'r') {
		ops = '&radic;';
	} else if (ops === 'log' || ops === 'l') {
		ops = 1 + '\/';
	}
	let display = parseFloat(first.join(''));
	let outputFirst = display.toLocaleString(undefined, {
		maximumFractionDigits: 12
	});
	display = parseFloat(second.join(''));
	let outputSecond = display.toLocaleString(undefined, {
		maximumFractionDigits: 12
	});
	if (outputFirst === 'NaN' && outputSecond === 'NaN') {

		return document.getElementById('result').innerHTML = 0;
	} else if (outputSecond === 'NaN') {
		if (ops === '&radic;' || ops === '1\/') {
			return document.getElementById('result').innerHTML = ops + outputFirst;
		} else {
			return document.getElementById('result').innerHTML = outputFirst + ops;
		}
	} else {
		document.getElementById('top').innerHTML = outputFirst + ops;
		document.getElementById('result').innerHTML = outputSecond;
	}

}

function help() {
	let para = document.getElementById('helpDisplay');
	let compStyles = window.getComputedStyle(para);
	let check = compStyles.getPropertyValue('display');
	let showHide = document.getElementById('helpDisplay').style;
	if (check === 'none') {
		showHide.setProperty('display', 'block');
	} else {
		showHide.setProperty('display', 'none');
	}

}
