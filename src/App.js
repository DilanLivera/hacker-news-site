import React, { Component } from 'react';
import './App.css';
import Header from './Header';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      storeis: []
    };
  }  

  componentDidMount() {
    const topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';

    fetch(topStories)
      .then(data => data.json())
      .then(data => data.map(id => {
        const url = `${storyUrlBase}${id}.json`;
        return fetch(url).then( data => data.json())
      }))
      .then(promises => Promise.all(promises))
      .then(stories => this.setState({ stories }));
  }  

  render() {
    let views = <div className="loading">Loading...</div>;

    const { stories } = this.state;
    if(stories && stories.length > 0) {
      views = stories.map( story => (
        <p key={story.id}>
          <a href={story.url}>{ story.title }</a> from <strong>{ story.by }</strong>
        </p>
      ));
    }

    return (
      <div className="App">
        <Header />
        { views }
      </div>
    );
  }  
}

export default App;
