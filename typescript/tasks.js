// take a string as input and return the reversed string using split, reverse, and join
var reverseString = function (str) { return str.split("").reverse().join(""); };
console.log(reverseString("String"));
//Practice following scenarios with arrow functions:
// 1. Greet a User
// 2. Add Two Numbers
// 3. Reverse a String
var greetUser = function (name) { return "Hello, ".concat(name, "!"); };
var addNumbers = function (a, b) { return a + b; };
var reverseAString = function (str) { return str.split("").reverse().join(""); };
console.log("Greeting a User : ", greetUser("Alice"));
console.log("Adding two numbers : ", addNumbers(5, 10));
console.log("Reversing a String : ", reverseAString("Welcome"));
//You have a list of student names, and you want to create name tags that say "Hello, [Name]!" for each student.(Hint : use map())
var students = ["Sam", "Sai", "Arjun"];
var greedStudents = students.map(function (name) { return "Hello, ".concat(name, "!"); });
console.log(greedStudents);
//let book1 = new Book(“bookTitle1", "Harper Lee", 1960, "Fiction");
// let book2 = new Book(“bookTitle2", "George Orwell", 1949, "Dystopian");
// let book3 = new Book(“bookTitle3", "F. Scott Fitzgerald", 1925, "Classic");
// let bookCollection = [book1, book2, book3];
// Q4. Hints:
// •	Book Object: Defines a book object with properties for title, author, year, and genre using either a constructor function or an ES6 class.
// •	Collection of Books: Creates an array of book objects.
// •	Add a New Book: Uses the `push()` method to add a new book to the collection.
// •	List All Books: Uses `forEach()` to iterate over the collection and log the details of each book.
// •	Find Books by Author: Uses `filter()` to find books by a specific author.
// •	Remove a Book: Uses `filter()` to remove a book from the collection based on its title.
