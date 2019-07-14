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
    let btnList = ["new", "past", "comments", "ask", "show", "jobs", "submit"];

    return (
      <div className="App">
        <Header />
        <ListContainer btnList={btnList}/>
        {/* { views } */}
      </div>
    );
  }  
}

export default App;
