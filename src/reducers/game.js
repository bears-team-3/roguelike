const initalState = {
  score:0,
  over: false
};

export const gameReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_SCORE':
      return {
        ...state,
        score: action.score
      };
    case 'GAME_OVER':
      return {
        ...state,
        over: true
      }
    default:
      return state;
  }
};
