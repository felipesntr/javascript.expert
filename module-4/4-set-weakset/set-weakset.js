const assert = require("assert");

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "1", "2"];
const arr3 = arr1.concat(arr2);

assert.deepStrictEqual(arr3.sort(), ["0", "1", "1", "2", "2", "2"]);

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

// console.log(set)

assert.deepStrictEqual(Array.from(set), ["0", "1", "2"]);

assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [
  "0",
  "1",
  "2",
]);

// console.log(set.keys())
// console.log(set.values())

assert.ok(set.has("2"));

const users01 = new Set(["erick", "mariazinha", "xuxa da silva"]);

const users02 = new Set(["joazinho", "erick", "julio"]);

const intersection = new Set([...users01].filter((user) => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ["erick"]);

const difference = new Set([...users01].filter((user) => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ["mariazinha", "xuxa da silva"]);

// weak set

// mesma ideia do weak map
// nao é enumeravel (iteravel)
// so trabalha com chaves como referencia
// so tem metodos simples

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user);
assert.ok(weakSet.has(user2));
