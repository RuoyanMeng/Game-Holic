import React, { Component } from "react";
import { Link } from "react-router-dom";

import poster from "../../img/poster.jpg";
import { Icon } from "antd";
import {  Droppable, Draggable } from "react-beautiful-dnd";

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameList: this.props.gameList
    };
    
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.gameList !== nextProps.gameList) {
      this.setState({
        gameList: nextProps.gameList
      });
    }
  }

  render() {
    const { gameList } = this.state;

    const { droppableId, isFetching } = this.props;

    let game_list = null;
    switch (isFetching) {
      case "LOADING":
        game_list = (
          <em>
            <Icon type="loading" />
          </em>
        );
        break;
      case "LOADED":
        if (gameList) {
          game_list = Object.values(gameList).map((v, index) => {
            return (
              <Draggable key={v.gameID} draggableId={v.gameID} index={index}>
                {(provided, snapshot) => (
                  <div
                    key={v.gameID}
                    className="itemOfList"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Icon
                      type="close-circle"
                      theme="filled"
                      className="deleteicon"
                      style={{ fontSize: "40px", color: "#EC7063" }}
                    />
                    <Link to={`/GameDetails/${v.gameID}`}>
                      <img
                        className="game-cover"
                        src={
                          v.gameCover
                            ? `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${
                                v.gameCover.image_id
                              }.jpg`
                            : poster
                        }
                        width="210"
                        height="280"
                      />
                      <h2>{v.gameName}</h2>
                    </Link>
                  </div>
                )}
              </Draggable>
            );
          });
        }
        break;
      default:
        game_list = <b>Failed to load data, please try again</b>;
        break;
    }
    const style = {
        width: `${gameList.length*230}px`
    }
    return (
        <Droppable
          droppableId={droppableId}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div className="gamelist" ref={provided.innerRef} style={style}>
              {game_list}
            </div>
          )}
        </Droppable>
    );
  }
}

export default GameList;
