import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import "../../Styles/gamegrid.scss";

class GameGrid extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let gameList = null;
    let listNumber = 0;
        gameList = this.props.games.map(game => {
          if (this.props.isIndex) {
            let filterList = [22422, 16309, 22472, 26163, 68049, 114455, 37419];
            if (
              game.cover &&
              game.cover.image_id &&
              filterList.indexOf(game.id) == -1 &&
              listNumber < 24
            ) {
              listNumber++;
              return (
                <Col
                  xs={12}
                  sm={8}
                  md={6}
                  xl={4}
                  key={game.id}
                  className="game-item"
                >
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
          } else {
            return (
              <Link to={`/GameDetails/${game.id}`} className="search-game-item" key={game.id}>
                <Row>
                  <Col span={6}>
                    {game.cover && game.cover.image_id && (
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${
                          game.cover.image_id
                        }.jpg`}
                        className="game-cover"
                      />
                    )}
                  </Col>
                  <Col span={18}>
                    <h2 className="game-name">{game.name}</h2>
                    <div className="game-summary">{game.summary}</div>
                  </Col>
                </Row>
              </Link>
            );
          }
        });

    return (
      <div className="Game-wrap">
        <Row type="flex">{gameList}</Row>
      </div>
    );
  }
}

export default GameGrid;
