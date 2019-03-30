import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../Actions/index'

class GameGrid extends Component {

    static propTypes = {
        game: PropTypes.object.isRequired,
        isFetching: PropTypes.string.isRequired
        // Injected by React Router
        //children: PropTypes.node
    }

    constructor(props) {
        super(props);
        this.state = {
            currentId: this.props.match.params.id
        }

    }
    componentDidMount() {
        console.log(this.state.currentId)
        this.props.actions.getSingleGame(`${this.state.currentId}`)
    }

    addWishListClick(){
        let briefGameInfo={
            gameID:this.state.currentId,
            gameName:this.props.game.name,
            // rating:this.props.game.rating,
            // platforms:this.props.game.platforms
        }
        this.props.actions.addItemToWishList(briefGameInfo)

    }

    

    render() {
        let gameDetails = null;
        switch (this.props.isFetching) {
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


        return (
            <div>
                <Link to="/" >Back to Search</Link>
                <h1>this is game: {this.state.currentId}</h1>
                <h1>Name:{this.props.game.name} </h1>
                {gameDetails}
                <button onClick={() => this.addWishListClick()}>Add to Wishlist</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    //console.log(state.singleGame)
    //console.log(state.singleGame.isFetching)
    //console.log(state.wishlist)
    return {
        //wishlist:state.wishlist,
        isFetching: state.singleGame.isFetching,
        game: state.singleGame.game
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);