export const authReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid,
        username: action.username,
        photoURL: action.photoURL,
        authed: true
      };
    case 'LOGOUT':
      return {
        authed: false
      };
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    case 'LOADED':
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
