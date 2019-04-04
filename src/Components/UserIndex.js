import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as actions from '../Actions/index'
import Header from "./Header";
import WishList from "./gameList/WishList"
import PlayingList from './gameList/PlayingList'
import CompletedList from './gameList/CompletedList'
import '../Styles/Userindex.css'

class UserIndex extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {

    }

    removeWishListClick(id) {

        this.props.actions.removeItemFromWishList(id)
    }


    render() {


        return (
            <div>
                <Header />
                <h1 id='wishlist'>this is WishList component</h1>
                <WishList/>
                <h1>this is PlayingList component</h1>
                <PlayingList/> 
                <h1>this is CompletedList component</h1>
                <CompletedList/>
            </div>
        )
    }
};

const mapStateToProps = (state) => { 
    console.log(state.firestore)
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UserIndex);