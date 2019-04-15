import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import { signOut } from "../Actions/authActions";
import * as actions from "../Actions/index";

import { Row, Col, Affix, Input, Button, Avatar } from "antd";
import "../Styles/header.scss";

import logo1 from '../img/logo1.png'

const Search = Input.Search;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  handleSignOut=()=>{
    this.props.signOut();
    this.props.actions.resetState();
  }

  handleSearch=(value)=>{
    this.setState({ query: value })
    this.props.actions.resetState('SEARCHRESULTS');
    //console.log("reset")
    setTimeout(
      () => {this.props.actions.getSearchResults(`${this.state.query}`); },
      1000
    );
  }

  render() {
    let signOutBlock = (
      <div className="username">
        <Link to="/UserIndex" className="usericon">
          <Avatar style={{ backgroundColor: "#87d068" }} icon="user">
            {this.props.profile.userName}
          </Avatar>
        </Link>

        <Link to='/'>
        <Button
          type="dashed"
          size="small"
          shape="round"
          ghost
          onClick={()=>{this.handleSignOut()}}
        >
         Sign Out
         
        </Button>
        </Link>
      </div>
    );

    const links = this.props.auth.uid ? (
      signOutBlock
    ) : (
      <div className="username">
      <Link to="/SignIn" className="btn-login">
        <Button type="dashed" size="small" shape="round" ghost>
          Sign In
        </Button>
      </Link>
      <Link to="/SignUp" className="btn-login">
        <Button type="dashed" size="small" shape="round" ghost>
          Sign Up
        </Button>
      </Link>
      </div>
    );

    let search = null;

    if (this.state.query !== "") {
      //console.log(this.state.query);
      let path = "/Search/" + this.state.query;
      search = <Redirect to={path} />;
    }

    return (
      <div className="header">
        <Affix>
          <div className="header-wrap clearfix">
            <Row>
              <Col xs={24} sm={8}>
                <Link to="/">
                  <img className="logo1" src={logo1} />
                </Link>
              </Col>
              <Col xs={12} sm={8}>
                <Search
                  type="text"
                  placeholder="Find your fancy game here..."
                  style={{width:'90%', background:"#333333" }}
                  onSearch={value => this.handleSearch(value)}
                />
              </Col>
              <Col xs={12} sm={8}>
                {search}
                {links}
              </Col>
            </Row>
          </div>
        </Affix>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.firebase.auth)
  //console.log(state.allGames.isFetching)
  return {
    isFetching: state.allGames.isFetching,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
