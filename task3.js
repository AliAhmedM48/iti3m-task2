var table = document.getElementById('table');

// ^ Form 1 | Books Number
// ^ single node
var formBookNumber = document.getElementById('formBookNumber');
// console.log(formBookNumber);
// ^ single node
var booksNumberInput = document.getElementById('booksNumberInput');
// console.log(booksNumberInput);
// ^ single node
var submitBooksNumber = document.getElementById('submitBooksNumber');
// console.log(submitBooksNumber);
// ^ single node
var feedbackTextBooksNumber = document.getElementById('booksNumber-validation-feedback');
// console.log(feedbackText);
// * =========================================================
// ^ Form 2 | Books Data
// ^ single node
var formBookData = document.getElementById('formBookData');
// console.log(formBookData);


// ^ collection of nodes
// var inputs = document.getElementsByClassName('form-control');
// var feedbacks = document.querySelectorAll('#formBookData .validation-feedback');
// console.log(feedbacks);


// ^ single node
var booksNameInput = document.getElementById('booksNameInput');
var booksPriceInput = document.getElementById('booksPriceInput');
var authorNameInput = document.getElementById('authorNameInput');
var authorEmailInput = document.getElementById('authorEmailInput');
// ^ single node
var submitBooksData = document.getElementById('submitBooksData');
// console.log(submitBooksData);

var feedbackTextBooksName = document.getElementById('booksName-validation-feedback');
var feedbackTextBooksPrice = document.getElementById('booksPrice-validation-feedback');
var feedbackTextAuthorName = document.getElementById('authorName-validation-feedback');
var feedbackTextAuthorEmail = document.getElementById('authorEmail-validation-feedback');
// * =========================================================
//#region 
// make a function constructor to create a book object every book should
// have (name, price, author) properties. And the author is a function
// constructor too that has (name and email property).
//#endregion
// ^ Book object
function Book(name, price, author) {
    this.name = name;
    this.price = price;
    this.author = author;
}

// ^ Author object
function Author(name, email) {
    this.name = name;
    this.email = email;
}
// * =========================================================
//#region 
// Create an array of books objects and fill its data from the user throw a
// validated form.
//#endregion
var booksArray = [];


// * addEventListener "submit" event to the form.
formBookNumber.addEventListener('submit', formBookNumberValidation);

// * formValidation for the form "submit" event.
function formBookNumberValidation(event) {
    event.preventDefault();
    var feedbackText = feedbackTextBooksNumber;
    if (booksNumberInput.value === '') {
        // ! empty inputs case.
        feedbackText.innerText = 'Required';
    }
    else if (isNaN(booksNumberInput.value)) {
        // ! age is not a number case.
        feedbackTextBooksNumber.innerText = 'Numbers only';
    }
    else {
        this.style.display = 'none';
        // this.style.display = 'block';
        formBookData.style.display = 'block';
        feedbackText.innerText = '';

    }
}

// * addEventListener "submit" event to the form.
formBookData.addEventListener('submit', formBookDataValidation);

