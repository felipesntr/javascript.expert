const { deepStrictEqual } = require("assert");

const Service = require("./service");

const sinon = require("sinon");

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

const mocks = {
  tatooine: require("./../mocks/tatooine.json"),
  alderaan: require("./../mocks/alderaan.json"),
};

function it(description, callback) {
  try {
    callback();
    if (description.length) console.log(`✅ - ${description}`);
  } catch (error) {
    if (description.length) console.log(`❌ - ${description}`);
  }
}

function describe(description, callback) {
  console.log(description);
  callback();
}

describe("", async function () {
  /* Com internet
    const service = new Service();
    const withoutStub = await service.makeRequest(BASE_URL_1)
    console.log(JSON.stringify(withoutStub))*/

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

  it("should get tatooine with surface water", async function () {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };
    const result = await service.getPlanets(BASE_URL_1);
    deepStrictEqual(result, expected);
  });

  it("should get alderaan with surface water", async function () {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };
    const result = await service.getPlanets(BASE_URL_2);
    deepStrictEqual(result, expected);
  });
});
