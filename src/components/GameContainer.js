import React, { Component } from 'react';
import { ROT, Game } from '../Game/game';
import Screen from '../Game/Screens/index';
import GameControler from './GameControler';
import { connect } from 'react-redux';

class GameContainer extends Component {
  componentDidMount() {
    // Check if rot.js can work on this browser
    if (!ROT.isSupported()) {
      alert("The rot.js library isn't supported by your browser.");
    } else {
      // Initialize the game
      Game.init();
      // Add the container to our HTML page
      document
        .getElementsByClassName('game-container')[0]
        .appendChild(Game._display.getContainer());
      // Load the start screen
      Game.switchScreen(Screen.startScreen);
    }
  }
  render() {
    return (
      <div className="flex flex-column justify-center items-center">
        <GameControler />
        <h1 className="mv4 f1 normal tracked gold">THE LABYRINTH</h1>
        {this.props.game.over
          ? <h2 className="f3 normal tracked gold">
              {Object.keys(this.props.game.score).map((key, indx) => {
                if (indx === 0) {
                  return (
                    <div key={key}>
                      Level: {this.props.game.score[key]}
                    </div>
                  );
                } else if (indx === 1) {
                  return <div key={key}>
                      Depth: {this.props.game.score[key]}
                    </div>;
                } else {
                  return <div key={key}>
                      BossKilled: {`${this.props.game.score[key]}`}
                    </div>;
                }
              })}
            </h2>
          : ''}
        <div className="game-container" />
        <p className="tracked f5" style={{ color: '#BEBEBE' }}>
          Press ? for help.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.game
  };
};

export default connect(mapStateToProps, null)(GameContainer);