// * formValidation for the form "submit" event.
function formBookDataValidation(event) {
    var isValidName, isValidPrice, isValidauthorName, isValidauthorEmail = 1;

    event.preventDefault();
    // * booksNameInput 
    var feedbackText = feedbackTextBooksName;
    if (booksNameInput.value === '') {
        // ! empty inputs case.
        feedbackText.innerText = 'Required';
    }
    else if (isFinite(booksNameInput.value)) {
        // ! name is numerical values case.
        event.preventDefault();
        feedbackText.innerText = 'Characters only';
    } else {
        feedbackText.innerText = '';
        isValidName = 1;
    }

    // * booksPriceInput 
    feedbackText = feedbackTextBooksPrice;
    if (booksPriceInput.value === '') {
        // ! empty inputs case.
        feedbackText.innerText = 'Required';
    }
    else if (isNaN(booksPriceInput.value)) {
        // ! age is not a number case.
        feedbackText.innerText = 'Numbers only';
    }
    else {
        feedbackText.innerText = '';
        isValidPrice = 1;
    }

    // * authorNameInput 
    feedbackText = feedbackTextAuthorName;
    if (authorNameInput.value === '') {
        // ! empty inputs case.
        feedbackText.innerText = 'Required';
    }
    else if (isFinite(authorNameInput.value)) {
        // ! name is numerical values case.
        event.preventDefault();
        feedbackText.innerText = 'Characters only';
    } else {
        feedbackText.innerText = '';
        isValidauthorName = 1;
    }

    // * authorEmailInput
    feedbackText = feedbackTextAuthorEmail;
    if (authorEmailInput.value === '') {
        // ! empty inputs case.
        feedbackText.innerText = 'Required';
    }
    else if ((authorEmailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null)) {
        // ! email is invalid format case.
        feedbackText.innerText = 'invalid email, user@example.com';
    }
    else {
        feedbackText.innerText = '';
        isValidauthorEmail = 1;
    }

    if (isValidName && isValidPrice && isValidauthorName && isValidauthorEmail) {
        console.log('done');

        var author = new Author(authorNameInput.value, authorEmailInput.value);
        var book = new Book(booksNameInput.value, booksPriceInput.value, author);

        booksArray.push(book);

        resetForm();
        if (booksNumberInput.value == booksArray.length) {
            displayInTable(booksArray, event);
            // !---------------------------------
            formBookData.style.display = 'none';
            // formBookData.style.display = 'block';
            table.style.display = 'table';
        }

    }
}


// * resetForm for the form "submit" event.
function resetForm() {
    for (var i = 0; i < 3; i++) {

        booksNameInput.value = '';
        booksPriceInput.value = '';
        authorNameInput.value = '';
        authorEmailInput.value = '';

        feedbackTextBooksName.innerText = '';
        feedbackTextBooksPrice.innerText = '';
        feedbackTextAuthorName.innerText = '';
        feedbackTextAuthorEmail.innerText = '';
    }
}

// * add data to table.


function displayInTable(inputs) {
    console.log(inputs);
    console.log(inputs[0]['name']);
    console.log(inputs[0]['price']);
    console.log(inputs[0]['author']['name']);
    console.log(inputs[0]['author']['email']);

    var tbody = document.getElementById('tbody');



    for (var i = 0; i < inputs.length; i++) {
        var tr = document.createElement('tr');
        tr.setAttribute('id', `row${i}`);

        var td = document.createElement('td');
        td.innerText = inputs[i]['name'];
        tr.appendChild(td);

        var td = document.createElement('td');
        td.innerText = inputs[i]['price'];
        tr.appendChild(td);

        var td = document.createElement('td');
        td.innerText = inputs[i]['author']['name'];
        tr.appendChild(td);

        var td = document.createElement('td');
        td.innerText = inputs[i]['author']['email'];
        tr.appendChild(td);

        // ^ edit
        var td = document.createElement('td');
        td.innerHTML = `<button id="submitBooksNumber" onclick="editBook(${i},event)" class="btn btn-secondary w-100 mx-auto" type="submit">Edit</button>`;
        tr.appendChild(td);

        // ^ delete
        var td = document.createElement('td');
        td.innerHTML = `<button id="submitBooksNumber" onclick="deleteBook(${i},event)" class="btn btn-secondary w-100 mx-auto" type="submit">Delete</button>`;
        tr.appendChild(td);

        tbody.appendChild(tr);
    }
}



function deleteBook(i, event) {
    booksArray.forEach(function (e) { console.log(e.author.email) })

    booksArray.splice(i, 1);
    // document.getElementById(`row${i}`).parentNode.removeChild(document.getElementById(`row${i}`))
    booksArray.forEach(function (e) { console.log(e.author.email) })
    console.log(document.getElementsByTagName('tr')[i + 1]);
    document.getElementsByTagName('tr')[i + 1].remove();
    console.log(event);
}

