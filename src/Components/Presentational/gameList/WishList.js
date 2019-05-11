import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import poster from "../../../img/poster.jpg"
import { Icon } from "antd";


class WishList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { wishList} = this.props
        
        let wish_list = null;
        switch (this.props.isFetching) {
            case "LOADING":
            wish_list = <em><Icon type="loading" /></em>;
                break;
            case "LOADED":
                if (wishList) {
                    wish_list = Object.values(wishList).map(v => {
                        if(v.gameCover){
                            return (
                                <div key={v.gameID}>
                                    <Link to={`/GameDetails/${v.gameID}`}>    
                                        <img
                                        className="game-cover"
                                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${v.gameCover.image_id}.jpg`}
                                        width="210"
                                        height="280" />     
                                        <h2>{v.gameName}</h2> 
                                    </Link>
                                </div>
                            )}else{
                                return(
                                    <div key={v.gameID}>
                                    <Link to={`/GameDetails/${v.gameID}`}>    
                                        <img
                                        className="game-cover"
                                        src={poster}
                                        width="210"
                                        height="280" />     
                                        <h2>{v.gameName}</h2> 
                                    </Link>
                                </div>
                                )
                            }
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


export default WishList;