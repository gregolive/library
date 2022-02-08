// DISPLAY BOOKS VIA CARDS

for (const book of allBooks()) {
  buildBookCard(book);
}

function allBooks() {
  let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      values.push( JSON.parse(localStorage.getItem(keys[i])) );
  }

  console.log(values);

  return values;
}

function buildBookCard(book) {
  const anchor = document.querySelector("#anchor");

  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  if (book.read === "on") {
    card.className = "card text-center border-info";
  } else {
    card.className = "card text-center border-danger";
  }

  card.appendChild(buildHeader(book));
  card.appendChild(buildBody(book));
  card.appendChild(buildFooter(book));
  col.appendChild(card);
  anchor.appendChild(col);
}

function buildHeader(book) {
  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const headerIcon = document.createElement("i");

  if (book.read === "on") {
    headerIcon.className = "bi bi-check-lg text-info";
  } else {
    headerIcon.className = "bi bi-x-lg text-danger";
  }
  const headerText = document.createElement("span");
  headerText.innerText = " Read";

  cardHeader.appendChild(headerIcon);
  cardHeader.appendChild(headerText);

  return cardHeader;
}

function buildBody(book) {
  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.innerText = book.title;
  body.appendChild(title);

  const author = document.createElement("p");
  author.innerText = book.author;
  body.appendChild(author);

  return buildButtons(book, body);
}

function buildButtons(book, body) {
  const readButton = document.createElement("a");
  readButton.href = "#";
  readButton.className = "btn btn-dark card-link";
  if (book.read === "on") {
    readButton.innerText = "Mark Unread";
  } else {
    readButton.innerText = "Mark Read";
  }
  body.appendChild(readButton);

  const deleteButton = document.createElement("a");
  deleteButton.href = "#";
  deleteButton.className = "btn btn-danger card-link";
  deleteButton.innerText = "Delete Book";
  body.appendChild(deleteButton);

  return body
}

function buildFooter(book) {
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer text-muted";
  cardFooter.innerText = book.pages + " pages";

  return cardFooter
}

// ADD BOOK TO LIBRARY

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const bookForm = document.getElementById("book-form")

bookForm.addEventListener('submit', function() {
  addBookToLibrary();
  allStorage().forEach(displayBook);
  bookForm.reset();
})

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  let newBook = new Book(title, author, pages, read);
  console.log(newBook);
  localStorage.setItem(String(title), JSON.stringify(newBook));
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