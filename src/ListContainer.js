import React, { Component } from 'react';
import './ListContainer.css';
import Article from './Article';
import Loading from './Loading';
import Jokes from './jokes';

class ListContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      storeis: []
    };
  }

  componentDidMount() {
    this.displayStories("new and top stories");
  }

  displayStories(btn) {
    this.setState({ stories: [] });    
    const stories = [{
      type: "new and top stories",
      url: "https://hacker-news.firebaseio.com/v0/topstories.json"
    },
    {
      type: "show hn stories",
      url: "https://hacker-news.firebaseio.com/v0/showstories.json"
    },
    {
      type: "ask hn stories",
      url: "https://hacker-news.firebaseio.com/v0/askstories.json"
    },
    {
      type: "job hn stories",
      url: "https://hacker-news.firebaseio.com/v0/jobstories.json"
    }];

    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';

    let getStories = stories.find(story => story.type === btn);

    fetch(getStories.url)
      .then(data => data.json())
      .then(data => data.map(id => {
        const url = `${storyUrlBase}${id}.json`;
        return fetch(url).then( data => data.json())
      }))
      .then(promises => Promise.all(promises))
      .then(stories => this.setState({ stories }));
  }

  render() {
    let btnList = this.props.btnList;
    let num = Math.floor((Math.random())*Jokes.length);
    let loadingText = Jokes[num];
    let views = <Loading loadingText={ loadingText } />;

    const { stories } = this.state;
    if(stories && stories.length > 0) {
      views = stories.map( story => (
        <Article key ={ story.id } story={ story }/>
      ));
    }    

    return (
      <div className="list-container">
        <div className="btn-container">
          { btnList.map( (btn, i) => <button key={ btn } onClick={ this.displayStories.bind(this, btn) } className="sort-btn">{ btn }</button>) }
        </div>
        <div className="article-list">
          { views }
        </div>
      </div>
    );
  }
}

export default ListContainer;