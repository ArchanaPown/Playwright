//Create a class Cars with the following:
// •	A public property brand that stores the car's brand name.
// •	A private property engineNumber that stores a unique engine ID (not accessible outside the class).
// •	A protected property manufactureYear that stores the year the car was made (accessible in subclasses).
// •	A method getCarInfo() that logs the brand and engine number.
// Then create a subclass LuxuryCar that inherits from Car and adds:
// •	A public property featurePackage (e.g., "Premium").
// •	A method getFullDetails() that logs the brand, manufacture year, and feature package.

class Cars {
  public brand: string;
  private engineNumber: number;
  protected manufactureYear: number;
  constructor(brand: string, engineNumber: number, manufactureYear: number) {
    this.brand = brand;
    this.engineNumber = engineNumber;
    this.manufactureYear = manufactureYear;
  }
  getCarInfo() {
    console.log(`Brand : ${this.brand}`);
    console.log(`Engine Number : ${this.engineNumber}`);
    console.log(`Year of Manufacture : ${this.manufactureYear}`);
  }
}
class LuxuryCar extends Cars {
  public featurePackage: string;
  constructor(
    brand: string,
    engineNumber: number,
    manufactureYear: number,
    featurePackage: string
  ) {
    super(brand, engineNumber, manufactureYear);
    this.featurePackage = featurePackage;
  }
  getFullDetails() {
    this.getCarInfo();
    console.log(`Feature Package : ${this.featurePackage}`);
  }
}

const luxCarInstance = new LuxuryCar("Ferari", 12434, 2004, "Premium");
luxCarInstance.getFullDetails();
