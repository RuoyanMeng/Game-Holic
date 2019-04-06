import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import { signOut } from "../Actions/authActions";
import * as actions from "../Actions/index";

import { Affix, Input, Button, Avatar } from "antd";
import "../Styles/header.scss";

import logo from '../img/logo.png'

const Search = Input.Search;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
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
          button
          type="dashed"
          size="small"
          shape="round"
          ghost
          onClick={this.props.signOut}
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
      </div>
    );

    let search = null;

    if (this.state.query !== "") {
      console.log(this.state.query);
      let path = "/Search/" + this.state.query;
      search = <Redirect to={path} />;
    }

    return (
      <div className="header">
        <Affix>
          <div className="header-wrap">
            <Link to="/">
              {/* <h2>GameHolic</h2> */}
              <img class="logo" src={logo}></img>
            </Link>
            <div className="search-wrap">
              <Search
                type="text"
                placeholder="Find your fancy game here..."
                style={{ width: 600 }}
                onSearch={value => this.setState({ query: value })}
              />
            </div>
            {search}
            {links}
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
