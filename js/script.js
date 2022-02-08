// DISPLAY BOOKS VIA CARDS

//localStorage.clear();

displayBooks(allBooks());

console.log(allBooks());

function displayBooks(books) {
  if (books.length === 0) {
    console.log("building");
    buildExample();
  } else {
    for (const book of books) {
      buildBookCard(book);
    }
  }
}

function buildExample() {
  exampleBook = new Book(1, "Example Book", "If you are seeing this your library is empty!", "42", "on");
  buildBookCard(exampleBook);
}

function allBooks() {
  let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      values.push( JSON.parse(localStorage.getItem(keys[i])) );
  }

  return values;
}

function buildBookCard(book) {
  const anchor = document.querySelector("#anchor");

  const col = document.createElement("div");
  col.className = "col";
  col.id = String(book.id);

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
  readButton.className = "btn btn-dark card-link";
  if (book.read === "on") {
    readButton.innerText = "Mark Unread";
  } else {
    readButton.innerText = "Mark Read";
  }

  const deleteButton = document.createElement("a");
  deleteButton.className = "btn btn-danger card-link";
  deleteButton.innerText = "Delete Book";

  if (localStorage.length === 0) {
    readButton.classList.add("disabled");
    readButton.setAttribute("aria-disabled", "true");
    deleteButton.classList.add("disabled");
    deleteButton.setAttribute("disabled", "disabled");
  }

  body.appendChild(readButton);
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

const bookForm = document.getElementById("book-form");

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBook(book) {
  localStorage.setItem(book.id, JSON.stringify(book));
}

bookForm.addEventListener('submit', function() {
  addBookToLibrary();
  bookForm.reset();
})

function addBookToLibrary() {
  const id = localStorage.length + 1;
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  let newBook = new Book(id, title, author, pages, read);
  createBook(newBook);
  buildBookCard(newBook);
}

// DELETE BOOK FROM LIBRARY

const deleteBtns = Array.from(document.querySelectorAll('.btn.btn-danger.card-link'));

function deleteBook(id) {
  localStorage.removeItem(id);
  document.getElementById(id).remove();
}

deleteBtns.forEach(button => {
  button.addEventListener('click', e => {
    let id = e.target.parentNode.parentNode.parentNode.id;
    console.log(id);
    deleteBook(id);
    if (localStorage.length === 0) {
      buildExample();
    }
  })
});

// CHANGE BOOK READ STATUS 

const readBtns = Array.from(document.querySelectorAll('.btn.btn-dark.card-link'));

function updateReadStatus(book) {
  if (book.read === "on") {
    book.read = "off";
  } else {
    book.read = "on";
  }
  deleteBook(book.id);
  createBook(book);
  buildBookCard(book);
}

readBtns.forEach(button => {
  button.addEventListener('click', e => {
    let book = JSON.parse(localStorage.getItem(e.target.parentNode.parentNode.parentNode.id));
    console.log(book);
    updateReadStatus(book);
    window.location.reload();
  })
});

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