import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../Actions/index";
import Header from "../Header";
import GameGrid from "../Presentational/GameGrid";
import "../../Styles/search.scss";
import { Icon } from "antd";

class Search extends Component {
  static propTypes = {
    isFetching: PropTypes.string.isRequired,
    searchResults: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {isFetching,searchResults } = this.props
    let gameGrid = null;
    switch (isFetching) {
      case "LOADING":
        gameGrid = <h1 className='white'><Icon type="loading" /></h1>;
        break;
      case "LOADED":
        if(searchResults.length !== 0){
          gameGrid = 
              <GameGrid
                games={searchResults}
                isFetching={isFetching}
                isIndex={false}
                isSearchresults={true}
              />
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
