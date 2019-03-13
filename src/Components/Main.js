import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import { Link } from 'react-router-dom';
//import { withRouter } from 'react-router-dom'

import * as actions from '../Actions/index'
import GameGrid from './GameGrid';
import SideBar from './SideBar';
//import { type } from 'os';
//import { resetErrorMessage } from '../Actions/index'


class Main extends Component {
  static propTypes = {

    //onChange: PropTypes.func.isRequired,
    Keyword: PropTypes.string.isRequired,
    //types: PropTypes.string.isRequired,
    games: PropTypes.array.isRequired,
    // Injected by React Router
    //children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state={
      Keyword:"halo"
    }
  }




  componentDidMount() {
    this.props.actions.getAllGames(this.state.Keyword)
  }

  // onInputChanged = e => {
  //   this.props.actions.changeInputValue(e.target.value)
  // };

  



  render() {
    const { games } = this.props
    return (
      <div>
        {/* search here*/}
        <input type="text" placeholder="Search food here..." value={this.props.keyword}
          onChange={
            (e) => this.setState({Keyword:e.target.value})
          }
        />
        <button 
          onClick={
            () =>  this.componentDidMount() 
          }
        >GO!</button>

        <GameGrid />
        <SideBar />
      </div>
    )
  }
};

const mapStateToProps = (state,ownProps) => ({
  //errorMessage: state.errorMessage,
  games: state.games,
  Keyword: ownProps.Keyword

});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Main)