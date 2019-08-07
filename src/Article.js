import React, { Component } from 'react';
import Comment from './components/Comment';
import './Article.css';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      commentsHidden: true
    }
    this.showComments = this.showComments.bind(this);
  }

  showComments(e) {
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';
    let { kids }  =  this.props.story;
    let url;
    let { commentsHidden, commentList } = this.state;

    //only get comments if the commetList is empty, otherwise change commentsHidden
    if(kids && commentList.length === 0){
      commentsHidden = false;

      Promise.all(kids.map(id => {
        url = `${storyUrlBase}${id}.json`;
        return fetch(url).then( data => data.json())
      }))
      .then(response => Promise.all( response))
      .then(comments => {
          let commentList = comments.map(comment => {
            const { by, id, text, time } =  comment;
            let formatedTime = new Date(time*1000).toDateString();

            return <Comment key={ id } by={ by } text={ text } time={ formatedTime } />;
          });
          this.setState({ commentList, commentsHidden });
      });
    } else {
      //only show or hide comments if there are any comments
      commentsHidden = (kids) ? !commentsHidden : true;
      this.setState({ commentsHidden });
    }
  }

  render() {
    let { id, url, title, by , descendants, time, score } = this.props.story;
    let formatedTime = new Date(time*1000).toDateString();
    let { commentsHidden} = this.state;

    return (
      <div className="article">
        <p key={ id }>
          <a href={ url } target="_blank" rel="noopener noreferrer">{ title }</a>       
        </p>
        <div className="info-container">
          <div className="user-date">
            <em>by</em> <cite ><strong>{ by } </strong>on<strong> { formatedTime }</strong></cite>
          </div>
          <div className="score-comment">
            <p className="score"><span role="img" aria-label="thumbs-up" aria-labelledby="dilan-livera">👍</span> { score }</p>
            <p className="comments"><span className="comment-icon" role="img" aria-label="comments" aria-labelledby="dilan-livera" onClick={ this.showComments }>💬</span> { descendants }</p>
          </div>
        </div>
        {
          (!commentsHidden) 
            ? <div>
                <hr></hr>
                { this.state.commentList }
              </div>
            : ""
        }
      </div>
    );
  }
}

export default Article;