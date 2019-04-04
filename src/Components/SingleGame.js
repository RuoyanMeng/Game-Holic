import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../Actions/index";

import Header from "./Header";
import { Button, Row, Col } from "antd";
import "../Styles/singlegame.scss";

class SingleGame extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    isFetching: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    gameStatus: PropTypes.array.isRequired
    // Injected by React Router
    //children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.id,
      playStatus: this.props.playStatus
    }

  }
  componentDidMount() {
    console.log(this.state.playStatus)
    this.props.actions.getSingleGame(`${this.state.currentId}`)
    let id = {
      uid: this.props.auth.uid,
      gameID: this.state.currentId
    }
    //console.log(id.uid)
    this.props.actions.getPlayStatus(id)
    //console.log(this.props.game.playStatus)
  }




  addListClick( uid, playStatus) {
    let briefGameInfo = {
      playStatus: playStatus,
      uid: uid,
      gameID: this.state.currentId,
      gameName: this.props.game.name
      // rating:this.props.game.rating,
      // platforms:this.props.game.platforms
    };
    this.props.actions.addItemToList(briefGameInfo);
    //this.componentDidMount();
  }

  handleChange=(e)=>{
    this.setState({ playStatus: e.target.value })
    //console.log(this.state.playStatus)
  }

  render() {
    //console.log(this.state.playStatus)
    const { game, auth, isFetching, playStatus, isGetingPlayStatus } = this.props;
    let playStatusSelector = null;


    let gameDetails = null;
    switch (isFetching) {
      case "LOADING":
        gameDetails = <em>Loading...</em>;
        break;
      case "LOADED":
        //edit all the elements and layout of gamedetails card here
        switch (isGetingPlayStatus) {
          case "LOADING":
            gameDetails = <em>Loading...</em>;
            break;
          case "GET_PLAYSTATUS_SUCCESS":
            {/* change play ststus here, the style below only for function test */ }
            playStatusSelector =
              <div>
                <select 
                  onChange={(e)=>this.handleChange(e)}
                  value={playStatus}
                >
                  <option value="None">None</option>
                  <option value="wishList">Wanna Play</option>
                  <option value="playingList">Playing</option>
                  <option value="completedList">Completed</option>
                  <option value="abandonedList">Abandoned</option>
                </select>
                <button onClick={() => this.addListClick(auth.uid, this.state.playStatus)}>SAVE</button>
              </div>

            gameDetails = (
              <div className="game-detail-card">
                <Row>
                  <Col span={16}>
                    <div className="game-summary">
                      <h2>Summary:</h2>
                      {this.props.game.summary && <p>{this.props.game.summary}</p>}
                      {this.props.game.name && (playStatusSelector
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
        }


        break;
      default:
        gameDetails = <b>Failed to load data, please try again</b>;
        break;
    }

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
  //console.log(state.firestore.ordered.users);
  return {
    playStatus: state.singleGame.playStatus,
    isFetching: state.singleGame.isFetching,
    isGetingPlayStatus: state.singleGame.isGetingPlayStatus,
    game: state.singleGame.game,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleGame);





// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     firestoreConnect(ownProps => {
//         return [
//             {
//                 collection: 'users',
//                 doc: ownProps.auth.uid,
//                 subcollections: [
//                     {
//                         collection: 'games',
//                         where: [
//                             ['gameId', '==', ownProps.match.params.id]
//                         ]
//                     }
//                 ],
//             }
//         ]
//     })
// )(GameGrid);
