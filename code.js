const addBtn = document.querySelector('.addBtn');
const bookcase = document.querySelector('.bookcase');

// ====== FORM ITEMS ======
const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.closeBtn');
const submitBtn = document.querySelector('.submitBtn');

const bookDetailsModal = document.querySelector('.book-details-modal');
const okBtn = document.querySelector('.okBtn');
const delBtn = document.querySelector('.deleteBtn');
const readCheck = document.querySelector('#update-read');

const bookDetails = document.querySelectorAll('.detail-value');

readCheck.addEventListener('mouseup', (event) => updateBooks(currentIndex));

okBtn.addEventListener('mouseup', (event) => {
  bookDetailsModal.classList.remove('open');
});

let currentIndex = 0;
delBtn.addEventListener('mouseup', (event) => deleteBook(currentIndex));

form.addEventListener('submit', (event) => addBookToLibrary(event));

addBtn.addEventListener('click', (event) => {
  modal.classList.add('open');
});

closeBtn.addEventListener('click', (event) => {
  modal.classList.remove('open');
});

let myLibrary = [];

function Book(data) {
  this.name = data.bookName;
  this.author = data.bookAuthor;
  this.pages = data.pages;
  if (data.read === 'on') {
    this.read = true;
  } else this.read = false;
}

function addBookToLibrary(event) {
  event.preventDefault();
  if (myLibrary.length === 30) {
    alert('Bookcase is full, remove something and try again after!');
    return;
  }
  const data = new FormData(form);

  let dummyBook = {};

  for (item of data) {
    dummyBook[item[0]] = item[1];
  }

  let book = new Book(dummyBook);
  myLibrary.push(book);

  updateRows(myLibrary.length);

  modal.classList.remove('open');
  form.reset();
}

// when submitted, update rows
function updateRows(size) {
  let index = size - 1;
  let rowindex = Math.floor(index / 10);

  let book = document.createElement('div');
  let title = document.createElement('div');
  let author = document.createElement('div');

  let titleH = document.createElement('p');
  let authorP = document.createElement('p');

  title.appendChild(titleH);
  author.appendChild(authorP);

  titleH.textContent = myLibrary[index].name;
  title.classList.add('title');
  authorP.textContent = myLibrary[index].author;
  author.classList.add('author');

  book.appendChild(title);
  book.appendChild(author);

  book.setAttribute('data-index', `${index}`);
  book.setAttribute('data-row', `${rowindex}`);
  book.classList.add('book');

  if (myLibrary[index].read === true) {
    book.classList.add('read');
  }

  bookcase.appendChild(book);

  book.addEventListener('mouseup', () => {
    bookDetailsModal.classList.add('open');
    currentIndex = index;

    if (myLibrary[currentIndex].read) {
      readCheck.checked = true;
    } else {
      readCheck.checked = false;
    }

    bookDetails[0].textContent = myLibrary[currentIndex].name;
    bookDetails[1].textContent = myLibrary[currentIndex].author;
    bookDetails[2].textContent = myLibrary[currentIndex].pages;
  });
}

function deleteBook(index) {
  // remove element
  let books = document.querySelectorAll('.book');
  const x = myLibrary.splice(index, 1);
  bookcase.removeChild(books[index]);

  books = document.querySelectorAll('.book');
  let i = 0;
  for (item of books) {
    let rowindex = Math.floor(i / 10);
    item.setAttribute('data-index', `${i}`);
    item.setAttribute('data-row', `${rowindex}`);

    i++;
  }
}

function updateBooks(index) {
  const books = document.querySelectorAll('.book');

  if (readCheck.checked) {
    books[index].classList.remove('read');
    myLibrary[index].read = false;
  } else {
    books[index].classList.add('read');
    myLibrary[index].read = true;
  }
}
