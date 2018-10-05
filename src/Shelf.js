import React, { Component } from 'react';
import Book from './Book';

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
                backgroundImage={book.imageLinks.smallThumbnail}
                authors={book.authors}
                title={book.title}
                changeShelf={changeShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default Shelf;
