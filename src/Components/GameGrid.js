import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Row, Col} from "antd";
import "../Styles/gamegrid.scss";

class GameGrid extends Component {
  static propTypes = {
    games: PropTypes.array.isRequired,
    isFetching: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      status: this.props.isFetching
    };
  }
  componentDidMount() {}

  render() {
    let gameList = null;
    let listNumber = 0;
    switch (this.state.status) {
      case "LOADING":
        gameList = <em>Loading...</em>;
        break;
      case "LOADED":
        gameList = this.props.games.map(game => {
          let filterList = [22422, 16309, 22472, 26163, 68049, 114455, 37419];
          if (
            game.cover &&
            game.cover.image_id &&
            filterList.indexOf(game.id) == -1 &&
            listNumber < 24
          ) {
            listNumber++;
            return (
              // set card styles here, add any thing you need in this div
              //{pathname:"/GameDetails",search:`${game.id}`}
              <Col xs={12} sm={8} md={6} xl={4} key={game.id} className="game-item">
                <Link to={`/GameDetails/${game.id}`}>
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_thumb_2x/${
                      game.cover.image_id
                    }.jpg`}
                    className="game-img"
                  />
                </Link>
              </Col>
            );
          }
        });
        break;
      default:
        gameList = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="Game-wrap">
        <div className="list-title">
          <h2>Trending Games</h2>
        </div>
        <Row type="flex">{gameList}</Row>
      </div>
    );
  }
}

export default GameGrid;
