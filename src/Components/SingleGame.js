import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../Actions/index";
import { signIn } from "../Actions/authActions";

import Header from "./Header";
import { Row, Col, Tag, Modal, Icon, Progress } from "antd";
import "../Styles/singlegame.scss";


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
      playStatus: this.props.playStatus,
      loading: false,
      visible: false,
      email: "",
      password: "",
      keyword:''
    };
  }
  componentDidMount() {
    console.log(this.props.playStatus);
    window.scrollTo(0, 0);
    this.props.actions.getSingleGame(`${this.state.currentId}`);
  }

  componentWillUnmount = () => {
    this.props.actions.resetState('SINGLEGAME');
  }

  addListClick(uid, playStatus) {
    this.setState({ visible: false });
    let briefGameInfo = {
      playStatus: playStatus,
      uid: uid,
      gameID: this.state.currentId,
      gameName: this.props.game.name,
      gameCover: this.props.game.cover,
    };
    this.props.actions.addItemToList(briefGameInfo);
  }

  handleSignInChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      playStatus: e.target.value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    //this.props.actions.resetState();
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.signIn(credentials);
  };

  hancdleKeyword = (keyword) => {
    this.props.actions.resetState('SEARCHRESULTS');
    //console.log("reset")
    setTimeout(
      () => {this.props.actions.getSearchResults(`${keyword}`); },
      1000
    );
  }

  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }

  render() {
    const { visible, loading } = this.state;
    const {
      game,
      auth,
      isFetching,
      playStatus,
      isGetingPlayStatus,
      authError
    } = this.props;

    let rating = this.props.game.total_rating
      ? game.total_rating.toFixed(2) : 50;

    let getScreenshots = null;
    let getGenres = null;
    let playStatusModal = null;
    let gameDetails = null;
    
    switch (isFetching) {
      case "LOADING":
        gameDetails = <h1 className='white'>Loading...</h1>;
        break;
      case "LOADED":
        //edit all the elements and layout of gamedetails card here
        if (auth.isEmpty) {
          {
            /* change play ststus here, the style below only for function test */
          }
          let signUp = <Link to="/SignUp">Sign Up</Link>;

          playStatusModal = (
            <div>
              <button id='button' className='f6 br3 dark-green no-underline ba grow pv2 ph3 dib' onClick={this.showModal}>
                {playStatus}
              </button>
              <Modal
                visible={visible}
                title="Game Holic"
                onCancel={this.handleCancel}
                footer={null}
              >
                <form onSubmit={this.handleSubmit} className="white">
                  <div className="input-field mt3">
                    <label htmlFor="email" className="db fw6 lh-copy f6">Email<br /></label>
                    <input
                      className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                      type="email"
                      id="email"
                      onChange={this.handleSignInChange}
                    />
                  </div>
                  <div className="input-field mt3">
                    <label htmlFor="password" className="db fw6 lh-copy f6">Password<br /></label>
                    <input
                      className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                      type="password"
                      id="password"
                      onChange={this.handleSignInChange}
                    />
                  </div>
                  <br />
                  <br />
                  <div className="mt0">
                    <button className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib">
                      Sign In
                    </button>
                    <h5 className="white mt1">
                      Don't have an account? {signUp}
                    </h5>
                    <div className="center red-text">
                      {authError ? <p>{authError}</p> : null}
                    </div>
                  </div>

                </form>
              </Modal>
            </div>
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
              playStatusModal = (
                <div>
                  <button id='button' className='f6 br3 dark-green no-underline ba grow pv2 ph3 dib' onClick={this.showModal}>
                    {playStatus}
                  </button>
                  <Modal
                    visible={visible}
                    title="Add this game to..."
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                      <button className='white b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib' onClick={this.handleCancel}>
                        Return
                      </button>,
                      <button
                        className='b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib white'
                        loading={loading}
                        onClick={() =>
                          this.addListClick(auth.uid, this.state.playStatus)
                        }
                      >
                        Submit
                      </button>
                    ]}
                  >

                    <form className='white'>
                      <div className="radio flex items-center mb1">
                        <label>
                          <input className='mr2' type="radio" value="Wanna Play" checked={this.state.playStatus === 'Wanna Play'} onChange={this.onChange} />
                          Wanna Play
                        </label>
                      </div>
                      <div className="radio flex items-center mb1">
                        <label>
                          <input className='mr2' type="radio" value="Playing" checked={this.state.playStatus === 'Playing'} onChange={this.onChange} />
                          Playing
                        </label>
                      </div>
                      <div className="radio flex items-center mb1">
                        <label>
                          <input className='mr2' type="radio" value="Completed" checked={this.state.playStatus === 'Completed'} onChange={this.onChange} />
                          Completed
                        </label>
                      </div>
                      <div className="radio flex items-center mb1">
                        <label>
                          <input className='mr2' type="radio" value="Abandoned" checked={this.state.playStatus === 'Abandoned'} onChange={this.onChange} />
                          Abandoned
                        </label>
                      </div>
                    </form>
                  </Modal>
                </div>
              );
              break;
            default:
              break;
          }
        }
        gameDetails = (
          <div className="game-detail-card">
            <Row>
              <Col xs={24} sm={16}>
                {game.summary && (
                  <div className="game-summary">
                    <h2>Summary</h2>
                    <p>{game.summary}</p>
                  </div>
                )}
                {playStatusModal}
              </Col>
              <Col xs={24} sm={8}>
                <h2 className="rating-star">Recommend Level</h2>
                <Progress type="circle" percent={rating} strokeColor="green" trailColor="white" className="rating-progress" />
              </Col>
            </Row>
          </div>
        );

        if (game.screenshots) {
          getScreenshots = Object.values(game.screenshots).map(s => {
            return (
              <Col xs={24} sm={12} lg={8} key={s.id} className="screen-shots">
                <img
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${
                    s.image_id
                    }.jpg`}
                  className="game-img"
                />
              </Col>
            );
          });
        } else {
          getScreenshots = <p>No relevant screenshots</p>;
        }

        if (game.themes) {
          getGenres = Object.values(game.themes).map(k => {
            // console.log(s)
            let path = "/Search/"+k.name
            return (
              <Link to={path} key={k.id} className="key-words" >
                <Tag color="cyan" onClick={()=>{this.hancdleKeyword(k.name)}}>{k.name}</Tag>
              </Link>
            );
          });
        } else {
          getGenres = <p>No relevant keywords</p>;
        }

        break;

      default:
        gameDetails = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="game-wrap">
        <Header />
        <div className="game-center clearfix">
          <button onClick={e => { this.goBack(e) }} className='bg-transparent blue b--blue'>
            <Icon type="double-left" style={{ fontSize: '13px', color: '#1890ff' }} />
            &nbsp;Back
            </button>
          {game.name && <h1 className="single-game-title">{game.name} </h1>}
          <Row>
            <Col xs={24} sm={24} lg={8}>

              {game.cover && (
                <img
                  className="game-cover"
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${
                    game.cover.image_id
                    }.jpg`}
                  alt={game.name}
                />
              )}
            </Col>
            <Col xs={24} sm={24} lg={16}>
              {gameDetails}
            </Col>
          </Row>
          {getGenres && (
            <div className="more-keywords clearfix">
              <h2>Keywords</h2>
              {getGenres}
            </div>
          )}
          {getScreenshots && (
            <div className="more-screenshots clearfix">
              <h2>Screenshots</h2>
              <Row type="flex">{getScreenshots}</Row>
            </div>
          )}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playStatus: state.singleGame.playStatus,
    isFetching: state.singleGame.isFetching,
    isGetingPlayStatus: state.singleGame.isGetingPlayStatus,
    game: state.singleGame.game,
    auth: state.firebase.auth,
    authError: state.auth.authError
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
