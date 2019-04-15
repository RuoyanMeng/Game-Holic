import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../Actions/index'

class WishList extends Component {

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
            listType: 'Wanna Play'
        }
        this.props.actions.getGameList(listType)
    }


    render() {
        const { wishList} = this.props
        
        let wish_list = null;
        switch (this.props.isFetching) {
            case "LOADING":
            wish_list = <em>Loading...</em>;
                break;
            case "LOADED":
                if (wishList) {
                    wish_list = Object.values(wishList).map(v => {
                        return (
                            <div  key={v.gameID}>
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
            wish_list = <b>Failed to load data, please try again</b>;
                break;



        }


        return (
            <div class='gamelist'>
                {wish_list}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        wishList: state.gameList.wishlist,
        isFetching: state.gameList.isFetchingW
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);