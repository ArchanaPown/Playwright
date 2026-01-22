//Create two interfaces: CarFeatures with a property brand, and AutonomousFeatures with a property autopilotEnabled.
// Then create a class SelfDrivingCar that implements both interfaces.
// Create an instance of SelfDrivingCar, assign values to both properties, and log them.

interface CarFeatures {
  brand: string;
}
interface AutonomousFeatures {
  autopilotEnabled: boolean;
}

class SelfDrivingCar implements CarFeatures, AutonomousFeatures {
  brand: string;
  autopilotEnabled: boolean;
  constructor(brand: string, autopilotEnabled: boolean) {
    this.brand = brand;
    this.autopilotEnabled = autopilotEnabled;
  }
}

const mySelfDriver = new SelfDrivingCar("Ford", true);
console.log(mySelfDriver.brand, mySelfDriver.autopilotEnabled);
