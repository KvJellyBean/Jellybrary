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
});

// Book constructor
function Book(title, author, pages, url, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.url = url;
    this.status = status;
}

// Function to change status
Book.prototype.changeStatus = function () {
    this.status = !this.status;
}

function changeStatus(index) {
    myLibrary[index].changeStatus();
    renderBooks();
}

// Function to create book object and render it
function addBookToLibrary() {
    let bookTitle = document.querySelector('#bookName').value;
    if (bookTitle.length > 20) {
        bookTitle = bookTitle.substring(0, 17) + '...';
    }

    const bookAuthor = document.querySelector('#bookAuthor').value;
    const bookPages = document.querySelector('#pages').value;
    const bookCover = document.querySelector('#cover').value;
    const bookStatus = document.querySelector('#status').checked;
    const isBookExists = myLibrary.some(book => (book.title === bookTitle) && book.pages == bookPages);

    if (isBookExists) {
        alert('Book already inside the library');
        return;
    }

    const books = new Book(bookTitle, bookAuthor, bookPages, bookCover, bookStatus);
    myLibrary.push(books);
    renderBooks();
}

// Function for rendering the books and info into the website
function renderBooks() {
    totalBook.innerText = countTotalBook();
    completedBook.innerText = countTotalCompleted();
    totalPages.innerText = countTotalPages();
    bookContainer.innerHTML = '';

    if (myLibrary.length > 0) {
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
                        <button type="button" class="${myLibrary[i].status ? 'complete' : 'not-complete'}" onClick="changeStatus(${i})">${myLibrary[i].status ? 'Completed' : 'Not Completed'}</button>
                        <span class="material-symbols-outlined" onClick="removeBook(${i})"> delete </span>
                    </div>
                </div>
            `;
            bookContainer.appendChild(card);
        }
    } else {
        const emptyContent = document.createElement('div');
        emptyContent.classList.add('empty');
        emptyContent.innerHTML = '<img src="./assets/empty.svg" alt="Empty Content">';
        bookContainer.appendChild(emptyContent);
    }

}

// Function to remove a book in the library
function removeBook(index) {
    myLibrary.splice(index, 1);
    renderBooks();
}

// Statistic Informations
const totalBook = document.querySelector('#infoBook p:nth-child(2)');
const completedBook = document.querySelector('#infoCompleted p:nth-child(2)');
const totalPages = document.querySelector('#infoPage p:nth-child(2)');

function countTotalBook() {
    return myLibrary.length;
}

function countTotalCompleted() {
    let sum = 0;
    myLibrary.forEach((book) => {
        if (book.status) {
            sum += 1;
        }
    });
    return sum;
}

function countTotalPages() {
    let sum = 0;
    myLibrary.forEach((book) => sum += +book.pages);
    return sum;
}