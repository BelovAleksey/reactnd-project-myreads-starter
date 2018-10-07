import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';

class Shelf extends Component {
  render() {
    const { shelfName, books, changeShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <Book
                key={book.id}
                book={book}
                shelf={book.shelf}
                backgroundImage={book.imageLinks ? book.imageLinks.smallThumbnail : ''}
                authors={book.authors}
                title={book.title}
                changeShelf={changeShelf}
              />
            ))}
          </ol>
          <Link className="open-search" to="/search">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}
export default Shelf;
