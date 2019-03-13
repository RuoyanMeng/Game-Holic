import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class GameGrid extends Component{

  static propTypes = {
    games:PropTypes.array.isRequired,
    // Injected by React Router
    //children: PropTypes.node
  }


  render() {
    

    return (
      <div>
        <h1>this is card container</h1>
        <div className="GameCard">
        <Link to={"/GameDetails"}>
         <h1>aaa</h1>
          
        </Link>
      </div>
      </div>
    )
  }
};

export default GameGrid;