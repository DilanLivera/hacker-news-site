import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Comment.css';

class Comment extends Component {
  static defaultProps = {
    storyUrlBase: 'https://hacker-news.firebaseio.com/v0/item/'
  }

  constructor(props) {
    super(props);
    this.state = {
      replys: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  async getComments(id) {
    const { storyUrlBase } = this.props;
    let url = `${storyUrlBase}${id}.json`;
    let comment = await fetch(url).then( data => data.json());
    return comment;
  } 

  showReplys() {
    const { kids } = this.props;
    let replys = [];

    if(kids && replys.length === 0){    
      Promise.all(kids.map(id => this.getComments(id)))
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