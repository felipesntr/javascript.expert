const rewiremock = require("rewiremock/node");
const { deepStrictEqual } = require("assert");

// <poderia estar em outro arquivo>
const dbData = [{ name: "Maria" }, { name: "João" }];
class MockDatabase {
  connect = async () => this;
  find = async (query) => dbData;
}
// <poderia estar em outro arquivo>

rewiremock(() => require("./../src/util/database")).with(MockDatabase);

(async () => {
  {
    rewiremock.enable();
    const UserFactory = require("../src/factory/userFactory");
    const expected = [{ name: "MARIA" }, { name: "JOÃO" }];
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
    rewiremock.disable();
  }

  {
    const UserFactory = require("../src/factory/userFactory");
    const expected = [{ name: "ERICK WENDEL" }];
    const userFactory = await UserFactory.createInstance();
    const result = await userFactory.find();
    deepStrictEqual(result, expected);
  }
})();
