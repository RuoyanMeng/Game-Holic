import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { signOut } from '../Actions/authActions'

import { Affix, Input, Button } from "antd";

import "../Styles/header.scss";


const Search = Input.Search;

class Header extends Component {
  constructor(props) {
    super(props);
  }
  searchGame(value) {
    console.log(value);
  }

  render() {
    let signOutBlock = 
  <div>
    <Link to='/UserIndex' className="btn btn-floating pink lighten-1">{this.props.profile.userName}</Link>
    <button onClick={this.props.signOut}>Sign Out</button>
    
    </div>
    const links = this.props.auth.uid ? signOutBlock : <Link to='/SignIn'><button>Sign In</button></Link>;
    return (
      <div className="header">
        <Affix>
          <div className="header-wrap">
            <Link to='/'>
              <a>GameHolic</a>
            </Link>
            <div className="search-wrap">
              <Search
                type="text"
                placeholder="Find your fancy game here..."
                style={{ width: 600 }}
                onSearch={value => this.searchGame(value)}
              />
            </div>

            {links}
          </div>
        </Affix>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state.firebase.auth)
  //console.log(state.allGames.isFetching)
  return {
    auth: state.firebase.auth,
    profile:state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
