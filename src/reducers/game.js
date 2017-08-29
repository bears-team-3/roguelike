const initalState={
  score: 0
}

export const gameReducer = (state=initalState, action) => {
  switch (action.type) {
    case 'SET_SCORE':
      return {
        ...state,
        score: action.score
      }
    default:
      return state
  }
}