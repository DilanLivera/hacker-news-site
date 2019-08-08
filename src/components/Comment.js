import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { fetchComments } from '../helpers'
import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replys: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  showReplys() {
    const { kids } = this.props;
    let replys = [];

    if(kids && replys.length === 0){
      const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';
      let url;
    
      Promise.all(kids.map(id => {
        url = `${storyUrlBase}${id}.json`;
        return fetch(url).then( data => data.json())
      }))
      .then(response => Promise.all( response))
      .then(comments => {
        replys = comments.map(comment => {
          const { by, id, text, time, kids } =  comment;
          let formatedTime = new Date(time*1000).toDateString();
  
          return <Comment key={ id } by={ by } text={ text } time={ formatedTime } kids={ kids } />;
        });
        this.setState({ replys });
      });
    }
  }

  handleClick(){
    this.showReplys();
  }

  render() {
    let { by, text, time, kids } = this.props;
    let { replys } = this.state;
    
    return (
      <div className="Comment-container">
        <div className="Comment-user-time">
          <cite><em>by </em><strong>{ by } </strong><br />
          on<strong> { time }</strong></cite>
        </div>
        <div className="Comment">
          <span className="Comment-tip"></span>
          { ReactHtmlParser(text) }
          { (kids) ? <button className="Comment-showreplys-btn" onClick= { this.handleClick }>Show Replys</button> : "" }
        </div>
        <div className="Comment-replys">
          { replys }
          { (replys) ? <hr /> : " " }
        </div>
      </div>
    );
  }
}

export default Comment;