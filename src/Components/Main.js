import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import GameGrid from './GameGrid';
import SideBar from './SideBar';
import Search from './Search';
import { resetErrorMessage } from '../Actions/index'



//import { Link } from 'react-router-dom';

class Main extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange = nextValue => {
    this.props.history.push(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        <button onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </p>
    )
  }

  render() {
    return (
      <div>
        <Search />
        <GameGrid />
        <SideBar />
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})


export default withRouter(connect(mapStateToProps, {
  resetErrorMessage
})(Main))