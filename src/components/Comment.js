import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
  render() {
    let { by, text, time } = this.props;

    return (
      <div className="Comment-container">
        <div>
          <em>by</em> <cite ><strong>{ by } </strong>on<strong> { time }</strong></cite>
        </div>
        <div className="Comment">
          <span className="Comment-tip"></span>
          { text }
        </div>
      </div>
    );
  }
}

export default Comment;