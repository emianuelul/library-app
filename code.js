const addBtn = document.querySelector('.addBtn');

// ====== FORM ITEMS ======
const form = document.querySelector('form');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.closeBtn');
const submitBtn = document.querySelector('.submitBtn');

form.addEventListener('submit', (event) => addBookToLibrary(event));

addBtn.addEventListener('click', (event) => {
  modal.classList.add('open');
});

closeBtn.addEventListener('click', (event) => {
  modal.classList.remove('open');
});

const myLibrary = [];

function Book(data) {
  this.name = data.bookName;
  this.author = data.bookAuthor;
  this.pages = data.pages;
  if (read === 'on') {
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

  form.reset();
  updateRows();
  modal.classList.remove('open');
}

// when submitted, update rows
function updateRows() {
  const rows = document.querySelectorAll('.bookcase-row');
  let index = 0;
  for (item of myLibrary) {
    let rowindex = Math.floor(index / 10);

    let book = document.createElement('div');

    book.classList.add('book');
    rows[rowindex].appendChild(book);

    index++;
  }
}
