import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../Actions/index'


import Header from "../Header";

class PlayingList extends Component {

    static propTypes = {
        playingList: PropTypes.array.isRequired,
        auth: PropTypes.object.isRequired
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
            listType: 'playingList'
        }
        this.props.actions.getGameList(listType)
    }


    render() {
        const { playingList } = this.props

        let playing_List = null;
        //why if statement not working?
        switch (this.props.isFetching) {
            case "LOADING":
                playing_List = <em>Loading...</em>;
                break;
            case "LOADED":
                if (playingList) {
                    playing_List = Object.values(playingList).map(v => {
                        console.log(v)
                        return (
                            <div key={v.gameID}>
                                <h1>{v.gameName}</h1>
                            </div>
                        )
                    })
                }
                break;
            default:
                playing_List = <b>Failed to load data, please try again</b>;
                break;



        }



        return (
            <div>
                {/* <Header /> */}
                < h1 > this is playing List component</h1 >
                {playing_List}
            </div >
        )
    }
};

const mapStateToProps = (state) => {
    console.log(state.gameList.playlist)
    return {
        auth: state.firebase.auth,
        playingList: state.gameList.playlist,
        isFetching: state.gameList.isFetchingP
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayingList);