
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

// import Header from "../Header";

class AbandonedList extends Component {

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
        const { abandonedList } = this.props
        let Abandoned_List = null;
        //why if statement not working?
        if (abandonedList) {
            Abandoned_List = abandonedList[0].abandonedList.map(item => {
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
            Abandoned_List =
                <div>
                    <h1>it's empty</h1>
                </div>

        }


        return (
            <div>
                {/* <Header /> */}
                <h1>this is AbandonedList component</h1>
                {Abandoned_List}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        //auth: state.firebase.auth,
        abandonedList: state.firestore.ordered.users
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
                        collection: 'abandonedList',
                    }
                ],
            }
        ]
    })
)(AbandonedList);