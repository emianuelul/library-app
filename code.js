const addBtn = document.querySelector('.addBtn');
const bookDeets = document.querySelector('.book-deets');

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
const bookDivs = [];

function Book(data) {
  this.name = data.bookName;
  this.author = data.bookAuthor;
  this.pages = data.pages;
  if (read === 'on') {
    this.read = true;
  } else this.read = false;
  this.id = data.id;
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
  dummyBook.id = crypto.randomUUID();

  let book = new Book(dummyBook);
  myLibrary.push(book);

  form.reset();
  updateRows();
  modal.classList.remove('open');
}

let lastStop = 0;
// when submitted, update rows
function updateRows() {
  const rows = document.querySelectorAll('.bookcase-row');
  let i = 0;
  for (i = lastStop; i < myLibrary.length; i++) {
    let rowindex = Math.floor(i / 10);

    let book = document.createElement('div');
    let title = document.createElement('div');
    let author = document.createElement('div');

    let titleH = document.createElement('p');
    let authorP = document.createElement('p');

    title.appendChild(titleH);
    author.appendChild(authorP);

    titleH.textContent = myLibrary[i].name;
    title.classList.add('title');
    authorP.textContent = myLibrary[i].author;
    author.classList.add('author');

    book.appendChild(title);
    book.appendChild(author);

    book.setAttribute('data-index', `${i}`);
    book.setAttribute('data-row', `${rowindex}`);
    book.classList.add('book');

    rows[rowindex].appendChild(book);

    book.addEventListener('mouseup', (event) => {
      myLibrary = myLibrary.splice(i, 1);
      rows[rowindex].removeChild(book);

      console.log(myLibrary);
    });
  }
  lastStop = i;
}
