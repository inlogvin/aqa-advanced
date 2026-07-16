import { Book } from "./Book.js";

export class EBook extends Book {
  constructor(title, author, year, fileFormat) {
    super(title, author, year);
    this._fileFormat = fileFormat;
  }

  printInfo() {
    console.log(
      `"${this._title}" by ${this._author}, published in ${this._year}, file format: ${this._fileFormat}`,
    );
  }

  get fileFormat() {
    return this._fileFormat;
  }

  set fileFormat(value) {
    const allowed = ["epub", "pdf", "mobi", "fb2"];
    if (typeof value !== "string" || !allowed.includes(value.toLowerCase())) {
      throw new Error(`File format must be one of: ${allowed.join(", ")}`);
    }
    this._fileFormat = value.toLowerCase();
  }

  static mergedBook(book, fileFormat) {
    if (!(book instanceof Book)) {
      throw new Error("First argument must be an instance of Book");
    }
    return new EBook(book.title, book.author, book.year, fileFormat);
  }
}
