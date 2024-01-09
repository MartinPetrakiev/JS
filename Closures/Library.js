/* Task Description */
/* 
    *	Create a module for working with books
        *	The module must provide the following functionalities:
            *	Add a new book to category
                *	Each book has unique title, author and ISBN
                *	It must return the newly created book with assigned ID
                *	If the category is missing, it must be automatically created
            *	List all books
                *	Books are sorted by ID
                *	This can be done by author, by category or all
            *	List all categories
                *	Categories are sorted by ID
        *	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
            *	When adding a book/category, the ID is generated automatically
        *	Add validation everywhere, where possible
            *	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
            *	Author is any non-empty string
            *	Unique params are Book title and Book ISBN
            *	Book ISBN is an unique code that contains either 10 or 13 digits
            *	If something is not valid - throw Error
*/


function solve() {
  const library = (function () {
    const books = [];
    const categories = [];

    function listBooks() {
      return books;
    }

    function addBook(title, author, ISBN, category) {
      validateInput(title, 2, 255, /^[a-zA-Z0-9\s\-\.,!]+$/);
      validateInput(author, 1, 255, /.+/);
      validateInput(ISBN, 10, 13, /^\d+$/);

      if (findBookByTitleAndISBN(title, ISBN)) {
        throw new Error('Duplicate books');
      }

      let book = {
        ID: generateUniqueId(),
        title: title,
        author: author,
        ISBN: ISBN
      };

      if (category) {
        let existingCategory = findCategoryByName(category);
        if (!existingCategory) {
          existingCategory = addCategory(category);
        }
        book.category = existingCategory.name;
      }

      books.push(book);
      return book;
    }

    function listBooks(sortBy) {
      let sortedBooks = [...books];
      if (sortBy === 'author') {
        sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
      } else if (sortBy === 'category') {
        sortedBooks.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
      } else {
        sortedBooks.sort((a, b) => a.ID - b.ID);
      }
      return sortedBooks;
    }

    function listCategories() {
      return categories.slice().sort((a, b) => a.ID - b.ID);
    }

    function generateUniqueId() {
      return books.length + 1;
    }

    function findCategoryByName(name) {
      return categories.find(category => category.name === name);
    }

    function findBookByTitleAndISBN(title, ISBN) {
      return books.find(book => (book.title === title || book.ISBN === ISBN));
    }

    function addCategory(name) {
      validateInput(name, 2, 100, /^[a-zA-Z0-9\s\-\.,!]+$/);

      let category = {
        ID: categories.length + 1,
        name: name
      };

      categories.push(category);
      return category;
    }

    function validateInput(input, minLength, maxLength, regex) {
      if (typeof input !== 'string' || input.length < minLength || input.length > maxLength || !regex.test(input)) {
        throw new Error(`Invalid input ${input}`);
      }
    }

    return {
      books: {
        list: listBooks,
        add: addBook
      },
      categories: {
        list: listCategories
      }
    };
  }());

  return library;
}
module.exports = solve;