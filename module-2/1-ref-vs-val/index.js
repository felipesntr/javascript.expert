const { deepStrictEqual } = require('assert')

let counter = 0;
let counter2 = counter;

counter2++;

deepStrictEqual(counter, 0);

let item = { counter: 0 }

let item2 = { ...item };

item2.counter++;

deepStrictEqual(item, { counter: 0 });