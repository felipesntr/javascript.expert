import mocha from "mocha";
import chai from "chai";

import Person from "../src/person.js";

const { describe, it } = mocha;
const { expect } = chai;

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Avião 2000 2022-02-03 2022-03-12"
    );
    const expected = {
      from: "2022-02-03",
      to: "2022-03-12",
      vehicles: ["Bike", "Avião"],
      id: "1",
      kmTraveled: "2000",
    };
    expect(person).to.be.deep.equal(expected);
  });
  it("should format values", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Avião 2000 2022-02-03 2022-03-12"
    );
    const result = person.formatted("pt-BR");
    const expected = {
      id: 1,
      kmTraveled: "2.000 km",
      vehicles: "Bike e Avião",
      from: "03 de fevereiro de 2022",
      to: "12 de março de 2022",
    };
    expect(result).to.be.deep.equal(expected);
  });
});
