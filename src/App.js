import React, { Component } from 'react';
import './Styles/App.css';

// import react router deps
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// Import Components
//import App from './components/App';
import Main from './Components/Main';
// import Single from './Components/Single';
// import GameGrid from './Components/GameGrid';
import store from '../src/Store/Store';

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
        <Provider store={store}>
          <Route exact path="/" component={Main} />
        </Provider>
      </div>




    )
  }
}

export default App;
