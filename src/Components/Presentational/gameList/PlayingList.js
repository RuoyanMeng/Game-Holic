import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../../Actions/index'
import poster from "../../../img/poster.jpg"

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
            listType: 'Playing'
        }
        this.props.actions.getGameList(listType)
    }


    render() {
        const { playingList } = this.props

        let playing_List = null;
        switch (this.props.isFetching) {
            case "LOADING":
                playing_List = <em>Loading...</em>;
                break;
            case "LOADED":
                if (playingList) {
                    playing_List = Object.values(playingList).map(v => {
                        if(v.gameCover){
                        return (
                            <div key={v.gameID}>
                                <Link to={`/GameDetails/${v.gameID}`}>    
                                    <img
                                    className="game-cover"
                                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${v.gameCover.image_id}.jpg`}
                                    width="210"
                                    height="280" />     
                                    <h2>{v.gameName}</h2> 
                                </Link>
                            </div>
                        )}else{
                            return(
                                <div key={v.gameID}>
                                <Link to={`/GameDetails/${v.gameID}`}>    
                                    <img
                                    className="game-cover"
                                    src={poster}
                                    width="210"
                                    height="280" />     
                                    <h2>{v.gameName}</h2> 
                                </Link>
                            </div>
                            )
                        }
                    })
                }
                break;
            default:
                playing_List = <b>Failed to load data, please try again</b>;
                break;

        }



        return (
            <div class='gamelist'>
                {playing_List}
            </div >
        )
    }
};

const mapStateToProps = (state) => {
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