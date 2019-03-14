const initialState = {
    wishlist: []
}

export default function editWishList(state = initialState, action) {
    switch (action.type) {
        case 'ADD_WISHLIST':
            return {
                ...state,
                wishlist: [...state.wishlist, action.briefGameInfo]
            }
        case 'REMOVE_WISHLIST_ITEM':
            return{
                ...state,
                wishlist:state.wishlist.filter(item => action.briefGameInfo !== item.id)
            }
        default:
            return state
    }

}

  //types.ERROR_MESSAGE