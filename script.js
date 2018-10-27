let numbers = [];
let operations = [];
function calc(x) {
	let value =x.value;
	let preg=/(\D)/;
	numbers.push(value);
	let master=numbers.join('');
	operations=master.split(preg);
	
	console.log(operations);
	
}

function none() {

	while (numbers.length > 0) {
		numbers.pop();
	}
}
