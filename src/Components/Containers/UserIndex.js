import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as actions from '../../Actions/index'
import Header from "../Header";
import WishList from "../Presentational/gameList/WishList"
import PlayingList from '../Presentational/gameList/PlayingList'
import CompletedList from '../Presentational/gameList/CompletedList'
import '../../Styles/Userindex.scss'

class UserIndex extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.auth.uid
        }
    }

    componentDidMount() {
        let listType = {
            uid: this.state.uid,
            listType: 'Completed'
        }
        this.props.actions.getGameList(listType)

        listType = {
            uid: this.state.uid,
            listType: 'Playing'
        }
        this.props.actions.getGameList(listType)

        listType = {
            uid: this.state.uid,
            listType: 'Wanna Play'
        }
        this.props.actions.getGameList(listType)
    }

    render() {
        const {isFetchingC, completedList, isFetchingW, wishList, isFetchingP, playingList} = this.props
        let wish_list = <WishList wishList={wishList} isFetching={isFetchingW}/>
        let completed_list = <CompletedList completedList={completedList} isFetching={isFetchingC}/>
        let playing_list = <PlayingList playingList={playingList} isFetching={isFetchingP}/> 
        return (
            <div id='Userindex'>
                <Header />
                <h1 id='Greeting'>Good day!</h1>
                <h1>Wish List</h1>
                {wish_list}
                <h1>Playing</h1>
                {completed_list}
                <h1>Completed</h1>
                {playing_list}
            </div>
        )
    }
};

const mapStateToProps = (state) => { 
    return {
        auth: state.firebase.auth,
        completedList: state.gameList.completedlist,
        playingList: state.gameList.playlist,
        wishList: state.gameList.wishlist,
        isFetchingC: state.gameList.isFetchingC,
        isFetchingP: state.gameList.isFetchingP,
        isFetchingW: state.gameList.isFetchingW
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);