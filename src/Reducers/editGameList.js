const initialState = {
    gamelist: {}
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
        default:
            return state
    }

}

  //types.ERROR_MESSAGE