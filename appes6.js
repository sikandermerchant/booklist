class Book{
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{
  //Method to Add book to list
  addBookToList(book){
    console.log(book);
    const list = document.getElementById('book-list');
    //Create a table row (tr) element
    const row = document.createElement('tr');
    console.log(row);
    ///Insert table data using td tag in cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ="#" class ="delete">X</a></td>`;
    list.appendChild(row);
  }

  ///Method to remove book from List
  removeBookFromList(target)
  {
    if(target.className === 'delete'){
      ///target will be the a tag which is inside the td which is inside a tr. So we will to traverse two parentlements to the remove that a tag as follows
        target.parentElement.parentElement.remove();
      }
  }

  //Method to show Alert
  showAlert(message, className){
    //Create a div element
    const div = document.createElement('div');

    //Add Class - here we we will add the class name and will also add in the className, which was passed through prototype.

    div.className = `alert ${className}`;

    //Add Text Node using createTextNode() to the child element using appendChild() 
    div.appendChild(document.createTextNode(message));

    ///Get parent to append the div, which is the container 

    const container = document.querySelector('.container');

    ///We need to also get the form, as well have to place the alert message div before this form

    const form = document.getElementById('book-form');

    ///Now insert the alert div in the container before the form element

    container.insertBefore(div,form);

    //Timeout alert message after 3 seconds - here we pass the alert class to the timeout function to remove it
    setTimeout(function(){ 
      document.querySelector('.alert').remove();}, 
    3000);


  }
  //Method to clear fields
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

///Local Storage Class
class Store{
   
  //Method to get (fetch) books from local storage
   static getBooksFromLocalStorage(){

    let books;
    ///we want to now pull whatever there is in the local storage that can be - either added to tasks array or else tasks can be set as an empty array.
    //initialise a tasks varibale to create the array
    
    if(localStorage.getItem('books') === null){
    books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'))///this will be a string and hence we will have to parse this an object that can be used, hence we will add the "JSON parse" wrapper.
    }
    return books;

  }

  //Method to display book(s) from storage in the UI
    
  static displayBooksFromStorage(){
    //Get books from storage
    const books =  Store.getBooksFromLocalStorage()

    //We would now want to run a loop and add eack task to the DOM as we do for addTask(); except that when creating a text node and appending it to li we will pass in task instead of taskInput value as we are getting this task from local storage rather than receiving it as an input
    books.forEach(function(book){
    const ui = new UI;

    //Add book to the UI
    ui.addBookToList(book);
    });
  }
  //Method to add book to local storage
  static addBookToLocalStorage(book){
    const books =  Store.getBooksFromLocalStorage()
    ///we would now want to push the book added through the input into this books array
    
   books.push(book);
    
    //this wont add anything to the local storage so we need reset(set) local storage with this array
    localStorage.setItem('books', JSON.stringify(books));///but since it has to store strings in local storage we will have to wrap the passed value of books as string in a "JSON stringify" wrapper
    }
    

 
   //Method to remove book from local storage
   static removeBookFromLocalStorage(isbn){
     console.log(isbn);//this shows that on clicking X we will get back the isbn on console.

     const books =  Store.getBooksFromLocalStorage();

     //We would now want to run a loop through each task and using an if statement 
      books.forEach(function(book,index){
        if(book.isbn === isbn){
          books.splice(index, 1)
    // The splice() method adds/removes items to/from an array, and returns the removed item(s). 
    //Syntax array.splice(index, howmany, item1, ....., itemX)
    /*Parameter Values
    Parameter	Description
    index	- Required. An integer that specifies at what position to add/remove items, Use negative values to specify the position from the end of the array
    howmany -	Optional. The number of items to be removed. If set to 0, no items will be removed
    item1, ..., itemX	Optional. The new item(s) to be added to the array*/
    //In this case Remove 1 item from the index passed if the book isbn is equal to the isbn passed.

  }
});
//this wont remove anything from the local storage so we need reset(set) local storage with this array
localStorage.setItem('books', JSON.stringify(books));///but since it has to store strings in local storage we will have to wrap the passed value of books as string in a "JSON stringify" wrapper
  }

}
///Event Listeners
///DOM Load Event Listner to load the books from storage on page load each time
document.addEventListener('DOMContentLoaded',Store.displayBooksFromStorage);

///Add Book
document.getElementById('book-form').addEventListener('submit', function(e)
{
  ///Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  
///Instantitate Book object
const book = new Book(title, author, isbn);


///Instantiate UI Object
const ui = new UI();
console.log(ui);


///Validate

if(title === '' || author === '' || isbn === ''){
  ///Error Alert
ui.showAlert('Please fill in all fields', 'error');

} else {
///Add Book to List
ui.addBookToList(book);

//Add book to local storage
Store.addBookToLocalStorage(book);

///Success Alert for adding book
ui.showAlert('Book sucessfully added!', 'success');

//Clear the form fields on submit
ui.clearFields();
}

  e.preventDefault();
});

//Remove Book from the list
document.getElementById('book-list').addEventListener('click',function (e){

///Instantiate UI Object
const ui = new UI();

//Call the removebook prototype and pass in the event target for the click
  ui.removeBookFromList(e.target);

  //Remove Book from local storage
  ///Here we would want a unique identifier which we can identify and the use to delete data in local storage, isbn in this case. Hence when the removeBookFromLocalStorage is called, it is passed in with the isbn, below we will first identify through traversing. 
  //a tag has the X whose parent is td, previous element sibling td has the isbn, we want to access the textContent of that td. So we tarverse this using vanilla JS as follows:

  Store.removeBookFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);

///Success Alert for removing book
ui.showAlert('Book sucessfully removed!', 'success');

  e.preventDefault;
  });