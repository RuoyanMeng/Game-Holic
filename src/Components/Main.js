import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import * as actions from "../Actions/index";
import GameGrid from "./GameGrid";
import { signOut } from "../Actions/authActions";
import Header from "./Header";
import "../Styles/main.scss";
import { Row, Col } from "antd";

class Main extends Component {
  static propTypes = {
    isFetching: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired

    // Injected by React Router
    //children: PropTypes.node
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
    console.log(this.state.keyWord);
    this.props.actions.getAllGames(`${this.state.keyWord}`);
    //console.log(this.props.allGames)
  }

  componentWillUnmount=()=>{
    this.props.actions.resetState();
  }


  render() {
    let gameGrid = null;
    switch (this.props.isFetching) {
      case "LOADING":
        gameGrid = <em>Loading...</em>;
        break;
      case "LOADED":
        gameGrid = (
          <div>
            <GameGrid
              games={this.props.games}
              isFetching={this.props.isFetching}
              isIndex={true}
            />
          </div>
        );
        break;
      default:
        gameGrid = <b>Failed to load data, please try again</b>;
        break;
    }
    //console.log(this.props.auth.uid)

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

          {/* <div className="list-title">
            <h2>Trendy Games</h2>
          </div> */}
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
  //console.log(state);
  //console.log(state.allGames.isFetching)
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
