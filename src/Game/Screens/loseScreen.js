import { Game } from '../game';
import * as actions from '../../actions/index';
import { store } from '../../index';

export const loseScreen = {
  enter: function() {
    console.log('Entered lose screen.');
    Game._playerScore.bossKilled = false;
    store.dispatch(actions.setScore(Game._playerScore));
    store.dispatch(actions.gameOver());
    console.log(Game._playerScore);
  },

  exit: function() {
    console.log('Exited lose screen.');
  },

  render: function(display) {
    // Render our prompt to the screen
    for (let i = 0; i < 22; i++) {
      display.drawText(2, i + 1, '%b{red}You lose! :(');
    }
  },

  handleInput: function(inputType, inputData) {
    // nothing to do here
  }
};
