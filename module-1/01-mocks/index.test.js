const { rejects, deepStrictEqual } = require("assert");

const { error } = require("./src/constants");

const File = require("./src/file");

function it(description, callback) {
  try {
    callback();
    console.log(`✅ - ${description}`);
  } catch (error) {
    console.log(`❌ - ${description}`);
    console.error(error);
  }
}

function describe(description, callback) {
  console.log(description);
  callback();
}

describe("File", async function () {
  it("should throw an error when the file is empty", async function () {
    const filePath = "./../mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  });

  it("should throw an error when the content contains more than 3 lines", async function () {
    const filePath = "./../mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  });

  it("should parse csv to json", async function () {
    const filePath = "./../mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "John",
        id: 123,
        profession: "Developer",
        birthDay: new Date().getFullYear() - 25,
      },
      {
        name: "David",
        id: 456,
        profession: "Designer",
        birthDay: new Date().getFullYear() - 30,
      },
      {
        name: "Mark",
        id: 789,
        profession: "Developer",
        birthDay: new Date().getFullYear() - 28,
      },
    ];
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  });
});
