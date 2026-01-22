// take a string as input and return the reversed string using split, reverse, and join
const reverseString = (str) => str.split("").reverse().join("");
console.log(reverseString("String"));

//Practice following scenarios with arrow functions:
// 1. Greet a User
// 2. Add Two Numbers
// 3. Reverse a String
const greetUser = (name) => `Hello, ${name}!`;
const addNumbers = (a, b) => a + b;
const reverseAString = (str) => str.split("").reverse().join("");
console.log("Greeting a User : ", greetUser("Alice"));
console.log("Adding two numbers : ", addNumbers(5, 10));
console.log("Reversing a String : ", reverseAString("Welcome"));

//You have a list of student names, and you want to create name tags that say "Hello, [Name]!" for each student.(Hint : use map())
const students = ["Sam", "Sai", "Arjun"];
const greedStudents = students.map((name) => `Hello, ${name}!`);
console.log(greedStudents);
