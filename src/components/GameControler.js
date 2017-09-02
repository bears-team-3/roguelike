import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Login from './Login';
import MockupScore from './MockupScore';
import { Link } from 'react-router-dom';

class GameControler extends Component {
  displayAuth() {
    const { dispatch, auth } = this.props;

    if (auth.authed) {
      return (
        <a
          className="link dim black absolute pointer mr3 back-button"
          onClick={() => dispatch(actions.startLogout())}
        >
          Logout
        </a>
      );
    }
    else if(auth.name){
      return ''
    }
    return <Login />;
  }

  handleSaveScore() {
    const { auth, dispatch, game } = this.props;
    if (auth.authed) {
      dispatch(
        actions.saveScoreForLoggedUser(auth.uid, game.score, auth.username)
      );
    } else if (auth.name.length > 0) {
      dispatch(actions.saveScoreForGuest(auth.name, game.score));
    }
  }

  render() {
    const { game, auth } = this.props;

    return (
      <div className="pa3">
        <Link
          to={'/leaderboard'}
          className="link dim black absolute pointer mr3 leaderboard-button"
        >
          Leaderboard
        </Link>
        {game.score
          ? <div>
              <div className="flex">
                <h2>
                  Your score is {game.score}
                </h2>
                {auth.authed || auth.name
                  ? <a
                      className="f6 link dim br3 ba bw1 ph3 pv2 dib black pointer save-score-btn"
                      onClick={this.handleSaveScore.bind(this)}
                    >
                      Save score
                    </a>
                  : ''}
              </div>
              {this.displayAuth()}
            </div>
          : ''}
        <MockupScore />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    game: state.game
  };
};

export default connect(mapStateToProps, null)(GameControler);
