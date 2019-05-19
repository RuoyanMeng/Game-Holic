import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../Actions/index";
import { signIn } from "../../Actions/authActions";
import GameDetails from "../Presentational/gameDetails";
import Header from "../Header";
import Comments from "../Presentational/Comments";

import "../../Styles/singlegame.scss";
import { Icon } from "antd";

class SingleGame extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    isFetching: PropTypes.string.isRequired,
    isGetingPlayStatus: PropTypes.string.isRequired,
    authError: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    gameStatus: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.id,
      playStatus: this.props.playStatus
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.getSingleGame(`${this.state.currentId}`);
    this.props.actions.getComments(`${this.state.currentId}`);
  }

  componentWillUnmount = () => {
    this.props.actions.resetState("SINGLEGAME");
  };

  render() {
    const {
      game,
      auth,
      isFetching,
      playStatus,
      isGetingPlayStatus,
      authError,
      profile,
      actions,
      commentList,
      isFetchingComment
    } = this.props;

    let gameDetails = null;

    switch (isFetching) {
      case "LOADING":
        gameDetails = (
          <h1 className="white mt7 ml7">
            <Icon type="loading" />
          </h1>
        );
        break;
      case "LOADED":
        if (auth.isEmpty) {
          let signUp = <Link to="/SignUp">Sign Up</Link>;
          gameDetails = (
            <GameDetails
              game={game}
              history={this.props.history}
              auth={auth}
              playStatus={playStatus}
              authError={authError}
              signIn={this.props.signIn}
              signUp={signUp}
            />
          );
        } else {
          if (!this.props.auth.isEmpty) {
            let id = {
              uid: this.props.auth.uid,
              gameID: this.state.currentId
            };
            this.props.actions.getPlayStatus(id);
          }
          switch (isGetingPlayStatus) {
            case "LOADING":
              gameDetails = <em>Loading...</em>;
              break;
            case "GET_PLAYSTATUS_SUCCESS":
              gameDetails = (
                <GameDetails
                  game={game}
                  history={this.props.history}
                  actions={this.props.actions}
                  auth={auth}
                  playStatus={playStatus}
                  gameID={this.state.currentId}
                />
              );
              break;
            default:
              break;
          }
        }
        break;

      default:
        gameDetails = <b>Failed to load data, please try again</b>;
        break;
    }

    let commentDiv = null;
    switch (isFetchingComment) {
      case "LOADING":
        commentDiv = (
          <h1 className="white mt7 ml7">
            <Icon type="loading" />
          </h1>
        );
        break;
      case "LOADED":
        console.log(commentList);
        commentDiv = (
          <Comments
            actions={actions}
            gameID={this.state.currentId}
            commentList={commentList}
            profile={profile}
          />
        );
        break;
      default:
        commentDiv = <b>Failed to load data, please try again</b>;
    }

    return (
      <div className="game-wrap">
        <Header />
        {gameDetails}
        {commentDiv}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.commentList.isFetchingComment);
  return {
    playStatus: state.singleGame.playStatus,
    isFetching: state.singleGame.isFetching,
    isGetingPlayStatus: state.singleGame.isGetingPlayStatus,
    game: state.singleGame.game,
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
    commentList: state.commentList.commentList,
    isFetchingComment: state.commentList.isFetchingComment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleGame);
