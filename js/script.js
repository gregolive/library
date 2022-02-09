// BOOK CONSTRUCTOR

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// LIBRARY CONSTRUCTOR

function Library() {
  this.books = [];
  const anchor = document.querySelector("#anchor");
}

// Display all book cards
Library.prototype.displayAllBooks = function() {
  for (const book of this.books) {
    this.buildBookCard(book);
  }
}

// Display all books saved in Local Storage
Library.prototype.checkLocalStorage = function() {
  if (localStorage.length > 0) {
    this.books = JSON.parse(localStorage.getItem('Library'));
    this.displayAllBooks();
  }
}

// Reset all book cards
Library.prototype.resetBookCards = function() {
  anchor.textContent = '';
  this.displayAllBooks();
}

// Build HTML book card
Library.prototype.buildBookCard = function(book) {
  const col = document.createElement("div");
  col.className = "col";
  col.id = String(book.title);

  const card = document.createElement("div");
  if (book.read === "on") {
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
Library.prototype.buildCardHeader = function(book) {
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const headerIcon = document.createElement("i");
  headerIcon.className = (book.read === "on") ? "bi bi-check-lg text-info" : "bi bi-x-lg text-danger";

  const headerText = document.createElement("span");
  headerText.innerText = " Read";

  cardHeader.appendChild(headerIcon);
  cardHeader.appendChild(headerText);

  return cardHeader;
}

// Book card body
Library.prototype.buildCardBody = function(book) {
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

// Book card body read status update button
Library.prototype.buildReadButton = function(book) {
  const readButton = document.createElement("a");
  readButton.className = "btn btn-dark card-link";
  readButton.innerText = (book.read === "on") ? "Mark Unread" : "Mark Read";

  readButton.addEventListener('click', () => {
    const bookIndex = this.findBookIndex(book.title);
    const targetBook = this.books.at(bookIndex)
    targetBook.read = (targetBook.read === "on") ? "off" : "on";
    this.resetBookCards();
  })

  return readButton;
}

// Find book index to update read status
Library.prototype.findBookIndex = function(bookTitle) {
  return this.books.findIndex(
    (book) => book.title === bookTitle
  );
}

// Book card body delete book button
Library.prototype.buildDeleteButton = function(book) {
  const deleteButton = document.createElement("a");
  deleteButton.className = "btn btn-danger card-link";
  deleteButton.innerText = "Delete Book";

  deleteButton.addEventListener('click', e => {
    this.deleteBook(book.title);
  })

  return deleteButton;
}

// Book card footer
Library.prototype.buildCardFooter = function(book) {
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer text-muted";
  cardFooter.innerText = book.pages + " pages";

  return cardFooter
}

// Add book
Library.prototype.addBook = function() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  let newBook = new Book(title, author, pages, read);
  this.books.push(newBook)
  this.buildBookCard(newBook);
}

// Delete book
Library.prototype.deleteBook = function(title) {
  this.removeFromLibrary(title);
  document.getElementById(title).remove();
}

Library.prototype.removeFromLibrary = function(bookTitle) {
  this.books.splice(this.books.findIndex(function(i){
    return i.title === bookTitle;
  }), 1);
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
  
// Add new books via modal submit button
const bookForm = document.getElementById("book-form");

bookForm.addEventListener('submit', e => {
  myLibrary.addBook();
  localStorage.clear();
  localStorage.setItem('Library', JSON.stringify(myLibrary.books));
})