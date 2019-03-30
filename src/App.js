import React, { Component } from 'react';

// import react router deps
import { Route } from 'react-router-dom';

// Import Components
import Main from './Components/Main';
import SingleGame from './Components/SingleGame';
import UserIndex from './Components/UserIndex';
import LogIn from './Components/auth/LogIn';
import SignUp from './Components/auth/SignUp';
import Search from './Components/Search';

import './Styles/App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Main} />
        <Route path="/GameDetails/:id" component={SingleGame}/>
        <Route path="/Search" component={Search}/>
        <Route path="/UserIndex" component={UserIndex}/>
        <Route path="/LogIn" component={LogIn}/>
        <Route path="/SignUp" component={SignUp}/>
      </div>




    )
  }
}

export default App;
