import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GameGrid extends Component{



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