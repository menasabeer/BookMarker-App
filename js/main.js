var bookName = document.getElementById("bookName");
var bookURL = document.getElementById("bookURL");
var submitBtn = document.getElementById("submitBtn");
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("searchInput");
var currentIndex = 0;
var books = [];
var nameAlert = document.getElementById("nameAlert");
var urlAlert = document.getElementById("urlAlert");

if (JSON.parse(localStorage.getItem("booksList")) != null) {
    books = JSON.parse(localStorage.getItem("booksList"));
    displayBook();
}
function replaceURL(url) {
    // Ensure the URL is complete (add "https://" if not present)
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    // Open the new URL in a new tab
    window.open(url, '_blank');
}


submitBtn.onclick = function () {
    if (bookName.value == "" || bookURL.value == "") {
        nameAlert.classList.remove("d-none");
        urlAlert.classList.remove("d-none");
    } else {
        if (submitBtn.innerHTML == "Submit") {
            addBook();
            nameAlert.classList.add("d-none");
            urlAlert.classList.add("d-none");
        } else {
            updateBook();
            nameAlert.classList.add("d-none");
            urlAlert.classList.add("d-none");
        }
        displayBook();
        clearForm();
    }
};

function addBook() {
    var book = {
        name: bookName.value,
        url: bookURL.value,
    };
    books.push(book);
    localStorage.setItem("booksList", JSON.stringify(books));
}

function displayBook() {
    cartona = "";
    for (var i = 0; i < books.length; i++) {
        cartona += `<div class=" books d-flex row m-4">
                        <div class="col-md-4">
                            <h2>${books[i].name}</h2>
                        </div>
                        <div class="col-md-8 px-5">
                            <button onclick="replaceURL('${books[i].url}')" class="btn btn-primary me-3 px-4">Visit</button>
                            <button onclick=getBookInfo(${i}) class="btn btn-warning text-white me-3 px-4">Update</button>
                            <button onclick=deleteBook(${i}) class="btn btn-danger me-3 px-4">Delete</button>
                        </div>
                    </div>`;
    }
    document.getElementById("books").innerHTML = cartona;
}

function deleteBook(index) {
    books.splice(index, 1);
    displayBook();
    localStorage.setItem("booksList", JSON.stringify(books));
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

searchInput.onkeyup = function () {
    cartona = "";
    for (var i = 0; i < books.length; i++) {
        if (
            books[i].name
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        ) {
            cartona += `<div class=" books d-flex row m-4">
                            <div class="col-md-4">
                                <h2>${books[i].name}</h2>
                            </div>
                            <div class="col-md-8 px-5">
                                <button onclick="replaceURL('${books[i].url}')" class="btn btn-primary me-3 px-4">Visit</button>
                                <button onclick=getBookInfo(${i}) class="btn btn-warning text-white me-3 px-4">Update</button>
                                <button onclick=deleteBook(${i}) class="btn btn-danger me-3 px-4">Delete</button>
                            </div>
                        </div>`;
        }
    }
    document.getElementById("books").innerHTML = cartona;
};

function getBookInfo(index) {
    currentIndex = index;
    var currentBook = books[index];
    bookName.value = currentBook.name;
    bookURL.value = currentBook.url;
    submitBtn.innerHTML = "Update Book";
}

function updateBook() {
    var book = {
        name: bookName.value,
        url: bookURL.value,
    };
    books[currentIndex] = book;
    localStorage.setItem("booksList", JSON.stringify(books));
    submitBtn.innerHTML = "Submit";
}
