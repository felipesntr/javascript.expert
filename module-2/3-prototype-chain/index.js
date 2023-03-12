const assert = require("assert")

// objetos literais
const obj = {}
const arr = []
const fn = function () { }

//internamente, objetos literais viram funções explicitas

console.log("new Object() is {}?", new Object().__proto__ === {}.__proto__) // true
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referencia do object que possui as propriedades    dele
console.log(
    "obj.__proto__ === Object.prototype",
    obj.__proto__ === Object.prototype) // true
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log(
    "arr.__proto__ === Array.prototype",
    arr.__proto__ === Array.prototype) // true
assert.deepStrictEqual(arr.__proto__, Array.prototype)


console.log(
    "fn.__proto__ === Function.prototype",
    fn.__proto__ === Function.prototype) // true
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// __proto__ de Object.prototype é null

console.log(
    "obj.__proto__.__proto__ === null",
    obj.__proto__.__proto__ === null) // true
assert.deepStrictEqual(obj.__proto__.__proto__, null)

console.log("----------")

function Employee() { }
Employee.prototype.salary = () => "salary**"

function Supervisor() { }
// herda a instancia de employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"

function Manager() { }
// herda a instancia de supervisor
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**"

// podemos chamar via prototype, mas se tentar chamar diretamente, vai dar erro
// console.log(Manager.prototype.salary())

// se nao chamar o 'new', o primeiro __proto__ vai ser sempre
// a instancia de Function, sem herdar nossas classes
// Para acessar as classes sem o new, pode acessar direto via prototype

console.log("Manager.prototype.__proto__ === Supervisor.prototype", Manager.prototype.__proto__ === Supervisor.prototype) // true

console.log("_--------")

// quando chamamos o new o __proto__ recebe o prototype

console.log('manager.__proto__: %s, manager.salary(): %s', new Manager().__proto__, new Manager().salary())
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__) // true

assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

console.log('--------')

const manager = new Manager()
console.log('manager.salary()', manager.salary())
console.log('manager.profitShare()', manager.profitShare())
console.log('manager.monthlyBonuses()', manager.monthlyBonuses())

assert.deepStrictEqual(manager.__proto__, Manager.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)

console.log('---------')

class T1 {
    ping() { return 'ping' }
}

class T2 extends T1 {
    pong() { return 'pong' }
}

class T3 extends T2 {
    shoot() { return 'shoot' }
}

const t3 = new T3()

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__) // true')
console.log('t3.ping()', t3.ping())
console.log('t3.pong()', t3.pong())
console.log('t3.shoot()', t3.shoot())

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)

