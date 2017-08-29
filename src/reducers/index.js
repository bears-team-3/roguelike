import { combineReducers } from 'redux';
import { authReducer } from './auth';
import {gameReducer} from './game'
import { scoresReducer } from './scores'

export const reducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
  scores: scoresReducer
});
