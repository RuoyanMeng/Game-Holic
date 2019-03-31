import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

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
            <div key={game.id}>
              <Link to={`/GameDetails/${game.id}`}>
                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.image_id}.jpg`} width="100"/>
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
      <div>
        <h1>this is card container</h1>
        <div className="GameCard">
          <h1>Here </h1>
          {gameList}
        </div>
      </div>
    )
  }
};

export default GameGrid;