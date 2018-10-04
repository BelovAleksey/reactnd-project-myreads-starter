import React, { Component } from 'react';
import Changer from './Changer';

class Book extends Component {
  render() {
    const { backgroundImage, shelf, title, authors, changeShelf } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${backgroundImage})`
              }}
            />
            <Changer shelf={shelf} changeShelf={changeShelf} />
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}
export default Book;
