import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import ListContainer from './ListContainer';

class App extends Component{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     storeis: []
  //   };
  // }   

  render() {
    let btnList = ["new and top stories", "ask hn stories", "show hn stories", "job hn stories"];

    return (
      <div className="App">
        <Header />
        <ListContainer btnList={btnList}/>
      </div>
    );
  }  
}

export default App;
