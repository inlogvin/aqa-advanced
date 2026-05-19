export class Book {
  constructor(title, author, year) {
    this._title = title;
    this._author = author;
    this._year = year;
  }

  printInfo() {
    console.log(
      `"${this._title}" by ${this._author}, published in ${this._year}`,
    );
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get year() {
    return this._year;
  }

  set title(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Title must be a non-empty string");
    }
    this._title = value;
  }

  set author(value) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error("Author must be a non-empty string");
    }
    this._author = value;
  }

  set year(value) {
    if (typeof value !== "number" || value < 0 || !Number.isInteger(value)) {
      throw new Error("Year must be a positive integer");
    }
    this._year = value;
  }

  static getOldest(books) {
    if (!Array.isArray(books) || books.length === 0) {
      throw new Error("Помилка! Books must be a non-empty array");
    }
    const oldestBook = books.reduce((oldest, current) =>
      current.year < oldest.year ? current : oldest,
    );
    return `Найстаріша книга це ${oldestBook.title} (${oldestBook.author}, ${oldestBook.year})`;
  }
}
