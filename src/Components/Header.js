import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Affix, Input, Button } from "antd";
import "./header.scss";

const Search = Input.Search;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: ""
    };
  }
  searchGame(value) {
    console.log(value);
  }
  render() {
    return (
      <div className="header">
        <Affix>
          <div className="header-wrap">
            <h1>Game Holic</h1>
            <div className="search-wrap">
              <Search
                type="text"
                placeholder="Search Game here..."
                style={{ width: 500 }}
                onSearch={value => this.searchGame(value)}
              />
            </div>

            <Button type="primary" className="btn-login">
              <Link to="/LogIn">LogIn</Link>
            </Button>
          </div>
        </Affix>
      </div>
    );
  }
}

export default Header;
