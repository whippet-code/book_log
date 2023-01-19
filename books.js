// HyperionDev T40 - JSON

/*  Website/app to store book info
    -------
    Using session storage keep track of each books;
    author, title, genre, rating, isRead.
    -------
    all book info added should be listed on website
    -------
    user should be able to remove or edit book info

*/

// setup array to hold books 
let bookList = [];

// function called once age is loaded, to "load" current book list from storage
function loadBooks() {
  // selector set to .bookList element - used later to add books to dropdown selector on page.
  let tableRowHolder = document.getElementById("table")
  // Check session storage for if a bookList is present yet ("booksHere === true")
  if(sessionStorage.getItem("booksHere") === null) {
    // books not saved in storage yet, so create session storage and start building via form
    console.log("Here")
    let books = JSON.stringify(bookList);
    sessionStorage.setItem("books", books)
    sessionStorage.setItem("booksHere", true)
  }
  else {
    // books already in storage so load them now into the drop down list element and bookList array.
    bookList = JSON.parse(sessionStorage.getItem("books"));
    let i = 0;
    bookList.forEach(function(book) {
      /*For each book in the array create a new row
      for the table with <td> for each value of book*/

      //create new <tr> element to build td into
      let tr = tableRowHolder.insertRow(-1);
      // for each book value build a td element for table
      for (value in book) {
        let newTD = newEl(book[value]);
        tr.appendChild(newTD)
      }
      // also add an edit & delete button for each row
      let editBtn = document.createElement('button')
      editBtn.innerText = "Edit"
      editBtn.className = "editBtn"
      editBtn.onclick = () => {
        // prompt for which "key" to edit
        let bookKey = prompt("Which piece of book info do you wish to edit? title/author/genre/rating/isRead").toLowerCase();
        // Need to verify the input is an actual key in book object
        if(['title', 'author', 'genre', 'rating', 'isRead'].indexOf(bookKey) < 0) {
          alert("Please enter a valid heading to edit")
          return;
        }
        // prompt for new value
        let bookValue = prompt("Please input the new details")
        if (bookValue == "") {
          alert("Please input a value to update book info with")
          return;
        }
        // update bookList via storage
        book[bookKey] = bookValue;
        // update session storage books with new book details
        sessionStorage.setItem("books", JSON.stringify(bookList))
        // page refresh from storage - w3schools resource to "force" refresh DOM
        location.reload()
      }
      tr.appendChild(editBtn)

      let newDelBtn = document.createElement('button')
      newDelBtn.innerText = "Delete"
      newDelBtn.className = "delBtn"
      newDelBtn.onclick = (e) => {
        // delete?
        if (confirm("Are you sure you wish to delete this book?")) {
          // remove tr from display
          e.target.parentNode.style.display = "none"
          // call deletebook
          delBook(book);
        }else{
          return;
        }
      }
      tr.appendChild(newDelBtn)

      // give each book it's own value id.
      book.value = i;
      i = i + 1;
    })
  }
}



// book object constructor
function NewBook(title, author, genre, rating, isRead) {
  this.title = title
  this.author = author
  this.genre = genre
  this.rating = rating
  this.isRead = isRead
}


// addBook function adds submitted book to bookList array by building newBook object

const addBook = () => {
  let newBook = new NewBook(
    document.getElementById('title').value,
    document.getElementById('author').value,
    document.getElementById('genre').value,
    document.getElementById('rating').value,
    document.getElementById('isRead').value
  )
  // load current bookList from session storage & parse into JS object
  bookList = JSON.parse(sessionStorage.getItem("books"))
  // push new book to bookList array.
  bookList.push(newBook)
  // convert back to books and update session storage
  sessionStorage.setItem("books", JSON.stringify(bookList))
}

// Delete book func - get bookList from storage, splice book from array and update storage
const delBook = book => {

  bookList = JSON.parse(sessionStorage.getItem('books'))
  bookList.splice(book.value, 1)

  // update session storage books with new array
  sessionStorage.setItem("books", JSON.stringify(bookList)) 
  sessionStorage.setItem('booksHere', false)
}

// build html element func
const newEl = (value) => {

  // build element
  let newTD = document.createElement('td');
  newTD.innerText = value;
  return newTD;
}


