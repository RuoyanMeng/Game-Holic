const initialState = {
  commentList: [],
  isFetchingComment: "LOADING"
};

export default function getCommentReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS":
      console.log("ok");
      return {
        ...state,
        isFetchingComment: "LOADED",
        commentList: action.commentList
      };
    case "RESET_STATE_COMMENT":
      return initialState;
    default:
      return state;
  }
}
