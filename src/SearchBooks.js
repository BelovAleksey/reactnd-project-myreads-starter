import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }
  updateShelf(allBooks, booksInShelf) {
    allBooks.forEach(book => {
      booksInShelf.forEach(bookInShelf => {
        if (book.id === bookInShelf.id) {
          book.shelf = bookInShelf.shelf;
        }
      });
    });
    return allBooks;
  }

  searchBooks(event) {
    event.preventDefault();
    const trimmedInput = event.target.value.trim();
    if (trimmedInput) {
      BooksAPI.search(trimmedInput).then(books => {
        if (books.error) {
          this.setState({ books: [] });
        } else {
          books = this.updateShelf(books, this.props.books);
          this.setState({ books });
        }
      });
    } else this.setState({ books: [] });
  }
  changeShelf = (updatedBook, shelf) => {
    this.setState(cur => {
      cur.books.map(book => (book.id === updatedBook.id ? (book.shelf = shelf) : ''));
      return { cur };
    });
    this.props.onChange(updatedBook, shelf);
  };
  render() {
    const books = this.state.books;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={event => this.searchBooks(event)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books &&
              books.map(book => (
                <Book
                  key={book.id}
                  book={book}
                  shelf={book.shelf}
                  backgroundImage={book.imageLinks ? book.imageLinks.smallThumbnail : ''}
                  authors={book.authors}
                  title={book.title}
                  changeShelf={this.changeShelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBooks;
