import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../Actions/index";
import Header from "../Header";
import GameList from "../Presentational/GameList";
// import WishList from "../Presentational/gameList/WishList"
// import PlayingList from '../Presentational/gameList/PlayingList'
// import CompletedList from '../Presentational/gameList/CompletedList'
import "../../Styles/Userindex.scss";

import { DragDropContext } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class UserIndex extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.auth.uid,
      wishList: [],
      playingList: [],
      completedList: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    let listType = {
      uid: this.state.uid,
      listType: "Completed"
    };
    this.props.actions.getGameList(listType);

    listType = {
      uid: this.state.uid,
      listType: "Playing"
    };
    this.props.actions.getGameList(listType);

    listType = {
      uid: this.state.uid,
      listType: "Wanna Play"
    };
    this.props.actions.getGameList(listType);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.wishList !== nextProps.wishList) {
      this.setState({
        wishList: nextProps.wishList
      });
    }
    if (this.props.playingList !== nextProps.playingList) {
      this.setState({
        playingList: nextProps.playingList
      });
    }
    if (this.props.completedList !== nextProps.completedList) {
      this.setState({
        completedList: nextProps.completedList
      });
    }
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === result.destination.droppableId) {
      const newList = reorder(
        this.state[result.destination.droppableId],
        result.source.index,
        result.destination.index
      );
      switch (result.destination.droppableId) {
        case "wishList":
          this.setState({
            wishList: newList
          });
          break;
        case "playingList":
          this.setState({
            playingList: newList
          });
          break;
        case "completedList":
          this.setState({
            completedList: newList
          });
          break;
      }
    } else {
      const newLists = move(
        this.state[result.source.droppableId],
        this.state[result.destination.droppableId],
        result.source,
        result.destination
      );
      let gameItemInfo = this.state[result.source.droppableId].find(
        o => o.gameID === result.draggableId
      );
      switch (result.destination.droppableId) {
        case "wishList":
          gameItemInfo.playStatus = "Wanna Play";
          break;
        case "playingList":
          gameItemInfo.playStatus = "Playing";
          break;
        case "completedList":
          gameItemInfo.playStatus = "Completed";
          break;
      }
      this.props.actions.addItemToList(gameItemInfo);

      this.setState(newLists);
    }
  }

  render() {
    const { isFetchingC, isFetchingW, isFetchingP, actions } = this.props;
    const { completedList, wishList, playingList } = this.state;
    let wish_list = (
      <GameList
        gameList={wishList}
        isFetching={isFetchingW}
        actions={actions}
        droppableId="wishList"
      />
    );
    let playing_list = (
      <GameList
        gameList={playingList}
        isFetching={isFetchingP}
        actions={actions}
        droppableId="playingList"
      />
    );
    let completed_list = (
      <GameList
        gameList={completedList}
        isFetching={isFetchingC}
        actions={actions}
        droppableId="completedList"
      />
    );

    return (
      <div id="Userindex">
        <Header />
        <h1 id="Greeting">Good day!</h1>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <h1>Wish List</h1>
          <div className="list-wrap">
            {wish_list}
          </div>
          <h1>Playing</h1>
          <div className="list-wrap">
            {playing_list}
          </div>
          <h1>Completed</h1>
          <div className="list-wrap">
            {completed_list}
          </div>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    completedList: state.gameList.completedlist,
    playingList: state.gameList.playlist,
    wishList: state.gameList.wishlist,
    isFetchingC: state.gameList.isFetchingC,
    isFetchingP: state.gameList.isFetchingP,
    isFetchingW: state.gameList.isFetchingW
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
)(UserIndex);
