import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import { Link } from 'react-router-dom';


import * as actions from '../Actions/index'
import GameGrid from './GameGrid';
import SideBar from './SideBar';



class Main extends Component {
  static propTypes = {
    isFetching: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired,
    // Injected by React Router
    //children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      status: this.props.isFetching,
      keyWord: ""
    };
  }

  componentDidMount() {
    console.log(this.state.keyWord)
    this.props.actions.getAllGames(`${this.state.keyWord}`)
    //console.log(this.props.allGames)
  }





  render() {
    let gameGrid = null;
    switch (this.props.isFetching) {
      case "LOADING":
        gameGrid = <em>Loading...</em>;
        break;
      case "LOADED":
        gameGrid =
          <div>
            <h1>test ok</h1>
            <GameGrid games={this.props.games}
              isFetching={this.props.isFetching} />
          </div>;
        break;
      default:
        gameGrid = <b>Failed to load data, please try again</b>;
        break;
    }


    return (
      <div>
        {/* search here*/}
        <input type="text" placeholder="Search food here..." value={this.state.keyWord}
          onChange={
            (e) => this.setState({ keyWord: e.target.value })
          }
        />
        <button
          onClick={
            () => this.componentDidMount()
          }
        >GO!</button>
        {gameGrid}
        <SideBar />
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  console.log(state.allGames.games)
  //console.log(state.allGames.isFetching)
  return {
    isFetching: state.allGames.isFetching,
    games: state.allGames.games
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main)