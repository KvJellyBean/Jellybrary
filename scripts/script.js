const addButton = document.querySelector('#library-container .addButton');
const dialog = document.querySelector('#addBook');

addButton.addEventListener('click', (e) => {
    dialog.showModal();
});