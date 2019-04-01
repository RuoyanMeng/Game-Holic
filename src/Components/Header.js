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
            <h1>GameHolic</h1>
            <div className="search-wrap">
              <Search
                type="text"
                placeholder="Find your fancy game here..."
                style={{ width: 650 }}
                onSearch={value => this.searchGame(value)}
              />
            </div>

            <Button type="dashed" className="btn-login" shape="round" ghost>
              <Link to="/LogIn">Log In</Link>
            </Button>
          </div>
        </Affix>
      </div>
    );
  }
}

export default Header;
