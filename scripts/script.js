const myLibrary = [];
const bookContainer = document.querySelector('.book-list');
const addButton = document.querySelector('#library-container .addButton');
const closeDialogButton = document.querySelector('#addBook .close');
const dialog = document.querySelector('#addBook');
const form = document.querySelector('#addBook form');

// Event handler for showing diialog
addButton.addEventListener('click', () => {
    dialog.showModal();
});

// Event handler for closing diialog
closeDialogButton.addEventListener('click', () => {
    dialog.close();
});

// Add new book
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    console.log('Book inserted');
});

// Book constructor
function Book(title, author, pages, url, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.url = url;
    this.status = status;
}

// Function to create book object and render it
function addBookToLibrary() {
    const bookTitle = document.querySelector('#bookName').value;
    const bookAuthor = document.querySelector('#bookAuthor').value;
    const bookPages = document.querySelector('#pages').value;
    const bookCover = document.querySelector('#cover').value;
    const bookStatus = document.querySelector('#status').checked;
    const books = new Book(bookTitle, bookAuthor, bookPages, bookCover, bookStatus);
    myLibrary.push(books);
    renderBooks();
}

// Function for rendering the books into the website
function renderBooks() {
    bookContainer.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement('div');
        card.classList.add('book');
        card.innerHTML = `
            <img src="${myLibrary[i].url}" alt="${myLibrary[i].title} Cover">
                <div class="description">
                <h3>${myLibrary[i].title}</h3>
                <p>${myLibrary[i].author}</p>
                <p>${myLibrary[i].pages}</p>
                <div class="buttons">
                    <button type="button" class="${myLibrary[i].status ? 'complete' : 'not-complete'}">${myLibrary[i].status ? 'Completed' : 'Not Completed'}</button>
                    <span class="material-symbols-outlined" onClick="removeBook(${i})"> delete </span>
                </div>
            </div>
        `;
        bookContainer.appendChild(card);
    }
}

// Function to remove a book in the library
function removeBook(index) {
    myLibrary.splice(index, 1);
    renderBooks();
}