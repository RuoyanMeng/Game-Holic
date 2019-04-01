import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import * as actions from "../Actions/index";

import Header from "./Header";
import { Button, Row, Col } from "antd";
import "./singlegame.scss";

class SingleGame extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    isFetching: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    //gameStatus: PropTypes.array.isRequired
    // Injected by React Router
    //children: PropTypes.node
  };
  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.id,
      playStatus: "None"
    };
  }

  componentDidMount() {
    console.log(this.state.currentId);
    this.props.actions.getSingleGame(`${this.state.currentId}`);
  }

  addWishListClick() {
    let briefGameInfo = {
      gameID: this.state.currentId,
      gameName: this.props.game.name
      // rating:this.props.game.rating,
      // platforms:this.props.game.platforms
    };
    this.props.actions.addItemToWishList(briefGameInfo);
  }

  addListClick(uid, playStatus) {
    let briefGameInfo = {
      playStatus: playStatus,
      uid: uid,
      gameID: this.state.currentId,
      gameName: this.props.game.name
      // rating:this.props.game.rating,
      // platforms:this.props.game.platforms
    };
    this.props.actions.addItemToList(briefGameInfo);
  }
  render() {
    const { game, auth, isFetching, gameStatus } = this.props;
    let gameDetails = null;
    switch (isFetching) {
      case "LOADING":
        gameDetails = <em>Loading...</em>;
        break;
      case "LOADED":
        //edit all the elements and layout of gamedetails card here
        gameDetails = (
          <div className="game-detail-card">
            <Row>
              <Col span={16}>
                <div className="game-summary">
                  <h2>Summary:</h2>
                  {this.props.game.summary && <p>{this.props.game.summary}</p>}
                  {this.props.game.name && (
                    <Button
                      type="primary"
                      shape="round"
                      onClick={() => this.addWishListClick()}
                    >
                      Add to Wishlist
                    </Button>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <h2>Popularity:</h2>
                {this.props.game.popularity && (
                  <p className="game-popularity">
                    {this.props.game.popularity.toFixed(2)}
                  </p>
                )}
              </Col>
            </Row>
          </div>
        );
        break;
      default:
        gameDetails = <b>Failed to load data, please try again</b>;
        break;
    }
    let playStatus = null;
    //console.log()
    // if(gameStatus){
    //    if(!gameStatus[0].games){
    //     this.setState({
    //         playStatus: gameStatus[0].games[0].listType
    //     })
    //    }
    //    console.log(this.state.playStatus)
    // }

    {
      /* change play ststus here, the style below only for function test */
    }
    playStatus = (
      <div>
        <select
          value={this.state.playStatus}
          className="avenir"
          onChange={e => this.setState({ playStatus: e.target.value })}
        >
          <option value="None">None</option>
          <option value="wishList">Wanna Play</option>
          <option value="playingList">Playing</option>
          <option value="completedList">Completed</option>
          <option value="abandonedList">Abandoned</option>
        </select>
        <button
          onClick={() => this.addListClick(auth.uid, this.state.playStatus)}
        >
          SAVE
        </button>
      </div>
    );
    return (
      <div className="game-wrap">
        <Row>
          <Header />
        </Row>
        <div className="game-center">
          <div className="game-background">
            <Row>
              <Col>
                <Link to="/" className="back-to">
                  Back to Search
                </Link>
                <div className="game-content">
                  {game.name && (
                    <h1 className="single-game-title">{game.name} </h1>
                  )}
                  <Row>
                    <Col span={10}>
                      {game.cover && (
                        <img
                          className="game-cover"
                          //   src={"https:" + game.cover.url}
                          src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${
                            game.cover.image_id
                          }.jpg`}
                          alt={game.name}
                        />
                      )}
                    </Col>

                    <Col span={14}>{gameDetails}</Col>
                  </Row>
                </div>
              </Col>
            </Row>
            {playStatus}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.singleGame)
  console.log(state.firestore.ordered.users);
  return {
    //gameStatus: state.firestore.ordered.users,
    isFetching: state.singleGame.isFetching,
    game: state.singleGame.game,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  // firestoreConnect(ownProps => {
  //   return [
  //     {
  //       collection: "users",
  //       doc: ownProps.auth.uid,
  //       subcollections: [
  //         {
  //           collection: "games",
  //           where: [["gameId", "==", ownProps.match.params.id]]
  //         }
  //       ]
  //     }
  //   ];
  // })
)(SingleGame);
