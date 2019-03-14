import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class GameGrid extends Component {

  static propTypes = {
    games: PropTypes.array.isRequired,
    // Injected by React Router
    //children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING"
      
    }

  }
  componentDidMount() {
    
    if (this.props.games === undefined) {
      console.log(this.props.games)
    } else {
      this.setState({
        status: "LOADED"
      });
    }

  }


  render() {
    let gameList = null;
    switch (this.state.status) {
      case "LOADING":
        gameList = <em>Loading...</em>;
        break;
      case "LOADED":
        gameList = this.props.games.map(game => {
          return (
            <div>
              <h1>{game.name}</h1>
            </div>
          )
        });
        break;
      default:
        gameList = <b>Failed to load data, please try again</b>;
        break;

    }

    return (
      <div>
        <h1>this is card container</h1>
        <div className="GameCard">
          <Link to={"/GameDetails"}>
            <h1>aaa</h1>
            {gameList}
          </Link>
        </div>
      </div>
    )
  }
};

export default GameGrid;