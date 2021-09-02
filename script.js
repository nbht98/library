const libraryBook = document.querySelector(".library");

class Books {
  constructor(book) {
    this.title = book.title;
    this.author = book.author;
    this.isCompleted = book.isCompleted;
  }

  changeStatus() {
    if (this.completed) {
      this.completed = false;
    } else {
      this.completed = true;
    }
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
}

const library = new Library();

const defaultBook = {
  title: "The God of High School",
  author: "Yongje Park",
  isCompleted: false,
};

const renderCard = (book) => {
  const card = document.createElement("div");
  const layer = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  // const isReadBtn = document.createElement("button");
  // const removeBtn = document.createElement("button");

  card.classList.add("card");
  // readBtn.classList.add("btn");
  // removeBtn.classList.add("btn");
  // removeBtn.classList.add("btn-red");
  // readBtn.onclick = toggleRead;
  // removeBtn.onclick = removeBook;
  layer.classList.add("layer");
  title.classList.add("title");
  author.classList.add("author");
  title.textContent = `"${book.title}"`;
  author.textContent = book.author;

  // removeBtn.textContent = "Remove";

  // if (book.isRead) {
  //   readBtn.textContent = "Read";
  //   readBtn.classList.add("btn-light-green");
  // } else {
  //   readBtn.textContent = "Not read";
  //   readBtn.classList.add("btn-light-red");
  // }
  card.appendChild(layer);
  card.appendChild(title);
  card.appendChild(author);
  // card.appendChild(pages);
  // card.appendChild(readBtn);
  // card.appendChild(removeBtn);
  libraryBook.appendChild(card);
};

const updateLibrary = () => {
  libraryBook.innerHTML = "";
  library.getBooks().forEach((book) => renderCard(book));
};

const getBookFromForm = () => {
  const newBook = {
    title: document.querySelector("#input-title").value,
    author: document.querySelector("#input-author").value,
    isCompleted: document.querySelector("#input-completed").value,
  };
  return new Books(newBook);
};

const show = document.querySelector(".show");
const mask = document.querySelector(".mask");
const form = document.querySelector(".form");

show.onclick = () => mask.classList.add("active");

const closeModal = () => mask.classList.remove("active");

mask.onclick = closeModal;

form.onsubmit = (e) => {
  e.preventDefault();
  library.addBook(getBookFromForm());
  updateLibrary();
  closeModal();
};








library.addBook(defaultBook)

updateLibrary()