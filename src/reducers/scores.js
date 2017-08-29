export const scoresReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SCORES':
      return action.scores;
    default:
      return state;
  }
};
