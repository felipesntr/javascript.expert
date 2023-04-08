const assert = require("assert");

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield "Hello";
  yield "-";
  yield "world";
  yield* calculation(20, 10);
}

const generator = main();

assert.deepStrictEqual(generator.next(), { value: "Hello", done: false });
assert.deepStrictEqual(generator.next(), { value: "-", done: false });
assert.deepStrictEqual(generator.next(), { value: "world", done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

assert.deepStrictEqual(Array.from(main()), ["Hello", "-", "world", 200]);
assert.deepStrictEqual([...main()], ["Hello", "-", "world", 200]);

// ---- async iterators
const { readFile, stat, readdir } = require("fs").promises;

function* promisefied() {
  yield readFile(__filename);
  yield Promise.resolve("Hey dude");
}

async function* systemInfo() {
  const { size } = await stat(__filename);
  const file = await readFile(__filename);
  const dir = await readdir(__dirname);

  yield { file: file.toString() };
  yield { size };
  yield { dir };
}

// ; (async () => {
//     for await (const item of promisefied()) {
//         console.log(item.toString())
//     }
// })()

(async () => {
  for await (const item of systemInfo()) {
    console.log(item);
  }
})();
