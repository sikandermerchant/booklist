///Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}



//UI Constructor
function UI(){}

  ///Protototype to Add book to list
  UI.prototype.addBookToList = function(book){
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
//Prototype to clear fields
  UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  }

  ///Prototype to show alert
  UI.prototype.showAlert = function(message, className){
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

//Prototype to remove book from the list
UI.prototype.removeBookFromList = function(target){
if(target.className === 'delete'){
///target will be the a tag which is inside the td which is inside a tr. So we will to traverse two parentlements to the remove that a tag as follows
  target.parentElement.parentElement.remove();
}
}


///Event Listeners
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

///Validate

if(title === '' || author === '' || isbn === ''){
  ///Error Alert
ui.showAlert('Please fill in all fields', 'error');

} else {
///Add Book to List
ui.addBookToList(book);

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

///Success Alert for removing book
ui.showAlert('Book sucessfully removed!', 'success');

  e.preventDefault;
  });


  