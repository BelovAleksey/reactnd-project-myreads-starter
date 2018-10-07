import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.shelfs = [{ id: 'currentlyReading', name: 'Currently Reading' }, { id: 'wantToRead', name: 'Want to Read' }, { id: 'read', name: 'Read' }];
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  changeShelf = (updatedBook, shelf) => {
    this.setState(cur => {
      let existInShelf = false;
      cur.books.forEach(book => {
        if (book.id === updatedBook.id) {
          book.shelf = shelf;
          existInShelf = true;
        }
      });
      if (!existInShelf) {
        return { books: cur.books.concat([updatedBook]) };
      }
      return { cur };
    });
    BooksAPI.update(updatedBook, shelf).then();
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Route
              exact
              path="/"
              render={() =>
                this.shelfs.map(shelf => (
                  <Shelf
                    key={shelf.id}
                    shelfName={shelf.name}
                    books={this.state.books.filter(book => book.shelf === shelf.id)}
                    changeShelf={this.changeShelf}
                  />
                ))
              }
            />
          </div>
          <Route path="/search" render={() => <SearchBooks books={this.state.books} onChange={this.changeShelf} />} />
        </div>
      </div>
    );
  }
}

export default BooksApp;
