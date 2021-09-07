const libraryBook = document.querySelector(".library");

class Books {
  constructor(book) {
    this.title = book.title;
    this.author = book.author;
    this.isCompleted = book.isCompleted;
  }

  changeStatus() {
    if (this.isCompleted) {
      this.isCompleted = false;
    } else {
      this.isCompleted = true;
    }
    return this.isCompleted;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  getBooks() {
    return this.books;
  }

  getBook(title) {
    return this.books.find((book) => book.title == title);
  }

  deleteBook(title) {
    this.books.splice(this.books.indexOf(this.getBook(title)), 1);
  }

  changeStatus(title) {
    return this.books[this.books.indexOf(this.getBook(title))].changeStatus();
  }

  getTotalBooks() {
    return this.books.length;
  }

  getReadBooks() {
    let readBooks = 0;
    this.books.filter((b) => (readBooks += b.isCompleted));
    return readBooks;
  }

  getNotReadBooks() {
    return this.getTotalBooks() - this.getReadBooks();
  }
}

let library = new Library();

const defaultBook = {
  title: "The God of High School",
  author: "Yongje Park",
  isCompleted: false,
};

const populateStorage = () => {
  localStorage.setItem("library", JSON.stringify(library.getBooks()));
};

const getStorage = () => {
  let storage = JSON.parse(localStorage.getItem("library"));
  if (localStorage.getItem("library")) {
    storage.forEach((b) => library.addBook(new Books(b)));
  } else {
    library = new Library();
    library.addBook(new Books(defaultBook));
  }
};

const renderCard = (book) => {
  const card = document.createElement("div");
  const layer = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const icon = document.createElement("div");
  const isReadBtn = document.createElement("a");
  const deleteBtn = document.createElement("a");

  deleteBtn.onclick = deleteBook;
  isReadBtn.onclick = readBook;

  card.classList.add("card");
  layer.classList.add("layer");
  title.classList.add("title");
  author.classList.add("author");
  icon.classList.add("icon");
  deleteBtn.classList.add("button", "touch", "delete");
  isReadBtn.classList.add("button", "touch");
  if (book.isCompleted) {
    layer.classList.add("layer-more");
    isReadBtn.classList.add("is-read-btn");
  } else {
    isReadBtn.classList.add("read-btn");
  }
  
  title.textContent = `${book.title}`;
  author.textContent = book.author;

  card.appendChild(layer);
  card.appendChild(title);
  card.appendChild(author);
  icon.appendChild(isReadBtn);
  icon.appendChild(deleteBtn);
  card.appendChild(icon);

  libraryBook.appendChild(card);
};

const updateLibrary = () => {
  populateStorage();
  libraryBook.innerHTML = "";
  library.getBooks().forEach((book) => renderCard(book));
  getBookStatus();
};

const getBookFromForm = () => {
  const newBook = {
    title: document.querySelector("#input-title").value,
    author: document.querySelector("#input-author").value,
    isCompleted:
      document.querySelector("#input-completed").value == "true" ? true : false,
  };

  return new Books(newBook);
};

const deleteBook = (e) => {
  let title = e.target.parentNode.parentNode.childNodes[1].textContent;
  library.deleteBook(title);
  updateLibrary();
};

const readBook = (e) => {
  let title = e.target.parentNode.parentNode.childNodes[1].textContent;
  library.changeStatus(title);
  updateLibrary();
};

const getBookStatus = () => {
  totalBooks.innerHTML = `${library.getTotalBooks()}`;
  readBooks.innerHTML = `${library.getReadBooks()}`;
  notReadBooks.innerHTML = `${library.getNotReadBooks()}`;
};

const show = document.querySelector(".show");
const mask = document.querySelector(".mask");
const form = document.querySelector(".form");
const totalBooks = document.querySelector(".total-books");
const readBooks = document.querySelector(".read");
const notReadBooks = document.querySelector(".not-read");

show.onclick = () => mask.classList.add("active");

const closeModal = () => mask.classList.remove("active");

mask.onclick = closeModal;

form.onsubmit = (e) => {
  e.preventDefault();
  library.addBook(getBookFromForm());
  updateLibrary();
  closeModal();
};

getStorage();
updateLibrary();
