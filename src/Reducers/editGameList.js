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
            return state;
        case 'ADD_LIST_SUCCESS':
            return state;
        case 'GET_Playing_SUCCESS':
            return {
                ...state,
                playlist: action.gameList,
                isFetchingP: "LOADED"
            }
        case 'GET_Wanna Play_SUCCESS':
            return {
                ...state,
                wishlist: action.gameList,
                isFetchingW: "LOADED"
            }
        case 'GET_Completed_SUCCESS':
            return {
                ...state,
                completedlist: action.gameList,
                isFetchingC: "LOADED"
            }
        default:
            return state
    }

}

