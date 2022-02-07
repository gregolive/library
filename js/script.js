// ADD BOOK TO LIBRARY

let myLibrary = [1];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)
}

// DISPLAY BOOKS VIA CARDS

myLibrary.forEach(displayBook)

function displayBook() {
  const anchor = document.querySelector("#anchor");

  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card text-center border-info";

  card.appendChild(buildHeader());
  card.appendChild(buildBody());
  card.appendChild(buildFooter());
  col.appendChild(card);
  anchor.appendChild(col);
}

function buildHeader() {
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const headerIcon = document.createElement("i");
  headerIcon.className = "bi bi-check-lg text-info";

  const headerText = document.createElement("span");
  headerText.innerText = " Read";

  cardHeader.appendChild(headerIcon);
  cardHeader.appendChild(headerText);

  return cardHeader;
}

function buildBody() {
  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.innerText = "The Hobbit";
  body.appendChild(title);

  const author = document.createElement("p");
  author.innerText = "J. R. R. Tolkien";
  body.appendChild(author);

  return buildButtons(body);
}

function buildButtons(body) {
  const readButton = document.createElement("a");
  readButton.href = "#";
  readButton.className = "btn btn-dark card-link";
  readButton.innerText = "Mark Unread";
  body.appendChild(readButton);

  const deleteButton = document.createElement("a");
  deleteButton.href = "#";
  deleteButton.className = "btn btn-danger card-link";
  deleteButton.innerText = "Delete Book";
  body.appendChild(deleteButton);

  return body
}

function buildFooter() {
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer text-muted";
  cardFooter.innerText = "340 pages"

  return cardFooter
}

// OPEN AND CLOSE MODAL

let modal = document.querySelector("#bookModal");

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}