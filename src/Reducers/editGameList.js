const initialState = {
    playlist: {},
    wishlist: {},
    completedlist: {},
    isFetchingP: "LOADING",
    isFetchingW: "LOADING",
    isFetchingC: "LOADING"
}

export default function editGameList(state = initialState, action) {
    switch (action.type) {
        case 'ADD_LIST_SUCCESS':
            //console.log('add wishlist success');
            return state;
        // return {
        //     ...state,
        //     wishlist: [...state.wishlist, action.briefGameInfo]
        // }
        case 'ADD_LIST_SUCCESS':
            //console.log('REMOVE FROM wishlist success');
            return state;
        // return {
        //     ...state,
        //     wishlist: state.wishlist.filter(item => action.briefGameInfo !== item.id)
        // }
        case 'GET_playingList_SUCCESS':
            return {
                ...state,
                playlist: action.gameList,
                isFetchingP: "LOADED"
            }
        case 'GET_wishList_SUCCESS':
            return {
                ...state,
                wishlist: action.gameList,
                isFetchingW: "LOADED"
            }
        case 'GET_completedList_SUCCESS':
            return {
                ...state,
                completedlist: action.gameList,
                isFetchingC: "LOADED"
            }
        default:
            return state
    }

}

  //types.ERROR_MESSAGE