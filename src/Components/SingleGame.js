import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../Actions/index";

import Header from "./Header";
import { Row, Col, Rate, Tag, Modal, Button, Radio, RadioGroup } from "antd";
import "../Styles/singlegame.scss";

class SingleGame extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    isFetching: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    gameStatus: PropTypes.array.isRequired
    // Injected by React Router
    //children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.id,
      playStatus: this.props.playStatus
    };
  }
  componentDidMount() {
    console.log(this.state.playStatus);
    this.props.actions.getSingleGame(`${this.state.currentId}`);
    let id = {
      uid: this.props.auth.uid,
      gameID: this.state.currentId
    };
    //console.log(id.uid)
    this.props.actions.getPlayStatus(id);
    //console.log(this.props.game.playStatus)
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
    //this.componentDidMount();
  }

  handleChange = e => {
    this.setState({ playStatus: e.target.value });
    //console.log(this.state.playStatus)
  };

  render() {
    //console.log(this.state.playStatus)
    const {
      game,
      auth,
      isFetching,
      playStatus,
      isGetingPlayStatus
    } = this.props;

    let gameDetails = null;
    let rating = this.props.game.total_rating
      ? this.props.game.total_rating.toFixed(0) / 20
      : 2.5;

    let getScreenshots = null;
    let getKeywords = null;
    let playStatusModal = null;

    const RadioGroup = Radio.Group;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

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
            {
              /* change play ststus here, the style below only for function test */
            }

            // playStatusSelector = (
            //   <div>
            //     <select onChange={e => this.handleChange(e)} value={playStatus}>
            //       <option value="None">None</option>
            //       <option value="wishList">Wanna Play</option>
            //       <option value="playingList">Playing</option>
            //       <option value="completedList">Completed</option>
            //       <option value="abandonedList">Abandoned</option>
            //     </select>
            //     <button
            //       onClick={() =>
            //         // this.addListClick(auth.uid, this.state.playStatus)
            //         console.log(this.state.playStatus)
            //       }
            //     >
            //       SAVE
            //     </button>
            //   </div>
            // );

            playStatusModal = (
              <div>
                <Button
                  type="primary"
                  shape = "round"
                  onClick={() => {
                    this.setState({ visible: true });
                  }}
                >
                  Add this game to...
                </Button>
                <Modal
                  title="Add this game to..."
                  visible={this.state.visible}
                  onOk={() => {
                    this.addListClick(auth.uid, this.state.playStatus);
                    console.log("OKButton "+this.state.playStatus)
                    this.setState({ visible: false });
                  }}
                  onCancel={() => {
                    this.setState({ visible: false });
                  }}
                >
                  {/* <p>Add this game to...</p> */}
                  <RadioGroup
                    onChange={e => {
                      console.log("radio checked ", e.target.value);
                      this.setState({
                        playStatus: e.target.value
                      });
                    }}
                  >
                    {/* <Radio style={radioStyle} value="None">None</Radio> */}
                    <Radio style={radioStyle} value="wishList">Wanna Play</Radio>
                    <Radio style={radioStyle} value="playingList">Playing</Radio>
                    <Radio style={radioStyle} value="completedList">Completed</Radio>
                    <Radio style={radioStyle} value="abandonedList">Abandoned</Radio>
                  </RadioGroup>
                </Modal>
              </div>
            );

            gameDetails = (
              <div className="game-detail-card">
                <Row>
                  <Col span={16}>
                    <div className="game-summary">
                      <h2>Summary</h2>
                      {this.props.game.summary && (
                        <p>{this.props.game.summary}</p>
                      )}
                      {playStatusModal}
                    </div>
                  </Col>
                  <Col span={8}>
                    <h2>Rating</h2>
                    <Rate disabled allowHalf value={rating} />
                    {/* {this.props.game.popularity && (
                      // <p className="game-popularity">
                      //   {this.props.game.popularity.toFixed(2)}
                      // </p>
                    )} */}
                  </Col>
                </Row>
              </div>
            );

            if (game.screenshots) {
              getScreenshots = Object.values(game.screenshots).map(s => {
                // console.log(s)
                return (
                  <div key={s.id} className="screen-shots">
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${
                        s.image_id
                      }.jpg`}
                      className="game-img"
                    />
                  </div>
                );
              });
            } else {
              getScreenshots = <p>No relevant screenshots</p>;
            }

            if (game.keywords) {
              getKeywords = Object.values(game.keywords).map(k => {
                // console.log(s)
                return (
                  <div key={k.id} className="key-words">
                    <Tag color="cyan">{k.name}</Tag>
                  </div>
                );
              });
            } else {
              getKeywords = <p>No relevant keywords</p>;
            }
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

            <Row>
              <div className="more-keywords">
                <h2>Keywords</h2>
                {getKeywords}
              </div>
            </Row>

            <Row>
              <div className="more-screenshots">
                <h2>Screenshots</h2>
                {getScreenshots}
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state)
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleGame);
