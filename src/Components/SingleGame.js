import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Row, Col } from "antd";
import "../Styles/singlegame.css";

// import "antd/dist/antd.css";
import * as actions from "../Actions/index";
import SideBar from "./SideBar";

class GameGrid extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    isFetching: PropTypes.string.isRequired
    // Injected by React Router
    //children: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.match.params.id
    };
  }
  componentDidMount() {
    console.log(this.state.currentId);
    this.props.actions.getSingleGame(`${this.state.currentId}`);

  }

  addWishListClick() {
    let briefGameInfo = {
      id: this.state.currentId,
      name: this.props.game.name,
      rating: this.props.game.rating,
      platforms: this.props.game.platforms
    };
    this.props.actions.addItemToWishList(briefGameInfo);
  }

  render() {
    let gameDetails = null;
    switch (this.props.isFetching) {
      case "LOADING":
        gameDetails = <em>Loading...</em>;
        break;
      case "LOADED":
        //edit all the elements and layout of gamedetails card here
        gameDetails = (
          <div className="game-detail-card">
            <Row>
              <Col span={16}>
                <div className="game-summary">
                  <h2>Summary:</h2>
                  {this.props.game.summary && <p>{this.props.game.summary}</p>}
                </div>
              </Col>
              <Col span={8}>
                <h2>RATE:</h2>
                {this.props.game.rating && (
                  <p className="game-popularity">
                    {this.props.game.rating.toFixed(2)}
                  </p>
                )}
              </Col>
            </Row>
          </div>
        );
        break;
      default:
        gameDetails = <b>Failed to load data, please try again</b>;
        break;
    }

    return (
      <div>
        <Row>
          <Col span={6}>
            <SideBar />
          </Col>

          <Col span={18}>
            <Link to="/" className="back-to">
              Back to Search
            </Link>
            <div className="game-content">
              {/* <h1 className="single-game-title">this is game: {this.state.currentId}</h1> */}
              {this.props.game.name && (
                <h1 className="single-game-title">{this.props.game.name} </h1>
              )}
              <Row>
                <Col span={8}>
                  {this.props.game.cover && (
                    <img
                      className="game-cover"
                      src={"https:"+this.props.game.cover.url}
                      alt={this.props.game.name}
                    />
                  )}
                </Col>
                <Col span={16}>{gameDetails}</Col>
              </Row>
              {this.props.game.name && (
                <Button type="primary" onClick={() => this.addWishListClick()}>
                  Add to Wishlist
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.singleGame)
  //console.log(state.singleGame.isFetching)
  //console.log(state.wishlist)
  return {
    //wishlist:state.wishlist,
    isFetching: state.singleGame.isFetching,
    game: state.singleGame.game
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
)(GameGrid);
