import React, { Component } from 'react';
import Header from './components/header/header';
import Profile from './components/profile/profile';
import PostView from './components/postView/postView';
import Feed from './components/feed/feed';
import SignIn from './components/signIn/signIn';
import authGuard from './utils/authGuard';
import Writer from './components/writer/writer';
import {Switch, Route} from 'react-router-dom';
import './App.css';

export const Filter = {TIME: 0, RATING: 1, FRIENDS: 2};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SignIn /> 
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/post/:id" component={PostView} />
            <Route path="/editor" component={authGuard(Writer)} />
            <Route path="**" component={Feed} />
          </Switch>
      </div>
    );
  }
}

export default App;
