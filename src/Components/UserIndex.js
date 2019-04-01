import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import * as actions from '../Actions/index'

class WishList extends Component {

    static propTypes = {
        wishlist: PropTypes.array.isRequired,
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
        let wish_list = null;
        //why if statement not working?
        if (this.props.wishlist) {
            wish_list = this.props.wishlist[0].games.map(item => {
                let id = item.id
                //console.log(id);
                //console.log(this.props.ww[id]);
                return (
                    //Need a table here to list all games
                    <div key={item.gameID}>
                        {/* a example of remove item from list, you can move this function to the place you want */}
                        <h1>{item.gameName}</h1>
                        <button onClick={() => this.removeWishListClick(item.id)}>remove from list</button>
                    </div>
                )
            })
        } else {
            wish_list =
                <div>
                    <h1>it's empty</h1>
                </div>

        }


        return (
            <div>
                <h1>this is wishList component</h1>
                {wish_list}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    //const id = state.firestore.ordered.wishlist[0].id
    const a = state
    console.log(a)
    return {
        wishlist: state.firestore.ordered.wishlist,
        ww: state.firestore.data.wishlist

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(state => {
        return [
            {
                collection: 'wishlist',
                doc:"6VvCdNDwQ30ZTiKwhG2Q",
                subcollections: [
                    {
                      collection: 'games'
                      //collection:'wish'
                    }
                  ],
               // storeAs:"gamesW"
                //doc: state.firestore.ordered.wishlist
            }
        ]
    })
)(WishList);