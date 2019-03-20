import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Row, Col } from "antd";

import * as actions from "../Actions/index";
import SideBar from "./SideBar";
import "../Styles/wishlist.css";

class WishList extends Component {
  static propTypes = {
    wishlist: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  removeWishListClick(id) {
    this.props.actions.removeItemFromWishList(id);
  }

  render() {
    let wish_list = null;
    //why if statement not working?
    if (this.props.wishlist === []) {
      wish_list = (
        <div>
          <h1>it's empty</h1>
        </div>
      );
    } else {
      wish_list = this.props.wishlist.map((item, index) => {
        return (
          //Need a table here to list all games
          <div key={index} className="wish-item">
            {/* a example of remove item from list, you can move this function to the place you want */}
            <Row>
              <Col span={20}>
                <h2>{item.name}</h2>
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  onClick={() => this.removeWishListClick(item.id)}
                >
                  remove
                </Button>
              </Col>
            </Row>
          </div>
        );
      });
    }

    return (
      <div className="wish-list">
        <Row>
          <Col span={6}>
            <SideBar />
          </Col>
          <Col span={18}>
            <h1>My Wish List</h1>
            {wish_list}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.wishlist.wishlist);
  return {
    wishlist: state.wishlist.wishlist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishList);
