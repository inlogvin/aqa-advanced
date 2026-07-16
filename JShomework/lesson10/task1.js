import { Book } from "./Book.js";
import { EBook } from "./EBook.js";

const thriller = new Book("Girl", "Gillian Flynn", "2012");
const psychologicalThriller = new Book(
  "The Silent Patient",
  "Alex Michaelides",
  "2019",
);
thriller.printInfo();
psychologicalThriller.printInfo();

const mysteryThriller = new EBook(
  "Shutter Island",
  "Dennis Lehane",
  "2003",
  "epub",
);
mysteryThriller.printInfo();

const thrillerFiction = new EBook(
  "Before I Go to Sleep",
  "S. J. Watson",
  "2011",
  "pdf",
);
thrillerFiction.printInfo();

thriller.title = "Gone Girl";
console.log(thriller.title);

thrillerFiction.fileFormat = "fb2";
console.log(thrillerFiction.fileFormat);

const books = [
  thriller,
  psychologicalThriller,
  mysteryThriller,
  thrillerFiction,
];
console.log(Book.getOldest(books));
try {
  console.log(Book.getOldest(thriller));
} catch (error) {
  console.error(error.message);
}

try {
  console.log(EBook.mergedBook(thrillerFiction, "pdf"));
} catch (error) {
  console.error(error.message);
}
