const assert = require("assert");

const myMap = new Map();

myMap
  .set(1, "one")
  .set("erick", { text: "two" })
  .set(true, () => "hello");

const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "boollll"],
]);

// console.log(myMap)
// console.log('myMap.get(1)', myMap.get(1))
assert.deepStrictEqual(myMap.get(true)(), "hello");

// Em Objects a chave só ser string ou symbol (number é coergido a string)
const onlyReferenceWork = { id: 1 };
myMap.set(onlyReferenceWork, { name: "felipe" });

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWork), { name: "felipe" });

// console.log(myMap.size)

assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coerção implicita para boolean e retorna false
// o jeito certo em Object é ({ name: 'felipe }).hasOwnProperty('name')

assert.ok(myMap.has(onlyReferenceWork));

assert.ok(myMap.delete(onlyReferenceWork));

assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  '[[1,"one"],["erick",{"text":"two"}],[true,null]]'
);

// for (const [key, value] of myMap) {
//     console.log({ key, value })
// }

const wm1 = new WeakMap();
const wm2 = new WeakMap();
const wm3 = new WeakMap();
const o1 = {};
const o2 = function () {};

wm1.set(o1, 37);
wm1.set(o2, "azerty");
wm2.set(o1, o2); // a value can be anything, including an object or a function
wm2.set(wm1, wm2); // keys and values can be any objects. Even WeakMaps!

console.log(wm1.get(o2)); // "azerty"
console.log(wm2.get(o2)); // undefined, because there is no key for o2 on wm2

wm1.has(o2); // true
wm2.has(o2); // false

wm3.set(o1, 37);
console.log(wm3.get(o1)); // 37

wm1.has(o1); // true
wm1.delete(o1);
wm1.has(o1); // false
