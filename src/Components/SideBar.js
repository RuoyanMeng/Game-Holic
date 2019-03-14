import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component{

  render() {
    return (
      <div>
        <h1>
          this is SideBar
        </h1>
        <Link to="/Home" >Home</Link>
        <Link to="/WishList">Wish List</Link>
      </div>
    )
  }
};

export default SideBar;