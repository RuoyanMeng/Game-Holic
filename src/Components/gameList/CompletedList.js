import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../Actions/index'


class CompletedList extends Component {

    static propTypes = {
        wishlist: PropTypes.array.isRequired,
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
    }


    render() {
        const { completedList } = this.props

        let completed_List = null;
        switch (this.props.isFetching) {
            case "LOADING":
            completed_List = <em>Loading...</em>;
                break;
            case "LOADED":
                if (completedList) {
                    completed_List = Object.values(completedList).map(v => {
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
                        )
                    })
                }
                break;
            default:
            completed_List = <b>Failed to load data, please try again</b>;
                break;



        }


        return (
            <div class='gamelist'>
                {completed_List}
            </div>
        )
    }
};

const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
        completedList: state.gameList.completedlist,
        isFetching: state.gameList.isFetchingP
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}


export default 
    connect(mapStateToProps,mapDispatchToProps)
    (CompletedList);