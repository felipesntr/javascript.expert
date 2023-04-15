const mocha = require("mocha");
const { expect } = require("chai");

const descibe = mocha.describe;
const it = mocha.it;

const { InvalidRegexError, evaluateRegex } = require("./../src/util");

descibe("Util", () => {
  it("#evaluateRegex should throw an error using an unsafe regex", () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/gim;
    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is unsafe dude!`
    );
  });

  it("#evaluateRegex should not throw an error using a safe regex", () => {
    const safeRegex = /^([a-z])$/;
    expect(evaluateRegex(safeRegex)).to.be.deep.equal(safeRegex);
  });

});
