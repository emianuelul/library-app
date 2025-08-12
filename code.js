const addBtn = document.querySelector(".addBtn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".closeBtn");

addBtn.addEventListener("click", (event) => {
  modal.classList.add("open");
});

closeBtn.addEventListener("click", (event) => {
  modal.classList.remove("open");
});

const myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // take params, create a book then store it in the array
}
