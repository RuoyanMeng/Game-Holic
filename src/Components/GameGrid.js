import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import "./gamegrid.scss";

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
        gameList = this.props.games.map(game => {
          return (
            // set card styles here, add any thing you need in this div
            //{pathname:"/GameDetails",search:`${game.id}`}
            <div key={game.id} className="game-item">
              <Link to={`/GameDetails/${game.id}`}>
                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.image_id}.jpg`} width="160" className="game-img"/>
              </Link>
            </div>
          )
        });
        break;
      default:
        gameList = <b>Failed to load data, please try again</b>;
        break;

    }

    return (
      <div className="Game-wrap">
        <div className="list-title">
          <h2>Trendy Games</h2>
        </div>

        <div className="GameCard">
          {gameList}
        </div>
      </div>
    )
  }
};

export default GameGrid;