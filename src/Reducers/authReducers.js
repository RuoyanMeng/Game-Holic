const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNIN_ERROR':
      console.log('signin error');
      return {
        ...state,
        authError: action.err.message
      }
    case 'SIGNIN_SUCCESS':
      console.log('signin success');
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state

    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }
    case 'RESET_STATE':
      return {
        ...state,
        authError: null
      }
    default:
      return state
  }
};

export default authReducer;