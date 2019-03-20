import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from "antd";
import "../Styles/sidebar.css";

class SideBar extends Component{

  render() {
    return (
      <div className='sidebar'>
        {/* <h1>
          this is SideBar
        </h1> */}
        <div className='sidebar-list'>
        <Icon type="home" theme="twoTone" />
        <Link to="/" > Home</Link><br/><br/>

        <Icon type="star" theme="twoTone" />
        <Link to="/WishList"> WishList</Link><br/>
        {/* <Link to="/WishList"> Playing</Link><br/>
        <Link to="/WishList"> Plan to play</Link><br/>
        <Link to="/WishList"> Played</Link><br/> */}
        </div>
      </div>
    )
  }
};

export default SideBar;