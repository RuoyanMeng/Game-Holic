import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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

    removeWishListClick(id){
        this.props.actions.removeItemFromWishList(id)
    }


    render() {
        let wish_list = null;
        //why if statement not working?
        if(this.props.wishlist === []){
            wish_list = 
            <div>
                <h1>it's empty</h1>
            </div>
        }else{
            wish_list = this.props.wishlist.map(item=>{
                return(
                    //Need a table here to list all games
                    <div key={item.id}>
                    {/* a example of remove item from list, you can move this function to the place you want */}
                    <h1>{item.name}</h1>
                    <button onClick={() => this.removeWishListClick(item.id)}>remove from list</button>
                    </div>
                )
            })
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
    console.log(state.wishlist.wishlist)
    return {
        wishlist:state.wishlist.wishlist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);