import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../Actions/index";
import Header from "./Header";
import GameGrid from "./GameGrid";
import "../Styles/search.scss";

class Search extends Component {
  static propTypes = {
    isFetching: PropTypes.string.isRequired,
    searchResults: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //console.log(this.state.query);
    //this.props.actions.getSearchResults(`${this.state.query}`);
  }

  componentWillUnmount() {
    //this.props.actions.resetState();
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.match.params.query !== prevState.query) {
  //     return { query: nextProps.match.params.query };
  //   } else return null;
  // }

  render() {
    //console.log(this.state.query);
    const {isFetching,searchResults } = this.props
    let gameGrid = null;
    switch (isFetching) {
      case "LOADING":
        gameGrid = <h1 className='white'>Loading...</h1>;
        break;
      case "LOADED":
        if(searchResults.length !== 0){
          gameGrid = (
            <div>
              <GameGrid
                games={searchResults}
                isFetching={isFetching}
                isIndex={false}
              />
            </div>
          );
        }else{
          gameGrid = (
            <div>
              <h2 className='white'>Opps, we got nothing here</h2>
            </div>
          );
        }
        
        break;
      default:
        gameGrid = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div className="search-wrap">
        <Header />
        <div className="search-center">
          Search Results For:&nbsp;&nbsp;
          <p>{this.props.match.params.query}</p>
          <div className="game-card">{gameGrid}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.firebase.auth)
  console.log(state.allGames.searchResults);
  return {
    isFetching: state.allGames.isFetching,
    searchResults: state.allGames.searchResults,
    auth: state.firebase.auth
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
)(Search);
