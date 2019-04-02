import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../Actions/index'
import Header from "./Header";

class SideBar extends Component {

  

  render() {
    return (
      <div>
        <Header />
        <h1>
          this is SideBar
        </h1>
        <Link to="/" >Home</Link>
        <Link to="/WishList">Wish List</Link>
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  //console.log(state.firebase.auth)
  //console.log(state.allGames.isFetching)
  return {
    isFetching: state.allGames.isFetching,
    games: state.allGames.games,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);