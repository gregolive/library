# Library

Keep track of the books you've read and the books you want to read with your own personal library.

[Live demo](https://gregolive.github.io/library/) 👈

## Functionality

- Styling via Bootstrap
- Javascript contructors keep track of individual books and the library
- Library object inherhits functions via prototyping
- Local storage saves the user's library so it can be rebuilt on a page refresh
- Event listeners allow the user to dynamically add a book, change a books "read status", or  delete a book from the library

## Reflection

This was my first project back in Javascript after spending some time learning Ruby and building projects with Ruby on Rails. The goal of this project was to build objects with constructors and then define functions on the prototype of the objects. I immeditely saw the benefits of using constructors and prototyes in Javascript because my JS file felt much neater and easier to read than I remember from my previous projects.

The main problem I ran into with this project was trying to figure out how to persist the library on a page reload. The solution I chose was to use localStorage to save the Library using <code>JSON.stringify()</code>, since localStorage requires that the key value pairs be strings. LocalStorage allowed the library to be "personal" to the user.

After instantiating the Library object on a page load the <code>checkLocalStorage</code> function checks if there is anything saved in localStorage. If so, <code>JSON.parse()</code> is used to re-create the array of Book objects and set this array to the Library's <code>books</code> constant. Otherwise the <code>books</code> constant is left empty.
