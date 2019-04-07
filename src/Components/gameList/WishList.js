import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../Actions/index'

// import Header from "../Header";

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
            listType: 'wishList'
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
                        console.log(v)
                        return (
                            <div key={v.gameID}>
                                <Link to={`/GameDetails/${v.gameID}`}><h2>{v.gameName}</h2> </Link>                            
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
            <div>
                {/* <Header /> */}
                {/* <h1>this is wishList component</h1> */}
                {wish_list}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    console.log(state.gameList)
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