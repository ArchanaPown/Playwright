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

class Book {
  title: string;
  author: string;
  year: number;
  genre: string;
  constructor(title: string, author: string, year: number, genre: string) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
  }
}

let book1 = new Book("To Kill a Mockingbird", "Harper Lee", 1960, "Fiction");
let book2 = new Book("1984", "George Orwell", 1949, "Dystopian");
let book3 = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  1925,
  "Classic"
);

let bookCollection = [book1, book2, book3];
bookCollection.push(
  new Book("Brave New World", "Aldous Huxley", 1932, "Dystopian")
);
bookCollection.forEach((book) =>
  console.log(`${book.title} by ${book.author}`)
);
const orwellBooks = bookCollection.filter(
  (book) => book.author === "George Orwell"
);
bookCollection = bookCollection.filter((book) => book.title !== "1984");
