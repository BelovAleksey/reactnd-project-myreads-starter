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

    this.setState(
      state => {
        return (state.query = trimmedInput);
      },
      () => {
        if (trimmedInput) {
          BooksAPI.search(trimmedInput).then(books => {
            if (books.error) {
              this.setState(state => {
                return (state.books = []);
              });
            } else if (trimmedInput === this.state.query) {
              books = this.updateShelf(books, this.props.books);
              this.setState(state => {
                return (state.books = books);
              });
            }
          });
        } else
          this.setState(state => {
            return (state.books = []);
          });
      }
    );
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
            <input type="text" placeholder="Search by term" onChange={event => this.searchBooks(event)} />
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
