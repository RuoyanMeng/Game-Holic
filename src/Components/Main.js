import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import * as actions from "../Actions/index";
import GameGrid from "./GameGrid";
import Header from "./Header";
import "./main.scss";

class Main extends Component {
  static propTypes = {
    isFetching: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired
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
    console.log(this.state.keyWord);
    this.props.actions.getAllGames(`${this.state.keyWord}`);
    //console.log(this.props.allGames)
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
            <h1>test ok</h1>
            <GameGrid
              games={this.props.games}
              isFetching={this.props.isFetching}
            />
          </div>
        );
        break;
      default:
        gameGrid = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="main-wrap">
        <Header />
        <div className="main-center">
          <div className="main-background">
            <div className="banner-info">
              <h1>Plenty of trendy games for you!</h1>
              <h2>
                Here you could find everything you need. Discover fancy games
                and get your own collections now!
              </h2>
            </div>
          </div>

          <div>
            <h2>welcome bala bala</h2>
          </div>

          <div className="game-card">{gameGrid}</div>

          <div>
            <Link to="/UserIndex"> UserIndex </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.allGames.games);
  //console.log(state.allGames.isFetching)
  return {
    isFetching: state.allGames.isFetching,
    games: state.allGames.games
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
)(Main);
