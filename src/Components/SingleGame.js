import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../Actions/index";
import { signIn } from "../Actions/authActions";

import Header from "./Header";
import { Row, Col, Rate, Tag, Modal, Button, Radio, Icon} from "antd";
import "../Styles/singlegame.scss";

const RadioGroup = Radio.Group;

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
      playStatus: this.props.playStatus,
      loading: false,
      visible: false,
      email: "",
      password: ""
    };
  }
  componentDidMount() {
    console.log(this.props.playStatus);
    //this.props.actions.resetState();
    window.scrollTo(0, 0);
    this.props.actions.getSingleGame(`${this.state.currentId}`);
  }

  addListClick(uid, playStatus) {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
    let briefGameInfo = {
      playStatus: playStatus,
      uid: uid,
      gameID: this.state.currentId,
      gameName: this.props.game.name,
      // gameCover: this.props.game.cover,
      // rating:this.props.game.rating,
      // platforms:this.props.game.platforms
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

  render() {
    //console.log(this.state.playStatus)
    const { visible, loading } = this.state;
    const {
      game,
      auth,
      isFetching,
      playStatus,
      isGetingPlayStatus,
      authError
    } = this.props;

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };

    let rating = this.props.game.total_rating
      ? this.props.game.total_rating.toFixed(0) / 20
      : 2.5;

    let getScreenshots = null;
    let getKeywords = null;
    let playStatusModal = null;
    let gameDetails = null;
    console.log(this.props.isFetching);

    switch (isFetching) {
      case "LOADING":
        gameDetails = <em>Loading...</em>;
        break;
      case "LOADED":
        //edit all the elements and layout of gamedetails card here
        console.log(this.props.isFetching);
        if (auth.isEmpty) {
          {
            /* change play ststus here, the style below only for function test */
          }
          let signUp = <Link to="/SignUp">Sign Up</Link>;
          //let path =<Link to={"/GameDetails/"+game.id}>Sign In</Link>
          console.log("aaaaa" + this.props.isFetching);

          playStatusModal = (
            <div>
              <Button type="primary" onClick={this.showModal}>
                {playStatus}
              </Button>
              <Modal
                visible={visible}
                title="Game Holic"
                onCancel={this.handleCancel}
                footer={null}
              >
                <form onSubmit={this.handleSubmit} className="white">
                  <div className="input-field">
                    <label htmlFor="email">
                      Email
                      <br />
                    </label>
                    <input
                      type="email"
                      id="email"
                      onChange={this.handleSignInChange}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="password">
                      Password
                      <br />
                    </label>
                    <input
                      type="password"
                      id="password"
                      onChange={this.handleSignInChange}
                    />
                  </div>
                  <br />
                  <br />
                  <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">
                      Sign In
                    </button>
                    <div className="center red-text">
                      {authError ? <p>{authError}</p> : null}
                    </div>
                  </div>
                  <h5 className="grey-text text-darken-3">
                    Don't have an account? {signUp}
                  </h5>
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
            //console.log(id.uid)
            this.props.actions.getPlayStatus(id);
            //console.log(this.props.game.playStatus)
          }
          switch (isGetingPlayStatus) {
            case "LOADING":
              gameDetails = <em>Loading...</em>;
              break;
            case "GET_PLAYSTATUS_SUCCESS":
              {
                /* change play ststus here, the style below only for function test */
              }
              console.log(visible);
              playStatusModal = (
                <div>
                  <Button type="primary" onClick={this.showModal}>
                    {playStatus}
                  </Button>
                  <Modal
                    visible={visible}
                    title="Add this game to..."
                    style={{ color: '#1890ff' }}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>
                        Return
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={() =>
                          this.addListClick(auth.uid, this.state.playStatus)
                        }
                      >
                        Submit
                      </Button>
                    ]}
                  >
                    <RadioGroup
                      onChange={this.onChange}
                      value={this.state.value}
                    >
                      <Radio style={radioStyle} value="wishList">
                        Wanna Play
                      </Radio>
                      <Radio style={radioStyle} value="playingList">
                        Playing
                      </Radio>
                      <Radio style={radioStyle} value="completedList">
                        Completed
                      </Radio>
                      <Radio style={radioStyle} value="abandonedList">
                        Abandoned
                      </Radio>
                    </RadioGroup>
                  </Modal>
                </div>
              );
          }
        }
        gameDetails = (
          <div className="game-detail-card">
            <Row>
              <Col xs={24} sm={16}>
                {this.props.game.summary && (
                  <div className="game-summary">
                    <h2>Summary</h2>
                    <p>{this.props.game.summary}</p>
                  </div>
                )}
                {playStatusModal}
              </Col>
              <Col xs={24} sm={8}>
                <h2 className="rating-star">Rating</h2>
                <Rate disabled allowHalf value={rating} className="rating-star"/>
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

        break;

      default:
        gameDetails = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="game-wrap">
        <Header />
        <div className="game-center clearfix">        
        <Link to="/" className="back-to">
            <Icon type="double-left" style={{ fontSize: '13px', color: '#1890ff' }}/>
            &nbsp;Back to Search
          </Link>
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
          {getKeywords && (
            <div className="more-keywords clearfix">
              <h2>Keywords</h2>
              {getKeywords}
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
  console.log(state);
  //console.log(state.firestore.ordered.users);
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
