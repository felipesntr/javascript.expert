const Transaction = require("../entities/transaction");
const BaseRepository = require("../repository/base/baseRepository");
const Tax = require("./../entities/tax");

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars });
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currentFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  getRandomPositionFromArray(list) {
    return Math.floor(Math.random() * list.length);
  }

  chooseRandomCar(carCategory) {
    const randomPosition = this.getRandomPositionFromArray(carCategory.carIds);
    return carCategory.carIds[randomPosition];
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.carRepository.find(carId);
    return car;
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    const finalPrice = tax * price * numberOfDays;
    const formattedPrice = this.currentFormat.format(finalPrice);
    return formattedPrice;
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = this.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );
    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dueDate = today.toLocaleDateString("pt-br", options);

    return new Transaction({
      customer,
      car,
      amount: finalPrice,
      dueDate,
    });
  }
}

module.exports = CarService;
