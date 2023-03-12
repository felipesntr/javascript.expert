console.assert(String(123) === '123', "explicit convertion to string");
console.assert('123' === 123 + '', "implicit convertion to string");

console.assert('hello' || 123 === 'hello', "|| return the first element");
console.assert('hello' && 123 === 123, "&& return the last element");

const item = {
    name: 'Biscuit',
    age: 0.5,
    // string: 1 se não for primitivo, chama o valueOf
    toString() {
        return `${this.name} is ${this.age} year(s) old`
    },
    // number: 1 se não for primitivo, chama o toString
    valueOf() {
        // return this.age
        return { hey: 'dude' }
    },
    [Symbol.toPrimitive](coercionType) {
        console.log('Trying to convert to', coercionType);
        const types = {
            string: JSON.stringify(this),
            number: this.age
        }
        return types[coercionType] || types.string;
    }
}

console.log('toString', String(item));
console.log('valueOf', Number(item));
// chama default
console.log('date', new Date(item));

console.assert(item + 0 == '{"name":"Biscuit","age":0.5}0', "default coercion is string");
console.assert(!!item);

console.assert('Ae'.concat(item) === 'Ae{"name":"Biscuit","age":0.5}', 'string.concat');

// console.log("implicit + explicit coercion (using ==)", item == String(item))
console.assert(item == String(item), "implicit + explicit coercion (using ==)");

