import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as actions from '../../Actions/index'
import Header from "./Header";
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
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id='Userindex'>
                <Header />
                <h1 id='Greeting'>Good day!</h1>
                <h1>Wish List</h1>
                <WishList/>
                <h1>Playing</h1>
                <PlayingList/> 
                <h1>Completed</h1>
                <CompletedList/>
            </div>
        )
    }
};

const mapStateToProps = (state) => { 
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