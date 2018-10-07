import React, { Component } from 'react';

class Changer extends Component {
  constructor(props) {
    super(props);
    this.state = { shelf: this.props.shelf };
  }
  handeChangeShelf = e => {
    e.preventDefault();
    this.props.changeShelf(e.target.value);
  };
  render() {
    const shelf = this.props.shelf ? this.props.shelf : 'none';
    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handeChangeShelf}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}
export default Changer;
