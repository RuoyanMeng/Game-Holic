import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../Actions/index'
import Header from "./Header";
import GameGrid from './GameGrid';

class Search extends Component {
  static propTypes = {
    isFetching: PropTypes.string.isRequired,
    searchResults: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      query: this.props.match.params.query
    }
  }
  
  componentDidMount() {
    console.log(this.state.query);
    //this.props.actions.getSearchResults(`${this.state.query}`);
  }


  render() {
    console.log(this.state.query);
    let gameGrid = null;
    switch (this.props.isFetching) {
      case "LOADING":
        gameGrid = <em>Loading...</em>;
        break;
      case "LOADED":
      //cannot use GameGrid directly
        gameGrid = (
          <div>     
            Search Results
          </div>
        );
        break;
      default:
        gameGrid = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div>
        <Header />
        <h1>
          this is Search
        </h1>
        {gameGrid}
        
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  //console.log(state.firebase.auth)
  console.log(state.allGames)
  return {
    isFetching: state.allGames.isFetching,
    searchResults: state.allGames.searchResults,
    //auth: state.firebase.auth
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
)(Search);