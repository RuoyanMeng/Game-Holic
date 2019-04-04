import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

// import Header from "../Header";

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


    render() {
        const { wishList } = this.props
        let wish_list = null;
        //why if statement not working?

        if (!wishList) {
            wish_list = wishList.users[0].games.map(item => {
                let id = item.id
                //console.log(id);
                //console.log(this.props.ww[id]);
                return (
                    //Need a table here to list all games
                    <div key={item.gameID}>
                        {/* a example of remove item from list, you can move this function to the place you want */}
                        <h1>{item.gameName}</h1>
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
                {/* <Header /> */}
                <h1>this is wishList component</h1>
                {wish_list}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    console.log(state.firestore)
    return {
        auth: state.firebase.auth,
        wishList: state.firestore.ordered
    }
}




export default compose(
    connect(mapStateToProps),
    firestoreConnect(ownProps => {
        return [
            {
                collection: 'users',
                doc: ownProps.auth.uid,
                subcollections: [
                    {
                        collection: 'games',
                        where: ['playStatus', '==', 'wishList']
                    }
                ],
            }
        ]
    })
)(WishList);