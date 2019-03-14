import React, { Component } from 'react';

// import react router deps
import { Route } from 'react-router-dom';

// Import Components
import Main from './Components/Main';
import SingleGame from './Components/SingleGame';
import WishList from './Components/WishList'
// import GameGrid from './Components/GameGrid';

import './Styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "Game Holic"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>
        </header>
        {/* Rended diffrent component based on the path */}

        <Route exact path="/Home" component={Main} />
        <Route path="/GameDetails/:id" component={SingleGame}/>
        <Route path="/WishList" component={WishList}/>
      </div>




    )
  }
}

export default App;
