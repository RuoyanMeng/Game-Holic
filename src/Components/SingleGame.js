import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../Actions/index";

import Header from "./Header";
import { Button, Row, Col } from "antd";
import "./singlegame.scss";

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
      gameID: this.state.currentId,
      gameName: this.props.game.name
      // rating:this.props.game.rating,
      // platforms:this.props.game.platforms
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
                  {this.props.game.name && (
                    <Button
                      type="primary"
                      shape="round"
                      onClick={() => this.addWishListClick()}
                    >
                      Add to Wishlist
                    </Button>
                  )}
                </div>
               
              </Col>
              <Col span={8}>
                <h2>Popularity:</h2>
                {this.props.game.popularity && (
                  <p className="game-popularity">
                    {this.props.game.popularity.toFixed(2)}
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
      <div className="game-wrap">
        <Row>
          <Header />
        </Row>

        <div className="game-center">
          <div className="game-background">
            <Row>
              <Col>
                <Link to="/" className="back-to">
                   Back to Search
                </Link>
                <div className="game-content">
                  {this.props.game.name && (
                    <h1 className="single-game-title">
                      {this.props.game.name}{" "}
                    </h1>
                  )}

                  <Row>
                    <Col span={10}>
                      {this.props.game.cover && (
                        <img
                          className="game-cover"
                        //   src={"https:" + this.props.game.cover.url}
                          src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${this.props.game.cover.image_id}.jpg`}
                          alt={this.props.game.name}
                        />
                      )}
                    </Col>

                    <Col span={14}>{gameDetails}</Col>
                  </Row>
                 
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.singleGame)
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
