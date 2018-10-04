import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.shelfs = [{ id: 'currentlyReading', name: 'Currently Reading' }, { id: 'wantToRead', name: 'Want to Read' }, { id: 'read', name: 'Read' }];
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  };
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  //TODO - add changing shelf
  changeShelf() {}
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {this.shelfs.map(shelf => (
              <Shelf
                key={shelf.id}
                shelfName={shelf.name}
                books={this.state.books.filter(book => book.shelf === shelf.id)}
                changeShelf={this.changeShelf}
              />
            ))}
          </div>
          <div className="open-search">
            <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;
