import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Comment.css';

class Comment extends Component {
  render() {
    let { by, text, time } = this.props;
    
    return (
      <div className="Comment-container">
        <div className="Comment-user-time">
        <cite><em>by </em><strong>{ by } </strong><br />
        on<strong> { time }</strong></cite>
        </div>
        <div className="Comment">
          <span className="Comment-tip"></span>
          { ReactHtmlParser(text) }
        </div>
      </div>
    );
  }
}

export default Comment;