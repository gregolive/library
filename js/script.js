// BOOK CLASS

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  } 
}

// LIBRARY CLASS

class Library {
  books = [];
  anchor = document.querySelector("#anchor");

  // Display all book cards
  displayAllBooks() {
    for (const book of this.books) {
      this.buildBookCard(book);
    }
  }

  // Display all books saved in Local Storage
  checkLocalStorage() {
    if (localStorage.length > 0) {
      this.books = JSON.parse(localStorage.getItem('Library'));
      this.displayAllBooks();
    }
  }

  // Reset all book cards
  resetBookCards() {
    anchor.textContent = '';
    this.displayAllBooks();
  }

  // Build HTML book card
  buildBookCard(book) {
    const col = document.createElement("div");
    col.className = "col";
    col.id = String(book.title);
  
    const card = document.createElement("div");
    if (book.read === "true") {
      card.className = "card text-center border-info";
    } else {
      card.className = "card text-center border-danger";
    }
  
    card.appendChild(this.buildCardHeader(book));
    card.appendChild(this.buildCardBody(book));
    card.appendChild(this.buildCardFooter(book));
    col.appendChild(card);
    anchor.appendChild(col);
  }

  // Book card header
  buildCardHeader(book) {
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
  
    const headerIcon = document.createElement("i");
    headerIcon.className = (book.read === "true") ? "bi bi-check-lg text-info" : "bi bi-x-lg text-danger";
  
    const headerText = document.createElement("span");
    headerText.innerText = " Read";
  
    cardHeader.appendChild(headerIcon);
    cardHeader.appendChild(headerText);
  
    return cardHeader;
  }

  // Book card body
  buildCardBody(book) {
    const body = document.createElement("div");
    body.className = "card-body";
  
    const title = document.createElement("h3");
    title.innerText = book.title;
    body.appendChild(title);
  
    const author = document.createElement("p");
    author.innerText = book.author;
    body.appendChild(author);
    body.appendChild(this.buildReadButton(book));
    body.appendChild(this.buildDeleteButton(book));
  
    return body;
  }

  // Read status update button
  buildReadButton(book) {
    const readButton = document.createElement("a");
    readButton.className = "btn btn-dark card-link";
    readButton.innerText = (book.read === "true") ? "Mark Unread" : "Mark Read";
  
    readButton.addEventListener('click', () => {
      const bookIndex = this.findBookIndex(book.title);
      const targetBook = this.books.at(bookIndex)
      targetBook.read = (targetBook.read === "true") ? "false" : "true";
      this.resetBookCards();
      this.updateLocalStorage();
    })
  
    return readButton;
  }

  // Find book index to update read status
  findBookIndex(bookTitle) {
    return this.books.findIndex(
      (book) => book.title === bookTitle
    );
  }

  // Update local storage on button click
  updateLocalStorage() {
    localStorage.clear();
    localStorage.setItem('Library', JSON.stringify(this.books));
  }

  // Delete book button
  buildDeleteButton(book) {
    const deleteButton = document.createElement("a");
    deleteButton.className = "btn btn-danger card-link";
    deleteButton.innerText = "Delete Book";
  
    deleteButton.addEventListener('click', () => {
      this.deleteBook(book.title);
      this.updateLocalStorage();
    })
  
    return deleteButton;
  }

  // Book card footer
  buildCardFooter(book) {
    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer text-muted";
    cardFooter.innerText = book.pages + " pages";
  
    return cardFooter
  }

  // Add book
  addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = (document.getElementById("read").checked) ? "true" : "false";
  
    let newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
    this.buildBookCard(newBook);
  }

  // Delete book
  deleteBook(title) {
    this.removeFromLibrary(title);
    document.getElementById(title).remove();
  }

  removeFromLibrary(bookTitle) {
    this.books.splice(this.books.findIndex(function(i) {
      return i.title === bookTitle;
    }), 1);
  }
}

// BOOK FORM MODAL

let modal = document.querySelector("#bookModal");

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

// INITILIZE APP

const myLibrary = new Library();
myLibrary.checkLocalStorage();

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");

// VALIDATE INPUTS

// Error messages
const textError = (input) => {
  if (input.validity.valueMissing) {
    input.nextElementSibling.textContent = `Book ${input.id} cannot be blank.`;
  }
};

const pageError = () => {
  if (pages.validity.valueMissing) {
    pages.nextElementSibling.textContent = 'Number of pages cannot be blank.';
  } else if (pages.validity.typeMismatch) {
    pages.nextElementSibling.textContent = 'Entered value needs to be a number.';
  } else if (pages.validity.rangeUnderflow) {
    pages.nextElementSibling.textContent = `Book should have at least 1 page.`;
  }
};

// Input validation
title.addEventListener('input', () => {
  if (title.validity.valid) {
    title.nextElementSibling.textContent = '';
  } else {
    textError(title);
  }
});

author.addEventListener('input', () => {
  if (author.validity.valid) {
    author.nextElementSibling.textContent = '';
  } else {
    textError(author);
  }
});

pages.addEventListener('input', () => {
  if (pages.validity.valid) {
    pages.nextElementSibling.textContent = '';
  } else {
    pageError();
  }
});

// FORM SUBMISSION

// Add new books via modal submit button if form is valid
const bookForm = document.getElementById("book-form");

bookForm.addEventListener('submit', e => {
  if (!title.validity.valid) {
    textError(title);
    e.preventDefault();
  } else if (!author.validity.valid) {
    textError(author);
    e.preventDefault();
  } else if (!pages.validity.valid) {
    pageError();
    e.preventDefault();
  } else {
    addBookToLibrary();
    e.target.reset();
    closeModal();
  }
});

const addBookToLibrary = () => {
  myLibrary.addBook();
  localStorage.clear();
  localStorage.setItem('Library', JSON.stringify(myLibrary.books));
};
