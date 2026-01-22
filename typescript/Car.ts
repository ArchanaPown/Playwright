//Create a base class Car with a property brand and a method displayBrand() that logs the brand of the car.
// Then create a subclass ElectricCar that inherits from Car and adds a new property batteryCapacity.
// Create an instance of ElectricCar,assign values to both brand and batteryCapacity, and log them using appropriate methods or direct access
class Car {
  brand: string;
  constructor(brand) {
    this.brand = brand;
  }

  displayBrand() {
    console.log(`Brand: ${this.brand}`);
  }
}

class ElectricCar extends Car {
  batteryCapacity: string;
  constructor(brand, batteryCapacity) {
    super(brand);
    this.batteryCapacity = batteryCapacity;
  }
}

const myTesla = new ElectricCar("Tesla", "100kWh");
myTesla.displayBrand();
console.log(`Battery: ${myTesla.batteryCapacity}`);
