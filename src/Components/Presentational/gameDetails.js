import React, { Component } from "react";
import { Link } from "react-router-dom";

import PlayStatusModal from './PlayStatusModal'

import { Row, Col, Tag, Progress, Icon } from "antd";

class GameDetails extends Component {
  constructor(props) {
    super(props);
  }

  goBack(e) {
    e.preventDefault();
    this.props.history.goBack();
  }


  hancdleKeyword = (keyword) => {
    this.props.actions.resetState('SEARCHRESULTS');
    setTimeout(
      () => { this.props.actions.getSearchResults(`${keyword}`); },
      1000
    );
  }

  render() {

    const { signIn, actions, game, auth, playStatus, isGetingPlayStatus, authError, signUp } = this.props
    let rating = this.props.game.total_rating
      ? game.total_rating.toFixed(2) : 50;

    let getScreenshots = null;
    let getGenres = null;
    let playStatusModal = null;

    if (auth.isEmpty) {
      playStatusModal =
        <PlayStatusModal
          playStatus={playStatus}
          auth={auth}
          isGetingPlayStatus={isGetingPlayStatus}
          authError={authError}
          signUp={signUp}
          signIn={signIn}
        >
        </PlayStatusModal>
    } else {
      playStatusModal =
        <PlayStatusModal
          playStatus={playStatus}
          auth={auth}
          actions={actions}
          playStatus={playStatus}
          game={game}
        >
        </PlayStatusModal>

    }

    let gameDetails = (
      <div className="game-detail-card">
        <Row>
          <Col xs={24} sm={16}>
            {game.summary && (
              <div className="game-summary">
                <h2>Summary</h2>
                <p>{game.summary}</p>
              </div>
            )}
            {playStatusModal}
          </Col>
          <Col xs={24} sm={8}>
            <h2 className="rating-star">Recommend Level</h2>
            <Progress type="circle" percent={rating} strokeColor="green" trailColor="white" className="rating-progress" />
          </Col>
        </Row>
      </div>
    );

    if (game.screenshots) {
      getScreenshots = Object.values(game.screenshots).map(s => {
        return (
          <Col xs={24} sm={12} lg={8} key={s.id} className="screen-shots">
            <img
              src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${
                s.image_id
                }.jpg`}
              className="game-img"
            />
          </Col>
        );
      });
    } else {
      getScreenshots = <p>No relevant screenshots</p>;
    }

    if (game.themes) {
      getGenres = Object.values(game.themes).map(k => {
        // console.log(s)
        let path = "/Search/" + k.name
        return (
          <Link to={path} key={k.id} className="key-words" >
            <Tag color="cyan" onClick={() => { this.hancdleKeyword(k.name) }}>{k.name}</Tag>
          </Link>
        );
      });
    } else {
      getGenres = <p>No relevant keywords</p>;
    }


    return (
      <div className="game-center clearfix">
        <button onClick={e => { this.goBack(e) }} className='bg-transparent blue b--blue'>
          <Icon type="double-left" style={{ fontSize: '13px', color: '#1890ff' }} />
          &nbsp;Back
            </button>
        {game.name && <h1 className="single-game-title">{game.name} </h1>}
        <Row>
          <Col xs={24} sm={24} lg={8}>

            {game.cover && (
              <img
                className="game-cover"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${
                  game.cover.image_id
                  }.jpg`}
                alt={game.name}
              />
            )}
          </Col>
          <Col xs={24} sm={24} lg={16}>
            {gameDetails}
          </Col>
        </Row>
        {getGenres && (
          <div className="more-keywords clearfix">
            <h2>Keywords</h2>
            {getGenres}
          </div>
        )}
        {getScreenshots && (
          <div className="more-screenshots clearfix">
            <h2>Screenshots</h2>
            <Row type="flex">{getScreenshots}</Row>
          </div>
        )}

      </div>
    );
  }
}

export default GameDetails;
