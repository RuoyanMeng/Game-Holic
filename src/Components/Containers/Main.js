import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../Actions/index";
import GameGrid from "../Presentational/GameGrid";
import { signOut } from "../../Actions/authActions";
import Header from "../Header";

import "../../Styles/main.scss";
import { Row, Col, Icon } from "antd";

class Main extends Component {
  static propTypes = {
    isFetching: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      status: this.props.isFetching,
      keyWord: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.getAllGames(`${this.state.keyWord}`);
  }

  componentWillUnmount=()=>{
    this.props.actions.resetState();
  }

  render() {
    const {isFetching,games} = this.props
    let gameGrid = null;
    gameGrid =
        <GameGrid
          isFetching={isFetching}
          games={games}
          isFetching={isFetching}
          isIndex={true}
        />

    return (
      <div className="main-wrap">
        <Header />
        <div className="main-center">
          <Row>
            <Col xs={24} sm={24} md={20} lg={16} xxl={12}>
              <div className="banner-info">
                <h1>Here, plenty of trendy games for you!</h1>
                <h2>
                  Start discovering fancy games and getting your own
                  collections now! You could find everything you need!
                </h2>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
        <div className="list-title">
          <h2>Trending Games</h2>
        </div>
        </Row>
        <div className="game-card">{gameGrid}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.allGames.isFetching,
    games: state.allGames.games,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
