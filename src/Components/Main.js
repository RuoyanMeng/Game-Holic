import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import { Link } from 'react-router-dom';
//import { withRouter } from 'react-router-dom'

import * as actions from '../Actions/index'
import GameGrid from './GameGrid';
import SideBar from './SideBar';



class Main extends Component {
  static propTypes = {
    //types: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired,
    // Injected by React Router
    //children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      status: "LOADING",
      keyWord: ""
    };
  }

  componentWillMount() {
    console.log(this.state.keyWord)
    this.props.actions.getAllGames(`${this.state.keyWord}`)
    //console.log(this.props.num)
  }



  render() {
    const { games, num } = this.props
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
            () => this.componentWillMount()
          }
        >GO!</button>
        <GameGrid games={games} />
        <SideBar />
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  //console.log(state)
  return {
    games: state.allGames.games
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main)