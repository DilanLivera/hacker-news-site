import React, { Component } from 'react';
import { Route, Switch, BrowserRouter  } from 'react-router-dom';
import './App.css';
import Header from './Header';
import ListContainer from './ListContainer';
import Login from './Login'
;
class App extends Component{

  render() {
    let btnList = ["new and top stories", "ask hn stories", "show hn stories", "job hn stories"];

    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            {/* <Route exact path='/' component={ Login }/> */}
            <Route exact path='/' render={(props) => <ListContainer {...props} btnList={btnList} />} />
            <Route exact path='/login' component={ Login }/>
            {/* <Route exact path='/story-list' render={(props) => <ListContainer {...props} btnList={btnList} />} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }  
}

export default App;
