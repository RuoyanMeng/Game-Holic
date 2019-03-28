import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from "antd";
import "../Styles/sidebar.css";

class SideBar extends Component {

    render() {
        return ( <
            div className = 'sidebar' > {
                /* <h1>
                          this is SideBar
                        </h1> */
            } <
            div className = 'sidebar-list' > { /* <Icon type="home" theme="twoTone" /> */ } <
            Link to = "/" > < span > H < /span>ome </Link > < br / > < br / >
            <
            Link to = "/Hottest" > H < span > o < /span>ttest < /Link > < br / > < br / >
            <
            Link to = "/Latest" > < span > L < /span>at<span>e</span > st < /Link><br / > < br / > { /* <Icon type="star" theme="twoTone" /> */ } <
            Link to = "/WishList" > W < span > i < /span>shList < /Link > < br / > {
                /* <Link to="/WishList"> Playing</Link><br/>
                   <Link to="/WishList"> Plan to play</Link><br/>
                   <Link to="/WishList"> Played</Link><br/> */
            } <
            /div> < /
            div >
        )
    }
};

export default SideBar;