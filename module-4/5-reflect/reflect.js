"use strict";

const assert = require("assert");

// garantir semantica e segurança em objetos

// ---- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

myObj.add.apply = function () {
  throw new TypeError("Vixxxx");
};

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Vixxxx",
});

// usando reflect
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);

function MyDate() {}

Object.defineProperty(MyDate, "withObject", { value: () => "Hey there" });

Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey dude" });

assert.deepStrictEqual(MyDate.withObject(), "Hey there");
assert.deepStrictEqual(MyDate.withReflection(), "Hey dude");

// delete property

const withDelete = { user: "FelipeS" };
// imperformático, evitar ao máximo
delete withDelete.user;

assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

const withReflection = { user: "Xuxa" };
Reflect.deleteProperty(withReflection, "user");
assert.deepStrictEqual(withReflection.hasOwnProperty("user"), false);

// deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual((1)["userName"], undefined);
// com reflection, uma exceção é lançada
assert.throws(() => Reflect.get(1, "userName", TypeError));

// has

assert.ok("superman" in { superman: "" });
assert.ok(Reflect.has({ batman: "" }, "batman"));

// ownKeys

const user = Symbol("user");
const dataBaseUser = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "FelipeS",
};

// com os metodos de object, temos que fazer 2 requisicoes
const objectKeys = [
  ...Object.getOwnPropertyNames(dataBaseUser),
  ...Object.getOwnPropertySymbols(dataBaseUser),
];

assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user]);
assert.deepStrictEqual(Reflect.ownKeys(dataBaseUser), [
  "id",
  Symbol.for("password"),
  user,
]);
