class LibraryManager {
    constructor() {
        this.myLibrary = [];
        this.bookContainer = document.querySelector('.book-list');
        this.addButton = document.querySelector('.addButton');
        this.addButton2 = document.querySelector('.addButton2');
        this.closeDialogButton = document.querySelector('#addBook .close');
        this.dialog = document.querySelector('#addBook');
        this.form = document.querySelector('#addBook form');
        this.infoButton = document.querySelector('.infoButton');
        this.infoBox = document.querySelector('.info-box');

        // Event handler for showing diialog
        this.addButton.addEventListener('click', () => {
            this.dialog.showModal();
        });

        this.addButton2.addEventListener('click', () => {
            this.dialog.showModal();
            this.infoBox.classList.remove('absolute');
        });

        // Event handler for closing diialog
        this.closeDialogButton.addEventListener('click', () => {
            this.dialog.close();
        });

        // Event handler to showing info of the library
        this.infoButton.addEventListener('click', (e) => {
            this.infoBox.classList.toggle('absolute');
        });

        // Add new book
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBookToLibrary();
            this.resetForm()
        });

        // Statistic Informations
        this.totalBook = document.querySelector('#infoBook p:nth-child(2)');
        this.completedBook = document.querySelector('#infoCompleted p:nth-child(2)');
        this.totalPages = document.querySelector('#infoPage p:nth-child(2)');
    }

    changeStatus(index) {
        this.myLibrary[index].changeStatus();
        this.renderBooks();
    }

    // Function to create book object and render it
    addBookToLibrary() {
        let bookTitle = document.querySelector('#bookName').value;
        if (bookTitle.length > 30) {
            bookTitle = bookTitle.substring(0, 25) + '...';
        }
        let bookAuthor = document.querySelector('#bookAuthor').value;
        if (bookAuthor.length > 40) {
            bookAuthor = bookAuthor.substring(0, 30) + '...';
        }
        const bookPages = document.querySelector('#pages').value;
        const bookCover = document.querySelector('#cover').value;
        const bookStatus = document.querySelector('#status').checked;
        const isBookExists = this.myLibrary.some(book => (book.title === bookTitle) && (book.pages == bookPages) && (book.author == bookAuthor));

        if (isBookExists) {
            alert('Book already inside the library');
            return;
        }

        const books = new Book(bookTitle, bookAuthor, bookPages, bookCover, bookStatus);
        this.myLibrary.push(books);
        this.renderBooks();
    }

    // Function for rendering the books and info into the website
    renderBooks() {
        this.totalBook.innerText = this.countTotalBook();
        this.completedBook.innerText = this.countTotalCompleted();
        this.totalPages.innerText = this.countTotalPages();
        this.bookContainer.innerHTML = '';

        if (this.myLibrary.length > 0) {
            for (let i = 0; i < this.myLibrary.length; i++) {
                const card = document.createElement('div');
                card.classList.add('book');
                card.innerHTML = `
                    <img src="${this.myLibrary[i].url}" alt="${this.myLibrary[i].title} Cover">
                    <h3 class="title">${this.myLibrary[i].title}</h3>
                    <p class="author">${this.myLibrary[i].author}</p>
                    <p class="page">${this.myLibrary[i].pages} Pages</p>
                    <div class="buttons">
                        <button type="button" class="${this.myLibrary[i].status ? 'complete' : 'not-complete'}" onClick="library.changeStatus(${i})"><span class="material-symbols-outlined"> ${this.myLibrary[i].status ? 'library_add_check' : 'auto_stories'} </span></button>
                        <button type="button" class="delete" onClick="library.removeBook(${i})"><span class="material-symbols-outlined"> delete </span></button>
                    </div>
                `;
                this.bookContainer.appendChild(card);
            }
        } else {
            const emptyContent = document.createElement('div');
            emptyContent.classList.add('empty');
            emptyContent.innerHTML = '<img src="./assets/empty.svg" alt="Empty Content">';
            this.bookContainer.appendChild(emptyContent);
        }
    }

    // Function to remove a book in the library
    removeBook(index) {
        this.myLibrary.splice(index, 1);
        this.renderBooks();
    }

    resetForm() {
        const bookTitleField = document.querySelector('#bookName');
        const bookAuthorField = document.querySelector('#bookAuthor');
        const bookPagesField = document.querySelector('#pages');
        const bookCoverField = document.querySelector('#cover');
        const bookStatusField = document.querySelector('#status');
        bookTitleField.value = '';
        bookAuthorField.value = '';
        bookPagesField.value = '';
        bookCoverField.value = '';
        bookStatusField.checked = false;
    }

    countTotalBook() {
        return this.myLibrary.length;
    }

    countTotalCompleted() {
        let sum = 0;
        this.myLibrary.forEach((book) => {
            if (book.status) {
                sum += 1;
            }
        });
        return sum;
    }

    countTotalPages() {
        let sum = 0;
        this.myLibrary.forEach((book) => sum += +book.pages);
        return sum;
    }
}

// Book constructor
class Book {
    constructor(title, author, pages, url, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.url = url;
        this.status = status;
    }

    changeStatus() {
        this.status = !this.status;
    }
}

const library = new LibraryManager();