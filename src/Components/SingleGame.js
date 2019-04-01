import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import * as actions from '../Actions/index'

class GameGrid extends Component {

    static propTypes = {
        game: PropTypes.object.isRequired,
        isFetching: PropTypes.string.isRequired,
        auth: PropTypes.object.isRequired,
        gameStatus: PropTypes.array.isRequired
        // Injected by React Router
        //children: PropTypes.node
    }

    constructor(props) {
        super(props);
        this.state = {
            currentId: this.props.match.params.id,
            playStatus: 'None'
        }

    }
    componentDidMount() {
        console.log(this.state.currentId)
        this.props.actions.getSingleGame(`${this.state.currentId}`)
    }

    addListClick(uid, playStatus) {
        let briefGameInfo = {
            playStatus: playStatus,
            uid: uid,
            gameID: this.state.currentId,
            gameName: this.props.game.name,
            // rating:this.props.game.rating,
            // platforms:this.props.game.platforms
        }
        this.props.actions.addItemToList(briefGameInfo)

    }




    render() {
        const { game, auth, isFetching, gameStatus } = this.props;
        let gameDetails = null;
        switch (isFetching) {
            case "LOADING":
                gameDetails = <em>Loading...</em>;
                break;
            case "LOADED":
                //edit all the elements and layout of gamedetails card here
                gameDetails =
                    <div className="game-detail-card">

                    </div>
                break;
            default:
                gameDetails = <b>Failed to load data, please try again</b>;
                break;
        }


        let playStatus = null;
        //console.log()
        // if(gameStatus){
        //    if(!gameStatus[0].games){
        //     this.setState({
        //         playStatus: gameStatus[0].games[0].listType
        //     })
        //    }
        //    console.log(this.state.playStatus)
        // }
        
            
            {/* change play ststus here, the style below only for function test */ }
            playStatus =
                <div>
                    <select value={this.state.playStatus} className="avenir"
                        onChange={
                            (e) => this.setState({ playStatus: e.target.value })
                        }
                    >
                        <option value="None">None</option>
                        <option value="wishList">Wanna Play</option>
                        <option value="playingList">Playing</option>
                        <option value="completedList">Completed</option>
                        <option value="abandonedList">Abandoned</option>
                    </select>
                    <button onClick={() => this.addListClick(auth.uid, this.state.playStatus)}>SAVE</button>
                </div>
        


        return (
            <div>
                <Link to="/" >Back to Search</Link>
                <h1>this is game: {this.state.currentId}</h1>
                <h1>Name:{game.name} </h1>
                {gameDetails}
                {playStatus}

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    //console.log(state.singleGame)
    console.log(state.firestore.ordered.users)
    return {
        gameStatus: state.firestore.ordered.users,
        isFetching: state.singleGame.isFetching,
        game: state.singleGame.game,
        auth: state.firebase.auth

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(ownProps => {
        return [
            {
                collection: 'users',
                doc: ownProps.auth.uid,
                subcollections: [
                    {
                        collection: 'games',
                        where: [
                            ['gameId', '==', ownProps.match.params.id]
                        ]
                    }
                ],
            }
        ]
    })
)(GameGrid);