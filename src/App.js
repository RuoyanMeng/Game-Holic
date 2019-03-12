import React, { Component } from 'react';

// import react router deps
import { Route } from 'react-router-dom';

// Import Components
//import App from './components/App';
import Main from './Components/Main';
import Single from './Components/Single';
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

        <Route exact path="/" component={Main} />
        <Route path="/GameDetails"
          render={() => <Single />}
        />
      </div>




    )
  }
}

export default App;
