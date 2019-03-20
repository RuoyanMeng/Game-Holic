import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import "../Styles/gamegrid.css";

class GameGrid extends Component {

  static propTypes = {
    games: PropTypes.array.isRequired,
    isFetching: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      status: this.props.isFetching
    }

  }
  componentDidMount() {

  }


  render() {
    let gameList = null;
    switch (this.state.status) {
      case "LOADING":
        gameList = <em>Loading...</em>;
        break;
      case "LOADED":
        gameList = this.props.games && this.props.games.map(game => {
          return (
            // set card styles here, add any thing you need in this div
            //{pathname:"/GameDetails",search:`${game.id}`}
            <div key={game.id} className="game-item">
              <Link to={`/GameDetails/${game.id}`} className="game-name">{game.name}</Link>
              <p>{game.summary}</p>
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
        <div className="GameCard">
          <h1>Game List </h1>
          {gameList}
        </div>
      </div>
    )
  }
};

export default GameGrid;