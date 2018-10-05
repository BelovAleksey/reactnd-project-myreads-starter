import React, { Component } from 'react';
import Changer from './Changer';

class Book extends Component {
  handleChangeShelf = value => {
    return this.props.changeShelf(this.props.book, value);
  };
  render() {
    const { backgroundImage, book, shelf, title, authors } = this.props;
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
            <Changer shelf={shelf} book={book} changeShelf={this.handleChangeShelf} />
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}
export default Book;
