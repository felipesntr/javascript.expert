const { join } = require('path');
const { writeFile } = require("fs/promises");

const falso = require('@ngneat/falso');

const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');

const seederBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
    id: falso.randUuid(),
    name: falso.randVehicleType(),
    carIds: [],
    price: falso.randNumber({ min: 20, max: 100 }),
})

const cars = [];
const customers = [];
for (let index = 0; index <= ITEMS_AMOUNT; index++) {
    const car = new Car({
        id: falso.randUuid(),
        name: falso.randVehicle(),
        releaseYear: falso.randPastDate(),
        available: true,
        gasAvailable: true,
        carCategoryId: carCategory.id,
    });
    carCategory.carIds.push(car.id);
    cars.push(car);

    const customer = new Customer({
        id: falso.randUuid(),
        name: falso.randFirstName(),
        age: falso.randNumber({ min: 18, max: 50 })
    })
    customers.push(customer);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

; (async () => {
    await write('carCategory.json', [carCategory]);
    await write('cars.json', cars);
    await write('customers.json', customers);
    console.table(cars)
})();