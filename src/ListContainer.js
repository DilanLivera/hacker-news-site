import React, { Component } from 'react';
import './ListContainer.css';
import Article from './Article';
import Loading from './Loading';
import Jokes from './jokes';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ListContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      stories: [],
      storyIdList: 0,
      pageActive: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.firstHandleClick = this.firstHandleClick.bind(this);
    this.lastHandleClick = this.lastHandleClick.bind(this);
    this.prevHandleClick = this.prevHandleClick.bind(this);
    this.nextHandleClick = this.nextHandleClick.bind(this);
  }

  componentDidMount() {
    this.displayStories("new and top stories");
  }

  async getStory(id) {
    const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';
    const url = `${storyUrlBase}${id}.json`;
    return await fetch(url).then( data => data.json())
  }

  async displayStories(btn) {
    const storiesLinks = [{
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

    let getStories = storiesLinks.find(story => story.type === btn);

    // get the story ids for a specific title
    const storyIdList = await fetch(getStories.url)
                                .then(data => data.json());
    const tenIds = storyIdList.filter((id, i) => i < 10);

    // get the first 10 stories for the story ids
    const stories = await Promise.all(tenIds.map(id => this.getStory(id)));
    const pageActive = 0;
    this.setState({ stories, storyIdList, pageActive })
  }

  async loadPageStories(pageActive){
    let startIndex = pageActive * 10;
    // get the 10 ids depend on the pagination item
    const tenIds = this.state.storyIdList.filter((id, i) => i > startIndex && i < startIndex + 10);

    // get the 10 stories for the ids
    const stories = await Promise.all(tenIds.map(id => this.getStory(id)));
    this.setState({ ...this.state, stories, pageActive })
  }

  handleClick(evt) {
    const pageActive = +evt.target.innerText; // needs to fix this line
    this.loadPageStories(pageActive);
  }

  firstHandleClick(evt){
    this.loadPageStories(0);
  }

  lastHandleClick(evt){
    const lastPage = Math.floor(this.state.storyIdList.length/10);
    this.loadPageStories(lastPage);
  }

  prevHandleClick(evt){
    let currentPage = this.state.pageActive;
    --currentPage;
    if(currentPage < 0 ) currentPage = 0;
    this.loadPageStories(currentPage);
  }

  nextHandleClick(evt){
    let currentPage = this.state.pageActive;
    const lastPage = Math.floor(this.state.storyIdList.length/10);
    ++currentPage;
    if(currentPage > lastPage) currentPage = lastPage;
    this.loadPageStories(currentPage);
  }

  render() {  
    let btnList = this.props.btnList;
    let num = Math.floor((Math.random())*Jokes.length);
    let loadingText = Jokes[num];
    let loadingTitle = "here's a joke for you, while you wait...";
    let views = <Loading loadingTitle={ loadingTitle } loadingText={ loadingText } />;

    const { stories, storyIdList, pageActive } = this.state;
    if(stories && stories.length > 0) {
      views = stories.map( story => (
        <Article key ={ story.id } story={ story }/>
      ));
    }
    
    // set up Pagination.Items
    const numOfItems = Math.ceil(storyIdList.length/10);
    const paginationItems = [];
    
    for(let i = 0; i < numOfItems; i++) {  
      paginationItems.push(<Pagination.Item key={i} active={ i === pageActive } onClick={ this.handleClick }>{i + 1}</Pagination.Item>)
    }

    const pageList = paginationItems.filter((page, index) => index >= pageActive && index < pageActive + 7);

    return (
      <div className="list-container">
        <div className="btn-container">
          { btnList.map( (btn, i) => <button key={ btn } onClick={ this.displayStories.bind(this, btn) } className="sort-btn">{ btn }</button>) }
        </div>
        <div className="article-list">
          { views }
          <Pagination>
            <Pagination.First onClick={ this.firstHandleClick } />
            <Pagination.Prev onClick={ this.prevHandleClick } />
            { pageList }
            <Pagination.Ellipsis disabled />
            <Pagination.Next onClick={ this.nextHandleClick } />
            <Pagination.Last onClick={ this.lastHandleClick } />
          </Pagination>
        </div>
      </div>
    );
  }
}

export default ListContainer;

// when page loads
  // get the story count for current btn-label
  // set story