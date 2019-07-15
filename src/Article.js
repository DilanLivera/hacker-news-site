import React from 'react';
import './Article.css';

const Article = (props) => {
  let { id, url, title, by } = props.story;

  return (
    <div className="article">
      <p key={ id }>
        <a href={ url } target="_blank" rel="noopener noreferrer">{ title }</a> 
        <br></br>
        <em>by</em> <cite ><strong>{ by }</strong></cite>
      </p>
    </div>
  );
}

export default Article;