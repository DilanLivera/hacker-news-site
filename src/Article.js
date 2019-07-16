import React from 'react';
import './Article.css';

const Article = (props) => {
  let { id, url, title, by , descendants, time, score } = props.story;
  let formatedTime = new Date(time*1000).toDateString();

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
          <p className="comments"><span role="img" aria-label="comments" aria-labelledby="dilan-livera">💬</span> { descendants }</p>
        </div>
      </div>       
    </div>
  );
}

export default Article;