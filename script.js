let getThem = [];

function add(firstValue, secondValue) {
	return firstValue + secondValue;
}

function subtract(firstValue, secondValue) {
	return firstValue - secondValue;
}

function multiply(firstValue, secondValue) {
	return firstValue * secondValue;
}

function devide(firstValue, secondValue) {
	return firstValue / secondValue;
}

function operate(firstValue, secondValue, operator) {
	switch (operator) {
		case '+':
			return add(firstValue, secondValue);
			break;
		case '-':
			return subtract(firstValue, secondValue);
			break;
		case '*':
			return multiply(firstValue, secondValue);
			break;
		case '/':
			return devide(firstValue, secondValue);
			break;
	}
}

function getValues(x) {
	let firstValue = [];
	let secondValue = [];
	let operator = '';
	let value = x.value;
	let preg = /(\D)/;
	let result = 0;
	getThem.push(value);
	let master = getThem.join('');
	let aux = master.split(preg);
	firstValue = parseInt(aux[0]);
	secondValue = parseInt(aux[2]);
	operator = aux[1];
	console.log(firstValue, secondValue, operator);
	if (firstValue && secondValue && operator) {
		document.getElementById('result').innerHTML = firstValue + operator + secondValue;
		result += operate(firstValue, secondValue, operator);
		
		console.log(result);
		getThem = [];
	}
}
