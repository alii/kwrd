import {match} from './src';

const keys = '+one, +three, -two';

const words = ['one', 'one three', 'one two three', 'three', 'nothing'];

console.log('==', keys, '==');

console.log('== strict ==');
for (const word of words) {
	const matches = match(keys, word, true);

	console.log(matches, {
		word,
	});
}

console.log('== no strict ==');
for (const word of words) {
	const matches = match(keys, word, false);

	console.log(matches, {
		word,
	});
}
